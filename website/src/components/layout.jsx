import React from "react";
import img0 from "../assets/0.png";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/5.png";
import img6 from "../assets/6.png";
import img7 from "../assets/7.png";
import img8 from "../assets/8.png";
import img9 from "../assets/9.png";
import img10 from "../assets/10.png";
import img11 from "../assets/11.png";
import img12 from "../assets/12.png";
import img13 from "../assets/13.png";
import img14 from "../assets/14.png";
import img15 from "../assets/15.png";
import img16 from "../assets/16.png";
import img17 from "../assets/17.png";
import img18 from "../assets/18.png";
import aStar from "../../utility/Astar_pathFinder";
import { useState, useEffect } from "react";

// Assuming you have source and destination coordinates
let sourceRow = 0;
let sourceCol = 0;
let destRow = 0;
let destCol = 0;
const cellSize = 40;

function calculateCenterPosition(row, col) {
  // Calculate the center position of the cell
  const x = (col + 1) * cellSize + cellSize / 2 - 20;
  const y = (row + 1) * cellSize + cellSize / 2 - 20;
  return { x, y };
}

const Layout = () => {
  const gridState = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1, 1],
  ];
  const stops = [
    [0, 3],
    [2, 2],
    [4, 3],
    [5, 4],
    [1, 5],
  ];
  const gridSize = 7;
  const [source, setSource] = useState({ row: -1, col: -1 });
  const [destination, setDestination] = useState({ row: -1, col: -1 });

  let counter = 0;

  const drawArrow = () => {
    counter += 1;
    console.log("counter ", counter);
    let arrowHTML = [];
    for (let i = 0; i < stops.length - 1; i++) {
      let tempSource = stops[i];
      const tempDest = stops[i + 1];
      const tempPath = aStar(gridState, tempSource, tempDest);
      // console.log(i, " ", tempPath)

      for (let j = 0; j < tempPath.length; j++) {
        // console.log('i = ', i, 'j = ', j)
        let dest = [
          tempSource[0] + tempPath[j][0],
          tempSource[1] + tempPath[j][1],
        ];
        source.row = tempSource[0];
        source.col = tempSource[1];
        destination.row = dest[0];
        destination.col = dest[1];
        // console.log(source.row,source.col,destination.row,destination.col)
        const sourceCenter = calculateCenterPosition(source.row, source.col);
        const destinationCenter = calculateCenterPosition(
          destination.row,
          destination.col
        );
        if (source.row !== -1 && destination.row !== -1) {
          const dx = destinationCenter.x - sourceCenter.x;
          const dy = destinationCenter.y - sourceCenter.y;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          arrowHTML.push(
            <div
              style={{
                top: sourceCenter.y,
                left: sourceCenter.x,
                width: Math.sqrt(dx * dx + dy * dy),
                transform: `rotate(${angle}deg)`,
                transformOrigin: "left center",
                borderBottom: "2px solid red", // Arrow styling
                position: "absolute",
              }}
            >
              
            </div>
          );
          arrowHTML.push(
            <div
              style={{
                top: destinationCenter.y,
                left: destinationCenter.x,
                width: 15,
                transform: `rotate(${angle + 160}deg)`,
                transformOrigin: "left center",
                borderBottom: "2px solid red", // Arrow styling
                position: "absolute",
              }}
            >
              
            </div>
          );
          arrowHTML.push(
            <div
              style={{
                top: destinationCenter.y,
                left: destinationCenter.x,
                width: 15,
                transform: `rotate(${angle + 200}deg)`,
                transformOrigin: "left center",
                borderBottom: "2px solid red", // Arrow styling
                position: "absolute",
              }}
            >
              
            </div>
          );

          tempSource = [...dest];
        }
      }
    }
    // console.log("outputHtml ", arrowHTML)
    // return outputHtml;
    return arrowHTML;
  };
  // Generate an array to represent the grid
  // const grid = [
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //     [img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2, img0, img1, img2],
  //   ];
  const grid = [
    [img18, img11, img12, img1, img11, img12, img0],
    [img13, img1, img1, img1, img10, img1, img0],
    [img14, img1, img1, img1, img12, img1, img0],
    [img15, img16, img17, img1, img15, img1, img0],
    [img0, img0, img0, img1, img18, img1, img0],
    [img0, img11, img12, img1, img1, img1, img0],
    [img0, img14, img1, img1, img0, img0, img0],
  ];
  return (
    <div className="relative">
      <div
        className="grid grid-cols-100 gap-0 p-5 bg-white rounded-lg"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
          row.map((image, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="w-10 h-10" // Adjust this for the size of each cell
            >
              <img src={image} alt="" className="w-full h-full" />
            </div>
          ))
        )}
        <div className="&larr"></div>

        {drawArrow()}
      </div>
    </div>
  );
};

export default Layout;
