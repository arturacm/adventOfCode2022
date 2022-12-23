import { TxtFileReader } from "../utils/txtFileReader";
const input = new TxtFileReader("./day3/input.txt");
let part1TotalPriority = 0;
let part2TotalPriority = 0;
input.read();

input.data.forEach((bag, index, allElfs) => {
  // Part 1
  const mid = Math.ceil(bag.length / 2);
  const firstPocket = bag.slice(0, mid);
  const secondPocket = bag.slice(mid);
  const repeatedItems = new Array<string>();

  firstPocket.split("").forEach((item) => {
    if (secondPocket.includes(item) && !repeatedItems.includes(item)) {
      repeatedItems.push(item);
      part1TotalPriority += getPriority(item);
    }
  });

  // Part 2
  if (index % 3 === 0) {
    for (let i = 0; i < bag.length; i++) {
      if (
        allElfs[index + 1].includes(bag[i]) &&
        allElfs[index + 2].includes(bag[i])
      ) {
        part2TotalPriority += getPriority(bag[i]);
        break;
      }
    }
  }
});

function getPriority(item: string): number {
  if (item === item.toLowerCase()) {
    return item.charCodeAt(0) - 96; // starts in 1
  }
  return item.charCodeAt(0) - 38; // starts in 27
}

console.log("Part 1:", part1TotalPriority);
console.log("Part 2:", part2TotalPriority);
