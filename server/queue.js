'use strict';
easyimage = require('easyimage');

var Log = require('log');
var log = new Log('debug');

var queue = [];
var index = {};
var workers = 0;
var MAX_WORKERS = 4;

function submit(origPath, thumbnailPath, file, callback) {
	var fullname = origPath + "/" + file.name;
	var thumnail = thumbnailPath + "/" + file.name;
	var entry = index[fullname];
	if(entry) {
		entry.callbacks.push(callback);
	} else {
		entry = {
			fullname: fullname,
			file: file,
			callbacks: [callback]
		};
		index[fullname] = entry;
		queue.push(entry);
	}
	
	tryProcess();
}

function tryProcess() {
	if(queue.length === 0) return;
	if(workers >= MAX_WORKERS) return;
	
	process();
}

function process() {
	var entry = queue.shift();
	delete index[entry.fullname];
	
	log.debug("Processing entry: %s", entry.fullname);
	easyimage.thumbnail( {
		src: entry.fullname,
		dest: 
	}).then(function(file) { success(entry, file); }, 
		function(err) { failed(entry), err; });
	workers++;
}

function completed(entry) {
	workers--;
	entry.callbacks.forEach(function(callback) { callback(entry); });
	tryProcess();	
}

function failed(entry, err)  {
	log.debug("Failed processing: %s", entry.fullname);	
	log.debug("Error: %s", err);
	completed(entry);
}

function success(entry, thumbanilFile) {
	log.debug("Completed processing: %s", entry.fullname);	
	log.debug("Thumbnail saved to: %s", thumbnailFile);
	completed(entry);
}

module.exports.submit = submit;
