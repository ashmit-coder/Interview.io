"use client";

import { useSession } from "next-auth/react";
import { BreadcrumbDemo } from "./components/Path";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  FileText,
  MessageSquare,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export default function CandidateDashboard() {
  const { data: session } = useSession();

  // Mock data - replace with actual data fetching in a real application
  const applications = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TechCorp",
      status: "Interview Scheduled",
      progress: 60,
    },
    {
      id: 2,
      role: "UX Designer",
      company: "DesignHub",
      status: "Application Submitted",
      progress: 20,
    },
    {
      id: 3,
      role: "Product Manager",
      company: "InnovateCo",
      status: "Under Review",
      progress: 40,
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "TechCorp",
      date: "2024-03-15T14:00:00",
      type: "Technical Interview",
    },
  ];

  const tasks = [
    { id: 1, title: "Complete coding challenge", deadline: "2024-03-10" },
    { id: 2, title: "Submit portfolio", deadline: "2024-03-12" },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <BreadcrumbDemo />

      <h1 className="text-3xl font-bold">
        Welcome back, {session?.user?.name}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Job Applications</CardTitle>
            <CardDescription>Track your current applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {applications.map((app) => (
                <li key={app.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{app.role}</span>
                    <Badge
                      variant={
                        app.status === "Interview Scheduled"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{app.company}</p>
                  <Progress value={app.progress} className="h-2" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>
              Prepare for your scheduled interviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingInterviews.length > 0 ? (
              <ul className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <li
                    key={interview.id}
                    className="flex items-center space-x-4"
                  >
                    <CalendarDays className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {interview.role} at {interview.company}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(interview.date).toLocaleString()}
                      </p>
                      <Badge variant="outline">{interview.type}</Badge>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                No upcoming interviews scheduled.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Complete these to move forward</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>{task.title}</span>
                  </div>
                  <Badge variant="outline">
                    Due {new Date(task.deadline).toLocaleDateString()}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interview Preparation</CardTitle>
            <CardDescription>Resources to help you succeed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                Company Research
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Common Interview Questions
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Insights</CardTitle>
            <CardDescription>
              Understand your application performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Applications Submitted</span>
                  <span className="font-medium">3</span>
                </div>
                <Progress value={60} className="h-2 mt-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Interview Success Rate</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
