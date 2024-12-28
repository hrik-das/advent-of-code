const fs = require("fs");

function countOccurrences(grid, word) {
    let count = 0;

    const rows = grid.length;
    const cols = grid[0].length;
    
    function checkDirection(row, col, delta_row, delta_col) {
        for (let i=0; i<word.length; i++) {
            const new_row = row + i * delta_row;
            const new_col = col + i * delta_col;

            if (new_row < 0 || new_row >= rows || new_col < 0 || new_col >= cols || grid[new_row][new_col] !== word[i]) {
                return false;
            }
        }

        return true;
    }

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            if (checkDirection(i, j, 0, 1)) count++;
            if (checkDirection(i, j, 0, -1)) count++;
            if (checkDirection(i, j, 1, 0)) count++;
            if (checkDirection(i, j, -1, 0)) count++;
            if (checkDirection(i, j, 1, 1)) count++;
            if (checkDirection(i, j, -1, -1)) count++;
            if (checkDirection(i, j, 1, -1)) count++;
            if (checkDirection(i, j, -1, 1)) count++;
        }
    }

    return count;
}

const isXmas = (input, i, j) => input[i][j] === "A" && (
    (input[i - 1]?.[j - 1] === "M" && input[i + 1]?.[j + 1] === "S") || // top-left to bottom-right
    (input[i - 1]?.[j - 1] === "S" && input[i + 1]?.[j + 1] === "M")) && ( // top-left to bottom-right reversed
    (input[i + 1]?.[j - 1] === "M" && input[i - 1]?.[j + 1] === "S") || // bottom-left to top-right
    (input[i + 1]?.[j - 1] === "S" && input[i - 1]?.[j + 1] === "M")  // bottom-left to top-right reversed
);

const countXMAS = (input) => {
    let sum = 0;

    for (let i=0; i<input.length; i++) {
        for (let j=0; j<input[0].length; j++) {
        sum += isXmas(input, i, j) ? 1 : 0;
        }
    }

    return sum;
};

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.log("Error reading file: ", error);
        return;
    }

    const word = "XMAS";
    const grid = data.trim().split("\n").map(line => line.split(""));
    
    const xmas = countOccurrences(grid, word);
    console.log(`The word ${word} appears ${xmas} times.`);

    const x_mas = countXMAS(grid);
    console.log(`The word X-MAS apprears ${x_mas} times.`);
});