const fs = require("node:fs");

const readFile = function (file, encoding) {
  return fs.readFileSync(file, encoding);
};

const calculateDistance = function (lines) {
  let maxDistance = 0;

  for (const line of lines) {
    const parts = line.split(" ");
    const speed = parseInt(parts[3], 10);
    const flyTime = parseInt(parts[6], 10);
    const restTime = parseInt(parts[parts.length - 2], 10);

    const cycle = flyTime + restTime;
    const full = Math.floor(2503 / cycle);
    const leftover = 2503 % cycle;
    const distance =
      full * speed * flyTime + speed * Math.min(leftover, flyTime);

    if (distance > maxDistance) {
      maxDistance = distance;
    }
  }

  return maxDistance;
};

const calculatePoints = function (lines, totalTime = 2503) {
  const reindeers = [];

  for (const line of lines) {
    const parts = line.split(" ");
    const name = parts[0];
    const speed = parseInt(parts[3], 10);
    const flyTime = parseInt(parts[6], 10);
    const restTime = parseInt(parts[parts.length - 2], 10);

    reindeers.push({
      name,
      speed,
      flyTime,
      restTime,
      distance: 0,
      stateTime: 0,
      isFlying: true,
      points: 0,
    });
  }

  for (let t = 1; t <= totalTime; t++) {
    for (const r of reindeers) {
      if (r.isFlying) {
        r.distance += r.speed;
        r.stateTime++;

        if (r.stateTime === r.flyTime) {
          r.isFlying = false;
          r.stateTime = 0;
        }
      } else {
        r.stateTime++;

        if (r.stateTime === r.restTime) {
          r.isFlying = true;
          r.stateTime = 0;
        }
      }
    }

    const leadDistance = Math.max(
      ...reindeers.map(function (r) {
        return r.distance;
      })
    );

    for (const r of reindeers) {
      if (r.distance === leadDistance) {
        r.points++;
      }
    }
  }

  return Math.max(
    ...reindeers.map(function (r) {
      return r.points;
    })
  );
};

const buffer = readFile("input.txt", "utf-8");
const data = buffer.split("\n");

console.log(`The winning reindeer traveled ${calculateDistance(data)} km.`);
console.log(`The winning reindeer has ${calculatePoints(data)} points.`);