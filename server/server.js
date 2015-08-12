'use strict';

var fs = require('fs');
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var Log = require('log');
var log = new Log('debug');

var queue = require('./queue');
var model = require('../shared/model');

var app = express();

// Deprecated, remove these
var ROOT = "/Volumes/Privat/Bilder";
var THUMBNAILS = "/Volumes/Privat/Bilder/.Thumbnails";

app.use(morgan('combined'));

var server_port = 8080;
var server_ip_address = '0.0.0.0';

var server = app.listen(server_port, server_ip_address, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	log.info('Gallery Server listening at http://%s:%s', host, port);
});

var io = require('socket.io')(server);

app.use(express.static(path.resolve(__dirname, "../client")));
app.use('/images', express.static(ROOT));
app.get("*", function(req, res) {
	var indexHtml = path.resolve(__dirname, "../client/index.html");
	log.debug("Sending %s", indexHtml);
	res.sendFile(indexHtml);
});

function resolvePath(pathname) {
	return path.resolve(ROOT, "." + pathname);
}

function isGalleryFile(file) {
	return (file.mimeType.indexOf("image/") === 0 || file.mimeType.indexOf("video/") === 0);
}

function statAll(root, files, callback) {
	var count = files.length;
	var fileObjects = [];
	
	function statSingle(name, fullPath) {
		log.debug("Begin stat: %s", fullPath);
		fs.stat(fullPath, function(err, stat) {
			log.debug("Stat complete: %s", fullPath);
			var fileObject;
			if(err) {
				log.error("Error stat-ing %s: %s", fullPath, err);
				fileObject = new model.File(name, err);
			} else {
				if(stat.isDirectory()) {
					fileObject = new model.Directory(name);
				} else {
					fileObject = new model.File(name);
				}
				queue.submit(root, fileObject, function() {
					log.debug("Invoked callback!");
				});
			}
			fileObjects.push(fileObject);
			count--;
			if(count === 0) {
				callback(fileObjects);
			}
		});
	}
	
	for(var i=0; i<files.length; ++i) {
		var name = files[i];
		var fullPath = path.resolve(root, name);
		statSingle(name, fullPath);
	}
	
}

function filterFiles(fileObjects) {
	return fileObjects.filter(function(file) { 
					return file.isDir || isGalleryFile(file);
				});
}

function sortFiles(fileObjects) {
	fileObjects.sort(function(a, b) {
		if(a.isDir != b.isDir) {
			if(a.isDir) return -1;
			else return 1;
		}
		return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
	});	
}

function setFileUrls(urlPath, fileObjects) {
	if(urlPath[urlPath.length - 1] !== "/") {
		urlPath += "/";
	}
	fileObjects.forEach(function(fileObject) {
		if(!fileObject.isDir) {
			fileObject.url = "/images"  + urlPath + fileObject.name;
		}
	});
}

io.on('connection', function (socket) {
	log.debug('A client connected.');

	socket.on('navigate', function(event) {
		log.info('Navigate: %s', event.path);
		var fullPath = resolvePath(event.path);
		fs.readdir(fullPath, function(err, files) {
			if(err) {
				log.error('Error reading dir for %s: %s', fullPath, err);
				socket.emit('files', {path: event.path, error: err});
				return;
			} 
			statAll(path, files, function(fileObjects) {
				log.debug("Stat completed: %s", JSON.stringify(fileObjects));
				fileObjects = filterFiles(fileObjects);
				sortFiles(fileObjects);
				setFileUrls(event.path, fileObjects);
				socket.emit('files', {path: event.path, files: fileObjects});
			});
		});
	});
});