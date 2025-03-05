import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import MetricsGrid from "@/components/dashboard/MetricsGrid";
import RecentTestCases from "@/components/dashboard/RecentTestCases";
import { useTestContext } from "@/context/TestContext";

const Dashboard = () => {
  const { testCases } = useTestContext();
  
  // Get the most recent test cases (top 3)
  const recentTests = testCases.slice(0, 3);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />
        <main className="container py-6 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
              <p className="text-muted-foreground mt-1">
                Here's an overview of your testing progress and recent activities
              </p>
            </div>

            {/* Metrics Grid */}
            <MetricsGrid />

            {/* Recent Test Cases */}
            <RecentTestCases testCases={recentTests} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 