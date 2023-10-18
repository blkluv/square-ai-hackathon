import { Fragment, useEffect, useRef, useState } from 'react'
import MatrixToLayout from '../components/matrixToLayout';
import dndgif from "../assets/dnd.gif"
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
const LayoutsDashboard = () => {
  
  const { width, height } = useWindowSize()
  const [matrices, setMatrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatrix, setSelectedMatrix] = useState(null);
  const [tem,settem]=useState(false)
  const handleMatrixSelection = (matrix) => {
    setSelectedMatrix(matrix);
    console.log("m",selectedMatrix)
  };
  function onsave() {
    // Create the data to be sent in the request body
    const data = {
      name:"123456789",
      matrix: selectedMatrix.matrix,
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
  
  // Usage example:
  // Replace `/* Your matrix data here */` with the actual matrix data you want to send.
  // Call the onsave function when the button or event is triggered.
  
  const handlematrixupdate=(updatedmatrix)=>{
    // selectedMatrix(updatedmatrix)
    console.log("dfragged matrix : ",updatedmatrix)
    setSelectedMatrix(updatedmatrix)
    }
  useEffect(() => {
    setIsLoading(false)
    // Fetch data from the API endpoint
    fetch('https://node-api-sigma-opal.vercel.app/allMatrix')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setMatrices(data);
        setIsLoading(false); // Set loading to false once data is loaded
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <div className='w-full mt-10'>
      {tem&&
        <Confetti
        width={width}
        height={height}
        recycle={false} 
      />
      }
    {
        !isLoading && selectedMatrix && 
        <div className="h-[80vh] w-full  shadow-2xl flex items-center mb-20">
          <div className="h-full flex">
  <div className="w-1/2">
    <MatrixToLayout matrix={selectedMatrix} handlematrixupdate={handlematrixupdate}className="h-full" />
  </div>
  <div className="w-1/2 flex flex-col items-center justify-center">
  <img src={dndgif} className="w-1/2 rounded-lg shadow-lg mb-4" />
  <h2 className='mb-10 font-3xl'>you can drag and drop and update the layout!🤩</h2>
  
  <div className="flex gap-4">
    <button type="button" onClick={onsave} class="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">
      Save changes
    </button>
    <Link to="/layoutmanagement">
    <button type="button" class="flex-1 py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover-bg-gray-100 hover-text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark-bg-gray-800 dark-text-gray-400 dark-border-gray-600 dark-hover-text-white dark-hover-bg-gray-700">
    <Link to="/layoutmanagement">
      Add new items
      </Link>
    </button>
    </Link>
    
  </div>
</div>
</div>
  </div>

    }
    <h1 className=' mt-10 mb-5'>Recent</h1>

      {isLoading ? (
        // Display a loading animation using Tailwind CSS classes
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      ) : (
        // Render the matrices once data is loaded
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
          {matrices.map((matrix, index) => (
            <div key={index}>
              <MatrixToLayout matrix={matrix} />
              <input
                type="checkbox"
                className="w-6 h-6 mt-2"
                onChange={() => handleMatrixSelection(matrix)}
                checked={matrix === selectedMatrix}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
          }  

export default LayoutsDashboard;