#!/usr/bin/env node
global.apprequire = function(fileName) { return require(__dirname + '/' + fileName)};

const minimistOptions = {
	boolean: ['i']
}

const commandMap = require('./helpers/command-map.js');
const args       = require('minimist')(process.argv.slice(2), minimistOptions);

path = __filename.replace('index.js', '');
basePath = path + 'ike-base/';

commandMap(args, {
	'tasks/new-project':
	['new'],

	'tasks/generate-controller':
	['generate controller', 'g controller'],

	'tasks/generate-model':
	['generate model', 'g model']
});
