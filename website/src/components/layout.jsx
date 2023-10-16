import React from "react";
import aStar from "../../utility/Astar_pathFinder";
import { useState, useEffect } from "react";
import itemList from "../constants/itemImages";
import itemNames from "../constants/itemNames";

const cellSize = 40;

function calculateCenterPosition(row, col) {
  // Calculate the center position of the cell
  const x = (col + 1) * cellSize + cellSize / 2 - 20;
  const y = (row + 1) * cellSize + cellSize / 2 - 20;
  return { x, y };
}

const Layout = ({from,to}) => {
  const [source, setSource] = useState({ row: -1, col: -1 });
  const [destination, setDestination] = useState({ row: -1, col: -1 });
  const [arrow, setArrow] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [foundKey, setFoundKey] = useState(null);
  useEffect(() => {
    // Update source when "from" is updated
    if (from) {
      
      setSource({ row: 1, col: 0 });
    }
  }, [from]);

  useEffect(() => {
    // Update destination when "to" is updated
    if (to) {
      setDestination({ row: 3, col: 6 });
    }
  }, [to]);
  const handleImageClick = (content) => {
    setShowTooltip(!showTooltip);
    setTooltipContent(content);
  };

  const gridState = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1, 1],
  ];
  useEffect(() => {
    // Whenever source or destination changes, redraw the arrow
    const arrow = drawArrow([
      [source.row, source.col],
      [destination.row, destination.col],
    ]);

    // Update the state with the new arrow
    setArrow(arrow);
  }, [source, destination]);
    let counter = 0;
  const updatesource=()=>{
    setSource({ row: 1, col: 1 })
    console.log("source updated")
  };
  const updatedestination=()=>{
    setDestination({ row: 2, col: 6 })
  }
  
  const drawArrow = (stops) => {
    counter += 1;
    console.log("counter ", counter);
    let arrowHTML = [];

    // Only draw the arrow if both source and destination are set
    
    if (source.row !== -1 && destination.row !== -1) {
      for (let i = 0; i < 1; i++) {
        let tempSource = stops[i];
        const tempDest = stops[stops.length - 1];
        const tempPath = aStar(gridState, tempSource, tempDest);

        for (let j = 0; j < tempPath.length; j++) {
          let dest = [
            tempSource[0] + tempPath[j][0],
            tempSource[1] + tempPath[j][1],
          ];

          const sourceCenter = calculateCenterPosition(tempSource[0], tempSource[1]);
          const destinationCenter = calculateCenterPosition(dest[0], dest[1]);

          const dx = destinationCenter.x - sourceCenter.x;
          const dy = destinationCenter.y - sourceCenter.y;
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);

          arrowHTML.push(
            <div
              key={`arrow-${i}-${j}`}
              style={{
                top: sourceCenter.y,
                left: sourceCenter.x,
                width: Math.sqrt(dx * dx + dy * dy),
                transform: `rotate(${angle}deg)`,
                transformOrigin: "left center",
                borderRadius: "5px",
                borderBottom: "7px dashed green",
                position: "absolute",
                animation: "moveDots 2s linear infinite",
              }}
            ></div>
          );

          tempSource = [...dest];
        }
      }
    }
    return arrowHTML;
  };
  const grid = [
    [ 16,  11,  12,  1,  41,  102,  10,0],
    [ 13,  1,  1,  1,  50,  1,  45,0],
    [ 14,  1,  1,  1,  52,  1,  18,0],
    [ 15,  66,  67,  1,  55,  1,  39,0],
    [ 0,  0,  0,  1,  68,  1,  30,0],
    [ 0,  61,  93,  1,  1,  1,  35,0],
    [ 0,  74,  1,  1,  52,  0,  40,0],
    [ 0,  75,  1,  1,  0,  0,  0,0],
  ];
  // const grid=[
  //   [0,0,0,0,0,0,0,0,0,0],
  //   [0,11,11,11,12,12,12,13,14,0],
  //   [0,0,0,0,0,0,0,0,14,0],
  //   [0,0,0,0,0,0,0,0,15,0],
  //   [0,0,0,0,0,0,0,0,120,0],
  //   [0,0,0,0,0,1,18,1,126,0],
  //   [0,0,0,0,0,1,17,1,100,0],
  //   [0,0,0,0,0,1,16,1,90,0],
  //   [0,0,0,0,0,0,15,1,80,0],
  //   [0,0,0,0,0,0,0,0,0,0],
  // ];
  return (
    <div className="relative">
      <div
        className="grid grid-cols-100 gap-0 p-5 bg-white rounded-lg"
        style={{ gridTemplateColumns: `repeat(${grid.length}, 1fr)` }}
      >
        {grid.map((row, rowIndex) =>
        row.map((image, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="w-10 h-10" onClick={() => handleImageClick("hi")}>
            <img src={itemList[image]} alt="" className="w-full h-full" />
          </div>
        ))
      )}
      
        <div className="&larr"></div>

         {source!={ row: -1, col: -1 }  && destination!={ row: -1, col: -1 } && drawArrow([
          [source.row,source.col],
          [destination.row,destination.col],
        ])} 
      </div>
      <div >
        {"source "+source.row+" , "+source.col}
      </div>
      <div>
      {"destination "+destination.row+" , "+destination.col}

      </div>
    {from}
    {to}  
    <button onClick={updatesource}>update source</button>
    <button onClick={updatedestination}>update destination</button>
    </div>
  );
};

export default Layout;
