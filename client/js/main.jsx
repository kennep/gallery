'use strict';

var React = require('react');

var Gallery = require('./gallery');

var path = decodeURI(document.location.pathname);

React.render(<Gallery initialPath={path} />, document.getElementById('content'));
