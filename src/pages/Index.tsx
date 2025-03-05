import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ListChecks,
  Play,
  BarChart3,
  ArrowRight,
  Users,
  Flag,
  Tag,
  Calendar,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DashboardCard from "@/components/dashboard/DashboardCard";
import MetricsCard from "@/components/dashboard/MetricsCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { TestCaseItemProps } from "@/components/tests/TestCaseItem";
import TestCaseItem from "@/components/tests/TestCaseItem";

// Mock data
const recentActivities = [
  {
    id: "1",
    type: "passed" as const,
    title: "Login Functionality Test",
    description: "Test case TC-001 was executed successfully",
    user: "John Smith",
    timestamp: "10 min ago",
  },
  {
    id: "2",
    type: "failed" as const,
    title: "Payment Processing Test",
    description: "Test case TC-045 failed during execution",
    user: "Emily Johnson",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    type: "created" as const,
    title: "User Registration Test Suite",
    description: "New test suite was created with 15 test cases",
    user: "Michael Brown",
    timestamp: "3 hours ago",
  },
  {
    id: "4",
    type: "updated" as const,
    title: "API Integration Tests",
    description: "Test cases updated with new API endpoints",
    user: "Sarah Davis",
    timestamp: "Yesterday",
  },
  {
    id: "5",
    type: "pending" as const,
    title: "Performance Test Plan",
    description: "Test plan is awaiting approval",
    user: "Alex Wilson",
    timestamp: "2 days ago",
  },
];

const recentTests: TestCaseItemProps[] = [
  {
    id: "TC-001",
    title: "User can successfully log in with valid credentials",
    status: "passed",
    priority: "high",
    type: "Functional",
    createdBy: "John Smith",
    lastRun: "Today",
    tags: ["login", "authentication"],
  },
  {
    id: "TC-002",
    title: "System displays appropriate error for invalid login",
    status: "failed",
    priority: "medium",
    type: "Functional",
    createdBy: "Emily Johnson",
    lastRun: "Yesterday",
    tags: ["login", "error-handling"],
  },
  {
    id: "TC-003",
    title: "Password reset functionality works as expected",
    status: "blocked",
    priority: "critical",
    type: "Functional",
    createdBy: "Michael Brown",
    lastRun: "3 days ago",
    tags: ["password", "authentication"],
  },
];

const upcomingMilestones = [
  { name: "Beta Release", date: "June 15, 2023", progress: 65 },
  { name: "Performance Testing", date: "June 22, 2023", progress: 30 },
  { name: "Security Audit", date: "June 28, 2023", progress: 10 },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto animate-fade-in">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground">
              Here's an overview of your testing progress and recent activities
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricsCard
              title="Total Test Cases"
              value="245"
              change={8}
              icon={<ListChecks className="h-5 w-5 text-primary" />}
            />
            <MetricsCard
              title="Test Runs"
              value="32"
              change={12}
              icon={<Play className="h-5 w-5 text-primary" />}
            />
            <MetricsCard
              title="Pass Rate"
              value="87%"
              change={-3}
              icon={<CheckCircle2 className="h-5 w-5 text-primary" />}
            />
            <MetricsCard
              title="Open Issues"
              value="18"
              change={-5}
              icon={<XCircle className="h-5 w-5 text-primary" />}
            />
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2">
              <DashboardCard title="Test Execution Status" description="Last 30 days">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Passed</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2 bg-muted" indicatorClassName="bg-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Failed</span>
                      <span>15%</span>
                    </div>
                    <Progress value={15} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Blocked</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-2 bg-muted" indicatorClassName="bg-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Not Run</span>
                      <span>5%</span>
                    </div>
                    <Progress value={5} className="h-2 bg-muted" indicatorClassName="bg-gray-400" />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="text-xs text-muted-foreground">Passed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <span className="text-xs text-muted-foreground">Failed</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="text-xs text-muted-foreground">Blocked</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-gray-400" />
                      <span className="text-xs text-muted-foreground">Not Run</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    View Full Report <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </DashboardCard>
            </div>

            <div>
              <DashboardCard title="Upcoming Milestones">
                <div className="space-y-4">
                  {upcomingMilestones.map((milestone, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{milestone.name}</span>
                        <span className="text-xs text-muted-foreground">{milestone.date}</span>
                      </div>
                      <Progress
                        value={milestone.progress}
                        className="h-2 bg-muted"
                        indicatorClassName="bg-primary"
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {milestone.progress}% complete
                      </p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  View All Milestones
                </Button>
              </DashboardCard>
            </div>
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <DashboardCard title="Recent Activity">
              <RecentActivity activities={recentActivities} />
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View All Activity
              </Button>
            </DashboardCard>

            <DashboardCard title="Recent Test Cases">
              <div className="grid gap-3">
                {recentTests.map((test) => (
                  <TestCaseItem key={test.id} {...test} />
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                View All Test Cases
              </Button>
            </DashboardCard>
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-4">
            <Card className="col-span-full md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button className="justify-start gap-2" size="sm">
                  <PlusCircle className="h-4 w-4" />
                  New Test Case
                </Button>
                <Button className="justify-start gap-2" size="sm">
                  <Play className="h-4 w-4" />
                  Start Test Run
                </Button>
                <Button className="justify-start gap-2" size="sm">
                  <BarChart3 className="h-4 w-4" />
                  Generate Report
                </Button>
                <Button className="justify-start gap-2" size="sm">
                  <Calendar className="h-4 w-4" />
                  New Milestone
                </Button>
                <Button className="justify-start gap-2" size="sm">
                  <Users className="h-4 w-4" />
                  Add User
                </Button>
              </CardContent>
            </Card>

            <Card className="col-span-full md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Team Activity</CardTitle>
                <CardDescription>Recent contributions from your team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">JS</span>
                      </div>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-xs text-muted-foreground">
                          Created 12 test cases, executed 24 tests
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Today</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">EJ</span>
                      </div>
                      <div>
                        <p className="font-medium">Emily Johnson</p>
                        <p className="text-xs text-muted-foreground">
                          Updated 8 test cases, created 2 milestones
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Yesterday</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-medium text-primary">MB</span>
                      </div>
                      <div>
                        <p className="font-medium">Michael Brown</p>
                        <p className="text-xs text-muted-foreground">
                          Executed 36 tests, reported 5 issues
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">2 days ago</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full gap-1">
                  View All Team Activity <ArrowRight className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
