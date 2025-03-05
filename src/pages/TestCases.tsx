
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TestCases = () => {
  const { toast } = useToast();

  const handleCreateTestCase = () => {
    toast({
      title: "Create Test Case",
      description: "This would open a form to create a new test case in a full implementation."
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
              <h1 className="text-3xl font-bold tracking-tight">Test Cases</h1>
              <Button onClick={handleCreateTestCase} className="gap-2">
                <PlusCircle className="h-4 w-4" />
                New Test Case
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage your test cases, organize them into suites, and prepare them for execution.
            </p>
          </div>

          <div className="mt-6 rounded-lg border">
            <div className="p-6 text-center">
              <h3 className="text-lg font-medium">No Test Cases Yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Create your first test case to get started with testing.
              </p>
              <Button onClick={handleCreateTestCase} className="mt-4 gap-2">
                <PlusCircle className="h-4 w-4" />
                Create Test Case
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestCases;
