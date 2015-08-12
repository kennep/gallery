'use strict';

var io = require('socket.io-client');
var socket = io();

var model = require('../../shared/model');
/*
socket.on('news', function(msg){
    alert(msg.hello);
});*/
var currentPath = {path: null, callback: null};

socket.on('files', function(event) {
	if(currentPath.path == event.path && currentPath.callback) {
		if(event.files) event.files.forEach(function(fileobj) { model.augment(fileobj); });
		currentPath.callback(event.files);
	}
});

function navigate(path, callback) {
	socket.emit('navigate', {path: path});
	currentPath = {
		path: path,
		callback: callback
	};
}

module.exports.navigate = navigate;

