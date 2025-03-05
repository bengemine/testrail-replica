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
  LayoutGrid,
  List,
  Search,
  Filter,
  Plus,
  FolderTree,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  Users,
  Calendar,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration
const testSuites = [
  {
    id: "TS-001",
    name: "Authentication Test Suite",
    description: "Core authentication and authorization test cases",
    totalCases: 25,
    passed: 20,
    failed: 3,
    blocked: 2,
    lastRun: "2024-03-06",
    owner: "John Smith",
    tags: ["authentication", "security"],
    priority: "high",
    children: [
      {
        id: "TS-001-1",
        name: "Login Tests",
        totalCases: 10,
        passed: 8,
        failed: 1,
        blocked: 1
      },
      {
        id: "TS-001-2",
        name: "Registration Tests",
        totalCases: 8,
        passed: 7,
        failed: 1,
        blocked: 0
      }
    ]
  },
  {
    id: "TS-002",
    name: "Payment Processing Suite",
    description: "End-to-end payment flow validation",
    totalCases: 30,
    passed: 25,
    failed: 5,
    blocked: 0,
    lastRun: "2024-03-05",
    owner: "Emily Johnson",
    tags: ["payments", "e2e"],
    priority: "critical",
    children: [
      {
        id: "TS-002-1",
        name: "Credit Card Processing",
        totalCases: 15,
        passed: 12,
        failed: 3,
        blocked: 0
      },
      {
        id: "TS-002-2",
        name: "Refund Handling",
        totalCases: 10,
        passed: 9,
        failed: 1,
        blocked: 0
      }
    ]
  }
];

const TestSuites = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const getPassRate = (passed: number, total: number) => {
    return total > 0 ? Math.round((passed / total) * 100) : 0;
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

  const TestSuiteCard = ({ suite }: { suite: typeof testSuites[0] }) => {
    const passRate = getPassRate(suite.passed, suite.totalCases);

    return (
      <Card className="hover:shadow-md transition-all cursor-pointer" onClick={() => navigate(`/test-suites/${suite.id}`)}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-lg font-semibold">{suite.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{suite.description}</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getPriorityColor(suite.priority)}>
                {suite.priority}
              </Badge>
              {suite.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Pass Rate</p>
                <p className="text-2xl font-bold text-emerald-500">{passRate}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold">{suite.totalCases}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  {suite.passed}
                </span>
                <span className="flex items-center gap-1 text-red-500">
                  <XCircle className="h-4 w-4" />
                  {suite.failed}
                </span>
                <span className="flex items-center gap-1 text-amber-500">
                  <AlertCircle className="h-4 w-4" />
                  {suite.blocked}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last run: {suite.lastRun}
              </div>
            </div>

            {suite.children && (
              <div className="border-t pt-4 mt-4">
                <p className="text-sm font-medium mb-2">Sub-suites</p>
                <div className="space-y-2">
                  {suite.children.map((child) => (
                    <div key={child.id} className="flex items-center justify-between text-sm p-2 rounded-lg border">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4" />
                        <span>{child.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-500">{child.passed}</span>
                        <span className="text-red-500">{child.failed}</span>
                        <span className="text-amber-500">{child.blocked}</span>
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
                <h1 className="text-3xl font-bold tracking-tight">Test Suites</h1>
                <p className="text-muted-foreground mt-1">
                  Organize and manage your test cases in logical groups
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Test Suite
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <FolderTree className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Total Suites</p>
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
                      <p className="text-2xl font-bold text-emerald-500">85%</p>
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
                      <p className="text-2xl font-bold">2.5d</p>
                      <p className="text-sm text-muted-foreground">Avg Runtime</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-purple-500/10">
                      <Users className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">8</p>
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
                  placeholder="Search test suites..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Suites</TabsTrigger>
                <TabsTrigger value="recent">Recently Run</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="shared">Shared with Me</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                <div className={cn(
                  "grid gap-4",
                  viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                )}>
                  {testSuites.map((suite) => (
                    <TestSuiteCard key={suite.id} suite={suite} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestSuites; 