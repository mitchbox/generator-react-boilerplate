'use strict';

var React = require('react');

class ExampleApp extends React.Component {
    render() {
        return (
            /*jshint ignore:start */
            <div>
                <h2>Hello, React ES6</h2>
            </div>
            /*jshint ignore:end */
        );
    }
}

React.render(
    /*jshint ignore:start */
    <ExampleApp />,
    /*jshint ignore:end */
    document.getElementById('app')
);