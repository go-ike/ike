const fs     = require('fs');
const yamler = require('yamler');
const here   = process.cwd();
const configFilePath = `${here}/config/ike.yml`;

function isIkeRoot() {
	let isRoot = false;

	try {
		fs.accessSync(configFilePath);
		isRoot = true;
	} catch(e) { }

	return isRoot;
}

module.exports = isIkeRoot;
