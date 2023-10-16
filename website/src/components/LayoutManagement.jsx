import React, { useState } from "react";
import Layout from "./layout";
import itemList from "../constants/itemImages";
import "../App.css"
let selectedRow = -1;
let selectedCol = -1;

function LayoutManagement() {
  const itemArray = Object.keys(itemList).map((key) => ({
    id: key, // Assuming you want to use the key as an 'id' property
    imgSrc: itemList[key],
  }));

  function handleClick(id) {
    console.log("Clicked", id);
    if (selectedRow == -1) {
      selectedRow = -1;
    } else {
      const newGrid = [...grid];
      newGrid[selectedRow][selectedCol] = id
      setGrid(newGrid);
    }
  }
  
  const handleDelete = (row, col) => {
    const newGrid = [...grid];
    console.log("Delete", row, col);
    newGrid[row][col] = 1;
    setGrid(newGrid);
    console.log(grid);
  };
  
  function handleEdit(row, col) {
      selectedCol = col;
      selectedRow = row;
  }

  const [grid, setGrid] = useState([
    [16, 11, 12, 1, 41, 102, 10, 0],
    [13, 1, 1, 1, 50, 1, 45, 0],
    [14, 1, 1, 1, 52, 1, 18, 0],
    [15, 66, 67, 1, 55, 1, 39, 0],
    [0, 0, 0, 1, 68, 1, 30, 0],
    [0, 61, 93, 1, 1, 1, 35, 0],
    [0, 74, 1, 1, 52, 0, 40, 0],
    [0, 75, 1, 1, 0, 0, 0, 0],
  ]);
  return (
    <div>
      <div className="grid-container">
        <div
          className="grid grid-cols-8 gap-0 bg-white rounded-lg"
          style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
        >
          {grid.map((row, rowIndex) =>
            row.map((image, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="relative w-10 h-10 imageclass" // Adjust this for the size of each cell
              >
                <button
                  className="absolute top-0 left-0 bg-blue-500 text-white rounded-full p-1 w-1 h-1"
                  onClick={() => handleEdit(rowIndex, colIndex)}
                ></button>
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 w-1 h-1"
                  onClick={() => handleDelete(rowIndex, colIndex)}
                ></button>
                <img src={itemList[image]} alt="" className="w-full h-full" />
              </div>
            ))
          )}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="grid-container">
        <div
          className="grid grid-cols-15 gap-0 bg-white rounded-lg"
          style={{ gridTemplateColumns: `repeat(15, 1fr)` }}
        >
          {/* { for( let i = 0;i<)} */}
          {itemArray.map((row, rowIndex) => (
            <div
              // key={`${rowIndex%15}-${colIndex}`}
              key={`${row.id}`}
              className="w-10 h-10" // Adjust this for the size of each cell
            >
              <img
                onClick={() => handleClick(row.id)}
                src={itemList[rowIndex]}
                alt=""
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LayoutManagement;
