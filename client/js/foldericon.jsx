'use strict';

var React = require('react');

var FolderIcon = React.createClass({
	
	render: function() {
		return <svg id="folder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentcolor">
  		  		 <path d="M0 4 L0 28 L32 28 L32 8 L16 8 L12 4 z  "/>
		       </svg>;
  	}
});

module.exports = FolderIcon;