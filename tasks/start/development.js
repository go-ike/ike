const chalk = require('chalk');
const util  = require('util');
const spawn = require('child_process').spawn;

function development(args) {
	console.log(chalk.white.bgGreen.bold('Booting ike...'));
	console.log('------------');
	console.log('Booting express...');
	console.log('Watching for .js and .css changes...');
	console.log('------------');

	let proc = spawn('./bin/development.sh'); 

	proc.stdout.on('data', function (data) {
	  console.log(data.toString());
	});

	proc.stderr.on('data', function (data) {
	  console.log('ERROR: ' + data.toString());
	});

	proc.on('exit', function (code) {
	  console.log('Exited with code ' + code.toString());
	});
}

function puts(error, stdout, stderr) {
	console.log('aqui');
	console.log(stdout);
	console.log(stderr);
	console.log(error);
}

module.exports = development;