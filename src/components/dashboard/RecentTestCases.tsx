
import React from "react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import TestCaseItem, { TestCaseItemProps } from "@/components/tests/TestCaseItem";

interface RecentTestCasesProps {
  testCases: TestCaseItemProps[];
}

const RecentTestCases = ({ testCases }: RecentTestCasesProps) => {
  return (
    <DashboardCard title="Recent Test Cases">
      <div className="grid gap-3">
        {testCases.map((test) => (
          <TestCaseItem key={test.id} {...test} />
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-4 w-full">
        View All Test Cases
      </Button>
    </DashboardCard>
  );
};

export default RecentTestCases;
