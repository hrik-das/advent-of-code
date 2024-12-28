const fs = require("fs");

fs.readFile("input.txt", "utf-8", (error, data) => {
    if (error) {
        console.log("Error reading file: ", error);
        return;
    }

    const instructionRegex = /(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;
    
    let sum_valid = sum_enabled = 0;
    let match, is_enabled = true;
    
    while ((match = instructionRegex.exec(data)) !== null) {
        const [instruction, mul, x, y] = match;

        if (instruction === "do()") {
            is_enabled = true;
        } else if (instruction === "don't()") {
            is_enabled = false;
        } else if (mul) {
            const product = parseInt(x, 10) * parseInt(y, 10);
            sum_valid = sum_valid + product;
    
            if (is_enabled) {
                sum_enabled = sum_enabled + product;
            }
        }
    }

    // l=$("*").innerText,mul=(n,d)=>n*d,z=n=>0,p=(n,d)=>n*d,x=n=>(mul=z,0),q=n=>(mul=p,0),mul=p,eval("["+[...l.matchAll(/mul\(\d+,\d+\)/g)].join`+`+","+[...l.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)].map(n=>n[0].length>7?n[0]:"n"==n[0][2]?"x()":"q()").join`+`+"]")

    console.log("Sum of all valid `mul` results: ", sum_valid);
    console.log("Sum of all enabled `mul` results: ", sum_enabled);
});