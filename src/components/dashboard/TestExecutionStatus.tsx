
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardCard from "@/components/dashboard/DashboardCard";

const TestExecutionStatus = () => {
  return (
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
  );
};

export default TestExecutionStatus;
