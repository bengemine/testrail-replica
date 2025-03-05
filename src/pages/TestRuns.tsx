
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  ChevronDown,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreHorizontal,
  Play,
  FileText,
  Users,
  Calendar as CalendarIcon,
  BarChart3,
  Pause,
  PlayCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TestRun {
  id: string;
  name: string;
  status: "active" | "completed" | "paused";
  progress: number;
  passed: number;
  failed: number;
  blocked: number;
  untested: number;
  assignedTo: string;
  createdBy: string;
  createdDate: string;
  lastUpdated: string;
  milestones?: string[];
}

// Mock data
const testRuns: TestRun[] = [
  {
    id: "TR-001",
    name: "Authentication Feature Test Run",
    status: "active",
    progress: 65,
    passed: 18,
    failed: 3,
    blocked: 2,
    untested: 7,
    assignedTo: "John Smith",
    createdBy: "Emily Johnson",
    createdDate: "June 5, 2023",
    lastUpdated: "1 hour ago",
    milestones: ["Beta Release"],
  },
  {
    id: "TR-002",
    name: "Payment Processing Test Run",
    status: "active",
    progress: 42,
    passed: 10,
    failed: 5,
    blocked: 3,
    untested: 12,
    assignedTo: "Sarah Davis",
    createdBy: "Michael Brown",
    createdDate: "June 3, 2023",
    lastUpdated: "2 hours ago",
    milestones: ["Beta Release"],
  },
  {
    id: "TR-003",
    name: "User Management Test Run",
    status: "completed",
    progress: 100,
    passed: 24,
    failed: 2,
    blocked: 0,
    untested: 0,
    assignedTo: "Alex Wilson",
    createdBy: "John Smith",
    createdDate: "May 28, 2023",
    lastUpdated: "May 30, 2023",
    milestones: ["Alpha Release"],
  },
  {
    id: "TR-004",
    name: "Shopping Cart Test Run",
    status: "paused",
    progress: 30,
    passed: 8,
    failed: 1,
    blocked: 5,
    untested: 16,
    assignedTo: "Emily Johnson",
    createdBy: "Sarah Davis",
    createdDate: "May 25, 2023",
    lastUpdated: "May 27, 2023",
    milestones: ["Beta Release"],
  },
  {
    id: "TR-005",
    name: "Product Catalog Test Run",
    status: "completed",
    progress: 100,
    passed: 31,
    failed: 4,
    blocked: 0,
    untested: 0,
    assignedTo: "Michael Brown",
    createdBy: "Alex Wilson",
    createdDate: "May 20, 2023",
    lastUpdated: "May 24, 2023",
    milestones: ["Alpha Release"],
  },
  {
    id: "TR-006",
    name: "API Integration Test Run",
    status: "active",
    progress: 78,
    passed: 14,
    failed: 1,
    blocked: 1,
    untested: 4,
    assignedTo: "John Smith",
    createdBy: "Emily Johnson",
    createdDate: "June 1, 2023",
    lastUpdated: "4 hours ago",
    milestones: ["Beta Release"],
  },
];

