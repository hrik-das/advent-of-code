const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.log("Error reading file: ", error);
        return;
    }

    const equations = data.trim().split("\n").map(line => {
        const [target, numbers] = line.split(": ");
        
        return {
            target: Number(target),
            numbers: numbers.split(" ").map(Number)
        };
    });

    const canAchieveTarget = (target, numbers, includeConcat) => {
        const operators = includeConcat ? ["+", "*", "||"] : ["+", "*"];

        const evaluate = (currentValue, index) => {
            if (index === numbers.length) {
                return currentValue === target;
            }

            for (let operator of operators) {
                let nextValue;
                if (operator === "+") {
                    nextValue = currentValue + numbers[index];
                } else if (operator === "*") {
                    nextValue = currentValue * numbers[index];
                } else if (operator === "||") {
                    nextValue = Number(String(currentValue) + String(numbers[index]));
                }
                if (evaluate(nextValue, index + 1)) {
                    return true;
                }
            }

            return false;
        };

        return evaluate(numbers[0], 1);
    };

    let totalCalibrationResultNoConcat = 0;
    let totalCalibrationResultWithConcat = 0;

    for (let equation of equations) {
        if (canAchieveTarget(equation.target, equation.numbers, false)) {
            totalCalibrationResultNoConcat += equation.target;
        }
        if (canAchieveTarget(equation.target, equation.numbers, true)) {
            totalCalibrationResultWithConcat += equation.target;
        }
    }

    console.log("Total Calibration Result (Without Concatenation):", totalCalibrationResultNoConcat);
    console.log("Total Calibration Result (With Concatenation):", totalCalibrationResultWithConcat);
});