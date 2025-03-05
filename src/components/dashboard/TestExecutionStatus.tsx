
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { useTestContext } from "@/context/TestContext";
import { Link } from "react-router-dom";

const TestExecutionStatus = () => {
  const { testCases } = useTestContext();
  
  // Calculate percentages
  const total = testCases.length || 1; // Avoid division by zero
  
  const passed = testCases.filter(test => test.status === "passed").length;
  const passedPercentage = Math.round((passed / total) * 100);
  
  const failed = testCases.filter(test => test.status === "failed").length;
  const failedPercentage = Math.round((failed / total) * 100);
  
  const blocked = testCases.filter(test => test.status === "blocked").length;
  const blockedPercentage = Math.round((blocked / total) * 100);
  
  const notRun = testCases.filter(test => test.status === "untested").length;
  const notRunPercentage = Math.round((notRun / total) * 100);

  return (
    <DashboardCard title="Test Execution Status" description="Last 30 days">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Passed</span>
            <span>{passedPercentage}%</span>
          </div>
          <Progress value={passedPercentage} className="h-2 bg-muted" indicatorClassName="bg-emerald-500" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Failed</span>
            <span>{failedPercentage}%</span>
          </div>
          <Progress value={failedPercentage} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Blocked</span>
            <span>{blockedPercentage}%</span>
          </div>
          <Progress value={blockedPercentage} className="h-2 bg-muted" indicatorClassName="bg-amber-500" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Not Run</span>
            <span>{notRunPercentage}%</span>
          </div>
          <Progress value={notRunPercentage} className="h-2 bg-muted" indicatorClassName="bg-gray-400" />
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
        <Link to="/reports">
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            View Full Report <ArrowRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </DashboardCard>
  );
};

export default TestExecutionStatus;
