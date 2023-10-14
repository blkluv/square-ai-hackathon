// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
//sri rama jayam 


// Define the dimensions of the grid
const ROWS = 7;
const COLS = 7;

// Define structure for a cell
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Define structure for a node
class Node {
    constructor(position, g, h, f, parent) {
        this.position = position;
        this.g = g; // cost from start to this node
        this.h = h; // heuristic cost (estimated cost to goal)
        this.f = f; // total cost (f = g + h)
        this.parent = parent; // parent node
    }
}

// Function to calculate the Manhattan distance heuristic
function calculateHeuristic(current, goal) {
    return Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y);
}

// Function to check if a cell is inside the grid
function isValid(cell) {
    return cell.x >= 0 && cell.x < ROWS && cell.y >= 0 && cell.y < COLS;
}

// Function to check if a cell is blocked (contains a non-zero value)
function isBlocked(grid, cell) {
    return grid[cell.x][cell.y] !== 0 ;
}

// Function to calculate the direction between two cells
function calculateDirection(current, neighbor) {
    const dx = neighbor.x - current.x;
    const dy = neighbor.y - current.y;
    if([-1,0,1].includes(dx) == false) return -1;
    
    if([-1,0,1].includes(dy) == false) return -1;
    

    // if (dx === -1 && dy === -1) return 0; // Top Left
    // if (dx === -1 && dy === 0) return 1;  // Top
    // if (dx === -1 && dy === 1) return 2;  // Top Right
    // if (dx === 0 && dy === 1) return 3;   // Right
    // if (dx === 1 && dy === 1) return 4;   // Bottom Right
    // if (dx === 1 && dy === 0) return 5;   // Bottom
    // if (dx === 1 && dy === -1) return 6;  // Bottom Left
    // if (dx === 0 && dy === -1) return 7;  // Left
    return [dx,dy];
    // return -1; // Invalid direction
}

// Function to perform A* search and store the path
function aStar(grid, startValue, endValue) {
    let start = new Cell(startValue[0],startValue[1])
    let end = new Cell(endValue[0],endValue[1])

    // Create an open list (to be explored) and a closed list (already explored)
    const openList = [];
    const closedList = [];

    // Initialize the start node
    const startNode = new Node(start, 0, calculateHeuristic(start, end), 0, null);
    openList.push(startNode);

    while (openList.length > 0) {
        // Find the node with the lowest total cost (f) in the open list
        let currentIndex = 0;
        for (let i = 1; i < openList.length; i++) {
            if (openList[i].f < openList[currentIndex].f) {
                currentIndex = i;
            }
        }

        // Get the current node from the open list
        const currentNode = openList.splice(currentIndex, 1)[0];

        // Add the current node to the closed list
        closedList.push(currentNode);

        // If the current node is the goal, construct the path
        if (currentNode.position.x === end.x && currentNode.position.y === end.y) {
            const path = [];
            let current = currentNode;
            while (current.parent !== null) {
                const direction = calculateDirection(current.parent.position, current.position);
                path.push(direction);
                current = current.parent;
            }
            return path.reverse();
        }

        // Explore neighbors
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue; // Skip the current cell
                const neighborCell = new Cell(currentNode.position.x + dx, currentNode.position.y + dy);

                // Check if the neighbor is valid and not blocked
                if (isValid(neighborCell) && (!isBlocked(grid, neighborCell) || (endValue.x==neighborCell.x && endValue.y==neighborCell.y))) {
                    // Calculate tentative g score
                    const tentativeG = currentNode.g + 1;

                    // Check if the neighbor is already in the closed list with a lower g score
                    const inClosedList = closedList.some((node) => node.position.x === neighborCell.x && node.position.y === neighborCell.y);

                    // If the neighbor is in the closed list with a lower g score, skip it
                    if (inClosedList && tentativeG >= currentNode.g) {
                        continue;
                    }

                    // Check if the neighbor is in the open list or has a lower g score
                    const inOpenListIndex = openList.findIndex((node) => node.position.x === neighborCell.x && node.position.y === neighborCell.y);

                    // If the neighbor is not in the open list or has a lower g score, add it to the open list
                    if (inOpenListIndex === -1 || tentativeG < openList[inOpenListIndex].g) {
                        const neighborNode = new Node(neighborCell, tentativeG, calculateHeuristic(neighborCell, end), 0, currentNode);
                        neighborNode.f = neighborNode.g + neighborNode.h;
                        openList.push(neighborNode);
                    }
                }
            }
        }
    }

    // If the open list is empty and the goal is not reached, there is no path
    return [];
}

// const grid = [
//     [1, 1, 1, 0, 1, 1, 1],
//     [1, 0, 0, 0, 1, 0, 1],
//     [1, 0, 0, 0, 1, 0, 1],
//     [1, 1, 1, 0, 1, 0, 1],
//     [1, 1, 1, 0, 1, 0, 1],
//     [1, 1, 1, 0, 0, 0, 1],
//     [1, 1, 0, 0, 1, 1, 1],
// ];

// const start = [0,3];
// const end = [2,2];

// const path = aStar(grid, start, end);
// console.log(path)
// if (path !== null) {
//     console.log("Path exists using A* algorithm:");
//     for (let i = 0; i < path.length; i++) {
//         console.log(path[i]);
//     }
// } else {
//     console.log("No path exists using A* algorithm.");
// }
export default aStar;