import { TxtFileReader } from "../utils/txtFileReader";

type ChangeDirectoryCommand = `$ cd ${string}`;
type ListCommand = "$ ls";
type Directory = `dir ${string}`;
type File = `${number} ${string}`;

type Commands = ChangeDirectoryCommand | ListCommand | Directory | File;

const input = new TxtFileReader<Commands>("./day7/input.txt");
input.read();

let fileSystem: Record<any, any> = {};
let position = new Array<string>();

input.data.forEach((line) => {
  if (line.startsWith("$ cd")) {
    const loc = line.split("cd ")[1];
    if (loc === "..") {
      position.pop();
    } else if (loc === "/") {
      position = new Array<string>();
    } else {
      position.push(loc);
    }
  } else if (line === "$ ls") {
    return;
  } else {
    const currentPosition =
      position.length === 0
        ? fileSystem
        : position.reduce((a, b) => a[b], fileSystem);
    if (line.startsWith("dir ")) {
      const loc = line.split("dir ")[1];
      currentPosition[loc] = {} satisfies Record<any, any>;
    } else {
      const [dirSize, dirName] = line.split(" ");
      currentPosition[dirName] = Number(dirSize);
    }
  }
});

const calculateByDepths = (obj: Record<any, any>): Record<any, any> => {
  let resultObj: Record<any, any> = {};
  let sum = 0;
  Object.keys(obj).forEach((a) => {
    if (typeof obj[a] === "number") {
      resultObj[a] = obj[a];
      sum += obj[a];
    } else {
      resultObj[a] = calculateByDepths(obj[a]);
      if (typeof resultObj[a][1] === "number") {
        sum += resultObj[a][1];
      }
    }
  });
  return sum === 0 ? resultObj : [resultObj, sum];
};

const calculated = calculateByDepths(fileSystem);

const sizesFromObjectWithMin = (
  obj: Record<any, any>,
  max: number
): number[] => {
  let arr = new Array<number>();
  Object.keys(obj).forEach((a) => {
    if (Array.isArray(obj[a])) {
      if (obj[a][1] >= max) arr.push(obj[a][1]);
      sizesFromObjectWithMin(obj[a][0], max).forEach((a) => arr.push(a));
    }
  });
  return arr;
};

const sizesFromObjectWithMax = (
  obj: Record<any, any>,
  max: number
): number[] => {
  let arr = new Array<number>();
  Object.keys(obj).forEach((a) => {
    if (Array.isArray(obj[a])) {
      if (obj[a][1] <= max) arr.push(obj[a][1]);
      sizesFromObjectWithMax(obj[a][0], max).forEach((a) => arr.push(a));
    }
  });
  return arr;
};

// Part 1
console.log(
  "part 1",
  sizesFromObjectWithMax(calculated[0], 100000).reduce((a, b) => a + b)
);

// Part 2

const sizeToCleanUp = 30000000 - (70000000 - calculated[1]);
const res = sizesFromObjectWithMin(calculated[0], sizeToCleanUp);
console.log("Part 2", res.sort((a, b) => a - b)[0]);
