const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.error("Error reading file", error);
        return;
    }

    const total_time = 2503;
    let lines = data.trim().split("\n");

    const reindeers = lines.map(line => {
        const match = line.match(/(\w+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\./);
        if (!match) {
            throw new Error(`Invalid input format: ${line}`);
        }

        return {
            name: match[1],
            speed: parseInt(match[2], 10),
            fly_time: parseInt(match[3], 10),
            rest_time: parseInt(match[4], 10),
            distance: 0, // Distance covered at the current second
            points: 0    // Points scored by this reindeer
        };
    });

    let max_distance_overall = 0;
    let max_distance_reindeer = "";

    for (let second = 1; second <= total_time; second++) {
        // Update distances for each reindeer
        reindeers.forEach(reindeer => {
            const cycle_time = reindeer.fly_time + reindeer.rest_time;
            const time_in_cycle = second % cycle_time;

            if (time_in_cycle > 0 && time_in_cycle <= reindeer.fly_time) {
                reindeer.distance += reindeer.speed;
            }
        });

        // Determine the maximum distance at this second
        const max_distance = Math.max(...reindeers.map(reindeer => reindeer.distance));

        // Award points to all reindeer at the maximum distance
        reindeers.forEach(reindeer => {
            if (reindeer.distance === max_distance) {
                reindeer.points++;
            }
        });

        // Track the reindeer with the overall maximum distance
        reindeers.forEach(reindeer => {
            if (reindeer.distance > max_distance_overall) {
                max_distance_overall = reindeer.distance;
                max_distance_reindeer = reindeer.name;
            }
        });
    }

    // Find the reindeer with the maximum points
const winner_by_points = reindeers.reduce((max, reindeer) => reindeer.points > max.points ? reindeer : max, reindeers[0]);

console.log(`The reindeer that traveled the farthest is ${max_distance_reindeer} with a distance of ${max_distance_overall} km.`);
console.log(`The winning reindeer by points is ${winner_by_points.name} with ${winner_by_points.points} points.`);
});