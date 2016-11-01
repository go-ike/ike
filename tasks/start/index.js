const chalk = require('chalk');

function start(args) {
	let startArgs = args._.slice(1).join(' ');
	
	switch(startArgs) {
		case '':
		case 'prod':
		case 'production':
			require('./production.js')();
			break;
		case 'd':
		case 'dev':
		case 'development':
			require('./development.js')();
			break;
		default:
			console.log(chalk.red.bold('That\'s not a valid start command'));
			console.log('You can try: ' + chalk.underline('$ ike start'));
			console.log('Or for development: ' + chalk.underline('$ ike start dev'));
	}
}

module.exports = start;
