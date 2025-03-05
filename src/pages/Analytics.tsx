import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Calendar,
  BarChart2,
  TrendingUp,
  Activity,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Filter
} from "lucide-react";
import { useTestContext } from "@/context/TestContext";

// Mock data for demonstration
const passRateHistory = [
  { date: "2024-03-01", rate: 85 },
  { date: "2024-03-02", rate: 82 },
  { date: "2024-03-03", rate: 88 },
  { date: "2024-03-04", rate: 90 },
  { date: "2024-03-05", rate: 87 }
];

const testExecutionData = [
  { date: "2024-03-01", passed: 42, failed: 8, blocked: 2 },
  { date: "2024-03-02", passed: 38, failed: 10, blocked: 1 },
  { date: "2024-03-03", passed: 45, failed: 5, blocked: 2 },
  { date: "2024-03-04", passed: 48, failed: 4, blocked: 1 },
  { date: "2024-03-05", passed: 44, failed: 6, blocked: 2 }
];

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7d");
  const { testCases } = useTestContext();

  // Calculate current pass rate
  const passedTests = testCases.filter(test => test.status === "passed").length;
  const totalTests = testCases.length;
  const currentPassRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

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
                <Button 
                  variant="ghost" 
                  className="mb-2"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground mt-1">
                  Analyze test execution metrics and trends
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">Last 24 hours</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
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
                      <p className="text-sm text-muted-foreground">Current Pass Rate</p>
                      <p className="text-2xl font-bold text-emerald-500">{currentPassRate}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <TrendingUp className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Trend</p>
                      <p className="text-2xl font-bold text-blue-500">+5.2%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-500/10">
                      <Activity className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Test Velocity</p>
                      <p className="text-2xl font-bold text-amber-500">52/day</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-500/10">
                      <Clock className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Duration</p>
                      <p className="text-2xl font-bold text-purple-500">1.5m</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pass-rate">Pass Rate</TabsTrigger>
                <TabsTrigger value="execution">Test Execution</TabsTrigger>
                <TabsTrigger value="duration">Duration</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5" />
                        Pass Rate Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Pass Rate Chart Component
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Test Execution Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                        Distribution Chart Component
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-muted/50">
                          <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Pass Rate</th>
                            <th className="px-6 py-3">Passed</th>
                            <th className="px-6 py-3">Failed</th>
                            <th className="px-6 py-3">Blocked</th>
                            <th className="px-6 py-3">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {testExecutionData.map((day, index) => (
                            <tr key={day.date} className="border-b">
                              <td className="px-6 py-4">{day.date}</td>
                              <td className="px-6 py-4">
                                {Math.round((day.passed / (day.passed + day.failed + day.blocked)) * 100)}%
                              </td>
                              <td className="px-6 py-4 text-emerald-500">{day.passed}</td>
                              <td className="px-6 py-4 text-red-500">{day.failed}</td>
                              <td className="px-6 py-4 text-amber-500">{day.blocked}</td>
                              <td className="px-6 py-4">{day.passed + day.failed + day.blocked}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Additional tab contents would go here */}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics; 