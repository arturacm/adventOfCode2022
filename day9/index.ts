import { TxtFileReader } from "../utils/txtFileReader";

const Input = new TxtFileReader("./day9/input.txt");
Input.read();

type stringPosition = `${number} ${number}`;

const part1TailPositions = new Set<stringPosition>(["0 0"]);
const part2TailPositions = new Set<stringPosition>(["0 0"]);

type Position = { x: number; y: number };

const createPosition = (): Position => ({ x: 0, y: 0 });

const head: Position = createPosition();
const tail: Position = createPosition();


const rope = new Array(10).fill(null).map(createPosition);

const moveHead: Record<string, Function> = {
  U: (head: Position) => {
    head.x++;
  },
  D: (head: Position) => {
    head.x--;
  },
  R: (head: Position) => {
    head.y++;
  },
  L: (head: Position) => {
    head.y--;
  },
};
const moveTail = (head: Position, tail: Position) => {
  if (head.x > tail.x) {
    tail.x++;
  } else if (head.x < tail.x) {
    tail.x--;
  }

  if (head.y > tail.y) {
    tail.y++;
  } else if (head.y < tail.y) {
    tail.y--;
  }
};

Input.data.forEach((line) => {
  const [direction, times] = line.split(" ");
  const countTimes = parseInt(times);

  for (let i = 0; i < countTimes; i++) {
    // Part 1

    moveHead[direction](head);

    const shouldTailMove =
      Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1;

    if (shouldTailMove) {
      moveTail(head, tail);
    }

    part1TailPositions.add(`${tail.x} ${tail.y}`);

    // Part 2
    moveHead[direction](rope[0]);

    for (let j = 1; j < rope.length; j++) {
      const shouldTailMove =
        Math.abs(rope[j-1].x - rope[j].x) > 1 || Math.abs(rope[j-1].y - rope[j].y) > 1;

      if (shouldTailMove) {
        moveTail(rope[j-1], rope[j]);
      }
    }
    part2TailPositions.add(`${rope[9].x} ${rope[9].y}`);
  }
});

console.log('Part 1', part1TailPositions.size);
console.log('Part 2', part2TailPositions.size);
