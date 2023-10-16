import React, { useRef, useState } from "react";

// import { runPython } from "pyodide";

function imageProcess() {
  const cv = require('opencv4nodejs');

  // Load an image from file
  const image = cv.imread('/assets/image3.jpeg');

  // Check if the image was loaded successfully
  if (image.empty) {
    console.log('Error: Unable to load image.');
  } else {
    // Convert the image to grayscale
    const grayscaleImage = image.cvtColor(cv.COLOR_BGR2GRAY);

    // Apply thresholding to create a binary image
    const thresholded = grayscaleImage.threshold(128, 255, cv.THRESH_BINARY);

    // Display the binary image
    cv.imshow('Binary Image', thresholded);

    // Save the binary image to a file
    cv.imwrite('binary_image.jpg', thresholded);

    // Wait for a key press and then close all windows
    cv.waitKey(0);
    cv.destroyAllWindows();

    let img75 = thresholded.resize(0.02, 0.02);
    img75 = img75.resize(50, 50);

    // Apply thresholding to create a binary image
    img75 = img75.threshold(128, 255, cv.THRESH_BINARY);

    console.log(img75.getData());

    const resizedImage = img75.resize(10, 10, cv.INTER_LINEAR);

    console.log(resizedImage.getData());

    cv.imshow('Resized Image', resizedImage);

    // Apply thresholding to create a binary image
    const resizedBinaryImage = resizedImage.threshold(128, 255, cv.THRESH_BINARY);
    console.log(resizedBinaryImage.getData());
  }

}

function fetchLayout() {
  fetch('https://us-central1-steady-syntax-401807.cloudfunctions.net/getLayoutArray').then((response) => 
  print(response))
}

function CreateLayout() {
  // const outputRef = useRef(null);
  // const [result, setResult] = useState(null);

//   const executePythonCode = async () => {
//     const pythonCode = `
// import cv2
// import numpy as np

// # Your Python code here

// result = 42  # Replace this with your Python code's result
// result
// `;

//     const { output } = await runPython(pythonCode, { output: true });
//     setResult(output.result);
//   };

  return (
    <div>
      <button onClick={imageProcess}>Execute Python Code</button>
      <button onClick={fetchLayout}>Fetch</button>
      
    </div>
  );
}

export default CreateLayout;
