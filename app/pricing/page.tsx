"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";

function PricingPage() {
  const plans = [
    {
      title: "Basic",
      price: "$0",
      description: "For personal use and small projects.",
      features: ["1 User", "Basic Support", "5 GB Storage"],
      badge: "Free",
    },
    {
      title: "Pro",
      price: "$19",
      description: "For freelancers and small teams.",
      features: [
        "5 Users",
        "Priority Support",
        "50 GB Storage",
        "Advanced Analytics",
      ],
      badge: "Popular",
    },
    {
      title: "Enterprise",
      price: "$49",
      description: "For large teams and businesses.",
      features: [
        "Unlimited Users",
        "Dedicated Support",
        "200 GB Storage",
        "Custom Integrations",
        "SLA",
      ],
      badge: "Custom",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-8">
          Choose the plan that&apos;s right for you
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
                index === 1 ? "border-primary shadow-lg" : ""
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">
                    {plan.title}
                  </CardTitle>
                  {plan.badge && (
                    <Badge
                      variant={index === 1 ? "default" : "secondary"}
                      className="text-sm font-medium"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-muted-foreground mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-4xl font-bold mb-4">
                  {plan.price}
                  <span className="text-lg font-normal text-muted-foreground">
                    /month
                  </span>
                </p>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={index === 1 ? "default" : "outline"}
                  className="w-full"
                >
                  Choose {plan.title}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default PricingPage;
