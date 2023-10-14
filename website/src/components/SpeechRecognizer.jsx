import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecognizer = ({ toggleBlur }) => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        console.log("Transcript updated:", transcript);
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
            toggleBlur(); // Stop listening, so remove blur from the parent component
        }
    };

    if (!browserSupportsSpeechRecognition)
        return <span>Your Browser does not support Speech to Text recognition!</span>;

    return (
        <div>
            {listening ?<p className="p-5 m-5">{transcript}</p>:null}

            {!listening ?
                <button onClick={startListening} style={{background:"none" , width:"100%"}}>Chat with AI</button>
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
