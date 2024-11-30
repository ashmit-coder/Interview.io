'use client';

import React, { useRef, useState, useEffect } from 'react';

const CamScreen = () => {
    const videoRef = useRef(null);
    const [mediaStream, setMediaStream] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [speechText, setSpeechText] = useState('');

    const sendVideoData = (data) => {
        // Placeholder for sending video data, depending on your socket setup
        socket.emit("videoData", data);
    };

    function textToSpeech(text) {
        const utterance = new window.SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }

    function getSpeechToText() {
        const SpeechRecognition = window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        return recognition;
    }

    useEffect(() => {
        const enableVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setMediaStream(stream);
            } catch (error) {
                console.error('Error accessing webcam', error);
            }
        };
        enableVideoStream();
    }, []);

    useEffect(() => {
        if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [videoRef, mediaStream]);

    useEffect(() => {
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [mediaStream]);

    const handleSpeechRecognition = () => {
        const recognition = getSpeechToText();

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            setIsListening(false);
            setIsThinking(true);
            setSpeechText(text);
            // Simulate processing and then speak
            setTimeout(() => {
                textToSpeech(text);
                setIsThinking(false);
            }, 500);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            setIsThinking(false);
        };

        recognition.onspeechend = () => {
            recognition.stop();
        };

        recognition.start();
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-500">
            <div className="bg-black shadow-xl rounded-2xl p-6 w-80 space-y-4">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-white mt-2">Voice Assistant</h1>
                </div>

                {/* Webcam Video */}
                <div className="flex justify-center">
                    <video ref={videoRef} autoPlay={true} className="w-full h-auto rounded-lg" />
                </div>

                {/* Voice Assistant Bubble */}
                <div className="flex items-center justify-center">
                    <div
                        id="assistant-bubble"
                        className={`bg-white text-black p-3 rounded-2xl shadow-md ${!isListening && !isThinking ? 'hidden' : 'inline-block'}`}
                        style={{ animation: 'typing 1s infinite' }}
                    >
                        <span id="assistant-text">
                            {isListening ? 'Listening...' : isThinking ? 'Thinking...' : ''}
                        </span>
                    </div>
                </div>

                {/* Start Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleSpeechRecognition}
                        disabled={isListening || isThinking}
                        className={`${
                            isListening || isThinking
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700'
                        } text-white font-medium py-2 px-6 rounded-full shadow-md transition duration-300 focus:outline-none`}
                    >
                        {isListening || isThinking ? 'Processing...' : 'Start'}
                    </button>
                </div>

                {/* Speech result display */}
                {speechText && (
                    <div className="text-center text-white">
                        <p>Speech: {speechText}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CamScreen;
