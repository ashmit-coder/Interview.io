"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const AIInterviewer = ({
  messages,
  inputMessage,
  setInputMessage,
  sendMessage,
}) => (
  <Card className="flex-1 flex flex-col">
    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
      <Avatar className="h-10 w-10 mr-2">
        <AvatarImage src="/ai-avatar.png" alt="AI" />
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <CardTitle className="text-2xl font-bold">AI Interviewer</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 pr-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === "ai" ? "text-left" : "text-right"
            }`}
          >
            <div
              className={`inline-block rounded-lg p-3 ${
                message.sender === "ai"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
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
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </CardFooter>
  </Card>
);
