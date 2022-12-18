import { TxtFileReader } from "../utils/txtFileReader";

const Input = new TxtFileReader("./day1/input.txt");
Input.read(`\n\n`);

let maxCalories = 0;
const maxCaloriesElfs = new Array<number>();

Input.data.forEach((elf) => {
  const elfCalories = elf
    .split(`\n`)
    .reduce((acc, food) => acc + parseInt(food), 0);

  // part 1
  maxCalories = Math.max(elfCalories, maxCalories);

  // part 2
  maxCaloriesElfs.push(elfCalories);

  if (maxCaloriesElfs.length > 3) {
    maxCaloriesElfs.sort().shift();
  }
});

console.log("Part 1 answer:", maxCalories);

console.log(
  "Part 2 answer:",
  maxCaloriesElfs.reduce((acc, food) => acc + food, 0)
);
