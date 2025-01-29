"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";

const JobPostPage = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [ctc, setCtc] = useState("");
  const [duration, setDuration] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [requirements, setRequirements] = useState("");
  const [jobOpenings, setJobOpenings] = useState(1);
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Add submit logic, e.g., sending to an API
    console.log({
      jobTitle,
      jobDescription,
      location,
      ctc,
      duration,
      jobType,
      requirements,
      jobOpenings,
      experience,
      education,
      responsibilities,
    });
  };

  return (
    <div className="container p-6">
      <Card className="shadow-lg p-6 w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4">Create a Job Post</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 2-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium">
                  Job Title
                </label>
                <Input
                  id="jobTitle"
                  placeholder="Enter the job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Job Type */}
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium">
                  Job Type
                </label>
                <Select
                  id="jobType"
                  onChange={(e: any) => setJobType(e.target.value)}
                  className="w-full"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FullTime">Full Time</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* CTC */}
              <div>
                <label htmlFor="ctc" className="block text-sm font-medium">
                  CTC (Cost to Company)
                </label>
                <Input
                  id="ctc"
                  placeholder="Enter CTC"
                  value={ctc}
                  onChange={(e) => setCtc(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Duration (Only for Internship) */}
              {jobType === "Internship" && (
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium"
                  >
                    Duration
                  </label>
                  <Input
                    id="duration"
                    placeholder="Enter duration (e.g., 6 months)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Experience Level */}
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium"
                >
                  Experience Level
                </label>
                <Input
                  id="experience"
                  placeholder="Enter required experience (e.g., 2-3 years)"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Education Requirements */}
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium"
                >
                  Education Requirements
                </label>
                <Input
                  id="education"
                  placeholder="Enter education requirements (e.g., Bachelor's degree)"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Number of Job Openings */}
              <div>
                <label
                  htmlFor="jobOpenings"
                  className="block text-sm font-medium"
                >
                  Number of Openings
                </label>
                <Input
                  id="jobOpenings"
                  type="number"
                  placeholder="Enter number of job openings"
                  value={jobOpenings}
                  onChange={(e) => setJobOpenings(e.target.value)}
                  className="w-full"
                  min={1}
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label
                htmlFor="jobDescription"
                className="block text-sm font-medium"
              >
                Job Description
              </label>
              <Textarea
                id="jobDescription"
                placeholder="Describe the job"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>

            {/* Job Responsibilities */}
            <div>
              <label
                htmlFor="responsibilities"
                className="block text-sm font-medium"
              >
                Responsibilities
              </label>
              <Textarea
                id="responsibilities"
                placeholder="List job responsibilities"
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>

            {/* Requirements */}
            <div>
              <label
                htmlFor="requirements"
                className="block text-sm font-medium"
              >
                Requirements
              </label>
              <Textarea
                id="requirements"
                placeholder="List job requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>

            {/* Preview & Submit */}
            <div className="flex justify-between items-center mt-6">
              <Button
                type="button"
                onClick={() => setShowPreview(true)}
                variant="outline"
              >
                Preview
              </Button>
              <Button type="submit" className="ml-4">
                Post Job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <Card className="p-6 w-96">
            <CardHeader>
              <h2 className="text-xl font-semibold">Job Post Preview</h2>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-bold">{jobTitle}</h3>
              <p className="mt-2">{jobDescription}</p>
              <p className="mt-4">
                <strong>Location:</strong> {location}
              </p>
              <p className="mt-1">
                <strong>CTC:</strong> {ctc}
              </p>
              <p className="mt-1">
                <strong>Duration:</strong> {duration}
              </p>
              <p className="mt-1">
                <strong>Job Type:</strong> {jobType}
              </p>
              <p className="mt-1">
                <strong>Requirements:</strong> {requirements}
              </p>
              <p className="mt-1">
                <strong>Responsibilities:</strong> {responsibilities}
              </p>
              <p className="mt-1">
                <strong>Openings:</strong> {jobOpenings}
              </p>
              <p className="mt-1">
                <strong>Experience Level:</strong> {experience}
              </p>
              <p className="mt-1">
                <strong>Education Requirements:</strong> {education}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setShowPreview(false)}>Close</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JobPostPage;
