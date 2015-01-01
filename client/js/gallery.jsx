var React = require('React');
var Path = require("./path");
var Thumbnails = require("./thumbnails");
var api = require('./api');
var navigation = require('./navigation');

var Gallery = React.createClass({
	getInitialState: function() {
		return {
			path: this.props.initialPath || "/",
			files: []
		};
	},

	componentDidMount: function() {
		this.navigateTo(this.state.path);
		var component = this;
		navigation.onNavigation(function(path) {
			component.navigateTo(path);
		});
	},

	render: function() {
		return <div><Path path={this.state.path} />
		    <Thumbnails path={this.state.path} files={this.state.files} /></div>;
  	},
		
	navigateTo: function(path) {
		if(!path) return;
		if(path[0]!="/") {
			path = this.state.path + (this.state.path!="/"?"/":"") + path;
		}
		this.setState({path: path, files: []});

		var component = this;
		api.navigate(path, function(files) {
			component.setState({files: files});
		});
	}
});

module.exports = Gallery;
