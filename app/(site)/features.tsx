"use client";
import { motion } from "framer-motion";
import { Cpu, Users, BarChart, Globe } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Cpu className="h-10 w-10 text-blue-500" />,
      title: "AI-Powered Insights",
      description:
        "Leverage machine learning algorithms to gain deep insights into candidate performance and potential.",
    },
    {
      icon: <Users className="h-10 w-10 text-green-500" />,
      title: "Collaborative Interviews",
      description:
        "Conduct panel interviews with ease, allowing multiple team members to participate from anywhere.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-purple-500" />,
      title: "Advanced Analytics",
      description:
        "Track and analyze interview data to optimize your hiring process and make informed decisions.",
    },
    {
      icon: <Globe className="h-10 w-10 text-red-500" />,
      title: "Global Talent Pool",
      description:
        "Access a diverse range of candidates from around the world, breaking geographical barriers.",
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the tools that will transform your hiring process and give
            you a competitive edge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-block p-3 bg-gray-100 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
