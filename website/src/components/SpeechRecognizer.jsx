import React, {useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecognizer = ({ toggleBlur , updatefrom , updateto }) => {
        // State to hold the timer ID
    const [timerId, setTimerId] = useState(null);
    const [isLoading,setIsLoading]=useState(false)
    const [checklist, setChecklist] = useState([]);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    useEffect(() => {
        console.log("Transcript updated:", transcript);

        // Start the timer when the transcript is updated
        const newTimerId = setTimeout(() => {
            if(transcript!=""){
                stopListening()
            }
            if (transcript.includes("checklist")) {
            toggleBlur(); // Start listening, so blur the parent component
            setChecklist([
                "2 cartons of eggs",
                "1 loaf of bread",
                "1 bag of sugar (200g)",
                "1 container of cocoa powder (100g)",
                "1 bottle of vanilla extract (1 tsp)",
                "1 liter of milk",
                "1 bottle of vegetable oil (1/2 cup)",
                "1 can of baking powder (1 tsp)",
                "1 box of baking soda (1/2 tsp)",
                "1 box of salt (1/2 tsp)"
            ])
            
            }
            if(transcript.includes("pineapple") && transcript.includes("Ice Cream")){
                console.log("all present")
                updatefrom("pineapple")
                updateto("icecream")
            }
        }, 3000); // 5 seconds

        // Clear the previous timer when the transcript updates again
        if (timerId) {
            clearTimeout(timerId);
        }

        setTimerId(newTimerId);
    }, [transcript]);


    const startListening = () => {
        if (browserSupportsSpeechRecognition) {
            SpeechRecognition.startListening({ continuous: true });
            toggleBlur(); // Start listening, so blur the parent component
        }
    };
 
    const stopListening = () => {
        if (browserSupportsSpeechRecognition) {
            SpeechRecognition.stopListening();
            toggleBlur();
            resetTranscript(); 
        }
    };
    const close =()=>{
        resetTranscript(); 
        setChecklist([])
    }

    if (!browserSupportsSpeechRecognition)
        return <span>Your Browser does not support Speech to Text recognition!</span>;

    return (
        <div>
            
            {!listening&& checklist!=[]&& <ul className="m-5 text-left">
        {checklist.map((ingredient, index) => (
          <li key={index}>
            <input
              type="checkbox"
              className="mr-2 form-checkbox text-indigo-600 h-5 w-5"
              id={`ingredient${index}`}
            />
            <label htmlFor={`ingredient${index}`}>{ingredient}</label>
          </li>
        ))}
      </ul>}
            {listening ?<p className="p-5 m-5">{transcript}</p>:null}
            {checklist.length!=0 &&
                <div>
                <button onClick={close}>
                    close
                </button>
            </div>}
            {isLoading&&<div role="status justify-center ">
                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>}

            {!listening ?
                (checklist.length==0
                    ?
                <button onClick={startListening} style={{background:"none" , width:"100%"}}>Chat with AI</button>
                    :
                null)
                :
                <button onClick={stopListening}>Stop</button>
            }
            {listening&&<button onClick={resetTranscript} className="ml-5">Reset</button>}


            {
                listening && <div className="relative h-2 w-full">
                    <div className="absolute bottom-0 left-0 right-0 h-full w-full animate-gradient" id="glow-content"></div>
                </div>
            }
        </div>
    );
}

export default SpeechRecognizer;
