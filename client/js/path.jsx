var React = require('react');
var navigation = require('./navigation');

var Path = React.createClass({
	render: function() {
		var pathelems = [""];
		if(this.props.path !== "/") {
			pathelems = this.props.path.split("/");
		}
		
		var partialPath = [];
		pathelems = pathelems.map(function(elem) {
			partialPath.push(elem);
			var currentPath = partialPath.join("/");
			if(!currentPath) currentPath = "/";
			function handleClick(event) {
				event.preventDefault();
				navigation.navigateTo(currentPath);
			}
			if(elem === "") elem = "Home";
			return <li key={currentPath}><a href={currentPath} onClick={handleClick}>{elem}</a></li>;
		});
		
		return <ol className="breadcrumb">
		{pathelems}
			    </ol>;
  	}
});

module.exports = Path;