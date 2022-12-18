import { TxtFileReader } from "../utils/txtFileReader";
type UserInputOrResult = "X" | "Y" | "Z";

type EnemyInput = "A" | "B" | "C";

type Match = `${EnemyInput} ${UserInputOrResult}`;
const Input = new TxtFileReader<Match>("./day2/input.txt");
Input.read();

const pointsForInput = {
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3, // Scissors
} satisfies Record<UserInputOrResult, number>;

const matchByInput = {
  A: {
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    X: 6,
    Y: 0,
    Z: 3,
  },
} satisfies Record<EnemyInput, Record<UserInputOrResult, number>>;

const matchByResult = {
  A: {
    // Rock
    X: 0 + 3, // lose Picks: Scissors
    Y: 3 + 1, // draw Picks: Rock
    Z: 6 + 2, // wins Picks:
  },
  B: {
    // Paper
    X: 0 + 1, // lose Picks: Rock
    Y: 3 + 2, // draw Picks:
    Z: 6 + 3, // wins Picks:
  },
  C: {
    // Scissors
    X: 0 + 2, // lose Picks: Paper
    Y: 3 + 3, // draw Picks:
    Z: 6 + 1, // wins Picks:
  },
} satisfies Record<EnemyInput, Record<UserInputOrResult, number>>;

let part1Score = 0;
let part2Score = 0;

Input.data.forEach((matchInputs) => {
  const [enemyInput, userInputOrResult] = matchInputs.split(" ") as [
    EnemyInput,
    UserInputOrResult
  ];

  // Part1: As user input
  part1Score +=
    matchByInput[enemyInput][userInputOrResult] + pointsForInput[userInputOrResult];

  // Part 2: As match result
  part2Score += matchByResult[enemyInput][userInputOrResult];
});

console.log("Part 1 answer:", part1Score);
console.log("Part 2 answer:", part2Score);
