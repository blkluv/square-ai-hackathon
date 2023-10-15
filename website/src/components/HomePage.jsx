import React, { useState } from 'react';
import ImageGrid from './sidebar';
import Layout from './layout';
import SpeechRecognizer from './SpeechRecognizer';
import '../App.css'

function HomePage() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [from,setfrom]=useState(null)
  const [to,setto]=useState(null)
  const updatefrom=(str)=>{
    setfrom(str)
  }
  // Function to toggle the blur state
  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <div className={`h-screen flex flex-col `}>
      <div className={`h-full hidden md:block `}>
        <ImageGrid />
      </div>

      <div className="h-10"></div>
      <div className={`text-center ${isBlurred ? 'blurred' : ''}`}>
        <Layout />
      </div>
      <div className="flex-grow"></div>
      <div className=" fixed bottom-0 w-full" style={{ borderRadius: "25px" ,backgroundColor:"rgba(0, 0, 0, 1)", boxShadow: "0 0 10px rgba(0, 0, 0, 0.8)"  }}>
        <SpeechRecognizer toggleBlur={toggleBlur} />
      </div>
    </div>
  );
}

export default HomePage;
