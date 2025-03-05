
import React from "react";
import { TestCaseItemProps } from "@/components/tests/TestCaseItem";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import TestExecutionStatus from "@/components/dashboard/TestExecutionStatus";
import UpcomingMilestones from "@/components/dashboard/UpcomingMilestones";
import RecentActivitiesList from "@/components/dashboard/RecentActivitiesList";
import RecentTestCases from "@/components/dashboard/RecentTestCases";
import QuickActions from "@/components/dashboard/QuickActions";
import TeamActivity from "@/components/dashboard/TeamActivity";

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
          <DashboardHeader />
          
          <MetricsGrid />

          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="md:col-span-2">
              <TestExecutionStatus />
            </div>
            <div>
              <UpcomingMilestones milestones={upcomingMilestones} />
            </div>
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-2">
            <RecentActivitiesList activities={recentActivities} />
            <RecentTestCases testCases={recentTests} />
          </div>

          <div className="grid gap-6 mt-6 md:grid-cols-4">
            <QuickActions />
            <TeamActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
