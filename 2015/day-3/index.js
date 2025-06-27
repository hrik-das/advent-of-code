const fs = require("node:fs");

const readFile = function (file, encode) {
  return fs.readFileSync(file, encode);
};

const housesWithSantaOnly = function (directions) {
  const visited = new Set();
  visited.add("0, 0");

  let position = {
    x: 0,
    y: 0,
  };

  for (let direction of directions) {
    if (direction === "^") {
      position.y++;
    } else if (direction === "v") {
      position.y--;
    } else if (direction === "<") {
      position.x--;
    } else if (direction === ">") {
      position.x++;
    }

    visited.add(`${position.x}, ${position.y}`);
  }

  return visited.size;
};

const housesWithSantaAndRobo = function (directions) {
  const visited = new Set();
  visited.add("0, 0");

  let santaCordinate = {
    x: 0,
    y: 0,
  };
  let roboCordinate = {
    x: 0,
    y: 0,
  };
  let isSanta = true;

  for (let direction of directions) {
    let currentTurn = isSanta ? santaCordinate : roboCordinate;

    if (direction === "^") {
      currentTurn.y++;
    } else if (direction === "<") {
      currentTurn.x--;
    } else if (direction === ">") {
      currentTurn.x++;
    } else {
      currentTurn.y--;
    }

    visited.add(`${currentTurn.x}, ${currentTurn.y}`);
    isSanta = !isSanta;
  }

  return visited.size;
};

const buffer = readFile("input.txt", "utf-8");
const directions = buffer.trim().split("");

console.log(`${housesWithSantaOnly(directions)} houses having one present.`);
console.log(`The next year ${housesWithSantaAndRobo(directions)} houses having one present`
);
