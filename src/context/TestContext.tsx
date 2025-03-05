
import React, { createContext, useContext, useState, useEffect } from "react";
import { TestCaseItemProps } from "@/components/tests/TestCaseItem";
import { v4 as uuidv4 } from "uuid";

type ActivityType = "passed" | "failed" | "pending" | "created" | "updated";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  user: string;
  timestamp: string;
}

interface TestContextType {
  testCases: TestCaseItemProps[];
  activities: ActivityItem[];
  testRuns: number;
  addTestCase: (testCase: Omit<TestCaseItemProps, "id">) => void;
  addActivity: (activity: Omit<ActivityItem, "id" | "timestamp">) => void;
  incrementTestRuns: () => void;
}

const TestContext = createContext<TestContextType | undefined>(undefined);

export const useTestContext = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTestContext must be used within a TestProvider");
  }
  return context;
};

// Sample initial test cases
const initialTestCases: TestCaseItemProps[] = [
  {
    id: "TC-001",
    title: "User can successfully log in with valid credentials",
    status: "passed",
    priority: "high",
    type: "Functional",
    createdBy: "John Smith",
    lastRun: "Today",
    tags: ["login", "authentication"],
  },
  {
    id: "TC-002",
    title: "System displays appropriate error for invalid login",
    status: "failed",
    priority: "medium",
    type: "Functional",
    createdBy: "Emily Johnson",
    lastRun: "Yesterday",
    tags: ["login", "error-handling"],
  },
  {
    id: "TC-003",
    title: "Password reset functionality works as expected",
    status: "blocked",
    priority: "critical",
    type: "Functional",
    createdBy: "Michael Brown",
    lastRun: "3 days ago",
    tags: ["password", "authentication"],
  },
];

// Sample initial activities
const initialActivities: ActivityItem[] = [
  {
    id: "1",
    type: "passed",
    title: "Login Functionality Test",
    description: "Test case TC-001 was executed successfully",
    user: "John Smith",
    timestamp: "10 min ago",
  },
  {
    id: "2",
    type: "failed",
    title: "Payment Processing Test",
    description: "Test case TC-045 failed during execution",
    user: "Emily Johnson",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    type: "created",
    title: "User Registration Test Suite",
    description: "New test suite was created with 15 test cases",
    user: "Michael Brown",
    timestamp: "3 hours ago",
  },
];

export const TestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testCases, setTestCases] = useState<TestCaseItemProps[]>(() => {
    const savedTestCases = localStorage.getItem("testCases");
    return savedTestCases ? JSON.parse(savedTestCases) : initialTestCases;
  });
  
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const savedActivities = localStorage.getItem("activities");
    return savedActivities ? JSON.parse(savedActivities) : initialActivities;
  });
  
  const [testRuns, setTestRuns] = useState<number>(() => {
    const savedTestRuns = localStorage.getItem("testRuns");
    return savedTestRuns ? parseInt(savedTestRuns) : 12;
  });

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("testCases", JSON.stringify(testCases));
    localStorage.setItem("activities", JSON.stringify(activities));
    localStorage.setItem("testRuns", testRuns.toString());
  }, [testCases, activities, testRuns]);

  const addTestCase = (testCase: Omit<TestCaseItemProps, "id">) => {
    const newTestCase = {
      ...testCase,
      id: `TC-${testCases.length + 1}`.padStart(6, '0'),
    };
    
    setTestCases(prev => [newTestCase, ...prev]);
    
    // Also add an activity
    addActivity({
      type: "created",
      title: `New Test Case: ${testCase.title}`,
      description: `Test case was created with ${testCase.priority} priority`,
      user: "Current User",
    });
  };

  const addActivity = (activity: Omit<ActivityItem, "id" | "timestamp">) => {
    const newActivity = {
      ...activity,
      id: uuidv4(),
      timestamp: "Just now",
    };
    
    setActivities(prev => [newActivity, ...prev]);
  };

  const incrementTestRuns = () => {
    setTestRuns(prev => prev + 1);
  };

  return (
    <TestContext.Provider 
      value={{ 
        testCases, 
        activities, 
        testRuns, 
        addTestCase, 
        addActivity, 
        incrementTestRuns 
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
