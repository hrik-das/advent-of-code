function incrementPassword(password) {
    let arr = password.split("");

    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === "z") {
            arr[i] = "a";
        } else {
            arr[i] = String.fromCharCode(arr[i].charCodeAt(0) + 1);
            break;
        }
    }
    
    return arr.join("");
}

function hasStraight(password) {
    for (let i = 0; i < password.length - 2; i++) {
        if (password.charCodeAt(i + 1) === password.charCodeAt(i) + 1 &&
            password.charCodeAt(i + 2) === password.charCodeAt(i) + 2) {
            return true;
        }
    }

    return false;
}

function doesNotContainInvalidChars(password) {
    return !/[iol]/.test(password);
}

function hasTwoNonOverlappingPairs(password) {
    let pairs = password.match(/([a-z])\1/g);
    return pairs && pairs.length >= 2;
}

function isValidPassword(password) {
    return (
        hasStraight(password) &&
        doesNotContainInvalidChars(password) &&
        hasTwoNonOverlappingPairs(password)
    );
}

function getNextValidPassword(password) {
    do {
        password = incrementPassword(password);
    } while (!isValidPassword(password));
    
    return password;
}

// First valid password after initial one
const currentPassword = "hxbxwxba";
const firstValidPassword = getNextValidPassword(currentPassword);
console.log("First valid password: ", firstValidPassword);

// Next valid password after the first valid one
const nextValidPassword = getNextValidPassword(firstValidPassword);
console.log("Next valid password: ", nextValidPassword);