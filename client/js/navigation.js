'use strict';

var events = require('./events');

function navigateTo(currentPath, newPath) {
	var path = joinPath(currentPath, newPath);
	history.pushState(null, null, makeUrl(path));
	events.emit('navigate', path);
}

function joinPath(currentPath, newPath) {
	if(!newPath) return currentPath;
	if(newPath[0]=="/") return newPath;
	
	var path = currentPath;
	if(path[path.length - 1] !== "/") {
		path = path + "/";
	}
	path = path + newPath;
	return path;
}

function onNavigation(listener) {
	window.onpopstate = function(event) {
		var path = decodeURI(document.location.pathname);
		listener(path);
	};
	events.on('navigate', listener);
}

function makeUrl(currentPath, newPath) {
	if(newPath) currentPath = joinPath(currentPath, newPath);
	return encodeURI(currentPath);
}

module.exports.navigateTo = navigateTo;
module.exports.joinPath = joinPath;
module.exports.onNavigation = onNavigation;
module.exports.makeUrl = makeUrl;
