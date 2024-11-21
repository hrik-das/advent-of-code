const fs = require("fs");

function calculateStringLengthDifference(input) {
    let codeLength = 0;
    let memoryLength = 0;
    input = input.replace(/\s+/g, "");
    const regex = /"([^"\\]|\\.|\\x[0-9a-fA-F]{2})*"/g;

    input.match(regex).forEach(match => {
        codeLength += match.length;
        const unescaped = match.slice(1, -1).replace(/\\x[0-9a-fA-F]{2}|\\["\\]/g, "X");
        memoryLength += unescaped.length;
    });
    
    return codeLength - memoryLength;
}

function encodeString(input) {
    const encoded = input.replace(/\\/g, "\\\\").replace(/\"/g, '\\"');
    return `"${encoded}"`;
}

fs.readFile("input.txt", "utf8", (error, data) => {
    if (error) {
        console.error("Error reading input file : ", error);
        return;
    }

    const one = calculateStringLengthDifference(data);
    console.log("Part One: Total Difference:", one);
    let two = 0;

    data.match(/"([^"\\]|\\.|\\x[0-9a-fA-F]{2})*"/g).forEach(match => {
        two += encodeString(match).length - match.length;
    });
    
    console.log("Part Two: Total Difference:", two);
});