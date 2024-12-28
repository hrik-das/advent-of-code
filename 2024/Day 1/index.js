const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.error("Error Reading File: ", error);
        return;
    }

    const left_list = [], right_list = [];

    data.trim().split("\n").forEach(line => {
        const [left, right] = line.split(/\s+/).map(Number);
        left_list.push(left);
        right_list.push(right);
    });

    left_list.sort((a, b) => a - b);
    right_list.sort((a, b) => a - b);

    let total_distance = 0;

    for (let i=0; i<left_list.length; i++) {
        total_distance = total_distance + Math.abs(left_list[i] - right_list[i]);
    }

    console.log("Total Distance: ", total_distance);

    let similarity_score = 0;

    left_list.forEach(num => {
        const occurrences = right_list.filter(n => n === num).length;
        similarity_score = similarity_score + num * occurrences;
    });

    console.log("Similarity Score: ", similarity_score);
});