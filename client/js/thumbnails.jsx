'use strict';

var React = require('react');
var Thumbnail = require('./thumbnail');

var Thumbnails = React.createClass({
	
	render: function() {
		var component = this;
		var thumbnails = this.props.files.map(function(file) {
			return <Thumbnail path={component.props.path} file={file} />;
		});
						
		return <div className="thumbs">
		         {thumbnails}
			   </div>;
  	}
});

module.exports = Thumbnails;