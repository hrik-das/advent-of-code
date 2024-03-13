const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");
const commandRegex = /[A-Z]+/g;
const argumentRegex = /[a-z0-9]+/g;
const wires = new Map();

const bitwiseMethods = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    NOT: a => ~a,
    LSHIFT: (a, b) => a << b,
    RSHIFT: (a, b) => a >> b
};

const parseInstruction = instruction => {
    const command = instruction.match(commandRegex);
    const args = instruction.match(argumentRegex);
    const destination = args.pop();

    return{
        command: command && command[0],
        args: args.map(arg => isNaN(Number(arg)) ? arg : Number(arg)),
        destination: destination
    };
};

const calculateWire = wireName => {
    const wire = wires.get(wireName);

    if(typeof wireName === "number") return wireName;
    if(typeof wire === "number") return wire;
    if(typeof wire === "undefined") return undefined;

    if(!wire.command){
        wires.set(wireName, calculateWire(wire.args[0]));
    }else{
        wires.set(wireName, bitwiseMethods[wire.command](calculateWire(wire.args[0]), calculateWire(wire.args[1])));
    }
    return wires.get(wireName);
};

input.forEach(instruction => {
  const parsedInstruction = parseInstruction(instruction);
  wires.set(parsedInstruction.destination, {command: parsedInstruction.command, args: parsedInstruction.args});
});

wires.set('b', 16076);    // In my case answer is 16076
console.log(calculateWire('a'));