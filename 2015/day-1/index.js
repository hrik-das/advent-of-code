const fs = require("node:fs");

const readFile = function (file, encode) {
  let data = fs.readFileSync(file, encode);
  return data;
};

const findingFloor = function (instructions) {
  let count = 0;

  for (let char of instructions) {
    if (char === "(") {
      count = count + 1;
    } else {
      count = count - 1;
    }
  }

  return count;
};

const findBasementPosition = function (instructions) {
  let floor = 0;

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i] === "(") {
      floor = floor + 1;
    } else {
      floor = floor - 1;
    }

    if (floor === -1) {
      return i + 1;
    }
  }
};

let buffer = readFile("input.txt", "utf-8");
let data = buffer.trim().split("");

console.log(`The instructions took santa to the ${findingFloor(data)}th floor`);
console.log(`The position of the character is ${findBasementPosition(data)}`);
