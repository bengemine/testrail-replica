import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Filter,
  Plus,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Target,
  BarChart2
} from "lucide-react";

// Mock data for demonstration
const milestonesData = [
  {
    id: "MS-001",
    name: "Q1 2024 Release",
    description: "Major platform release with new features and improvements",
    dueDate: "2024-03-31",
    status: "in_progress",
    progress: 72,
    testCases: {
      total: 250,
      passed: 180,
      failed: 15,
      blocked: 10,
      remaining: 45
    },
    assignee: "Emily Johnson",
    priority: "high"
  },
  {
    id: "MS-002",
    name: "Security Compliance Update",
    description: "Implementation of enhanced security measures and compliance features",
    dueDate: "2024-04-15",
    status: "planned",
    progress: 35,
    testCases: {
      total: 180,
      passed: 63,
      failed: 8,
      blocked: 5,
      remaining: 104
    },
    assignee: "Mike Wilson",
    priority: "critical"
  },
  {
    id: "MS-003",
    name: "Performance Optimization",
    description: "System-wide performance improvements and optimizations",
    dueDate: "2024-05-01",
    status: "completed",
    progress: 100,
    testCases: {
      total: 150,
      passed: 142,
      failed: 8,
      blocked: 0,
      remaining: 0
    },
    assignee: "Sarah Chen",
    priority: "medium"
  }
];

const Milestones = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500";
      case "in_progress":
        return "bg-blue-500/10 text-blue-500";
      case "planned":
        return "bg-amber-500/10 text-amber-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/10 text-red-500";
      case "high":
        return "bg-amber-500/10 text-amber-500";
      case "medium":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const MilestoneCard = ({ milestone }: { milestone: typeof milestonesData[0] }) => (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold">{milestone.name}</CardTitle>
              <Badge 
                variant="outline" 
                className={getStatusColor(milestone.status)}
              >
                {milestone.status.replace("_", " ")}
              </Badge>
              <Badge 
                variant="outline" 
                className={getPriorityColor(milestone.priority)}
              >
                {milestone.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Due: {milestone.dueDate}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {milestone.assignee}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{milestone.progress}%</span>
            </div>
            <Progress value={milestone.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-2 rounded-lg border">
              <p className="text-lg font-semibold">{milestone.testCases.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
            <div className="text-center p-2 rounded-lg border bg-emerald-50">
              <p className="text-lg font-semibold text-emerald-600">{milestone.testCases.passed}</p>
              <p className="text-xs text-emerald-600">Passed</p>
            </div>
            <div className="text-center p-2 rounded-lg border bg-red-50">
              <p className="text-lg font-semibold text-red-600">{milestone.testCases.failed}</p>
              <p className="text-xs text-red-600">Failed</p>
            </div>
            <div className="text-center p-2 rounded-lg border bg-amber-50">
              <p className="text-lg font-semibold text-amber-600">{milestone.testCases.blocked}</p>
              <p className="text-xs text-amber-600">Blocked</p>
            </div>
            <div className="text-center p-2 rounded-lg border bg-blue-50">
              <p className="text-lg font-semibold text-blue-600">{milestone.testCases.remaining}</p>
              <p className="text-xs text-blue-600">Remaining</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button 
              variant="ghost" 
              className="text-sm gap-1"
              onClick={() => navigate(`/milestones/${milestone.id}`)}
            >
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Target className="h-4 w-4" />
                Test Plan
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <BarChart2 className="h-4 w-4" />
                Analytics
              </Button>
            </div>
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
                <h1 className="text-3xl font-bold tracking-tight">Milestones</h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage testing milestones
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Milestone
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <Target className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">Active Milestones</p>
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
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
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
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Due Soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-red-500/10">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-muted-foreground">At Risk</p>
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
                  placeholder="Search milestones..." 
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

            {/* Milestone Cards */}
            <div className="space-y-4">
              {milestonesData.map((milestone) => (
                <MilestoneCard key={milestone.id} milestone={milestone} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Milestones; 