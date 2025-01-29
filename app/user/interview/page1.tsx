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
  MessageSquare,
  Send,
  Clock,
  CheckCircle2,
  Moon,
  Sun,
  Settings,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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

export default function ProfessionalAIInterview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [messages, setMessages] = useState<
    { sender: "ai" | "user"; content: string }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [interviewProgress, setInterviewProgress] = useState(0);
  const [interviewDuration, setInterviewDuration] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const { setTheme, theme } = useTheme();

  const interviewStages = [
    { name: "Introduction", completed: false },
    { name: "Technical Skills", completed: false },
    { name: "Work Experience", completed: false },
    { name: "Behavioral Questions", completed: false },
    { name: "Q&A", completed: false },
  ];

  const enableVideoStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsStreamActive(true);
      setIsCameraOn(true);
      setIsAudioMuted(false);
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
      setIsCameraOn(false);
      setIsAudioMuted(true);
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

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: "user", content: inputMessage }]);
      setInputMessage("");
      // Simulate AI response and progress
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            content:
              "Thank you for your response. Let's move on to the next question.",
          },
        ]);
        setInterviewProgress((prev) => Math.min(prev + 20, 100));
        setCurrentStage((prev) => {
          const newStage = Math.min(prev + 1, interviewStages.length - 1);
          const updatedStages = [...interviewStages];
          updatedStages[prev].completed = true;
          return newStage;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        content:
          "Welcome to your AI interview. Let's begin with your introduction. Please tell me about yourself.",
      },
    ]);
    const timer = setInterval(() => {
      setInterviewDuration((prev) => prev + 1);
    }, 1000);
    return () => {
      stopVideoStream();
      clearInterval(timer);
    };
  }, []);

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
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>View Transcript</span>
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
              <ScrollArea className="flex-1 pr-4 overflow-y-auto">
                <div className="flex flex-col space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "ai"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.sender === "ai"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type your response..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" size="icon" onClick={sendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>
              </div>
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
}
