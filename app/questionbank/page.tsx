"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Code,
  Building2,
  BarChart3,
  Zap,
  Trophy,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const questionCategories = [
  {
    type: "topic",
    items: [
      {
        name: "Python",
        count: 50,
        difficulty: "Medium",
        icon: <Code className="h-6 w-6" />,
      },
      {
        name: "JavaScript",
        count: 40,
        difficulty: "Easy",
        icon: <Code className="h-6 w-6" />,
      },
      {
        name: "Java",
        count: 45,
        difficulty: "Hard",
        icon: <Code className="h-6 w-6" />,
      },
      {
        name: "C++",
        count: 35,
        difficulty: "Medium",
        icon: <Code className="h-6 w-6" />,
      },
      {
        name: "SQL",
        count: 30,
        difficulty: "Easy",
        icon: <Code className="h-6 w-6" />,
      },
    ],
  },
  {
    type: "company",
    items: [
      {
        name: "Google",
        count: 100,
        difficulty: "Hard",
        icon: <Building2 className="h-6 w-6" />,
      },
      {
        name: "Amazon",
        count: 90,
        difficulty: "Medium",
        icon: <Building2 className="h-6 w-6" />,
      },
      {
        name: "Microsoft",
        count: 80,
        difficulty: "Medium",
        icon: <Building2 className="h-6 w-6" />,
      },
      {
        name: "Facebook",
        count: 70,
        difficulty: "Hard",
        icon: <Building2 className="h-6 w-6" />,
      },
      {
        name: "Apple",
        count: 60,
        difficulty: "Medium",
        icon: <Building2 className="h-6 w-6" />,
      },
    ],
  },
  {
    type: "difficulty",
    items: [
      { name: "Easy", count: 100, icon: <Zap className="h-6 w-6" /> },
      { name: "Medium", count: 150, icon: <BarChart3 className="h-6 w-6" /> },
      { name: "Hard", count: 80, icon: <Trophy className="h-6 w-6" /> },
    ],
  },
];

const CategoryCard = ({ item, type }: any) => (
  <Link href={`/questionbank/${type}/${item.name.toLowerCase()}`}>
    <Card className="hover:shadow-lg transition-all cursor-pointer h-full group">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
            {item.name}
          </CardTitle>
          <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
            {item.icon}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <span className="font-semibold">{item.count}</span> questions
        </CardDescription>
        {item.difficulty && (
          <CardDescription>
            Difficulty: <span className="font-semibold">{item.difficulty}</span>
          </CardDescription>
        )}
      </CardContent>
    </Card>
  </Link>
);

export default function QuestionBank() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = questionCategories.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-7xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Question Bank</h1>
          <p className="text-xl text-gray-600">
            Explore our vast collection of interview questions
          </p>
        </motion.div>

        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 text-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="topic" className="mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="topic">By Topic</TabsTrigger>
              <TabsTrigger value="company">By Company</TabsTrigger>
              <TabsTrigger value="difficulty">By Difficulty</TabsTrigger>
            </TabsList>
            {filteredCategories.map((category, index) => (
              <TabsContent key={index} value={category.type}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: itemIndex * 0.1 }}
                    >
                      <CategoryCard item={item} type={category.type} />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <BookOpen className="mr-2 h-5 w-5" />
            Explore All Questions
          </Button>
        </motion.div>
      </div>
    </>
  );
}
