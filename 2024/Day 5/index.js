const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.error("Error reading file: ", error);
        return;
    }

    const lines = data.trim().split(/\r?\n/);

    const rules = [], updates = [];
    let isReadingRules = true;

    lines.forEach(line => {
        if (line === "") {
            isReadingRules = false;
        } else if (isReadingRules) {
            const [before, after] = line.split("|").map(Number);
            rules.push([before, after]);
        } else {
            updates.push(line.split(",").map(Number));
        }
    });

    const isCorrectOrder = (update, rules) => {
        for (let i=0; i<update.length-1; i++) {
            for (let j=i+1; j<update.length; j++) {
                const pageA = update[i];
                const pageB = update[j];

                if (rules.some(([before, after]) => before === pageB && after === pageA)) {
                    return false;
                }
            }
        }

        return true;
    };

    const reorderUpdate = (update, rules) => {
        let isChanged;

        do {
            isChanged = false;

            for (let i=0; i<update.length-1; i++) {
                for (let j=i+1; j<update.length; j++) {
                    const pageA = update[i];
                    const pageB = update[j];

                    if (rules.some(([before, after]) => before === pageB && after === pageA)) {
                        [update[i], update[j]] = [update[j], update[i]];
                        isChanged = true;
                    }
                }
            }
        } while (isChanged);

        return update;
    };

    let sumOfMiddlePagesCorrectlyOrdered = 0;
    let sumOfMiddlePagesAfterReordering = 0;

    updates.forEach(update => {
        if (isCorrectOrder(update, rules)) {
            const middleIndex = Math.floor(update.length / 2);
            sumOfMiddlePagesCorrectlyOrdered += update[middleIndex];
        } else {
            const reorderedUpdate = reorderUpdate([...update], rules);
            const middleIndex = Math.floor(reorderedUpdate.length / 2);
            sumOfMiddlePagesAfterReordering += reorderedUpdate[middleIndex];
        }
    });

    console.log("Sum of middle pages of correctly-ordered updates:", sumOfMiddlePagesCorrectlyOrdered);
    console.log("Sum of middle pages after correctly ordering the incorrectly-ordered updates:", sumOfMiddlePagesAfterReordering);
});