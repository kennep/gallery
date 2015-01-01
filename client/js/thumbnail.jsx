var React = require('react');
var Icon = require('./icon');
var navigation = require('./navigation');

var Thumbnail = React.createClass({
	
	render: function() {
		var component = this;
		var file = this.props.file;
		
		function handleClick(event) {
			event.preventDefault();
			navigation.navigateTo(component.props.path, file.name);
		}
	
		if(file.isDir) {
			return <div className="col-sm-2" key={file.name}>
					 <a href={navigation.makeUrl(component.props.path, file.name)} 
					       onClick={handleClick}><Icon name={file.name} /></a></div>;
		}
			
		var img = "";
		if(file.url) {
			img = <img src={file.url} alt={file.name} />;
		}
		return <div className="col-sm-2" key={file.name}>{img}{file.name}</div>;
  	}
});

module.exports = Thumbnail;