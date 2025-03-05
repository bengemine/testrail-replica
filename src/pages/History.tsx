import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Activity,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Settings,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  RefreshCw
} from "lucide-react";

// Mock data for demonstration
const historyData = [
  {
    id: "ACT-001",
    type: "test_execution",
    action: "Test Run Completed",
    description: "Sprint 45 Regression Tests",
    user: "John Smith",
    timestamp: "2024-03-08 14:30",
    details: {
      testsPassed: 135,
      testsFailed: 10,
      testsBlocked: 5,
      duration: "2h 15m",
      environment: "Production"
    },
    status: "success"
  },
  {
    id: "ACT-002",
    type: "milestone",
    action: "Milestone Created",
    description: "Q1 2024 Release",
    user: "Emily Johnson",
    timestamp: "2024-03-08 13:15",
    details: {
      dueDate: "2024-03-31",
      totalTestCases: 250,
      completedTestCases: 180
    },
    status: "info"
  },
  {
    id: "ACT-003",
    type: "release",
    action: "Release Published",
    description: "Version 2.5.0",
    user: "Mike Wilson",
    timestamp: "2024-03-08 11:00",
    details: {
      version: "2.5.0",
      branch: "release/2.5.0",
      commitHash: "8f4d2a1",
      testCoverage: "92%"
    },
    status: "success"
  }
];

const History = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getStatusIcon = (type: string) => {
    switch (type) {
      case "test_execution":
        return <Activity className="h-5 w-5" />;
      case "milestone":
        return <GitBranch className="h-5 w-5" />;
      case "release":
        return <GitPullRequest className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-emerald-500/10 text-emerald-500";
      case "error":
        return "bg-red-500/10 text-red-500";
      case "warning":
        return "bg-amber-500/10 text-amber-500";
      case "info":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const ActivityCard = ({ activity }: { activity: typeof historyData[0] }) => (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${getStatusColor(activity.status)}`}>
            {getStatusIcon(activity.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{activity.action}</h3>
                <p className="text-muted-foreground">{activity.description}</p>
              </div>
              <Badge variant="outline" className={getStatusColor(activity.status)}>
                {activity.type.replace("_", " ")}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {activity.user}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {activity.timestamp}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {activity.type === "test_execution" && (
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-500">{activity.details.testsPassed} passed</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">{activity.details.testsFailed} failed</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <span className="text-amber-500">{activity.details.testsBlocked} blocked</span>
                  </span>
                </div>
              )}

              {activity.type === "milestone" && (
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Due: {activity.details.dueDate}
                  </span>
                  <span>
                    Progress: {activity.details.completedTestCases}/{activity.details.totalTestCases} test cases
                  </span>
                </div>
              )}

              {activity.type === "release" && (
                <div className="space-y-1">
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-4 w-4" />
                      {activity.details.branch}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitCommit className="h-4 w-4" />
                      {activity.details.commitHash}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-4 w-4" />
                    Coverage: {activity.details.testCoverage}
                  </div>
                </div>
              )}
            </div>

            <Button 
              variant="ghost" 
              className="mt-4 text-sm gap-1"
              onClick={() => navigate(`/history/${activity.id}`)}
            >
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
                <h1 className="text-3xl font-bold tracking-tight">Activity History</h1>
                <p className="text-muted-foreground mt-1">
                  Track all testing activities and changes
                </p>
              </div>
              <Button className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <Activity className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Total Activities</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-emerald-500/10">
                      <GitPullRequest className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Releases</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-500/10">
                      <GitBranch className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">Milestones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-500/10">
                      <User className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">15</p>
                      <p className="text-sm text-muted-foreground">Contributors</p>
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
                  placeholder="Search activities..." 
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
                <TabsTrigger value="all">All Activities</TabsTrigger>
                <TabsTrigger value="test_execution">Test Executions</TabsTrigger>
                <TabsTrigger value="milestone">Milestones</TabsTrigger>
                <TabsTrigger value="release">Releases</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {historyData.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default History; 