
const interpret  = require('./interpret.js');

function commandMap(args, map) {
	const command = args._;

	for (let task in map) {
		if (!map.hasOwnProperty(task)) continue;

		if (interpret(map[task], command)) {
			apprequire(task)(args);
		}
	}
}

module.exports = commandMap;
