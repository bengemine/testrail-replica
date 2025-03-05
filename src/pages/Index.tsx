
import React from "react";
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
import { useTestContext } from "@/context/TestContext";

const upcomingMilestones = [
  { name: "Beta Release", date: "June 15, 2023", progress: 65 },
  { name: "Performance Testing", date: "June 22, 2023", progress: 30 },
  { name: "Security Audit", date: "June 28, 2023", progress: 10 },
];

const Dashboard = () => {
  const { testCases, activities } = useTestContext();
  
  // Get the most recent test cases (top 3)
  const recentTests = testCases.slice(0, 3);
  
  // Get the most recent activities (top 5)
  const recentActivities = activities.slice(0, 5);

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
