const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.error("Error Reading File: ", error);
        return;
    }

    const isSafe = (levels) => {
        for (let i=1; i<levels.length; i++) {
            const diff = levels[i] - levels[i - 1];
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
        }

        const increasing = levels.every((_, i) => i === 0 || levels[i] >= levels[i - 1]);
        const decreasing = levels.every((_, i) => i === 0 || levels[i] <= levels[i - 1]);

        return increasing || decreasing;
    };

    const canBeMadeSafe = (levels) => {
        for (let i = 0; i < levels.length; i++) {
            const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
            if (isSafe(modifiedLevels)) return true;
        }
        return false;
    };

    let safe_report_count = safe_dampener_report_count = 0;
    const lines = data.split("\n").map(line => line.trim()).filter(line => line !== "");
    
    lines.forEach(line => {
        const levels = line.split(" ").map(Number);

        if (isSafe(levels)) {
            safe_report_count++;
        }
        if (isSafe(levels) || canBeMadeSafe(levels)) {
            safe_dampener_report_count++;
        }
    });

    console.log(`Total Safe Reports: ${safe_report_count}`);
    console.log(`Total Safe Reports with Problem Dampener: ${safe_dampener_report_count}`);
});