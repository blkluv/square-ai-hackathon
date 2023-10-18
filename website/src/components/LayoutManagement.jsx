import React, { useState } from "react";
import Layout from "./layout";
import itemList from "../constants/itemImages";
import addnewgif from "../assets/addnew.gif"
import { Link } from 'react-router-dom';
import "../App.css"
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
let selectedRow = -1;
let selectedCol = -1;

function LayoutManagement() {
  const { width, height } = useWindowSize()

  const [tem,settem]=useState(false)
  const [edit,setedit]=useState(false)
  const itemArray = Object.keys(itemList).map((key) => ({
    id: key, // Assuming you want to use the key as an 'id' property
    imgSrc: itemList[key],
  }));

  function handleClick(id) {
    setedit(false)
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
      setedit(true)
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
  function onsave() {
    // Create the data to be sent in the request body
    const data = {
      name:"123456789",
      matrix: grid,
    };
    console.log(data)
    // Define the URL for the POST request
    const url = "https://node-api-sigma-opal.vercel.app/matrix";
  
    // Create the request options
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  
    // Make the POST request
    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          alert("🥲 could not save ");
          throw new Error("Network response was not ok");
        }
        settem(true)
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // Handle the response data here
        console.log("Request successful, response data:", data);
      })
      .catch((error) => {
        alert("🥲 could not save ");
        // Handle any errors that occurred during the fetch
        console.error("Error:", error);
      });
  }
  
  return (
<div className="flex">
  <div className="w-1/2">
            
            {tem&&
        <Confetti
        width={width}
        height={height}
        recycle={false} 
      />
      }
            <div className=" m-5 ">

{!edit&&<div className="grid-container bg-white p-5 rounded-xl mr-10" style={{ width: "fit-content", height: "fit-content", marginLeft: "auto" }}>
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
  </div>}
 {edit&& <div className="grid-container">
    <div
      className="grid grid-cols-15 gap-0 bg-white rounded-lg p-5 mr-10"
      style={{ gridTemplateColumns: `repeat(10, 1fr)` }}
    >
      {/* { for( let i = 0;i<)} */}
      {itemArray.map((row, rowIndex) => (
        <div
          // key={`${rowIndex%15}-${colIndex}`}
          key={`${row.id}`}
          className="w-10 h-10 p-1" // Adjust this for the size of each cell
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
  </div>}
</div>
<button type="button" onClick={onsave} class="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">
      Save changes
    </button>
    <button type="button" class="flex-1 m-5 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover-bg-gray-100 hover-text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark-bg-gray-800 dark-text-gray-400 dark-border-gray-600 dark-hover-text-white dark-hover-bg-gray-700">
    <Link to="/layouts">
      Go back
      </Link>
    </button>
          </div>
          <div className="w-1/2 mx-auto text-center shadow-2xl rounded-xl">
  <h2>Tutorial</h2>
  <img src={addnewgif} alt="Add New Gif" className="w-1/2 mx-auto" />
  <div className="">
    
<h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Steps to follow</h2>
<ul class="mx-auto text-center max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
    <li class="flex items-center ">
        <svg class="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        Hover on the product you want to replace
    </li>
    <li class="flex items-center">
        <svg class="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        click on blue circle to update
    </li>
    <li class="flex items-center">
        <div role="status">
        <svg class="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        </div>
        click on red icon to delete
    </li>
    <li class="flex items-center">
        <svg class="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        select the new product
    </li>
    <li class="flex items-center">
        <svg class="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
        </svg>
        you have successfully updated🥳
    </li>
</ul>

  </div>
</div>

</div>

          


  );
}

export default LayoutManagement;
