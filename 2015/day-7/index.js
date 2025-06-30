const fs = require("node:fs");

const logicGates = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NOT: (a) => ~a & 0xffff, // clamp to 16-bit
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b,
};

const readCircuitInstructions = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const buildCircuit = function (instructionLines) {
  const circuit = new Map();

  for (const line of instructionLines) {
    const operation = line.match(/[A-Z]+/g); // e.g. AND, OR, NOT
    const tokens = line.match(/[a-z0-9]+/g); // wire names or numbers
    const outputWire = tokens.pop(); // last token is the output wire

    circuit.set(outputWire, {
      gate: operation && operation[0], // gate operation (if any)
      inputs: tokens.map(function (token) {
        return isNaN(Number(token)) ? token : Number(token);
      }),
    });
  }

  return circuit;
};

const evaluateSignal = function (wireName, circuit, cache = new Map()) {
  if (typeof wireName === "number") {
    return wireName;
  }

  if (cache.has(wireName)) {
    return cache.get(wireName);
  }

  const wire = circuit.get(wireName);

  if (!wire.gate) {
    const signal = evaluateSignal(wire.inputs[0], circuit, cache);
    cache.set(wireName, signal);
    return signal;
  }

  let signal;
  const [a, b] = wire.inputs;

  switch (wire.gate) {
    case "AND":
    case "OR":
    case "LSHIFT":
    case "RSHIFT":
      signal = logicGates[wire.gate](
        evaluateSignal(a, circuit, cache),
        evaluateSignal(b, circuit, cache)
      );
      break;
    case "NOT":
      signal = logicGates.NOT(evaluateSignal(a, circuit, cache));
      break;
  }

  cache.set(wireName, signal);
  return signal;
};

const rawInstructions = readCircuitInstructions("input.txt", "utf-8");
const instructionLines = rawInstructions.trim().split("\n");

const circuitFirstPart = buildCircuit(instructionLines);
const signalAFirstPart = evaluateSignal("a", circuitFirstPart);
console.log("Signal on wire a: ", signalAFirstPart);

const circuitSecondPart = buildCircuit(instructionLines);
circuitSecondPart.set("b", { gate: null, inputs: [signalAFirstPart] });
const signalASecondPart = evaluateSignal("a", circuitSecondPart);
console.log("After overriding signal on wire a: ", signalASecondPart);
