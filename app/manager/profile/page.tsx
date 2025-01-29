"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submit logic, e.g., updating user profile API
    console.log({
      username,
      email,
      phone,
      location,
      bio,
      skills,
    });
  };

  return (
    <div className="container p-6">
      <Card className="shadow-lg p-6 w-full">
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 2-column layout for input fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  placeholder="Enter your location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium">
                Bio
              </label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>

            {/* Skills */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium">
                Skills
              </label>
              <Textarea
                id="skills"
                placeholder="List your skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full"
                rows={2}
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
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Profile Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <Card className="p-6 w-96">
            <CardHeader>
              <h2 className="text-xl font-semibold">Profile Preview</h2>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-bold">{username}</h3>
              <p className="mt-2">
                <strong>Email:</strong> {email}
              </p>
              <p className="mt-2">
                <strong>Phone:</strong> {phone}
              </p>
              <p className="mt-2">
                <strong>Location:</strong> {location}
              </p>
              <p className="mt-2">
                <strong>Bio:</strong> {bio}
              </p>
              <p className="mt-2">
                <strong>Skills:</strong> {skills}
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

export default ProfilePage;
