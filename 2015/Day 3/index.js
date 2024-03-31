const fs = require("fs");
fs.readFile("input.txt", "utf8", (error, data) => {
    if(error){
        console.error("Error Reading File : ",error);
        return;
    }
    const directions = data.trim().split("");
    let santaPosition = {
        x: 0,
        y: 0
    };
    let roboSantaPosition = { 
        x: 0,
        y: 0
    };
    let visitedHouses = new Map();
    visitedHouses.set("0, 0", 2);
    let totalHousesVisited = 1;
    let isSanta = true;
    for(let direction of directions){
        let currentPosition = isSanta ? santaPosition : roboSantaPosition;
        switch(direction){
            case "^" : currentPosition.y++;
                       break;
            case "v" : currentPosition.y--;
                       break;
            case ">" : currentPosition.x++;
                       break;
            case "<" : currentPosition.x--;
                       break;
             default : break;
        }
        let key = currentPosition.x + "," + currentPosition.y;
        if(!visitedHouses.has(key)){
            visitedHouses.set(key, 1);
            totalHousesVisited++;
        }else if(visitedHouses.get(key) === 1){
            visitedHouses.set(key, 2);
        }
        isSanta = !isSanta;
    }
    console.log("Total number of houses visited at least once: "+totalHousesVisited);
});