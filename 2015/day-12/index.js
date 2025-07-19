const fs = require("node:fs");

const readJsonFile = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const sumOfJsonNumbers = function (data) {
  let numbers = [];

  JSON.parse(data, function (key, value) {
    if (typeof value === "number") {
      numbers.push(value);
    }

    return value;
  });

  return numbers.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
};

const sumOfJsonNumbersIgnoreRed = function (data) {
  const json = JSON.parse(data);

  const collect = function (value) {
    if (typeof value === "number") {
      return value;
    }

    if (Array.isArray(value)) {
      let sum = 0;

      for (let item of value) {
        sum = sum + collect(item);
      }
      
      return sum;
    }

    if (typeof value === "object" && value !== null) {
      if (Object.values(value).includes("red")) {
        return 0;
      }

      let sum = 0;
      
      for (let key in value) {
        sum = sum + collect(value[key]);
      }

      return sum;
    }

    return 0;
  }

  return collect(json);
};

const json = readJsonFile("input.json", "utf-8");
console.log(`The sum of all numbers in the document: ${sumOfJsonNumbers(json)}`);
console.log(`The sum of all numbers in the document ignoring red property: ${sumOfJsonNumbersIgnoreRed(json)}`);
