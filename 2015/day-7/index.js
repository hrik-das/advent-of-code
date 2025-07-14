const fs = require("node:fs");

const parseInstructions = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const buildCircuit = function (instructions) {
  const wires = {};

  instructions.forEach((instruction) => {
    const [input, output] = instruction.trim().split(" -> ");
    wires[output] = input;
  });

  return wires;
};

const evaluateSignals = function (wires, wire, cache = {}) {
  if (!isNaN(wire)) {
    return parseInt(wire);
  }

  if (cache[wire] !== undefined) {
    return cache[wire];
  }

  const expression = wires[wire];
  const tokens = expression.split(" ");
  let result = 0;

  if (tokens.length === 1) {
    result = evaluateSignals(wires, tokens[0], cache);
  } else if (tokens.length === 2 && tokens[0] === "NOT") {
    result = ~evaluateSignals(wires, tokens[1], cache);
  } else if (tokens.length === 3) {
    const [left, operation, right] = tokens;
    const a = isNaN(left)
      ? evaluateSignals(wires, left, cache)
      : parseInt(left);
    const b = isNaN(right)
      ? evaluateSignals(wires, right, cache)
      : parseInt(right);

    switch (operation) {
      case "AND":
        result = a & b;
        break;
      case "OR":
        result = a | b;
        break;
      case "LSHIFT":
        result = a << b;
        break;
      case "RSHIFT":
        result = a >> b;
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }
  } else {
    throw new Error(`Unknown expression: ${expression}`);
  }

  cache[wire] = result;
  return result;
};

const buffer = parseInstructions("input.txt", "utf-8");
const instructions = buffer.split("\n");

const wires = buildCircuit(instructions);
const signalInWireA = evaluateSignals(wires, "a");
console.log("Signal on wire a:", signalInWireA);

wires["b"] = signalInWireA.toString();
const overrideSignalInWireA = evaluateSignals(wires, "a");
console.log(
  "New signal is ultimately provided to wire a:",
  overrideSignalInWireA
);
