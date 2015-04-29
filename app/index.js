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
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
          name: 'Bootstrap: The most popular front-end framework for developing responsive, mobile first projects on the web',
          value: 'includeBootstrap',
          checked: true
      }, {
          name: 'Cookies: Client-Side Cookie Manipulation API',
          value: 'includeCookies',
          checked: true
      }, {
          name: 'Moment: Parse, manipulate, and display dates',
          value: 'includeMoment',
          checked: true
      }, {
          name: 'ES5-shim: ECMAScript 5 compatibility shims for legacy JavaScript engines',
          value: 'includeES5',
          checked: true
      }, {
          name: 'ES6-shim: ECMAScript 6 compatibility shims for legacy JavaScript engines',
          value: 'includeES6',
          checked: true
      }]
    },
    {
      type: 'confirm',
      name: 'includeReactES6',
      message: 'Using React 0.13.x ?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      var features = props.features;
      function hasFeature(feat) { return features.indexOf(feat) !== -1; }
      this.appName = props.appName;
      this.includeBootstrap = hasFeature('includeBootstrap');
      this.includeCookies = hasFeature('includeCookies');
      this.includeMoment = hasFeature('includeMoment');
      this.includeES5 = hasFeature('includeES5');
      this.includeES6 = hasFeature('includeES6');
      this.includeReactES6 = hasFeature('includeReactES6');
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.dest.mkdir('src');
      this.dest.mkdir('src/assets');
      this.dest.mkdir('src/assets/styles');
      this.dest.mkdir('src/assets/images/');
      this.dest.mkdir('src/assets/fonts');
      this.dest.mkdir('src/static');
      this.dest.mkdir('src/config');
      this.dest.mkdir('src/app');
      this.dest.mkdir('src/app/components');
      this.dest.mkdir('src/app/widgets');
      this.dest.mkdir('src/app/views');
      this.dest.mkdir('src/app/pages');
      this.dest.mkdir('src/app/services');
      this.dest.mkdir('src/app/utilities');

      this.template('_package.json', 'package.json');
      this.template('_gulpfile.js', 'gulpfile.js');
      this.template('_bower.json', 'bower.json');
      this.template('index.html', 'src/index.html');

      this.src.copy('main.css', 'src/assets/styles/main.css');
      this.src.copy('app.js', 'src/app/app.js');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('gitignore', '.gitignore');
      this.src.copy('robots.txt', 'src/robots.txt');
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
