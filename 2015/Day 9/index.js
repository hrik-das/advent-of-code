const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n");
const DIRECTION_REGEX = /(\w+) to (\w+) = (\d+)/;

const buildDistanceMap = data => {
    const map = new Map();
    data.forEach(direction => {
        const parsed = direction.match(DIRECTION_REGEX);
        map.set(`${parsed[1]} -> ${parsed[2]}`, +parsed[3]);
        map.set(`${parsed[2]} -> ${parsed[1]}`, +parsed[3]);
    });
    return map;
};

const buildPlacesSet = data => {
    const places = new Set();
    data.forEach(direction => {
        const parsed = direction.match(DIRECTION_REGEX);
        places.add(parsed[1]).add(parsed[2]);
    });
    return places;
};

const permute = data => {
    const array = Array.from(data);
    const permute = (res, item, key, arr) => {
        return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1)).reduce(permute, []).map(perm => [item].concat(perm)) || item);
    };
    return array.reduce(permute, []);
};

const distances = buildDistanceMap(input);
const places = buildPlacesSet(input);
const allPossibleRoutes = permute(places);
const allPossibleDistances = allPossibleRoutes.reduce((acc, route) => {
    let total = 0;
    for(let i=0; i<route.length; i++){
        if(route[i + 1] === undefined) break;
        total += distances.get(`${route[i]} -> ${route[i + 1]}`);
    }
    return acc.concat([total]);
}, []);

const result = Math.min.apply(Math, allPossibleDistances);
console.log(result);

// Part Two
// const result = Math.max.apply(Math, allPossibleDistances);
// console.log(result);