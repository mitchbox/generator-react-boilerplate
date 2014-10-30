/** @jsx React.DOM */

'use strict';

var React = require('react'),
    ExampleApp;

ExampleApp = React.createClass({
    render: function() {
        return (
        	/*jshint ignore:start */
            <div>
            	<h2>Hello, World</h2>
            </div>
            /*jshint ignore:end */
        );
    }
});

React.render(
    /*jshint ignore:start */
    <ExampleApp />,
    /*jshint ignore:end */
    document.getElementById('app')
);
