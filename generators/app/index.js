'use strict';

var yeoman = require('yeoman-generator');
var yosay  = require('yosay');
var chalk  = require('chalk');
var path   = require('path');
var fs     = require('fs');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.webtaskConfig = Object.create(null);
  },

  initializing: {
    // Welcome
    welcome: function () {
      this.log(yosay('Welcome to the Webtask starter kit!'));
    }
  },

  prompting: {
    askForType: function () {
      if (this.webtaskType) {
        var webtaksTypes = ['simple', 'full-http', 'express', 'restify', 'hapi'];
        if (webtaksTypes.indexOf(this.webtaskType) !== -1) {
          this.webtaskConfig.type = 'wt-' + this.webtaskType;
        } else {
          this.env.error("Invalid webtask type: " + this.webtaskType + '. Possible types are :' + webtaksTypes.join(', '));
        }
        return;
      }

      var done = this.async();
      this.prompt({
        type: 'list',
        name: 'type',
        message: 'What type of Webtask do you want to create?',
        choices: [
          {
            name: 'Simple (callback way)',
            value: 'wt-simple'
          },
          {
            name: 'Full HTTP Control',
            value: 'wt-full-http'
          },
          {
            name: 'Express application',
            value: 'wt-express'
          },
          {
            name: 'Restify application',
            value: 'wt-restify'
          },
          {
            name: 'Hapi application',
            value: 'wt-hapi'
          }
        ]
      }, function (typeAnswer) {
        this.webtaskConfig.type = typeAnswer.type;
        done();
      }.bind(this));
    },
    askForWebtaskName: function () {
      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'name',
        message: 'Name:'
      }, function (answer) {
        this.webtaskConfig.name = answer.name;
        done();
      }.bind(this));
    },
    askForDescription: function () {
      var done = this.async();

      this.prompt({
        type: 'input',
        name: 'description',
        message: 'Description:'
      }, function (answer) {
        this.webtaskConfig.description = answer.description;
        done();
      }.bind(this));
    },
    askForGit: function () {
      var done = this.async();

      this.prompt({
        type: 'confirm',
        name: 'gitInit',
        message: 'Initialize a git repository?',
        default: true
      }, function (answer) {
        this.webtaskConfig.gitInit = answer.gitInit;
        done();
      }.bind(this));
    },
  },

  // Write files
  writing: function () {
    this.sourceRoot(path.join(__dirname, './templates/' + this.webtaskConfig.type));

    switch (this.webtaskConfig.type) {
      case 'wt-simple':
        this._writeVanilla();
        break;
      case 'wt-full-http':
        this._writeVanilla();
        break;
      case 'wt-express':
        this._writeExpress();
        break;
      case 'wt-restify':
        this._writeVanilla();
        break;
      case 'wt-hapi':
        this._writeVanilla();
        break;
      default:
        //unknown type
        break;
    }
  },

  _writeVanilla: function () {
    console.log('webtaskConfig', this.webtaskConfig);
    var context = this.webtaskConfig;

    this.template(this.sourceRoot() + '/task.js',       path.join(context.name, 'src', context.name + '.js'), context);
    this.template(this.sourceRoot() + '/package.json',  context.name + '/package.json', context);
    this.template(this.sourceRoot() + '/README.md',     context.name + '/README.md', context);
    this.template(this.sourceRoot() + '/quickstart.md', context.name + '/quickstart.md', context);
    this.template(this.sourceRoot() + '/gitignore',    context.name + '/.gitignore', context);
    this.template(this.sourceRoot() + '/.editorconfig', context.name + '/.editorconfig', context);
  },

  _writeExpress: function () {
    var context = this.webtaskConfig;

    this.template(this.sourceRoot() + '/config/api.config.js',     context.name + '/config/api.config.js', context);
    this.template(this.sourceRoot() + '/config/default.config.js', context.name + '/config/default.config.js', context);
    this.template(this.sourceRoot() + '/config/webtask.config.js', context.name + '/config/webtask.config.js', context);

    this.template(this.sourceRoot() + '/src/api.js',     context.name + '/src/api.js', context);
    this.template(this.sourceRoot() + '/src/server.js',  context.name + '/src/server.js', context);
    this.template(this.sourceRoot() + '/src/webtask.js', context.name + '/src/webtask.js', context);

    this.template(this.sourceRoot() + '/.editorconfig', context.name + '/.editorconfig', context);
    this.template(this.sourceRoot() + '/gitignore',    context.name + '/.gitignore', context);
    this.template(this.sourceRoot() + '/gulpfile.js',   context.name + '/gulpfile.js', context);
    this.template(this.sourceRoot() + '/package.json',  context.name + '/package.json', context);
    this.template(this.sourceRoot() + '/quickstart.md', context.name + '/quickstart.md', context);
    this.template(this.sourceRoot() + '/README.md',     context.name + '/README.md', context);
  },

  // Installation
  install: function () {
    process.chdir(this.webtaskConfig.name);

    this.installDependencies({
      npm: true,
      bower: false
    });
  },

  // End
  end: function () {
    // Git init
    if (this.webtaskConfig.gitInit) {
      this.spawnCommand('git', ['init', '--quiet']);
    }

    this.log('');
    this.log('Your webtask ' + chalk.white(chalk.bold(this.webtaskConfig.name)) + ' has been created!');
    this.log('');
    this.log('Open ' + chalk.white('quickstart.md') + ' inside the new webtask for further instructions.');
    this.log('');
    this.log('For more information visit ' + chalk.white('https://webtask.io'));
    this.log('\r\n');
  }
});
