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
  GitBranch,
  GitCommit,
  GitPullRequest,
  Package,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ChevronRight,
  Download,
  FileText,
  BarChart2
} from "lucide-react";

// Mock data for demonstration
const releasesData = [
  {
    id: "REL-001",
    version: "2.5.0",
    name: "March 2024 Release",
    description: "Major platform update with new features and improvements",
    releaseDate: "2024-03-15",
    status: "published",
    testResults: {
      total: 250,
      passed: 235,
      failed: 10,
      blocked: 5,
      coverage: 92
    },
    branch: "release/2.5.0",
    commitHash: "8f4d2a1",
    author: "Emily Johnson",
    type: "major",
    changelog: [
      "Added new test automation features",
      "Improved reporting capabilities",
      "Enhanced user interface",
      "Fixed critical bugs"
    ]
  },
  {
    id: "REL-002",
    version: "2.4.5",
    name: "Security Patch",
    description: "Critical security updates and bug fixes",
    releaseDate: "2024-03-01",
    status: "deployed",
    testResults: {
      total: 180,
      passed: 178,
      failed: 2,
      blocked: 0,
      coverage: 95
    },
    branch: "hotfix/2.4.5",
    commitHash: "3e7b9c2",
    author: "Mike Wilson",
    type: "patch",
    changelog: [
      "Security vulnerability fixes",
      "Performance optimizations",
      "Minor bug fixes"
    ]
  },
  {
    id: "REL-003",
    version: "2.6.0-beta",
    name: "Beta Release",
    description: "Preview of upcoming features",
    releaseDate: "2024-03-20",
    status: "pending",
    testResults: {
      total: 200,
      passed: 160,
      failed: 25,
      blocked: 15,
      coverage: 85
    },
    branch: "develop",
    commitHash: "5a2d8f4",
    author: "Sarah Chen",
    type: "beta",
    changelog: [
      "Experimental features",
      "New API endpoints",
      "UI/UX improvements"
    ]
  }
];

const Releases = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-emerald-500/10 text-emerald-500";
      case "deployed":
        return "bg-blue-500/10 text-blue-500";
      case "pending":
        return "bg-amber-500/10 text-amber-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "major":
        return "bg-purple-500/10 text-purple-500";
      case "minor":
        return "bg-blue-500/10 text-blue-500";
      case "patch":
        return "bg-emerald-500/10 text-emerald-500";
      case "beta":
        return "bg-amber-500/10 text-amber-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  const ReleaseCard = ({ release }: { release: typeof releasesData[0] }) => (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-semibold">v{release.version}</CardTitle>
              <Badge 
                variant="outline" 
                className={getStatusColor(release.status)}
              >
                {release.status}
              </Badge>
              <Badge 
                variant="outline" 
                className={getTypeColor(release.type)}
              >
                {release.type}
              </Badge>
            </div>
            <p className="text-lg font-medium mt-1">{release.name}</p>
            <p className="text-sm text-muted-foreground">{release.description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Release Date: {release.releaseDate}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {release.author}
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <GitBranch className="h-4 w-4" />
              <span className="font-mono">{release.branch}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitCommit className="h-4 w-4" />
              <span className="font-mono">{release.commitHash}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-2 rounded-lg border">
              <p className="text-lg font-semibold">{release.testResults.total}</p>
              <p className="text-xs text-muted-foreground">Total Tests</p>
            </div>
            <div className="text-center p-2 rounded-lg border bg-emerald-50">
              <p className="text-lg font-semibold text-emerald-600">{release.testResults.passed}</p>
              <p className="text-xs text-emerald-600">Passed</p>
            </div>
            <div className="text-center p-2 rounded-lg border bg-red-50">
              <p className="text-lg font-semibold text-red-600">{release.testResults.failed}</p>
              <p className="text-xs text-red-600">Failed</p>
            </div>
            <div className="text-center p-2 rounded-lg border bg-amber-50">
              <p className="text-lg font-semibold text-amber-600">{release.testResults.blocked}</p>
              <p className="text-xs text-amber-600">Blocked</p>
            </div>
            <div className="text-center p-2 rounded-lg border bg-blue-50">
              <p className="text-lg font-semibold text-blue-600">{release.testResults.coverage}%</p>
              <p className="text-xs text-blue-600">Coverage</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="font-medium mb-2">Changelog</p>
            <ul className="space-y-1">
              {release.changelog.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button 
              variant="ghost" 
              className="text-sm gap-1"
              onClick={() => navigate(`/releases/${release.id}`)}
            >
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                Release Notes
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Download
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
                <h1 className="text-3xl font-bold tracking-tight">Releases</h1>
                <p className="text-muted-foreground mt-1">
                  Manage and track software releases
                </p>
              </div>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Release
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/10">
                      <Package className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">15</p>
                      <p className="text-sm text-muted-foreground">Total Releases</p>
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
                      <p className="text-2xl font-bold">8</p>
                      <p className="text-sm text-muted-foreground">Published</p>
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
                      <p className="text-sm text-muted-foreground">Pending</p>
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
                      <p className="text-2xl font-bold">4</p>
                      <p className="text-sm text-muted-foreground">Beta Releases</p>
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
                  placeholder="Search releases..." 
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

            {/* Release Cards */}
            <div className="space-y-4">
              {releasesData.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Releases; 