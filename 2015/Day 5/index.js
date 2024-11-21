const fs = require("fs");    // File system module for reading the input file
// Function to check if a string has at least 3 vowels (aeiou)
function hasThreeVowels(str) {
    const vowels = "aeiou";
    let vowelCount = 0;

    for (let char of str) {
        if (vowels.includes(char)) {
            vowelCount++;
        }
    }

    return vowelCount >= 3;
}

// Function to check if a string has a double letter
function hasDoubleLetter(str) {
    for (let i=0; i<str.length-1; i++) {
        if (str[i] === str[i+1]) {
            return true;
        }
    }

    return false;
}

// Function to check if a string contains disallowed substrings (ab, cd, pq, xy)
function hasDisallowedSubstrings(str) {
    const disallowed = ["ab", "cd", "pq", "xy"];
    for (const sub of disallowed) {
        if (str.includes(sub)) {
            return true;
        }
    }

    return false;
}

// Function to check if a string is nice according to Part 1 rules
function isNicePart1(str) {
    return hasThreeVowels(str) && hasDoubleLetter(str) && !hasDisallowedSubstrings(str);
}

// Function to check if a string has a non-overlapping pair that appears twice
function hasNonOverlappingPair(str) {
    for (let i=0; i<str.length-2; i++) {
        const pair = str.slice(i, i + 2);
        
        if (str.indexOf(pair, i+2) !== -1) {
            return true;
        }
    }

    return false;
}

// Function to check if a string has a letter repeated with one letter between
function hasRepeatingLetter(str) {
    for (let i=0; i<str.length-2; i++) {
        if(str[i] === str[i+2]) {
            return true;
        }
    }

    return false;
}

// Function to check if a string is nice according to Part 2 rules
function isNicePart2(str) {
    return hasNonOverlappingPair(str) && hasRepeatingLetter(str);
}

// Read the input file
fs.readFile("input.txt", "utf8", (error, data) => {
    if (error) {
        console.error("Error reading file : ", error);
        return;
    }
    // Split the data into lines (each line is a string)
    const lines = data.split("\n");
    // Count nice strings for Part 1 and Part 2
    let niceCountPart1 = 0;
    let niceCountPart2 = 0;

    for (const line of lines) {
        if (isNicePart1(line)) {
            niceCountPart1++;
        }

        if (isNicePart2(line)) {
            niceCountPart2++;
        }
    }
    
    console.log("Number of nice strings (Part 1) : ", niceCountPart1);
    console.log("Number of nice strings (Part 2) : ", niceCountPart2);
});