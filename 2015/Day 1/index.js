const fs = require("fs");
fs.readFile("input.txt", "utf8", (error, data) => {
    if(error){
        console.error("Error Reading File : ", error);
        return;
    }
    const ary = data.split("");
    let floor = 0;
    let shown = false;

    ary.forEach((element, index) => {
        (element == "(") ? floor++ : floor--;
        if(floor === -1 && !shown){
            console.log(`The First "Floor == -1" Position is : ${index + 1}`);
            shown = true;
        }
    });
    console.log("The Total Number of Floors : "+floor);
});