import { Fragment, useEffect, useRef, useState } from 'react'
import MatrixToLayout from '../components/matrixToLayout';
const LayoutsDashboard = () => {
  const [matrices, setMatrices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatrix, setSelectedMatrix] = useState(null);
  const handleMatrixSelection = (matrix) => {
    setSelectedMatrix(matrix);
  };
  useEffect(() => {
    // setMatrices([
    //     [
    //         [ 56,  11,  12,  1,  41,  102,  10,0],
    //         [ 13,  1,  1,  1,  50,  1,  45,0],
    //         [ 14,  1,  1,  1,  52,  1,  18,0],
    //         [ 15,  66,  67,  1,  55,  1,  39,0],
    //         [ 0,  0,  0,  1,  68,  1,  30,0],
    //         [ 0,  61,  93,  1,  1,  1,  35,0],
    //         [ 0,  74,  1,  1,  52,  0,  40,0],
    //         [ 0,  75,  1,  1,  0,  0,  0,0],
    //       ],
    //       [
    //         [ 16,  11,  12,  1,  41,  102,  10,0],
    //         [ 13,  1,  1,  1,  50,  1,  45,0],
    //         [ 14,  1,  1,  1,  52,  1,  18,0],
    //         [ 15,  66,  67,  1,  55,  1,  39,0],
    //         [ 0,  0,  0,  1,  68,  1,  30,0],
    //         [ 0,  61,  93,  1,  1,  1,  35,0],
    //         [ 0,  74,  1,  1,  52,  0,  40,0],
    //         [ 0,  75,  1,  1,  0,  0,  0,0],
    //       ],
    //       [
    //         [ 14,  11,  12,  1,  41,  102,  10,0],
    //         [ 13,  1,  1,  1,  50,  1,  45,0],
    //         [ 14,  1,  1,  1,  52,  1,  18,0],
    //         [ 15,  66,  67,  1,  55,  1,  39,0],
    //         [ 0,  0,  0,  1,  68,  1,  30,0],
    //         [ 0,  61,  93,  1,  1,  1,  35,0],
    //         [ 0,  74,  1,  1,  52,  0,  40,0],
    //         [ 0,  75,  1,  1,  0,  0,  0,0],
    //       ],
    //       [
    //         [ 86,  11,  12,  1,  41,  102,  10,0],
    //         [ 13,  1,  1,  1,  50,  1,  45,0],
    //         [ 14,  1,  1,  1,  52,  1,  18,0],
    //         [ 15,  66,  67,  1,  55,  1,  39,0],
    //         [ 0,  0,  0,  1,  68,  1,  30,0],
    //         [ 0,  61,  93,  1,  1,  1,  35,0],
    //         [ 0,  74,  1,  1,  52,  0,  40,0],
    //         [ 0,  75,  1,  1,  0,  0,  0,0],
    //       ]
    // ])
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
    <div className='w-full'>
    {
        !isLoading && selectedMatrix && 
        <div className="h-[80vh] w-full  shadow-2xl flex items-center mb-20">
          <div className="h-full flex">
  <div className="w-1/2">
    <MatrixToLayout matrix={selectedMatrix} className="h-full" />
  </div>
  <div className="w-1/2">
    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800">
      Default
    </button>
    <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover-bg-gray-100 hover-text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark-bg-gray-800 dark-text-gray-400 dark-border-gray-600 dark-hover-text-white dark-hover-bg-gray-700">
      Alternative
    </button>
  </div>
</div>

  </div>

    }
    <h1 className='mb-5'>Recent</h1>

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