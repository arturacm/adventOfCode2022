import { TxtFileReader } from "../utils/txtFileReader";

const fullInput = new TxtFileReader("./day5/input.txt");

fullInput.read(`\n\n`);

const [cratesInputRaw, input] = fullInput.data;

type Crate = `[${string}]`;
const cratesInput = cratesInputRaw
  .split(`\n`)
  .map((line) => line.match(/.{1,4}/g) || []) as (Crate | "   ")[][];

cratesInput.pop();

const part1Crates = new Array(9).fill(null).map(() => new Array<string>());
const part2Crates = new Array(9).fill(null).map(() => new Array<string>());

cratesInput.forEach((line) =>
  line.forEach((crate, i) => {
    if (crate[1] !== " ") {
      part1Crates[i].unshift(crate[1]);
      part2Crates[i].unshift(crate[1]);
    }
  })
);

input.split(`\n`).forEach((command) => {
  const [_, move, __, from, ___, to] = command.split(" ");
  let moves = parseInt(move);

  const fromIndex = parseInt(from) - 1;
  const toIndex = parseInt(to) - 1;

  // Part 2
  part2Crates[toIndex].push(
    ...part2Crates[fromIndex].splice(part2Crates[fromIndex].length - moves)
  );

  // Part 1
  while (moves > 0) {
    const leaving = part1Crates[fromIndex].pop();
    if (leaving) part1Crates[toIndex].push(leaving);
    moves--;
  }
});

console.log("Part 1", part1Crates.map((line) => line.pop()).join(""));
console.log("Part 2", part2Crates.map((line) => line.pop()).join(""));
