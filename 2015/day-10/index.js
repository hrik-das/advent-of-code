const nextLookAndSay = function (data) {
  let number = data.split("").map(Number);
  let result = "";
  let count = 1;

  for (let i = 0; i < number.length; i++) {
    if (number[i] === number[i + 1]) {
      count++;
    } else {
      result += count.toString() + number[i];
      count = 1;
    }
  }

  return result;
};

const countProcess = function (data, times) {
  let input = data.toString();
  for (let i = 0; i < times; i++) {
    input = nextLookAndSay(input);
  }
  return input.length;
};

const input = 1113222113;
console.log("Length after 40 times:", countProcess(input, 40));
console.log("Length after 50 times:", countProcess(input, 50));
