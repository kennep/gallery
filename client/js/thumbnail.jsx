'use strict';

var React = require('react');
var FolderIcon = require('./foldericon');
var ImageIcon = require('./imageicon');
var navigation = require('./navigation');

var Thumbnail = React.createClass({
	
	render: function() {
		var component = this;
		var file = this.props.file;
		
		function handleFolderClick(event) {
			event.preventDefault();
			navigation.navigateTo(component.props.path, file.name);
		}
		
		function handleFileClick(event) {
			event.preventDefault();
		}
	
		var linkTarget, clickHandler, thumbnailImage;
	
		linkTarget = navigation.makeUrl(this.props.path, file.name);
		if(file.isDir) {
			clickHandler = handleFolderClick;
			thumbnailImage = <FolderIcon />;
		} else {
			clickHandler = handleFileClick;
			thumbnailImage = <ImageIcon />;
			if(file.thumbnailUrl) thumbnailImage = <img src={file.thumbnailUrl} alt={file.name} />;
		}
			
		return <div className="thumb" key={file.name}>
			     <a href={linkTarget} onClick={clickHandler}>{thumbnailImage}</a>
		         <div><a href={linkTarget} onClick={clickHandler}>{file.name}</a></div>
		       </div>;
  	}
});

module.exports = Thumbnail;