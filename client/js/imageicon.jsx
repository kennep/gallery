'use strict';

var React = require('react');

var ImageIcon = React.createClass({
	
	render: function() {
		return <svg id="picture" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentcolor">
                 <path d="M0 4 L0 28 L32 28 L32 4 z M4 24 L10 10 L15 18 L18 14 L24 24z M25 7 A4 4 0 0 1 25 15 A4 4 0 0 1 25 7  "></path>
               </svg>;
  	}
});

module.exports = ImageIcon;