const TestRunCard = ({ testRun }: { testRun: TestRun }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-medium">
              {testRun.name}
            </CardTitle>
            <CardDescription>
              {testRun.id} • Created {testRun.createdDate}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Clone</DropdownMenuItem>
              <DropdownMenuItem>Export Results</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Progress:</span>
              <span className="text-sm">{testRun.progress}%</span>
            </div>
            <Badge
              variant="outline"
              className={`text-xs ${
                testRun.status === "active"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                  : testRun.status === "paused"
                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              }`}
            >
              {testRun.status === "active" && (
                <>
                  <Play className="mr-1 h-3 w-3" />
                  Active
                </>
              )}
              {testRun.status === "paused" && (
                <>
                  <Pause className="mr-1 h-3 w-3" />
                  Paused
                </>
              )}
              {testRun.status === "completed" && (
                <>
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </>
              )}
            </Badge>
          </div>

          <Progress
            value={testRun.progress}
            className="h-2 bg-muted"
            indicatorClassName={
              testRun.status === "completed"
                ? "bg-blue-500"
                : testRun.status === "paused"
                ? "bg-amber-500"
                : "bg-emerald-500"
            }
          />

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="rounded-md bg-emerald-50 dark:bg-emerald-900/20 p-2">
              <div className="text-xs text-muted-foreground">Passed</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-medium">{testRun.passed}</div>
            </div>
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-2">
              <div className="text-xs text-muted-foreground">Failed</div>
              <div className="text-red-600 dark:text-red-400 font-medium">{testRun.failed}</div>
            </div>
            <div className="rounded-md bg-amber-50 dark:bg-amber-900/20 p-2">
              <div className="text-xs text-muted-foreground">Blocked</div>
              <div className="text-amber-600 dark:text-amber-400 font-medium">{testRun.blocked}</div>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="text-xs text-muted-foreground">Untested</div>
              <div className="text-muted-foreground font-medium">{testRun.untested}</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm pt-2">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Assigned to:</span>
              <span className="font-medium">{testRun.assignedTo}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Updated {testRun.lastUpdated}
            </div>
          </div>

          {testRun.milestones && testRun.milestones.length > 0 && (
            <div className="flex gap-2 pt-1">
              {testRun.milestones.map((milestone) => (
                <Badge key={milestone} variant="outline" className="text-xs flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" />
                  {milestone}
                </Badge>
              ))}
            </div>
          )}

          {testRun.status !== "completed" && (
            <Button variant="outline" size="sm" className="w-full mt-2">
              {testRun.status === "active" ? (
                <>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Continue Testing
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Resume Testing
                </>
              )}
            </Button>
          )}

          {testRun.status === "completed" && (
            <Button variant="outline" size="sm" className="w-full mt-2">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Results
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TestRunsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const getFilteredTestRuns = () => {
    return testRuns.filter((testRun) => {
      if (searchQuery) {
        return (
          testRun.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          testRun.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedTab !== "all") {
        return testRun.status === selectedTab;
      }

      return true;
    });
  };

  const filteredTestRuns = getFilteredTestRuns();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto animate-fade-in">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Test Runs</h1>
            <p className="text-muted-foreground">
              Execute and monitor your test runs
            </p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search test runs..."
                className="h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button size="sm" variant="outline" className="h-9 px-2 lg:px-3">
                <Filter className="h-4 w-4" />
                <span className="ml-2 hidden lg:inline">Filter</span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-9 px-2 lg:px-3">
                <Calendar className="h-4 w-4" />
                <span className="ml-2 hidden lg:inline">Schedule</span>
              </Button>
              <Button className="h-9 gap-1">
                <Plus className="h-4 w-4" />
                <span>New Test Run</span>
              </Button>
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="active" className="text-xs">
                <Play className="h-3 w-3 mr-1" />
                Active
              </TabsTrigger>
              <TabsTrigger value="paused" className="text-xs">
                <Pause className="h-3 w-3 mr-1" />
                Paused
              </TabsTrigger>
              <TabsTrigger value="completed" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredTestRuns.length}</span> test runs
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1">
                    Sort by
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                  <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                  <DropdownMenuItem>Date Created (newest)</DropdownMenuItem>
                  <DropdownMenuItem>Date Created (oldest)</DropdownMenuItem>
                  <DropdownMenuItem>Progress</DropdownMenuItem>
                  <DropdownMenuItem>Status</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {filteredTestRuns.length === 0 ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8">
              <div className="text-center">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No test runs found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery ? "Try adjusting your search or filters." : "Get started by creating your first test run."}
                </p>
                <Button className="mt-4 gap-1">
                  <Plus className="h-4 w-4" />
                  Create Test Run
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTestRuns.map((testRun) => (
                <TestRunCard key={testRun.id} testRun={testRun} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TestRunsPage;
