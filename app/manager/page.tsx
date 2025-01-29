"use client";

import { useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Users,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Dashboard() {
  const [jobStats] = useState([
    { title: "Total Applicants", count: 150, change: 12, icon: Users },
    { title: "Active Job Posts", count: 8, change: -1, icon: Briefcase },
    { title: "Average Response Rate", count: "85%", change: 5, icon: BarChart },
  ]);

  const [jobPosts] = useState([
    { title: "Senior React Developer", applications: 45, views: 120 },
    { title: "UX Designer", applications: 30, views: 100 },
    { title: "Marketing Intern", applications: 20, views: 80 },
  ]);

  const applicationTrends = [
    { month: "Jan", desktop: 186, mobile: 80 },
    { month: "Feb", desktop: 305, mobile: 200 },
    { month: "Mar", desktop: 237, mobile: 120 },
    { month: "Apr", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "Jun", desktop: 214, mobile: 140 },
  ];

  const jobTypeData = [
    { type: "Full Time", value: 70 },
    { type: "Internship", value: 30 },
  ];

const recentJobPosts = [
  {
    title: "Software Engineer",
    location: "Remote",
    responses: 50,
    datePosted: "2024-10-20",
  },
  {
    title: "Data Scientist",
    location: "New York",
    responses: 30,
    datePosted: "2024-10-18",
  },
  {
    title: "Frontend Developer",
    location: "San Francisco",
    responses: 20,
    datePosted: "2024-10-15",
  },
];
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Job Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {jobStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    stat.change > 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {stat.change > 0 ? (
                    <ArrowUpIcon className="inline h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="inline h-4 w-4" />
                  )}
                  {Math.abs(stat.change)}%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Job Post Statistics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Job Post Stats</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TooltipProvider>
            {jobPosts.map((post, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Card className="cursor-pointer transition-all hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Applications: {post.applications}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Views: {post.views}
                      </p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Applications: {post.applications}</p>
                  <p>Views: {post.views}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Applications by Job Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                fullTime: {
                  label: "Full Time",
                  color: "hsl(var(--chart-4))",
                },
                internship: {
                  label: "Internship",
                  color: "hsl(var(--chart-5))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobTypeData}
                    dataKey="value"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={125}
                    fill="#8884d8"
                    label
                  >
                    {jobTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={`var(--color-${entry.type
                          .toLowerCase()
                          .replace(" ", "-")})`}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Views per Job Post</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Views",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={jobPosts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="title" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="views" fill="var(--color-views)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                desktop: {
                  label: "Desktop",
                  color: "hsl(var(--chart-1))",
                },
                mobile: {
                  label: "Mobile",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={applicationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="desktop"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-desktop)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mobile"
                    stroke="var(--color-mobile)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-mobile)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4">
            <h3 className="text-xl font-semibold">Recent Job Posts</h3>
          </CardHeader>
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date Posted</TableHead>
                  <TableHead>Responses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentJobPosts.map((post) => (
                  <TableRow key={post.title} className="hover:bg-gray-100">
                    <TableCell>{post.title}</TableCell>
                    <TableCell>{post.location}</TableCell>
                    <TableCell>{post.datePosted}</TableCell>
                    <TableCell>{post.responses}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
