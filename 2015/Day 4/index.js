const crypto = require("crypto");

const findAdventCoins = (secretKey) => {
    let number = 0;
    let foundFiveZeroes = false;
    let foundSixZeroes = false;

    while(!(foundFiveZeroes && foundSixZeroes)){
        const candidate = secretKey + number;
        const hash = crypto.createHash("md5").update(candidate).digest("hex");

        if (!foundFiveZeroes && hash.startsWith("00000")) {
            console.log(`Number with five zeroes : ${number}`);
            foundFiveZeroes = true;
        }

        if (!foundSixZeroes && hash.startsWith("000000")) {
            console.log(`Number with six zeroes : ${number}`);
            foundSixZeroes = true;
        }

        number++;
    }
}

const secretKey = "yzbqklnj";
findAdventCoins(secretKey);