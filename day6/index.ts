import { TxtFileReader } from "../utils/txtFileReader";

const fullInput = new TxtFileReader("./day6/input.txt");

fullInput.read();

const input = fullInput.data[0];
const marker = new Array<string>();

let part1 = input.length;
for (let i = 0; i < input.length; i++) {
  while (marker.includes(input[i])) {
    marker.shift();
  }
  marker.push(input[i]);

  // Part 1
  if (marker.length === 4 && part1 > i) {
    part1 = i
    console.log("Part 1:", i + 1);
  }

  // Part2
  if (marker.length === 14) {
    console.log("Part 2:",i + 1);
    break;
  }
}