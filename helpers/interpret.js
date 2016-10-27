
function interpret(commands, argList) {
	let interpretedCommands = [];
	let validCommand = false;

	for (let command of commands) {
		interpretedCommands.push(interpretCommand(command, argList));
	}

	for (const interpretation of interpretedCommands) {
		if (interpretation === true) {
			validCommand = true;
			break;
		}
	}

	return validCommand;
}

function interpretCommand(command, argList) {
	const commandList = command.split(" ");
	let validCommand = true;

	for (i=0; i < commandList.length; i++) {
		if(commandList[i] !== argList[i]) {
			validCommand = false;
			break;
		}
	}

	return validCommand;
}

module.exports = interpret;