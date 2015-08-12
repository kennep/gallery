'use strict';

var fs = require('fs');
var path = require('path');
var q = require('q');

var m = {
	ROOT: "/Volumes/Privat/Bilder",
	THUMBNAILS: "/Volumes/Privat/Bilder/.Thumbnails",

	resolvePath: function(pathname) {
		pathname = path.join("/", pathname);
		return path.join(m.ROOT, "./" + pathname);
	}
};

module.exports = m;