const chalk = require('chalk');
const util  = require('util');
const spawn = require('child_process').spawn;

function development(folderName) {
	let folderPath = `${process.cwd()}/${folderName}`;
	
	console.log();
	console.log(chalk.blue.bold('Installing dependencies'));

	const shellOptions = {stdio: 'inherit', cwd: folderPath };
    let proc = spawn('npm', ['install'], shellOptions);
    
    proc.on('close', function (code) {
      if (code !== 0) {
        console.log(chalk.red.bold('Something went wrong.'));
        console.log('Try running \'npm install\' on the project folder');
      } else {
      	console.log(chalk.bgGreen.white.bold('All set!'));
      	console.log('Go to your project directory and \'ike start\' it');
      }
    });
}

module.exports = development;
