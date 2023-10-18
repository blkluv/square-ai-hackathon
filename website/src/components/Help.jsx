import React from 'react';
import qrimage from "../assets/qr_code.png"
function Help() {
  return (
    <div >
      <h1>Scan QR to open map</h1>
      <img  style={{height:"80vh"}} src={qrimage}/>
      {/* Add your content for the Help page here */}
    </div>
  );
}

export default Help;
