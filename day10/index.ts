import { TxtFileReader } from "../utils/txtFileReader";

type Command = "noop" | `addx ${number}`;

const Input = new TxtFileReader<Command>("./day10/input.txt");
Input.read();

let X = 1;
let cycles = 0;
let totalSum = 0;
let drawingLine = "";

let sprite = [0, 1, 2];

const selectedCycles = [20, 60, 100, 140, 180, 220];

function checkCycles() {
  // Part 1
  if (selectedCycles.includes(cycles)) {
    totalSum += cycles * X;
  }

  // Part 2
  const crt = (cycles - 1) % 40;
  if (sprite.includes(crt)) {
    drawingLine += "#";
  } else {
    drawingLine += "."; // change to " " for better visibility;
  }

  if (crt === 39) {
    console.log(drawingLine);
    drawingLine = "";
  }
}

Input.data.forEach((command) => {
  cycles++;
  checkCycles();
  if (command !== "noop") {
    cycles++;
    checkCycles();
    const [_, addX] = command.split(" ");
    X += Number(addX);
    sprite = [X - 1, X, X + 1];
  }
});

console.log("Part 1", totalSum);
