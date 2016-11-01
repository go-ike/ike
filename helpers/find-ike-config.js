const fs = require('fs');

function findIkeConfig(path) {
	let configFilePath;
	let tree = path.split('/');
	
	for(i=tree.length; i > 0 ; i--) {
		let thisPath = tree.slice(0, i).join('/') + '/config/ike.yml';

		try {
			fs.accessSync(thisPath);
			configFilePath = thisPath;
		} catch(e) { }
	}

	return configFilePath;
}

module.exports = findIkeConfig;
