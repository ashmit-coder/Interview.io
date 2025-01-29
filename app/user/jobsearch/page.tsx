"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for job listings
const jobListings = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "New York, NY",
    type: "Full-time",
    experience: "Mid-level",
    description:
      "We are seeking a talented Frontend Developer to join our team...",
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    location: "San Francisco, CA",
    type: "Contract",
    experience: "Senior",
    description:
      "Join our creative team as a UX Designer and help shape the future of our products...",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-level",
    description:
      "Exciting opportunity for a Data Scientist to work on cutting-edge projects...",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-level",
    description:
      "Exciting opportunity for a Data Scientist to work on cutting-edge projects...",
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-level",
    description:
      "Exciting opportunity for a Data Scientist to work on cutting-edge projects...",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-level",
    description:
      "Exciting opportunity for a Data Scientist to work on cutting-edge projects...",
  },
  {
    id: 7,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-level",
    description:
      "Exciting opportunity for a Data Scientist to work on cutting-edge projects...",
  },
  {
    id: 8,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-level",
    description:
      "Exciting opportunity for a Data Scientist to work on cutting-edge projects...",
  },
  {
    id: 9,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-level",
    description:
      "Exciting opportunity for a Data Scientist to work on cutting-edge projects...",
  },
  {
    id: 9,
    title: "Data Scientist",
    company: "DataTech",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-level",
    description:
      "Exciting opportunity for a Data Scientist to work on cutting-edge projects...",
  },
];

const ITEMS_PER_PAGE = 5;

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("all");
  const [jobType, setJobType] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    coverLetter: "",
  });
  const { toast } = useToast();

  const handleResumeUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setResumeUploaded(true);
      toast({
        title: "Resume Uploaded",
        description: "Your resume has been successfully uploaded.",
      });
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (value) => {
    setApplicationForm((prev) => ({ ...prev, experience: value }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    console.log("Submitting application for job:", selectedJob);
    console.log("Application data:", applicationForm);
    // Here you would typically send the application data to your backend
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted.",
    });
    setSelectedJob(null);
    setApplicationForm({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
    });
  };

  const filteredJobs = jobListings.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === "all" || job.location === location) &&
      (jobType === "all" || job.type === jobType) &&
      (experienceLevel === "all" || job.experience === experienceLevel)
  );

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Find Your Dream Job</h1>

      {!resumeUploaded && (
        <div className="flex items-center justify-center">
          <Button>
            <label htmlFor="resume-upload" className="cursor-pointer">
              Upload Resume to View Jobs
            </label>
          </Button>
          <Input
            type="file"
            id="resume-upload"
            accept=".pdf, .doc, .docx"
            onChange={handleResumeUpload}
            className="hidden"
          />
        </div>
      )}

      {resumeUploaded && !selectedJob && (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Location</SelectItem>
                <SelectItem value="New York, NY">New York, NY</SelectItem>
                <SelectItem value="San Francisco, CA">
                  San Francisco, CA
                </SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Type</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Level</SelectItem>
                <SelectItem value="Entry-level">Entry-level</SelectItem>
                <SelectItem value="Mid-level">Mid-level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full md:w-auto">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>

          <div className="space-y-4">
            {paginatedJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>{job.company}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <MapPin className="mr-1 h-3 w-3" />
                      {job.location}
                    </Badge>
                    <Badge variant="secondary">
                      <Briefcase className="mr-1 h-3 w-3" />
                      {job.type}
                    </Badge>
                    <Badge variant="secondary">
                      <Clock className="mr-1 h-3 w-3" />
                      {job.experience}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleApply(job)}>Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}

      {selectedJob && (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Apply for {selectedJob.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitApplication} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={applicationForm.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={applicationForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={applicationForm.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select
                  name="experience"
                  value={applicationForm.experience}
                  onValueChange={handleExperienceChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5+">5+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={applicationForm.coverLetter}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedJob(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  onClick={() => {
                    toast({
                      title: "Application Submitted",
                      description:
                        "Your application has been successfully submitted.",
                    });
                  }}
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
