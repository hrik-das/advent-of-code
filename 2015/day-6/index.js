const fs = require("node:fs");

const readSantaInstructions = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const parseSantaInstruction = function (instruction) {
  const [, command, x1, y1, x2, y2] = instruction.match(
    /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
  );

  return {
    command,
    startX: parseInt(x1),
    startY: parseInt(y1),
    endX: parseInt(x2),
    endY: parseInt(y2),
  };
};

const createLightGrid = function (initialValue) {
  return Array.from(
    {
      length: 1000,
    },
    function () {
      return Array(1000).fill(initialValue);
    }
  );
};

const setupBinaryLightGrid = function (instructions) {
  const grid = createLightGrid(false);

  instructions.forEach(function (line) {
    const { command, startX, startY, endX, endY } = parseSantaInstruction(line);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        if (command === "turn on") {
          grid[x][y] = true;
        } else if (command === "turn off") {
          grid[x][y] = false;
        } else {
          grid[x][y] = !grid[x][y];
        }
      }
    }
  });

  return grid;
};

const countLightsTurnedOn = function (grid) {
  let count = 0;

  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      if (grid[x][y]) {
        count++;
      }
    }
  }

  return count;
};

const setupBrightnessGrid = function (instructions) {
  const grid = createLightGrid(0);

  instructions.forEach(function (line) {
    const { command, startX, startY, endX, endY } = parseSantaInstruction(line);

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        if (command === "turn on") {
          grid[x][y] += 1;
        } else if (command === "turn off") {
          grid[x][y] = Math.max(0, grid[x][y] - 1);
        } else {
          grid[x][y] += 2;
        }
      }
    }
  });

  return grid;
};

const calculateTotalBrightness = function (grid) {
  let total = 0;

  for (let x = 0; x < 1000; x++) {
    for (let y = 0; y < 1000; y++) {
      total += grid[x][y];
    }
  }

  return total;
};

const buffer = readSantaInstructions("input.txt", "utf-8");
const instructions = buffer.trim().split(/\n/g);

const binaryGrid = setupBinaryLightGrid(instructions);
const numberOfLightsOn = countLightsTurnedOn(binaryGrid);

const brightnessGrid = setupBrightnessGrid(instructions);
const totalBrightness = calculateTotalBrightness(brightnessGrid);

console.log(`${numberOfLightsOn} lights are turned on.`);
console.log(`Total brightness is ${totalBrightness}.`);
