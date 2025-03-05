const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.log("Error reading file", error);
        return;
    }

    const mfcsam = {
        children: 3,
        cats: 7,
        samoyeds: 2,
        pomeranians: 3,
        akitas: 0,
        vizslas: 0,
        goldfish: 5,
        trees: 3,
        cars: 2,
        perfumes: 1
    };

    const lines = data.trim().split("\n").map(line => line.replace(/\r/g, "").trim());
    
    let exactMatchSue = null;
    let rangeMatchSue = null;
    
    for (const line of lines) {
        const match = line.match(/^Sue (\d+): (.+)$/);
        if (!match) continue;
    
        const sueNumber = parseInt(match[1], 10);
        const properties = Object.fromEntries(
            match[2].split(", ").map(prop => {
                const [key, value] = prop.split(": ");
                return [key, parseInt(value, 10)];
            })
        );
    
        let isExactMatch = true;
        for (const key in properties) {
            if (mfcsam[key] !== undefined && mfcsam[key] !== properties[key]) {
                isExactMatch = false;
                break;
            }
        }
        if (isExactMatch && exactMatchSue === null) {
            exactMatchSue = sueNumber;
        }
    
        let isRangeMatch = true;
        for (const key in properties) {
            if (mfcsam[key] === undefined) continue;
    
            if (key === "cats" || key === "trees") {
                if (properties[key] <= mfcsam[key]) {
                    isRangeMatch = false;
                    break;
                }
            } else if (key === "pomeranians" || key === "goldfish") {
                if (properties[key] >= mfcsam[key]) {
                    isRangeMatch = false;
                    break;
                }
            } else {
                if (properties[key] !== mfcsam[key]) {
                    isRangeMatch = false;
                    break;
                }
            }
        }
        if (isRangeMatch && rangeMatchSue === null) {
            rangeMatchSue = sueNumber;
        }
    }
    
    console.log("The real Aunt Sue (Exact Match):", exactMatchSue);
    console.log("The real Aunt Sue (Range-Based Match):", rangeMatchSue);
});