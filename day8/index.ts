import { TxtFileReader } from "../utils/txtFileReader";

const Input = new TxtFileReader("./day8/input.txt");
Input.read();

const treeMap: number[][] = Input.data.map((line) =>
  line.split("").map((e) => parseInt(e))
);

let visibleTrees = 0;
const createVisibility = () => ({
  top: true,
  bottom: true,
  left: true,
  right: true,
});

let maxScenicScore = 0;

for (let i = 1; i < treeMap.length - 1; i++) {
  for (let j = 1; j < treeMap[i].length - 1; j++) {
    const visible = createVisibility();
    const scenicScore: [
      topI: number,
      botI: number,
      leftJ: number,
      rightJ: number
    ] = [i, treeMap.length - i - 1, j, treeMap[i].length - j - 1];

    for (let topI = i - 1; topI >= 0; topI--) {
      if (treeMap[i][j] <= treeMap[topI][j]) {
        visible.top = false;
        scenicScore[0] = i - topI;
        break;
      }
    }
    for (let botI = i + 1; botI < treeMap.length; botI++) {
      if (treeMap[i][j] <= treeMap[botI][j]) {
        visible.bottom = false;
        scenicScore[1] = botI - i;
        break;
      }
    }
    for (let leftJ = j - 1; leftJ >= 0; leftJ--) {
      if (treeMap[i][j] <= treeMap[i][leftJ]) {
        visible.left = false;
        scenicScore[2] = j - leftJ;
        break;
      }
    }

    for (let rightJ = j + 1; rightJ < treeMap[i].length; rightJ++) {
      if (treeMap[i][j] <= treeMap[i][rightJ]) {
        visible.right = false;
        scenicScore[3] = rightJ - j;
        break;
      }
    }

    // Part 1
    if (visible.bottom || visible.top || visible.left || visible.right) {
      visibleTrees++;
    }

    // Part 2
    maxScenicScore = Math.max(
      maxScenicScore,
      scenicScore.reduce((acc, el) => acc * el, 1)
    );
  }
}
//part 1
const edgeTrees = 2 * treeMap.length + 2 * (treeMap[0].length - 2);
console.log("Part 1", visibleTrees + edgeTrees)

console.log("Part 2:", maxScenicScore);
