'use strict';

var mime = require('mime');
var util = require('util');

var NAME = 'n';
var MIMETYPE = 'm';
var ISDIR = 'd';
var ERROR = 'e';

function File(name, error, isDir) {
	this[NAME] = name;
	if(error) this[ERROR] = error;
	if(isDir) {
		this[ISDIR] = true;
	} else {
		this[MIMETYPE] = mime.lookup(name);
	}
	
	augment(this);
}

function Directory(name) {
	File.call(this, name, undefined, true);
}

function augment(obj) {
	Object.defineProperty(obj, 'name', {
		get: function() { return this[NAME]; }
	});

	Object.defineProperty(obj, 'isDir', {
		get: function() { return this[ISDIR]; }
	});

	Object.defineProperty(obj, 'mimeType', {
		get: function() { return this[MIMETYPE]; }
	});
}

module.exports.File = File;
module.exports.Directory = Directory;
module.exports.augment = augment;
