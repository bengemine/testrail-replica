
import React from "react";
import TestCaseItem, { TestCaseItemProps } from "@/components/tests/TestCaseItem";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface TestCaseListProps {
  testCases: TestCaseItemProps[];
  onCreateTestCase: () => void;
}

const TestCaseList = ({ testCases, onCreateTestCase }: TestCaseListProps) => {
  if (testCases.length === 0) {
    return (
      <div className="mt-6 rounded-lg border">
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium">No Test Cases Yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first test case to get started with testing.
          </p>
          <Button onClick={onCreateTestCase} className="mt-4 gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Test Case
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-6">
      {testCases.map((testCase) => (
        <TestCaseItem key={testCase.id} {...testCase} />
      ))}
    </div>
  );
};

export default TestCaseList;
