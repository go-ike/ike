const yamler        = require('yamler');
const fs            = require('fs');
const findIkeConfig = apprequire('helpers/find-ike-config');
const here          = process.cwd();
const ikeConfigPath = `${here}/config/ike.yml`;

function isIkeProject() {
	let configPath = findIkeConfig(here);
	return (configPath != undefined);
}

module.exports = isIkeProject;