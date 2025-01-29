export interface Question {
  id: number;
  text: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
}

export async function getQuestions(
  type: string,
  name: string
): Promise<Question[]> {
  // In a real application, this would fetch data from a database
  // For now, we'll return mock data
  return [
    
    {
      id: 1,
      text: "What is the output of print(type([1, 2, 3]))?",
      options: [
        { label: "int", value: "a" },
        { label: "list", value: "b" },
        { label: "tuple", value: "c" },
        { label: "dict", value: "d" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      text: "Which of the following is not a valid variable name in Python?",
      options: [
        { label: "_variable", value: "a" },
        { label: "variable123", value: "b" },
        { label: "123variable", value: "c" },
        { label: "variable_name", value: "d" },
      ],
      correctAnswer: "c",
    },
    // Add more questions as needed
  ];
}
