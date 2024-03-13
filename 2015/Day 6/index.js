const fs = require("fs");

function processInstructions(instructions){
    const grid = Array.from({ length: 1000 }, () => Array(1000).fill(false));

    function toggle(x1, y1, x2, y2){
        for(let x=x1; x<=x2; x++){
            for(let y=y1; y<=y2; y++){
                grid[x][y] = !grid[x][y];
            }
        }
    }

    function turnOn(x1, y1, x2, y2){
        for(let x=x1; x<=x2; x++){
            for(let y=y1; y<=y2; y++){
                grid[x][y] = true;
            }
        }
    }

    function turnOff(x1, y1, x2, y2){
        for(let x=x1; x<=x2; x++){
            for(let y=y1; y<=y2; y++){
                grid[x][y] = false;
            }
        }
    }

    instructions.forEach(instruction => {
        const parts = instruction.split(" ");
        if(parts[0] === "toggle"){
            const [x1, y1, x2, y2] = parts[1].split(",").map(Number);
            toggle(x1, y1, x2, y2);
        }else if(parts[0] === "turn"){
            const [x1, y1] = parts[2].split(",").map(Number);
            const [x2, y2] = parts[4].split(",").map(Number);
            if(parts[1] === "on"){
                turnOn(x1, y1, x2, y2);
            }else if(parts[1] === "off"){
                turnOff(x1, y1, x2, y2);
            }
        }
    });
    return grid.reduce((total, row) => total + row.filter(Boolean).length, 0);
}

fs.readFile("input.txt", "utf8", (error, data) => {
    if(error){
        console.error("Error Reading File Data : ",error);
        return;
    }

    const instructions = data.trim().split("\n");
    console.log(processInstructions(instructions));
});