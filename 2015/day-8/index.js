const fs = require("node:fs");

const readFile = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const countCodeMinusMemoryCharacters = function (lines) {
  let totalCodeLength = 0;
  let totalMemoryLength = 0;

  for (let line of lines) {
    const trimmed = line.trim();
    totalCodeLength += trimmed.length;

    let memoryLength = 0;
    let i = 1;

    while (i < trimmed.length - 1) {
      if (trimmed[i] === "\\") {
        if (trimmed[i + 1] === "\\" || trimmed[i + 1] === '"') {
          memoryLength += 1;
          i += 2;
        } else if (trimmed[i + 1] === "x") {
          memoryLength += 1;
          i += 4;
        } else {
          i += 1;
        }
      } else {
        memoryLength += 1;
        i += 1;
      }
    }

    totalMemoryLength += memoryLength;
  }

  return totalCodeLength - totalMemoryLength;
};

const countEncodedMinusCodeCharacters = function (lines) {
  let totalCodeLength = 0;
  let totalEncodedLength = 0;

  for (let line of lines) {
    const trimmed = line.trim();
    totalCodeLength += trimmed.length;

    let encoded = '"';

    for (let char of trimmed) {
      if (char === "\\" || char === '"') {
        encoded += "\\" + char;
      } else {
        encoded += char;
      }
    }

    encoded += '"';

    totalEncodedLength += encoded.length;
  }

  return totalEncodedLength - totalCodeLength;
};

const buffer = readFile("input.txt", "utf-8");
const data = buffer.split("\n");

console.log("Code - Memory:", countCodeMinusMemoryCharacters(data));
console.log("Encoded - Code:", countEncodedMinusCodeCharacters(data));
