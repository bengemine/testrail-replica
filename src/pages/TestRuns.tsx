import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  BarChart2,
  Users,
  Settings2,
  Plus,
  Archive
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTestContext } from "@/context/TestContext";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const testRuns = [
  {
    id: "TR-001",
    title: "Sprint 34 Regression Suite",
    status: "in_progress",
    progress: 45,
    totalTests: 124,
    passed: 42,
    failed: 8,
    blocked: 2,
    remaining: 72,
    startedAt: "2024-03-05 09:30",
    environment: "Production",
    assignee: "John Smith",
    priority: "high"
  },
  {
    id: "TR-002",
    title: "Payment Gateway Integration Tests",
    status: "completed",
    progress: 100,
    totalTests: 86,
    passed: 82,
    failed: 4,
    blocked: 0,
    remaining: 0,
    startedAt: "2024-03-04 14:15",
    environment: "Staging",
    assignee: "Emily Johnson",
    priority: "critical"
  },
  {
    id: "TR-003",
    title: "User Authentication Tests",
    status: "planned",
    progress: 0,
    totalTests: 45,
    passed: 0,
    failed: 0,
    blocked: 0,
    remaining: 45,
    startedAt: null,
    environment: "Development",
    assignee: "Michael Brown",
    priority: "medium"
  }
];

const TestRuns = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500";
      case "in_progress":
        return "bg-blue-500/10 text-blue-500";
      case "planned":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/10 text-red-500";
      case "high":
        return "bg-orange-500/10 text-orange-500";
      case "medium":
        return "bg-blue-500/10 text-blue-500";
      case "low":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-emerald-500";
    if (progress > 75) return "bg-emerald-400";
    if (progress > 50) return "bg-blue-500";
    if (progress > 25) return "bg-orange-500";
    return "bg-gray-300";
  };

  const handleRunClick = (id: string) => {
    navigate(`/test-runs/${id}`);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />
        <main className="container py-6 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Test Runs</h1>
                <p className="text-muted-foreground mt-1">
                  Execute test runs, track progress, and record test results.
                </p>
              </div>
              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Start New Run
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-emerald-500/10">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Passed</p>
                      <p className="text-2xl font-bold text-emerald-500">124</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-red-500/10">
                      <XCircle className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Failed</p>
                      <p className="text-2xl font-bold text-red-500">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-500/10">
                      <AlertCircle className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Blocked</p>
                      <p className="text-2xl font-bold text-amber-500">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <Clock className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold text-blue-500">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search test runs..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="gap-2">
                <Settings2 className="h-4 w-4" />
                Columns
              </Button>
            </div>

            {/* Test Runs List */}
            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Runs</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="planned">Planned</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {testRuns.map((run) => (
                  <Card 
                    key={run.id}
                    className="cursor-pointer transition-all hover:shadow-md"
                    onClick={() => handleRunClick(run.id)}
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold">{run.title}</h3>
                              <Badge variant="outline" className={cn(getStatusColor(run.status))}>
                                {run.status === "in_progress" ? "In Progress" : 
                                 run.status === "completed" ? "Completed" : "Planned"}
                              </Badge>
                              <Badge variant="outline" className={cn(getPriorityColor(run.priority))}>
                                {run.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">ID: {run.id}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-sm font-medium">{run.assignee}</p>
                              <p className="text-xs text-muted-foreground">{run.environment}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              {run.assignee.charAt(0)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-2 rounded-full bg-gray-100">
                            <div 
                              className={cn("h-full rounded-full transition-all", getProgressColor(run.progress))}
                              style={{ width: `${run.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{run.progress}%</span>
                        </div>

                        <div className="grid grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-medium">{run.totalTests} tests</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Passed</p>
                            <p className="font-medium text-emerald-500">{run.passed}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Failed</p>
                            <p className="font-medium text-red-500">{run.failed}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Blocked</p>
                            <p className="font-medium text-amber-500">{run.blocked}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Remaining</p>
                            <p className="font-medium">{run.remaining}</p>
                          </div>
                        </div>

                        {run.startedAt && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            Started: {run.startedAt}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <BarChart2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Completed Runs</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Completed test runs will appear here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="planned">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Planned Runs</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Plan your future test runs and they will appear here.
                      </p>
                      <Button className="mt-4 gap-2">
                        <Plus className="h-4 w-4" />
                        Plan New Run
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="archived">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Archive className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No Archived Runs</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Archived test runs will be stored here for reference.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestRuns;
