
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TestRuns = () => {
  const { toast } = useToast();

  const handleStartTestRun = () => {
    toast({
      title: "Start Test Run",
      description: "This would start a new test run in a full implementation."
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto animate-fade-in">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">Test Runs</h1>
              <Button onClick={handleStartTestRun} className="gap-2">
                <Play className="h-4 w-4" />
                Start New Run
              </Button>
            </div>
            <p className="text-muted-foreground">
              Execute test runs, track progress, and record test results.
            </p>
          </div>

          <div className="mt-6 rounded-lg border">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium">No Test Runs Yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Start a new test run to begin tracking your testing progress.
              </p>
              <Button onClick={handleStartTestRun} className="mt-4 gap-2">
                <Play className="h-4 w-4" />
                Start New Run
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestRuns;
