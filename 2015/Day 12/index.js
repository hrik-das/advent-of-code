const fs = require("fs");

// Function to recursively sum all numbers in a JSON-like structure
const sumNumbers = (object) => {
    if (typeof object === "number") return object; // Base case: if it"s a number, return it

    if (Array.isArray(object)) 
        // If it"s an array, recursively sum each element
        return object.reduce((acc, item) => acc + sumNumbers(item), 0);

    if (typeof object === "object" && object !== null) 
        // If it"s an object, recursively sum each value
        return Object.values(object).reduce((acc, value) => acc + sumNumbers(value), 0);

    // If it"s neither a number, array, nor object, return 0
    return 0;
};

// Function to recursively sum all numbers in a JSON-like structure, ignoring objects with any "red" value
const sumNumbersIgnoringRed = (object) => {
    if (typeof object === "number") return object; // Base case: if it"s a number, return it

    if (Array.isArray(object)) 
        // If it"s an array, recursively sum each element
        return object.reduce((acc, item) => acc + sumNumbersIgnoringRed(item), 0);

    if (typeof object === "object" && object !== null) {
        // If it"s an object, check for any "red" values
        if (Object.values(object).includes("red")) 
            return 0; // Ignore this object and all its children if it contains "red"
        
        // Otherwise, recursively sum each value
        return Object.values(object).reduce((acc, value) => acc + sumNumbersIgnoringRed(value), 0);
    }

    // If it"s neither a number, array, nor object, return 0
    return 0;
};

// Load the JSON document from a file
const jsonDocument = JSON.parse(fs.readFileSync("./input.json", "utf8"));

// Calculate the sum of all numbers
const totalSum = sumNumbers(jsonDocument);
console.log(`Sum of all numbers in the document: ${totalSum}`);

// Calculate the sum of all numbers, ignoring objects with "red"
const totalSumIgnoringRed = sumNumbersIgnoringRed(jsonDocument);
console.log(`Sum of all numbers in the document (ignoring "red" objects): ${totalSumIgnoringRed}`);