"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import axios from "axios";
import Navbar from "@/components/Navbar";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
}

export default function QuestionsPage() {
  const params = useParams();
  const { type, name } = params;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAnswers, setShowAnswers] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<Question[]>(
          `/api/question?type=${type}&name=${name}`
        );
        setQuestions(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [type, name]);

  const toggleAnswer = (questionId: number) => {
    setShowAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading questions...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Questions for {name} ({type})
        </h1>

        {questions.map((question) => (
          <Card key={question.id} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                {question.id}. {question.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup name={`question-${question.id}`}>
                {question.options.map((option) => (
                  <div
                    className="flex items-center space-x-2"
                    key={option.value}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`q${question.id}-${option.value}`}
                    />
                    <Label htmlFor={`q${question.id}-${option.value}`}>
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => toggleAnswer(question.id)}
                >
                  {showAnswers[question.id] ? "Hide Answer" : "Show Answer"}
                </Button>
                {showAnswers[question.id] && (
                  <p className="mt-2 font-medium text-green-600">
                    Correct Answer:{" "}
                    {
                      question.options.find(
                        (o) => o.value === question.correctAnswer
                      )?.label
                    }
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
