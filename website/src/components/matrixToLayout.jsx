/* eslint-disable react/prop-types */
import {useEffect, useState} from "react"
import itemList from "../constants/itemImages";
import itemNames from "../constants/itemNames";
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
const MatrixElement = ({ value, rowIndex, colIndex, onDrop }) => {
  const [, ref] = useDrag({
    type: 'MATRIX_ELEMENT',
    item: { rowIndex, colIndex },
  });

  const [, drop] = useDrop({
    accept: 'MATRIX_ELEMENT',
    drop: (item) => {
      // Handle the drop action here, and then call the onDrop callback.
      onDrop(item, { rowIndex, colIndex });
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="matrix-element">
      {/* {value} */}
      <img src={itemList[value]} alt="" className="w-full h-full m-0" />
    </div>
  );
};
const MatrixToLayout = (props) => {
  const [matrix, setMatrix] = useState(props.matrix.matrix);

  const handleDrop = (item, target) => {
    setMatrix((prevMatrix) => {
      // Create a deep copy of the matrix to avoid mutation.
      const updatedMatrix = JSON.parse(JSON.stringify(prevMatrix));
      const before = updatedMatrix[item.rowIndex][item.colIndex];
      const after = updatedMatrix[target.rowIndex][target.colIndex];
      updatedMatrix[item.rowIndex][item.colIndex] = after;
      updatedMatrix[target.rowIndex][target.colIndex] = before;
      console.log("Matrix Updated", matrix, updatedMatrix);
      const temp=props.matrix
      temp.matrix=updatedMatrix
      props.handlematrixupdate(temp)
      return updatedMatrix;
    });
  };

  useEffect(() => {
    console.log("Matrix updated");

  }, [matrix]);
    return(
      <div className="bg-white p-5 rounded-xl">
<DndProvider backend={HTML5Backend}
        className="grid grid-cols-100 gap-0 p-5 bg-white rounded-lg w-fit"
        style={{ gridTemplateColumns: `repeat(${matrix.length}, 1fr)` }}>
        {matrix.map((row, rowIndex) => {
          return ( <div className="flex" key={rowIndex}>
            {
              row.map((image, colIndex) => (
                  <MatrixElement
                  key={colIndex}
                  value={image}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  onDrop={handleDrop}
                />
                ))

            }
          </div>)
        }
        )}
        </DndProvider>
      </div>
        )
}
export default MatrixToLayout;