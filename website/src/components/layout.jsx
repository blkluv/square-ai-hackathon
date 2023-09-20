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


const Layout = () => {
    const gridSize = 7;

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
        [img18,img11,img12,img1,img11,img12,img0],
        [img13,img1,img1,img1,img10,img1,img0],
        [img14,img1,img1,img1,img12,img1,img0],
        [img15, img16, img17, img1,img15,img1,img0],
        [img0, img0, img0, img1,img18,img1,img0],
        [img0, img11, img12, img1,img1,img1,img0],
        [img0, img14, img1, img1,img0,img0,img0],
    ]
    return (
        <div className="grid grid-cols-100 gap-0 p-5 bg-white rounded-lg" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
            {grid.map((row, rowIndex) => (
                row.map((image, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className="w-10 h-10" // Adjust this for the size of each cell
                    >
                        <img src={image} alt="" className="w-full h-full" />
                        
                    </div>
                ))
            ))}
        </div>
    );
};

export default Layout;
