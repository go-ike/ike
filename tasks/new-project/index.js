const chalk = require('chalk');
const fs    = require('fs');
const log   = apprequire('helpers/log.js');

const createProject = require('./create-project.js');
const npmInstall = require('./npm-install.js');

function newProject(args) {
	const name = args._[1];

	if (!name) {
		console.log(chalk.red.bold('Did you forget the project name?') + ' Try: ');
		console.log('$ ike new projectname');
		return;
	}

	if(fs.existsSync(name)) {
		console.log(chalk.red.bold('The folder ' + name + ' already exists'));
		return;
	}

	createProject(name);
	npmInstall(name);
}

module.exports = newProject;