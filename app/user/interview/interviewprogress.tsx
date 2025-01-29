// Interview Progress Component
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const InterviewProgress = ({ currentStage, stages }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl font-bold">Interview Progress</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {stages.map((stage, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index === currentStage ? "font-bold" : ""
            }`}
          >
            <span
              className={`mr-2 ${
                index <= currentStage ? "text-green-500" : "text-gray-400"
              }`}
            >
              {index <= currentStage ? "✓" : "○"}
            </span>
            {stage}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);
