import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  Monitor,
  BarChart2,
  ChevronDown,
  RefreshCw,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const testResults = [
  {
    id: "RUN-001",
    name: "Sprint 45 Regression",
    status: "completed",
    startTime: "2024-03-08 09:30 AM",
    duration: "2h 15m",
    executor: "John Smith",
    environment: "Production",
    browser: "Chrome 122",
    totalTests: 150,
    passed: 135,
    failed: 10,
    blocked: 5,
    coverage: 85,
    testSuites: ["Authentication", "Payment", "User Management"],
    failedTests: [
      { id: "TC-023", name: "Payment Processing Timeout", duration: "45s" },
      { id: "TC-045", name: "User Session Expiry", duration: "32s" }
    ]
  },
  {
    id: "RUN-002",
    name: "API Integration Tests",
    status: "in_progress",
    startTime: "2024-03-08 11:00 AM",
    duration: "45m",
    executor: "Emily Johnson",
    environment: "Staging",
    browser: "Firefox 123",
    totalTests: 75,
    passed: 45,
    failed: 5,
    blocked: 0,
    coverage: 92,
    testSuites: ["API", "Integration"],
    failedTests: [
      { id: "TC-102", name: "API Rate Limiting", duration: "28s" }
    ]
  }
];

const Results = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500";
      case "in_progress":
        return "bg-blue-500/10 text-blue-500";
      case "failed":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const ResultCard = ({ result }: { result: typeof testResults[0] }) => {
    const passRate = Math.round((result.passed / result.totalTests) * 100);

    return (
      <Card className="hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg font-semibold">{result.name}</CardTitle>
                <Badge 
                  variant="outline" 
                  className={cn("capitalize", getStatusColor(result.status))}
                >
                  {result.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">ID: {result.id}</p>
            </div>
            <Button variant="outline" className="gap-2" onClick={() => navigate(`/test-runs/${result.id}`)}>
              <History className="h-4 w-4" />
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Start Time</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <p>{result.startTime}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Duration</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <p>{result.duration}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Executor</p>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <p>{result.executor}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Environment</p>
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <p>{result.environment}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-500">{passRate}%</p>
                    <p className="text-sm text-muted-foreground">Pass Rate</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-500">{result.coverage}%</p>
                    <p className="text-sm text-muted-foreground">Coverage</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">{result.passed}</span>
                </span>
                <span className="flex items-center gap-1">
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span className="text-red-500">{result.failed}</span>
                </span>
                <span className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-amber-500">{result.blocked}</span>
                </span>
              </div>
              <div className="flex gap-2">
                {result.testSuites.map((suite) => (
                  <Badge key={suite} variant="secondary">
                    {suite}
                  </Badge>
                ))}
              </div>
            </div>

            {result.failedTests.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium mb-2">Failed Tests</p>
                <div className="space-y-2">
                  {result.failedTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between text-sm p-2 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span>{test.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {test.duration}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
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
                <h1 className="text-3xl font-bold tracking-tight">Test Results</h1>
                <p className="text-muted-foreground mt-1">
                  View and analyze test execution results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" className="gap-2">
                  <BarChart2 className="h-4 w-4" />
                  Analytics
                </Button>
                <Button className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <History className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">225</p>
                      <p className="text-sm text-muted-foreground">Total Tests</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-emerald-500/10">
                      <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-500">90%</p>
                      <p className="text-sm text-muted-foreground">Pass Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-500/10">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3h</p>
                      <p className="text-sm text-muted-foreground">Total Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-500/10">
                      <Monitor className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">Environments</p>
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
                  placeholder="Search test results..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Results</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="week">This Week</TabsTrigger>
                <TabsTrigger value="failed">Failed Tests</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {testResults.map((result) => (
                  <ResultCard key={result.id} result={result} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Results; 