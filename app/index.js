'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var ReactBoilerplateGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the fine ReactBoilerplate generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What is your app\' name ?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('app');
      this.dest.mkdir('app/assets');
      this.dest.mkdir('app/static');
      this.dest.mkdir('app/config');
      this.dest.mkdir('app/scripts');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_gulpfile.js', '_gulpfile.js');
      this.src.copy('_bower.json', 'bower.json');
      this.src.copy('index.html', 'app/index.html');
      this.src.copy('app.js', 'app/scripts/app.js');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('gitignore', '.gitignore');
    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = ReactBoilerplateGenerator;
