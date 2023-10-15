import itemList from "../constants/itemImages";
import itemNames from "../constants/itemNames";
const MatrixToLayout=(props)=>{
    const matrix=props.matrix.matrix
    console.log("m",matrix)
    return(
        <div
        className="grid grid-cols-100 gap-0 p-5 bg-white rounded-lg w-fit"
        style={{ gridTemplateColumns: `repeat(${matrix.length}, 1fr)` }}>
        {matrix.map((row, rowIndex) =>
          row.map((image, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
            >
            <img src={itemList[image]} alt="" className="w-full h-full m-0" />

            </div>
          ))
        )}
        </div>
    )
}
export default MatrixToLayout;