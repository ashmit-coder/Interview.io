"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Clock,
  CheckCircle2,
  Moon,
  Sun,
  Settings,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import axios from "axios";

const AIInterview = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [interviewProgress, setInterviewProgress] = useState(0);
  const [interviewDuration, setInterviewDuration] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [candidateResponse, setCandidateResponse] = useState("");
  const { setTheme, theme } = useTheme();
  const candidateResponseRef = useRef<string>("");
  const [questions, setQuestions] = useState([
    "Tell me about yourself and your background in software development.",
    "What programming languages are you most proficient in?",
  ]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  const interviewStages = [
    { name: "Introduction", completed: false },
    { name: "Technical Skills", completed: false },
    { name: "Work Experience", completed: false },
    { name: "Behavioral Questions", completed: false },
    { name: "Q&A", completed: false },
  ];

  // const questions = [
  //   "Tell me about yourself and your background in software development.",
  //   "What programming languages are you most proficient in?",
  //   "Can you describe a challenging project you've worked on recently?",
  //   "How do you handle disagreements with team members?",
  //   "Do you have any questions for us about the position or company?",
  // ];

  const enableVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      setIsStreamActive(true);
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  const stopVideoStream = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
      setMediaStream(null);
      setIsStreamActive(false);
    }
  };

  const toggleAudio = () => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioMuted(!audioTrack.enabled);
    }
  };

  const toggleCamera = () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsCameraOn(videoTrack.enabled);
    }
  };

  const textToSpeech = (text: string) => {
    const utterance = new window.SpeechSynthesisUtterance(text);

    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.log(error);
    }
  };

  const initializeSpeechRecognition = () => {
    const SpeechRecognition = window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        var finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        // Update only when final transcript is available
        if (finalTranscript) {
          setCandidateResponse((prev) => prev + finalTranscript);
          candidateResponseRef.current += finalTranscript; // Use final transcript for useRef
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        // setIsListening(false);
      };

      // recognitionInstance.onend = () => {
      //   setIsListening(false);
      // };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const sendResponseToBackend = async () => {

    if (isStreamActive && currentStage != 1) {
      return;
    }
    if (questions.length >= 5) {
      return;
    }

    axios
      .post(
        "http://127.0.0.1:5000/api/generate-questions",
        {
          intro: candidateResponseRef.current,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const newQuestions = response.data.questions;
        // i dont need the 1rd question
        setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
        console.log(questions)
        console.log(newQuestions + "ashmit")

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const askNextQuestion = () => {
    stopListening();
    sendResponseToBackend();
    if (currentStage < questions.length) {
      const nextQuestion = questions[currentStage];
      setCurrentQuestion(nextQuestion);
      textToSpeech(nextQuestion);
      setCurrentStage((prev) => {
        const newStage = prev + 1;
        const updatedStages = [...interviewStages];
        updatedStages[prev].completed = true;
        return newStage;
      });
      setInterviewProgress((prev) => Math.min(prev + 20, 100));
      setCandidateResponse("");
      candidateResponseRef.current = ""; // Reset useRef instead of useState

      setTimeout(() => {
        startListening();
      }, 1000);
    } else {
      setCurrentQuestion(
        "Thank you for your time. The interview is now complete."
      );
      textToSpeech("Thank you for your time. The interview is now complete.");
    }
  };

  useEffect(() => {
    enableVideoStream();
    initializeSpeechRecognition();
    const timer = setInterval(() => {
      setInterviewDuration((prev) => prev + 1);
    }, 1000);
    return () => {
      stopVideoStream();
      // stopListening();
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && mediaStream) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [videoRef, mediaStream]);

  useEffect(() => {
    if (isStreamActive && currentStage === 0) {
      askNextQuestion();
    }
  }, [isStreamActive, currentStage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-background">
        <div className="flex-1 p-6 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">
                Candidate Video
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-lg">
                  <Clock className="mr-1 h-4 w-4" />
                  {formatTime(interviewDuration)}
                </Badge>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                />
                <Label htmlFor="dark-mode" className="sr-only">
                  Dark Mode
                </Label>
              </div>
            </CardHeader>
            <CardContent className="flex-1 relative">
              <div className="absolute inset-0 bg-muted rounded-lg overflow-hidden">
                {isStreamActive ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Camera is off</p>
                  </div>
                )}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <Progress value={interviewProgress} className="w-full" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-4">
              <Button
                variant={isStreamActive ? "destructive" : "default"}
                onClick={isStreamActive ? stopVideoStream : enableVideoStream}
              >
                {isStreamActive ? "End Interview" : "Start Interview"}
              </Button>
              <div className="space-x-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleAudio}
                      disabled={!isStreamActive}
                    >
                      {isAudioMuted ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isAudioMuted ? "Unmute" : "Mute"} microphone</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleCamera}
                      disabled={!isStreamActive}
                    >
                      {isCameraOn ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <VideoOff className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isCameraOn ? "Turn off" : "Turn on"} camera</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        </div>
        <Separator orientation="vertical" />
        <div className="flex-1 p-6 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/ai-avatar.png" alt="AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                AI Interviewer
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light Mode</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  <div className="bg-primary text-primary-foreground p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Current Question:</h3>
                    <p>{currentQuestion}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Your Response:</h3>
                    <p>{candidateResponseRef.current}</p>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button onClick={askNextQuestion} className="w-full">
                {!isStreamActive ? "End Interview" : "Next Question"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <Separator orientation="vertical" />
        <div className="w-80 p-6 flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Interview Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interviewStages.map((stage, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className={index === currentStage ? "font-bold" : ""}>
                      {stage.name}
                    </span>
                    <CheckCircle2
                      className={`h-5 w-5 ${
                        index < currentStage
                          ? "text-green-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AIInterview;
