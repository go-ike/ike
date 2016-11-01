const chalk = require('chalk');
const fs    = require('fs');
const log   = apprequire('helpers/log.js');

const createProject = require('./create-project.js');
const npmInstall    = require('./npm-install.js');
const isIkeProject  = apprequire('helpers/is-ike-project');
const isIkeRoot     = apprequire('helpers/is-ike-root');

function newProject(args) {
	const name = args._[1];

	if(isIkeProject()) {
		console.log(chalk.red.bold('You can\'t create an ike project inside another.'));
		console.log('Why don\'t you pick another location?');
		return;
	}

	if(isIkeProject()) {
		console.log(chalk.red.bold('This is already an ike project'));
		console.log('Why don\'t you choose another place?');
		return;
	}

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