const fs = require("fs");
const isNiceString = (str) => {
    // const vowels = ["a", "e", "i", "o", "u"];
    // const forbiddenSubstrings = ["ab", "cd", "pq", "xy"];
    let hasPair = false;
    let hasRepeatWithGap = false;

    // let vowelCount = str.split("").filter(char => vowels.includes(char)).length;
    // if(vowelCount < 3){
    //     return false;
    // }
    for(let i=0; i<str.length-1 && !hasPair; i++){
        const pair = str.slice(i, i+2);
        if(str.lastIndexOf(pair) > i+1){
            hasPair = true;
        }
    }

    // let hasDoubleLetter = false;
    // for(let i=0; i<str.length-1; i++){
    //     if(str[i] === str[i + 1]) {
    //         hasDoubleLetter = true;
    //         break;
    //     }
    // }
    // if(!hasDoubleLetter){
    //     return false;
    // }
    for(let i=0; i<str.length-2 && !hasRepeatWithGap; i++){
        if(str[i] === str[i+2]){
            hasRepeatWithGap = true;
        }
    }
    
    // if(forbiddenSubstrings.some(substring => str.includes(substring))){
    //     return false;
    // }
    // return true;
    return hasPair && hasRepeatWithGap;
}

fs.readFile("input.txt", "utf8", (error, data) => {
    if(error){
        console.error("Error Reading File Data : ",error);
        return;
    }
    const strings = data.trim().split("\n");
    let niceCount = 0;
    strings.forEach(str => {
        if(isNiceString(str)){
            niceCount++;
        }
    });
    console.log("Number of nice strings : ",niceCount);
});