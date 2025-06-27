const crypto = require("crypto");

const hashFunction = function (input) {
  const md5Hash = crypto.createHash("md5");
  md5Hash.update(input, "utf8");
  const hexDigest = md5Hash.digest("hex");
  return hexDigest;
};

const startsWithFiveZeros = function (secret) {
  let i = 1;

  while (true) {
    const hash = hashFunction(secret + i);
    if (hash.startsWith("00000")) {
      return i;
    }

    i++;
  }
};

const startsWithSixZeros = function (secret) {
  let i = 1;

  while (true) {
    const hash = hashFunction(secret + i);
    if (hash.startsWith("000000")) {
      return i;
    }

    i++;
  }
};

const secret = "yzbqklnj";

console.log(startsWithFiveZeros(secret));
console.log(startsWithSixZeros(secret));
