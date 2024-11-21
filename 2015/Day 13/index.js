import fs from "fs";

function parseInput(filePath) {
    const input = fs.readFileSync(filePath, "utf-8").trim().split("\n");
    const happinessMap = new Map();

    input.forEach(line => {
        const [_, person1, gainLose, value, person2] = line.match(/(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\./);
        const happinessValue = (gainLose === "gain" ? 1 : -1) * parseInt(value);
        const key = `${person1}-${person2}`;
        happinessMap.set(key, happinessValue);
    });

    return happinessMap;
}

// Helper function to generate all permutations of an array
function permute(arr) {
    if (arr.length <= 1) return [arr];
    const permutations = [];
    
    arr.forEach((item, index) => {
        const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];
        const subPermutations = permute(remaining);
        subPermutations.forEach(sub => permutations.push([item, ...sub]));
    });
    
    return permutations;
}

// Calculate total happiness for a given seating arrangement
function calculateHappiness(arrangement, happinessMap) {
    let totalHappiness = 0;
    const n = arrangement.length;

    arrangement.forEach((person, index) => {
        const leftNeighbor = arrangement[(index - 1 + n) % n];
        const rightNeighbor = arrangement[(index + 1) % n];

        totalHappiness += happinessMap.get(`${person}-${leftNeighbor}`) || 0;
        totalHappiness += happinessMap.get(`${person}-${rightNeighbor}`) || 0;
    });

    return totalHappiness;
}

// Main function to solve the problem
function findOptimalHappiness(filePath, includeSelf = false) {
    const happinessMap = parseInput(filePath);
    const guests = Array.from(new Set([...happinessMap.keys()].map(key => key.split("-")[0])));

    // Add yourself to the map and guests if includeSelf is true
    if (includeSelf) {
        const yourself = "You";

        guests.forEach(guest => {
            happinessMap.set(`${yourself}-${guest}`, 0);
            happinessMap.set(`${guest}-${yourself}`, 0);
        });
        
        guests.push(yourself);
    }

    const arrangements = permute(guests);
    let maxHappiness = -Infinity;

    arrangements.forEach(arrangement => {
        const happiness = calculateHappiness(arrangement, happinessMap);
        maxHappiness = Math.max(maxHappiness, happiness);
    });

    return maxHappiness;
}

const inputFilePath = "./input.txt";
console.log(`Optimal Happiness: ${findOptimalHappiness(inputFilePath)}`);
console.log(`Optimal Happiness (including yourself): ${findOptimalHappiness(inputFilePath, true)}`);