const incrementPassword = function (password) {
  let characters = password.split("");
  let index = characters.length - 1;

  while (index >= 0) {
    if (characters[index] === "z") {
      characters[index] = "a";
      index--;
    } else {
      characters[index] = String.fromCharCode(
        characters[index].charCodeAt(0) + 1
      );
      break;
    }
  }

  return characters.join("");
};

const passwordValidity = function (password) {
  if (/[iol]/.test(password)) {
    return false;
  }

  let hasStraight = false;

  for (let i = 0; i < password.length - 2; i++) {
    let current = password.charCodeAt(i);

    if (password.charCodeAt(i + 1) === current + 1 && password.charCodeAt(i + 2) === current + 2) {
      hasStraight = true;
      break;
    }
  }

  if (!hasStraight) {
    return false;
  }

  let pairMatches = password.match(/([a-z])\1/g);

  if (!pairMatches || new Set(pairMatches).size < 2) {
    return false;
  }

  return true;
};

function nextValidPassword(password) {
  do {
    password = incrementPassword(password);
  } while (!passwordValidity(password));

  return password;
}

const password = "hxbxwxba";
const currentPassword = nextValidPassword(password);
const nextPassowrd = nextValidPassword(currentPassword);

console.log(`Santa's current password is: ${currentPassword}`);
console.log(`The next passowrd is: ${nextPassowrd}`);
