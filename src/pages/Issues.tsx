import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  AlertTriangle,
  Clock,
  User,
  Tag,
  ChevronDown,
  XCircle,
  AlertCircle,
  CheckCircle,
  Link
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const issues = [
  {
    id: "ISS-001",
    title: "Login authentication fails intermittently",
    status: "open",
    priority: "high",
    severity: "critical",
    assignee: "John Smith",
    testCase: "TC-123",
    environment: "Production",
    created: "2024-03-05",
    lastUpdated: "2024-03-06",
    failureCount: 5
  },
  {
    id: "ISS-002",
    title: "Payment processing timeout in high load",
    status: "in_progress",
    priority: "high",
    severity: "major",
    assignee: "Emily Johnson",
    testCase: "TC-456",
    environment: "Staging",
    created: "2024-03-04",
    lastUpdated: "2024-03-06",
    failureCount: 3
  },
  {
    id: "ISS-003",
    title: "Data validation error in user registration",
    status: "resolved",
    priority: "medium",
    severity: "minor",
    assignee: "Michael Brown",
    testCase: "TC-789",
    environment: "Development",
    created: "2024-03-03",
    lastUpdated: "2024-03-05",
    failureCount: 2
  }
];

const Issues = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-500/10 text-red-500";
      case "in_progress":
        return "bg-amber-500/10 text-amber-500";
      case "resolved":
        return "bg-emerald-500/10 text-emerald-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500";
      case "medium":
        return "bg-amber-500/10 text-amber-500";
      case "low":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "major":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "minor":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
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
                <Button 
                  variant="ghost" 
                  className="mb-2"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">Issues</h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage test failures and blockers
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Issue
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-red-500/10">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Open Issues</p>
                      <p className="text-2xl font-bold text-red-500">8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-500/10">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Time to Fix</p>
                      <p className="text-2xl font-bold text-amber-500">2.5d</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-emerald-500/10">
                      <CheckCircle className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Resolved This Week</p>
                      <p className="text-2xl font-bold text-emerald-500">12</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <User className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Unassigned</p>
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
                  placeholder="Search issues..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>

            {/* Issues List */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="flex items-start justify-between p-4 rounded-lg border hover:shadow-md transition-all cursor-pointer"
                      onClick={() => navigate(`/issues/${issue.id}`)}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getSeverityIcon(issue.severity)}
                          <h3 className="text-lg font-semibold">{issue.title}</h3>
                          <Badge variant="outline" className={cn(getStatusColor(issue.status))}>
                            {issue.status.replace("_", " ")}
                          </Badge>
                          <Badge variant="outline" className={cn(getPriorityColor(issue.priority))}>
                            {issue.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Link className="h-4 w-4" />
                            {issue.id}
                          </span>
                          <span>Created {issue.created}</span>
                          <span>Updated {issue.lastUpdated}</span>
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {issue.assignee}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag className="h-4 w-4" />
                            {issue.environment}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {issue.failureCount} failures
                        </Badge>
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Issues; 