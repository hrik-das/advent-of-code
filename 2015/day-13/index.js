const fs = require("node:fs");

const readFile = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const parse = function (lines) {
  const map = {};

  for (let line of lines) {
    const parts = line.split(" ");
    const from = parts[0];
    const to = parts.at(-1).replace(/[.\r]/g, "");
    const value = parseInt(parts[3]) * (parts[2] === "gain" ? 1 : -1);

    if (!map[from]) {
      map[from] = {};
    }

    map[from][to] = value;
  }

  return map;
};

const getPermutations = function (arr) {
  if (arr.length <= 1) {
    return [arr];
  }

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const fixed = arr[i];
    const rest = arr.slice(0, i).concat(arr.slice(i + 1));
    const sub = getPermutations(rest);

    for (let s of sub) {
      result.push([fixed, ...s]);
    }
  }

  return result;
};

const score = function (seating, map) {
  let total = 0;
  const n = seating.length;

  for (let i = 0; i < n; i++) {
    const p = seating[i];
    const left = seating[(i - 1 + n) % n];
    const right = seating[(i + 1) % n];

    total += (map[p][left] || 0) + (map[p][right] || 0);
  }

  return total;
};

const calculateHappiness = function (lines) {
  const map = parse(lines);
  const guests = Object.keys(map);
  const [start, ...rest] = guests;

  const arrangements = getPermutations(rest).map(function (p) {
    return [start, ...p];
  });

  let max = -Infinity;

  for (let seating of arrangements) {
    const happiness = score(seating, map);
    if (happiness > max) {
      max = happiness;
    }
  }

  return max;
};

const includingMyself = function (lines) {
  const map = parse(lines);

  const guests = Object.keys(map);

  map["You"] = {};
  for (let guest of guests) {
    map["You"][guest] = 0;

    if (!map[guest]) {
      map[guest] = {};
    }

    map[guest]["You"] = 0;
  }

  const allGuests = Object.keys(map);
  const [start, ...rest] = allGuests;
  const arrangements = getPermutations(rest).map(function (p) {
    return [start, ...p];
  });

  let max = -Infinity;

  for (let seating of arrangements) {
    const happiness = score(seating, map);
    if (happiness > max) {
      max = happiness;
    }
  }

  return max;
};

const buffer = readFile("input.txt", "utf-8");
const lines = buffer.trim().split("\n");

console.log("Maximum happiness: ", calculateHappiness(lines));
console.log("Total change of happiness: ", includingMyself(lines));
