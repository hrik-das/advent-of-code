const fs = require("node:fs");

const readFile = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const extremeRoutes = function (lines) {
  const distances = new Map();
  const locations = new Set();

  for (const line of lines) {
    const [location1, , location2, , distance] = line.split(" ");
    distances.set(`${location1}-${location2}`, parseInt(distance));
    distances.set(`${location2}-${location1}`, parseInt(distance));
    locations.add(location1);
    locations.add(location2);
  }

  const permutations = getPermutations(Array.from(locations));
  let shortestDistance = Infinity;
  let longestDistance = -Infinity;

  for (const permutation of permutations) {
    let currentDistance = 0;

    for (let i = 0; i < permutation.length - 1; i++) {
      const route = `${permutation[i]}-${permutation[i + 1]}`;
      currentDistance += distances.get(route);
    }

    shortestDistance = Math.min(shortestDistance, currentDistance);
    longestDistance = Math.max(longestDistance, currentDistance);
  }

  return {
    shortestDistance,
    longestDistance,
  };
};

const getPermutations = function (array) {
  if (array.length <= 1) {
    return [array];
  }

  const permutations = [];

  for (let i = 0; i < array.length; i++) {
    const current = array[i];

    const remaining = array.slice(0, i).concat(array.slice(i + 1));
    const remainingPermutations = getPermutations(remaining);

    for (const perm of remainingPermutations) {
      permutations.push([current, ...perm]);
    }
  }

  return permutations;
};

const buffer = readFile("input.txt", "utf-8");
const lines = buffer.split("\n");

const { shortestDistance, longestDistance } = extremeRoutes(lines);
console.log(`Shortest Route: ${shortestDistance}`);
console.log(`Longest Route: ${longestDistance}`);
