var io = require('socket.io-client');
var socket = io();
/*
socket.on('news', function(msg){
    alert(msg.hello);
});*/
var currentPath = {path: null, callback: null};

socket.on('files', function(event) {
	if(currentPath.path == event.path && currentPath.callback) {
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

