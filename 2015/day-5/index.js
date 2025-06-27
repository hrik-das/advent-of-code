const fs = require("node:fs");

const readFile = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const containsVowels = function (strings) {
  let vowels = new Set(["a", "e", "i", "o", "u"]);
  let result = [];

  strings.forEach(function (string) {
    let count = 0;
    for (let char of string) {
      if (vowels.has(char)) {
        count = count + 1;
      }
    }

    if (count >= 3) {
      result.push(string);
    }
  });

  return result;
};

const containsSimilarLetter = function (strings) {
  let result = [];

  strings.forEach(function (string) {
    let double = false;

    for (let i = 0; i < string.length - 1; i++) {
      if (string[i] === string[i + 1]) {
        double = true;
        break;
      }
    }

    if (double) {
      result.push(string);
    }
  });

  return result;
};

const containsFilthyWords = function (strings) {
  let result = [];
  let filthyWords = ["ab", "cd", "pq", "xy"];

  strings.forEach(function (string) {
    let clean = true;

    for (let word of filthyWords) {
      if (string.includes(word)) {
        clean = false;
        break;
      }
    }

    if (clean) {
      result.push(string);
    }
  });

  return result;
};

const containsRepeatedPair = function (strings) {
  let result = [];

  strings.forEach(function (string) {
    let hasPair = false;

    for (let i = 0; i < string.length - 1; i++) {
      let [firstChar, secondChar] = [string[i], string[i + 1]];

      for (let j = i + 2; j < string.length - 1; j++) {
        if (string[j] === firstChar && string[j + 1] === secondChar) {
          hasPair = true;
          break;
        }
      }

      if (hasPair) {
        break;
      }
    }

    if (hasPair) {
      result.push(string);
    }
  });

  return result;
};

const containsSplitRepeat = function (strings) {
  let result = [];

  strings.forEach(function (string) {
    let hasRepeat = false;

    for (let i = 0; i < string.length - 2; i++) {
      if (string[i] === string[i + 2]) {
        hasRepeat = true;
        break;
      }
    }

    if (hasRepeat) {
      result.push(string);
    }
  });

  return result;
};

let buffer = readFile("input.txt", "utf-8");
let data = buffer.trim().split("\n");

let containingVowels = containsVowels(data);
let containsLetterTwice = containsSimilarLetter(containingVowels);
let filteredFromFilthyWords = containsFilthyWords(containsLetterTwice);

let repeatedPairs = containsRepeatedPair(data);
let finalNiceStrings = containsSplitRepeat(repeatedPairs);

console.log(`${filteredFromFilthyWords.length} strings are nice.`);
console.log(`${finalNiceStrings.length} strings are nice under the new rules.`);
