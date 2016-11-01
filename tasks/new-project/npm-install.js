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
        console.log('13 memo caraio');
      } else {
      	console.log('birl');
      }
    });
}

module.exports = development;
