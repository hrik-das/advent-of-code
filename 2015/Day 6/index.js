const fs = require("fs");

function processInstructions(inputFile, part){
    // Initialize lights grid
    const lights = Array.from({length: 1000}, () => Array(1000).fill(0));
    // Read instructions from input file
    const instructions = fs.readFileSync(inputFile, "utf8").trim().split("\n");
    // Process each instruction
    for(const instruction of instructions){
        const [, action, startX, startY, endX, endY] = instruction.match(/(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/);
        // Convert coordinates to numbers
        const startXNum = parseInt(startX, 10);
        const startYNum = parseInt(startY, 10);
        const endXNum = parseInt(endX, 10);
        const endYNum = parseInt(endY, 10);
        // Apply the action to the specified range of lights
        for(let i=startXNum; i<=endXNum; i++){
            for(let j=startYNum; j<=endYNum; j++){
                if(action === "turn on"){
                    if(part === 1){
                        lights[i][j] = 1;
                    }else{
                        lights[i][j] += 1;
                    }
                }else if(action === "turn off"){
                    if(part === 1){
                        lights[i][j] = 0;
                    }else{
                        lights[i][j] = Math.max(0, lights[i][j] - 1);
                    }
                }else if(action === "toggle"){
                    if(part === 1){
                        lights[i][j] = lights[i][j] === 0 ? 1 : 0;
                    }else{
                        lights[i][j] += 2;
                    }
                }
            }
        }
    }

    // Calculate the total lit lights or total brightness
    let total = 0;
    for(let i=0; i<1000; i++){
        for(let j=0; j<1000; j++){
            total += lights[i][j];
        }
    }
    return total;
}

// Part One
console.log("Total Lights Lit : ", processInstructions("input.txt", 1));
// Part Two
console.log("Total Brightness : ", processInstructions("input.txt", 2));