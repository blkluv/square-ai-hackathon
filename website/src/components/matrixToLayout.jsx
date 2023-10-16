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
const MatrixToLayout=(props)=>{
    const [matrix, setmatrix] = useState(props.matrix.matrix);
    const handleDrop = (item, target) => {
      // Implement your logic for handling the drop action here,
      // which might involve swapping matrix elements.
      const before = matrix[item.rowIndex][item.colIndex];
      const after = matrix[target.rowIndex][target.colIndex] ;
      var _matrix = matrix;
      _matrix[item.rowIndex][item.colIndex] =  after;
      _matrix[target.rowIndex][target.colIndex] = before;
      console.log("Matrix Updated",matrix,_matrix);
      setmatrix(_matrix);
    };
    useEffect(()=>{console.log("matrix updated")},[matrix])
    return(
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
    )
}
export default MatrixToLayout;