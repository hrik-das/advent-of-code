const fs = require("node:fs");

const readFile = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const wrappingPaper = function (dimensions) {
  let totalPaper = 0;

  dimensions.forEach(function (dimension) {
    let [l, w, h] = dimension.split("x").map(Number);
    let surface = 2 * (l * w) + 2 * (w * h) + 2 * (l * h);
    let extraPaper = Math.min(l * w, w * h, l * h);
  
    totalPaper = totalPaper + (surface + extraPaper);
  });

  return totalPaper;
};

const ribbonLength = function (dimensions) {
  let totalLength = 0;

  dimensions.forEach(function (dimension) {
    let [l, w, h] = dimension.split("x").map(Number);
    let sides = [l, w, h].sort(function (a, b) {
      return a - b;
    });
    let perimeter = 2 * (sides[0] + sides[1]);
    let bowLength = l * w * h;
  
    totalLength = totalLength + (perimeter + bowLength);
  });

  return totalLength;
};

let buffer = readFile("input.txt", "utf-8");
let data = buffer.trim().split("\n");

console.log(`Total ${wrappingPaper(data)} sqft. of paper they should order.`);
console.log(`Total ${ribbonLength(data)} sqft ribbon they should order.`);
