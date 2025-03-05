
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { useTestContext } from "@/context/TestContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestExecutionStatus from "@/components/dashboard/TestExecutionStatus";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Reports = () => {
  const { testCases } = useTestContext();
  
  // Calculate test statistics by status
  const statusCounts = testCases.reduce((acc, testCase) => {
    const status = testCase.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Calculate test statistics by priority
  const priorityCounts = testCases.reduce((acc, testCase) => {
    const priority = testCase.priority;
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Data for status chart
  const statusData = [
    { name: "Status", passed: statusCounts.passed || 0, failed: statusCounts.failed || 0, blocked: statusCounts.blocked || 0, untested: statusCounts.untested || 0 }
  ];
  
  // Data for priority chart
  const priorityData = [
    { name: "Priority", critical: priorityCounts.critical || 0, high: priorityCounts.high || 0, medium: priorityCounts.medium || 0, low: priorityCounts.low || 0 }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto animate-fade-in">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Test Reports</h1>
            <p className="text-muted-foreground">
              Analyze test execution results and track testing progress across your projects.
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="execution">Execution</TabsTrigger>
              <TabsTrigger value="trend">Trend Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Test Cases by Status</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={statusData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="passed" stackId="a" fill="#10b981" />
                        <Bar dataKey="failed" stackId="a" fill="#ef4444" />
                        <Bar dataKey="blocked" stackId="a" fill="#f59e0b" />
                        <Bar dataKey="untested" stackId="a" fill="#94a3b8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Test Cases by Priority</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={priorityData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="critical" fill="#7c3aed" />
                        <Bar dataKey="high" fill="#3b82f6" />
                        <Bar dataKey="medium" fill="#22c55e" />
                        <Bar dataKey="low" fill="#94a3b8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <TestExecutionStatus />
            </TabsContent>
            
            <TabsContent value="execution">
              <Card>
                <CardHeader>
                  <CardTitle>Execution Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Detailed execution reports will be displayed here in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trend">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trend analysis reports will be displayed here in a future update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Reports;
