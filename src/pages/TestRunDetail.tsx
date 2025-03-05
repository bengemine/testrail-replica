import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Monitor,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart2,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const testRun = {
  id: "TR-001",
  name: "Smoke Test - Release 2.1.0",
  status: "completed",
  startTime: "2024-03-06 10:30 AM",
  endTime: "2024-03-06 11:45 AM",
  duration: "1h 15m",
  executor: "John Smith",
  environment: "Production",
  browser: "Chrome 122",
  totalTests: 25,
  passed: 20,
  failed: 3,
  blocked: 2,
  results: [
    { id: "TC-001", title: "User Login", status: "passed", duration: "45s" },
    { id: "TC-002", title: "Password Reset", status: "failed", duration: "1m 12s" },
    { id: "TC-003", title: "User Registration", status: "passed", duration: "55s" }
  ]
};

const TestRunDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "bg-emerald-500/10 text-emerald-500";
      case "failed": return "bg-red-500/10 text-red-500";
      case "blocked": return "bg-amber-500/10 text-amber-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "blocked":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/test-runs")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Test Runs
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Results
              </Button>
              <Button className="gap-2">
                <BarChart2 className="h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">{testRun.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">ID: {testRun.id}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn("capitalize px-4 py-1", getStatusColor(testRun.status))}
                >
                  {testRun.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Start Time</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <p>{testRun.startTime}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <p>{testRun.duration}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Executor</p>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <p>{testRun.executor}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Environment</p>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    <p>{testRun.environment} - {testRun.browser}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold">{testRun.totalTests}</p>
                  <p className="text-sm text-muted-foreground">Total Tests</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-emerald-500">{testRun.passed}</p>
                  <p className="text-sm text-muted-foreground">Passed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">{testRun.failed}</p>
                  <p className="text-sm text-muted-foreground">Failed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-500">{testRun.blocked}</p>
                  <p className="text-sm text-muted-foreground">Blocked</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testRun.results.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(result.status)}
                      <div>
                        <p className="font-medium">{result.title}</p>
                        <p className="text-sm text-muted-foreground">ID: {result.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge 
                        variant="outline" 
                        className={cn(getStatusColor(result.status))}
                      >
                        {result.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{result.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TestRunDetail; 