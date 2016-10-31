#!/usr/bin/env node
global.apprequire = function(fileName) { return require(__dirname + '/' + fileName)};

const commandMap = require('./helpers/command-map.js');
const args       = require('minimist')(process.argv.slice(2));

path = __filename.replace('index.js', '');
basePath = path + 'ike-base/';

commandMap(args, {
	'tasks/new-project':
	['new'],

	'tasks/generate-controller':
	['generate controller', 'g controller'],

	'tasks/new-model':
	['generate model', 'g model']
});
