"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Calendar,
  MoreHorizontal,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Code,
  Bot,
} from "lucide-react";

// Mock data for job posts and applicants
const jobPosts = [
  {
    id: 1,
    title: "Senior React Developer",
    department: "Engineering",
    location: "Remote",
    postedDate: "2023-05-01",
    applicants: 2,
    jobType: "Full-time",
    ctc: "$120,000 - $150,000",
  },
  {
    id: 2,
    title: "UX Designer",
    department: "Design",
    location: "New York, NY",
    postedDate: "2023-05-15",
    applicants: 1,
    jobType: "Full-time",
    ctc: "$90,000 - $120,000",
  },
  {
    id: 3,
    title: "Marketing Intern",
    department: "Marketing",
    location: "San Francisco, CA",
    postedDate: "2023-05-20",
    applicants: 0,
    jobType: "Internship",
    ctc: "$25/hour",
    duration: "3 months",
  },
];

const applicants = [
  {
    id: 1,
    jobId: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    experience: "5 years",
    education: "MS in Computer Science",
    status: "New",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    codingScore: 85,
    aiInterviewScore: 92,
  },
  {
    id: 2,
    jobId: 1,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 (555) 987-6543",
    experience: "8 years",
    education: "BS in Software Engineering",
    status: "Reviewed",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    codingScore: 78,
    aiInterviewScore: 88,
  },
  {
    id: 3,
    jobId: 2,
    name: "Carol Davis",
    email: "carol.davis@example.com",
    phone: "+1 (555) 246-8135",
    experience: "3 years",
    education: "BFA in Graphic Design",
    status: "Interview Scheduled",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    codingScore: 92,
    aiInterviewScore: 95,
  },
];

export default function JobResponseViewer() {
  const [selectedJob, setSelectedJob] = useState(jobPosts[0]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const jobApplicants = applicants.filter(
    (applicant) => applicant.jobId === selectedJob.id
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Job Postings and Applicants</h1>

      <Tabs
        defaultValue={selectedJob.id.toString()}
        onValueChange={(value) =>
          setSelectedJob(jobPosts.find((job) => job.id.toString() === value))
        }
      >
        <TabsList className="mb-4">
          {jobPosts.map((job) => (
            <TabsTrigger key={job.id} value={job.id.toString()}>
              {job.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {jobPosts.map((job) => (
          <TabsContent key={job.id} value={job.id.toString()}>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>
                  {job.department} • {job.location} • Posted on {job.postedDate}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {job.applicants} applicants
                </p>
                <p className="text-sm">
                  <strong>Job Type:</strong> {job.jobType}
                </p>
                <p className="text-sm">
                  <strong>CTC:</strong> {job.ctc}
                </p>
                {job.duration && (
                  <p className="text-sm">
                    <strong>Duration:</strong> {job.duration}
                  </p>
                )}
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Applicants</h2>

            <div className="grid gap-4">
              {jobApplicants.map((applicant) => (
                <Card key={applicant.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={applicant.avatarUrl}
                            alt={applicant.name}
                          />
                          <AvatarFallback>
                            {applicant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">
                            {applicant.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {applicant.email}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          applicant.status === "New"
                            ? "default"
                            : applicant.status === "Reviewed"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {applicant.status}
                      </Badge>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-4">
                        <Button variant="outline" size="sm">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Interview
                        </Button>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto"
                            onClick={() => setSelectedApplicant(applicant)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Applicant Details</DialogTitle>
                            <DialogDescription>
                              Detailed information about the applicant.
                            </DialogDescription>
                          </DialogHeader>
                          {selectedApplicant && (
                            <ScrollArea className="mt-4 h-[400px] rounded-md border p-4">
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                  <Avatar>
                                    <AvatarImage
                                      src={selectedApplicant.avatarUrl}
                                      alt={selectedApplicant.name}
                                    />
                                    <AvatarFallback>
                                      {selectedApplicant.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="text-lg font-semibold">
                                      {selectedApplicant.name}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {selectedApplicant.email}
                                    </p>
                                  </div>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <Phone className="mr-2 h-4 w-4" />
                                    <span>{selectedApplicant.phone}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Briefcase className="mr-2 h-4 w-4" />
                                    <span>
                                      {selectedApplicant.experience} of
                                      experience
                                    </span>
                                  </div>
                                  <div className="flex items-center">
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    <span>{selectedApplicant.education}</span>
                                  </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                  <h5 className="font-semibold">
                                    Assessment Scores
                                  </h5>
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">
                                        Coding Round
                                      </span>
                                      <span className="text-sm font-medium">
                                        {selectedApplicant.codingScore}%
                                      </span>
                                    </div>
                                    <Progress
                                      value={selectedApplicant.codingScore}
                                      className="w-full"
                                    />
                                  </div>
                                  <div>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm font-medium">
                                        AI Interview
                                      </span>
                                      <span className="text-sm font-medium">
                                        {selectedApplicant.aiInterviewScore}%
                                      </span>
                                    </div>
                                    <Progress
                                      value={selectedApplicant.aiInterviewScore}
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                                <Separator />
                                <div>
                                  <h5 className="font-semibold mb-2">
                                    Application Response
                                  </h5>
                                  <p className="text-sm">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                  </p>
                                </div>
                              </div>
                            </ScrollArea>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
