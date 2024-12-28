const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.log("Error reading file: ", error);
        return;
    }

    const ingredients = {};

    data.split("\n").map(line => line.trim()).forEach(line => {
        if (!line) return;    // Skip empty lines
        
        const [name, properties] = line.split(": ");
        const props = properties.split(", ").reduce((acc, prop) => {
            const [key, value] = prop.split(" ");
            acc[key] = parseInt(value, 10);
            return acc;
        }, {});
        ingredients[name] = props;
    });

    const ingredientNames = Object.keys(ingredients);
    const totalTeaspoons = 100;

    let highestScoringCookie = 0;
    let highestScoring500CalorieCookie = 0;

    const calculateScore = (distribution) => {
        const totals = {
            capacity: 0,
            durability: 0,
            flavor: 0,
            texture: 0,
            calories: 0
        };

        ingredientNames.forEach((name, index) => {
            const teaspoons = distribution[index];
            const props = ingredients[name];

            totals.capacity = totals.capacity + props.capacity * teaspoons;
            totals.durability = totals.durability + props.durability * teaspoons;
            totals.flavor = totals.flavor + props.flavor * teaspoons;
            totals.texture = totals.texture + props.texture * teaspoons;
            totals.calories = totals.calories + props.calories * teaspoons;
        });

        const score = Math.max(totals.capacity, 0) * Math.max(totals.durability, 0) * Math.max(totals.flavor, 0) * Math.max(totals.texture, 0);

        return {
            score,
            calories: totals.calories
        };
    };

    const generateDistributions = (remaining, distribution = []) => {
        if (distribution.length === ingredientNames.length - 1) {
            distribution.push(remaining);
            
            const { score, calories } = calculateScore(distribution);
            highestScoringCookie = Math.max(highestScoringCookie, score);

            if (calories === 500) {
                highestScoring500CalorieCookie = Math.max(highestScoring500CalorieCookie, score);
            }

            distribution.pop();
            return;
        }

        for (let i=0; i<=remaining; i++) {
            distribution.push(i);
            generateDistributions(remaining - i, distribution);
            distribution.pop();
        }
    };

    generateDistributions(totalTeaspoons);

    console.log("Highest scoring cookie: ", highestScoringCookie);
    console.log("Highest scoring cookie with 500 calories: ", highestScoring500CalorieCookie);
});