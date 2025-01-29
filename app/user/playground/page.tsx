"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import axios from "axios";

const questions = [
  {
    id: 1,
    title: "Add Two Numbers",
    description:
      "Write a function that takes two numbers as input and returns their sum.",
    testCases: [
      { input: "5 3", expectedOutput: "8" },
      { input: "-1 7", expectedOutput: "6" },
      { input: "0 0", expectedOutput: "0" },
    ],
  },
  {
    id: 2,
    title: "Reverse a String",
    description:
      "Write a function that takes a string as input and returns the string reversed.",
    testCases: [
      { input: "hello", expectedOutput: "olleh" },
      { input: "world", expectedOutput: "dlrow" },
      { input: "abcd", expectedOutput: "dcba" },
    ],
  },
  {
    id: 3,
    title: "Find Maximum Number",
    description:
      "Write a function that finds the maximum number in an array of integers.",
    testCases: [
      { input: "1 3 5 2 4", expectedOutput: "5" },
      { input: "-1 -5 -2 -8 -3", expectedOutput: "-1" },
      { input: "100 0 50 75", expectedOutput: "100" },
    ],
  },
];

export default function CodingPlayground() {
  const [language, setLanguage] = useState("py");
  const [code, setCode] = useState("# Write your code here...");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [testResults, setTestResults] = useState([]);

  const executeCode = async (codeInput) => {
    const data = new URLSearchParams();
    data.append("code", code);
    data.append("language", language);
    data.append("input", codeInput);

    try {
      const response = await axios.post("https://api.codex.jaagrav.in", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const result = response.data;
      return result.output || "Error: Could not get output.";
    } catch (error) {
      return "Error: Unable to reach Codex API.";
    }
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("Running code...");
    const result = await executeCode(input);
    setOutput(result);
    setIsLoading(false);
  };

  const runTestCases = async () => {
    setIsLoading(true);
    const results = await Promise.all(
      currentQuestion.testCases.map(async (testCase) => {
        const output = await executeCode(testCase.input);
        return {
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput: output.trim(),
          isCorrect: output.trim() === testCase.expectedOutput,
        };
      })
    );
    setTestResults(results);
    setIsLoading(false);
  };

  const getCodeMirrorLanguage = () => {
    switch (language) {
      case "py":
        return python();
      case "cpp":
        return cpp();
      case "java":
        return java();
      default:
        return python();
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[calc(100vh-2rem)] rounded-lg border"
    >
      <ResizablePanel defaultSize={50} minSize={30}>
        <ScrollArea className="h-[calc(100vh-2rem)]">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Coding Playground</h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Select Question</h2>
                <Select
                  value={currentQuestion.id.toString()}
                  onValueChange={(value) => {
                    setCurrentQuestion(
                      questions.find((q) => q.id.toString() === value) ||
                        questions[0]
                    );
                    setTestResults([]);
                    setOutput("");
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a question" />
                  </SelectTrigger>
                  <SelectContent>
                    {questions.map((question) => (
                      <SelectItem
                        key={question.id}
                        value={question.id.toString()}
                      >
                        {question.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{currentQuestion.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{currentQuestion.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentQuestion.testCases.map((testCase, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>
                          Input: {testCase.input} | Expected:{" "}
                          {testCase.expectedOutput}
                        </span>
                        {testResults[index] && (
                          <Badge
                            variant={
                              testResults[index].isCorrect
                                ? "success"
                                : "destructive"
                            }
                          >
                            {testResults[index].isCorrect ? "Passed" : "Failed"}
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Custom Input</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your custom input here..."
                    className="h-24"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 p-4 rounded-md min-h-[100px] whitespace-pre-wrap">
                    {isLoading ? "Loading..." : output}
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50} minSize={30}>
        <div className="h-full p-6 overflow-y-auto">
          <div className="flex gap-4 mb-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="py">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleRunCode}>Run Code</Button>
            <Button onClick={runTestCases}>Run Test Cases</Button>
          </div>

          <CodeMirror
            value={code}
            height="calc(100vh - 7rem)"
            extensions={[getCodeMirrorLanguage()]}
            onChange={(value) => setCode(value)}
            theme="dark"
            className="border rounded-md"
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
