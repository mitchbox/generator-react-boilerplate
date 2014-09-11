/** @jsx React.DOM */

var React = require('react'),
    ExampleApp,
    appNode = document.getElementById('app');

ExampleApp = React.createClass({
    render: function() {
        return (
            <div>Hello, World</div>
        );
    }
});

React.renderComponent(<ExampleApp />, appNode);
