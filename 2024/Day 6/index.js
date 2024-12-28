const fs = require("fs");
const grid = fs.readFileSync("input.txt", "utf8").trim().split("\n").map((line) => line.split(""));;

const directions = [
    [-1, 0],    // up
    [0, 1],    // right
    [1, 0],    // down
    [0, -1],    // left
];

function countViewedCells(grid) {
    const viewed = grid.map((row) => Array(row.length).fill(false));

    let [x, y] = (() => {
        for (let i = 0; i < grid.length; i++) {
            const col = grid[i].indexOf("^");
            
            if (col !== -1)
                return [i, col];
        }
    })();

    let currDir = 0;
  
    while (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
        if (grid[x][y] === "#") {
            [x, y] = [x - directions[currDir][0], y - directions[currDir][1]];
            currDir = (currDir + 1) % 4;
        } else {
            viewed[x][y] = true;
            [x, y] = [x + directions[currDir][0], y + directions[currDir][1]];
        }
    }

    return viewed.flat().filter(Boolean).length;
}

function countLoopedPaths(grid) {
    const first = (() => {
        for (let i = 0; i < grid.length; i++) {
            const col = grid[i].indexOf("^");
      
            if (col !== -1)
                return { x: i, y: col };
        }
    })();

    let loopCount = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== "#") {
                grid[i][j] = "#";

                if (checkIfLoop(grid, first.x, first.y)) {
                    loopCount++;
                }
    
                grid[i][j] = ".";
            }
        }
    }

    return loopCount;
}

function checkIfLoop(grid, x, y) {
    let currDir = stepCount = 0;

    while (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length) {
        if (grid[x][y] === "#") {
            [x, y] = [x - directions[currDir][0], y - directions[currDir][1]];
            currDir = (currDir + 1) % 4;
        } else {
            [x, y] = [x + directions[currDir][0], y + directions[currDir][1]];
        }

        stepCount++;
    
        if (stepCount > grid.length * grid[0].length) {
            return true;    // Loop detected
        }
    }
  
    return false;
}

console.log("The number of distinct positions the guard visits: ", countViewedCells(grid));
console.log("The number of possible positions to place an obstruction: ", countLoopedPaths(grid));