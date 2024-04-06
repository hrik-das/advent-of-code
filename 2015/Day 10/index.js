const input = "1113222113";
const regex = /(\d)\1*/g;
const lookAndSay = data => data.match(regex).reduce((acc, char) => acc + `${char.length}${char[0]}`, "");
let result = input;
for(let i=0; i<40; i++){    // Part Two - Replace 40 with 50
    result = lookAndSay(result);
}
console.log(result.length);