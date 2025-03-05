import React from "react";
import { useNavigate } from "react-router-dom";
import { ListChecks, Play, CheckCircle2, XCircle } from "lucide-react";
import MetricsCard from "@/components/dashboard/MetricsCard";
import { useTestContext } from "@/context/TestContext";

const MetricsGrid = () => {
  const navigate = useNavigate();
  const { testCases, testRuns } = useTestContext();
  
  // Calculate total test cases
  const totalTestCases = testCases.length;
  
  // Calculate pass rate
  const passedTests = testCases.filter(test => test.status === "passed").length;
  const passRate = totalTestCases > 0 ? Math.round((passedTests / totalTestCases) * 100) : 0;
  
  // Calculate open issues (failed + blocked tests)
  const openIssues = testCases.filter(test => 
    test.status === "failed" || test.status === "blocked"
  ).length;
  
  // For change percentage, we would normally calculate this from historical data
  // Here we'll hardcode some reasonable values
  const testCasesChange = 8;
  const testRunsChange = 12;
  const passRateChange = -3;
  const openIssuesChange = -5;

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricsCard
        title="Total Test Cases"
        value={totalTestCases.toString()}
        change={testCasesChange}
        icon={<ListChecks className="h-5 w-5 text-primary" />}
        onClick={() => handleNavigate("/test-cases")}
      />
      <MetricsCard
        title="Test Runs"
        value={testRuns.toString()}
        change={testRunsChange}
        icon={<Play className="h-5 w-5 text-primary" />}
        onClick={() => handleNavigate("/test-runs")}
      />
      <MetricsCard
        title="Pass Rate"
        value={`${passRate}%`}
        change={passRateChange}
        icon={<CheckCircle2 className="h-5 w-5 text-primary" />}
        onClick={() => handleNavigate("/analytics/pass-rate")}
      />
      <MetricsCard
        title="Open Issues"
        value={openIssues.toString()}
        change={openIssuesChange}
        icon={<XCircle className="h-5 w-5 text-primary" />}
        onClick={() => handleNavigate("/issues")}
      />
    </div>
  );
};

export default MetricsGrid;
