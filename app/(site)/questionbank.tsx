"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function QuestionBank() {
  const categories = [
    "Technical",
    "Behavioral",
    "Leadership",
    "Problem Solving",
    "Cultural Fit",
  ];

  const sampleQuestions = [
    {
      category: "Technical",
      question: "Explain the concept of recursion and provide an example.",
    },
    {
      category: "Behavioral",
      question:
        "Describe a time when you had to work with a difficult team member. How did you handle it?",
    },
    {
      category: "Leadership",
      question: "How do you motivate team members during challenging projects?",
    },
    {
      category: "Problem Solving",
      question: "How would you approach debugging a complex system issue?",
    },
    {
      category: "Cultural Fit",
      question: "What type of work environment do you thrive in?",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Question Bank</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access our extensive library of curated interview questions to
            ensure comprehensive candidate assessment.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Sample Questions</h3>
          <div className="space-y-4">
            {sampleQuestions.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-lg shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-semibold text-blue-600">
                  {item.category}
                </span>
                <p className="mt-2">{item.question}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Button size="lg">Explore Full Question Bank</Button>
        </motion.div>
      </div>
    </section>
  );
}
