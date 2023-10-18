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
    console.log("updated from : ",str)
    setfrom(str)
  }
  const updateto=(str)=>{
    console.log("updated to: ",str)
    setto(str);
    // console.log("got ", from , to)
  }
  // Function to toggle the blur state
  const toggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  return (
    <div className={`h-auto flex flex-col overflow-hidden`}>
      <div className={`h-full hidden md:block `}>
        <ImageGrid />
      </div>
      <div className={`text-center ${isBlurred ? 'blurred' : ''}`}>
        <Layout from={from} to={to} />
      </div>
      {/* <div className="fixed bottom-0 bg-black justify-center rounded-lg text-xl">
        
      </div> */}
      <div>
      <SpeechRecognizer toggleBlur={toggleBlur} updatefrom={updatefrom} updateto={updateto} />
      </div>
    </div>
  );
}

export default HomePage;
