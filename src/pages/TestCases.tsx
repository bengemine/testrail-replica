
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import TestCaseList from "@/components/tests/TestCaseList";
import TestCaseForm from "@/components/tests/TestCaseForm";
import { TestCaseItemProps } from "@/components/tests/TestCaseItem";

const TestCases = () => {
  const { toast } = useToast();
  const [testCases, setTestCases] = useState<TestCaseItemProps[]>([]);
  const [formOpen, setFormOpen] = useState(false);

  const handleCreateTestCase = () => {
    setFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    const newTestCase: TestCaseItemProps = {
      id: uuidv4(),
      title: data.title,
      status: "untested",
      priority: data.priority,
      type: data.type,
      createdBy: "Current User",
      lastRun: "Never",
      tags: [],
    };

    setTestCases([newTestCase, ...testCases]);
    setFormOpen(false);
    
    toast({
      title: "Test Case Created",
      description: `"${data.title}" has been created successfully.`,
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

          <TestCaseList 
            testCases={testCases} 
            onCreateTestCase={handleCreateTestCase} 
          />

          <TestCaseForm 
            open={formOpen} 
            onOpenChange={setFormOpen} 
            onSubmit={handleFormSubmit} 
          />
        </main>
      </div>
    </div>
  );
};

export default TestCases;
