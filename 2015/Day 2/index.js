const fs = require("fs");

fs.readFile("input.txt", "utf8", (error, data) => {
    if (error) {
        console.error("Error reading the file : ", error);
        return;
    }

    const lines = data.trim().split("\n");
    let totalWrappingPaperArea = totalRibbonLength = 0;

    lines.forEach(line => {
        const [l, w, h] = line.split("x").map(Number);
        const sideX = l * w;
        const sideY = w * h;
        const sideZ = h * l;
        const minSide = Math.min(Math.min(sideX, sideY), sideZ);
        const presentWrappingPaperArea = 2 * sideX + 2 * sideY + 2 * sideZ + minSide;

        totalWrappingPaperArea = totalWrappingPaperArea + presentWrappingPaperArea;
        const sides = [l, w, h].sort((a, b) => a - b);
        const presentRibbonLength = 2 * sides[0] + 2 * sides[1] + (l * w * h);
        totalRibbonLength = totalRibbonLength + presentRibbonLength;
    });

    console.log("Total square feet of wrapping paper required : ", totalWrappingPaperArea);
    console.log("Total feet of ribbon required : ", totalRibbonLength);
});