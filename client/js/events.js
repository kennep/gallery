'use strict';

var eventListeners = {};

function emit(eventType, event) {
	if(eventListeners[eventType]) {
		eventListeners[eventType].forEach(function(listener) { listener(event); });
	}
}

function on(eventType, listener) {
	if(!eventListeners[eventType]) eventListeners[eventType] = [];
	eventListeners[eventType].push(listener);
}

module.exports.emit = emit;
module.exports.on = on;
