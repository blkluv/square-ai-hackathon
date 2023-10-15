import aStar from "../website/src/constants/Astar_pathFinder";
const grid = [
    [1, 0, 1, 1],
    [0, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 0]
];

const start = new Cell(0, 1);
const end = new Cell(3, 3);

const path = aStar(grid, start, end);
console.log(path)