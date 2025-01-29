"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Video, VideoOff } from "lucide-react";

// Candidate Video Component
export const CandidateVideo = ({ isStreamActive, videoRef, toggleStream }) => (
  <Card className="flex-1 flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-2xl font-bold">Candidate Video</CardTitle>
      <Button onClick={toggleStream} variant="outline" size="icon">
        {isStreamActive ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
      </Button>
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
    </CardContent>
  </Card>
)
