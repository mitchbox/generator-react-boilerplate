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

/*jshint ignore:start */
React.renderComponent(<ExampleApp />, document.getElementById('app'));
/*jshint ignore:end */
