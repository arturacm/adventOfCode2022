import { TxtFileReader } from "../utils/txtFileReader";

type Pairs = `${number}-${number},${number}-${number}`;

const input = new TxtFileReader<Pairs>("./day4/input.txt");

let fullyContainedPair = 0;
let overlappedPair = 0;
const overlaps = new Set<number>();

input.read();

input.data.forEach((line) => {
  const { firstPair, secondPair } = splitLineIntoPairs(line);

  // Part 1
  if (
    (firstPair[0] <= secondPair[0] && firstPair[1] >= secondPair[1]) ||
    (firstPair[0] >= secondPair[0] && firstPair[1] <= secondPair[1])
  )
    fullyContainedPair++;

  // Part 2
  for (let i = firstPair[0]; i <= firstPair[1]; i++) {
    overlaps.add(i);
  }
  for (let i = secondPair[0]; i <= secondPair[1]; i++) {
    if (overlaps.has(i)) {
      overlappedPair++;
      break;
    }
  }
  overlaps.clear();
});

function splitLineIntoPairs(line: Pairs) {
  const [firstPairInt, secondPairInt] = line.split(",");
  const firstPair = firstPairInt.split("-").map((element) => parseInt(element));
  const secondPair = secondPairInt
    .split("-")
    .map((element) => parseInt(element));
  return { firstPair, secondPair };
}

console.log("Part 1:", fullyContainedPair);
console.log("Part 2:", overlappedPair);
