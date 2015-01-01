var React = require('react');

var Icon = React.createClass({
	
	render: function() {
		return <div><div className="fileIcon"><i className="fa fa-folder-o"></i></div><div>{this.props.name}</div></div>;
  	}
});


module.exports = Icon;