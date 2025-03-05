
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  Plus,
  ChevronDown,
  FolderClosed,
  FileText,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  Clipboard,
  Download,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import TestCaseItem, { TestCaseItemProps } from "@/components/tests/TestCaseItem";

// Mock data
const testCases: TestCaseItemProps[] = [
  {
    id: "TC-001",
    title: "User can successfully log in with valid credentials",
    status: "passed",
    priority: "high",
    type: "Functional",
    createdBy: "John Smith",
    lastRun: "Today",
    tags: ["login", "authentication"],
  },
  {
    id: "TC-002",
    title: "System displays appropriate error for invalid login",
    status: "failed",
    priority: "medium",
    type: "Functional",
    createdBy: "Emily Johnson",
    lastRun: "Yesterday",
    tags: ["login", "error-handling"],
  },
  {
    id: "TC-003",
    title: "Password reset functionality works as expected",
    status: "blocked",
    priority: "critical",
    type: "Functional",
    createdBy: "Michael Brown",
    lastRun: "3 days ago",
    tags: ["password", "authentication"],
  },
  {
    id: "TC-004",
    title: "User registration with valid information succeeds",
    status: "passed",
    priority: "high",
    type: "Functional",
    createdBy: "Sarah Davis",
    lastRun: "4 days ago",
    tags: ["registration", "users"],
  },
  {
    id: "TC-005",
    title: "Email verification link works correctly",
    status: "untested",
    priority: "medium",
    type: "Functional",
    createdBy: "Alex Wilson",
    lastRun: "Never",
    tags: ["email", "verification"],
  },
  {
    id: "TC-006",
    title: "User profile information can be updated",
    status: "passed",
    priority: "low",
    type: "Functional",
    createdBy: "John Smith",
    lastRun: "Last week",
    tags: ["profile", "users"],
  },
  {
    id: "TC-007",
    title: "Search functionality returns relevant results",
    status: "passed",
    priority: "medium",
    type: "Functional",
    createdBy: "Emily Johnson",
    lastRun: "Last week",
    tags: ["search"],
  },
  {
    id: "TC-008",
    title: "Product filtering works correctly",
    status: "failed",
    priority: "medium",
    type: "Functional",
    createdBy: "Michael Brown",
    lastRun: "Last week",
    tags: ["filtering", "products"],
  },
  {
    id: "TC-009",
    title: "Product sorting functions as expected",
    status: "blocked",
    priority: "low",
    type: "Functional",
    createdBy: "Sarah Davis",
    lastRun: "Last week",
    tags: ["sorting", "products"],
  },
  {
    id: "TC-010",
    title: "Cart functionality correctly adds and removes items",
    status: "passed",
    priority: "high",
    type: "Functional",
    createdBy: "Alex Wilson",
    lastRun: "Last week",
    tags: ["cart", "checkout"],
  },
  {
    id: "TC-011",
    title: "Checkout process completes successfully",
    status: "failed",
    priority: "critical",
    type: "Functional",
    createdBy: "John Smith",
    lastRun: "Last week",
    tags: ["checkout", "payment"],
  },
  {
    id: "TC-012",
    title: "Payment processing with valid credit card works",
    status: "untested",
    priority: "critical",
    type: "Functional",
    createdBy: "Emily Johnson",
    lastRun: "Never",
    tags: ["payment", "checkout"],
  },
];

const folders = [
  { id: "F-001", name: "Authentication", count: 15 },
  { id: "F-002", name: "User Management", count: 8 },
  { id: "F-003", name: "Products", count: 12 },
  { id: "F-004", name: "Shopping Cart", count: 9 },
  { id: "F-005", name: "Checkout", count: 7 },
  { id: "F-006", name: "API Tests", count: 22 },
];

const TestCasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTestCases = testCases.filter((testCase) => {
    if (searchQuery) {
      return (
        testCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testCase.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (testCase.tags && testCase.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }
    
    if (selectedTab !== "all") {
      return testCase.status === selectedTab;
    }
    
    return true;
  });

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <Navbar />
        <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto animate-fade-in">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Test Cases</h1>
            <p className="text-muted-foreground">
              Manage and organize your test cases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Left sidebar */}
            <div className="md:col-span-1">
              <div className="rounded-lg border bg-card shadow-sm">
                <div className="p-4 border-b">
                  <h3 className="font-medium">Test Case Folders</h3>
                </div>
                <div className="p-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2 mb-2">
                    <Plus className="h-4 w-4" />
                    New Folder
                  </Button>
                  <div className="space-y-1 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start font-normal"
                    >
                      <FolderClosed className="h-4 w-4 mr-2" />
                      All Test Cases
                      <Badge className="ml-auto">{testCases.length}</Badge>
                    </Button>
                    {folders.map((folder) => (
                      <Button
                        key={folder.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start font-normal"
                      >
                        <FolderClosed className="h-4 w-4 mr-2" />
                        {folder.name}
                        <Badge className="ml-auto">{folder.count}</Badge>
                      </Button>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="p-4">
                  <h3 className="font-medium mb-2">Actions</h3>
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm font-normal"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Test Cases
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm font-normal"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Test Cases
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm font-normal"
                    >
                      <Clipboard className="h-4 w-4 mr-2" />
                      Bulk Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-3">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search test cases..."
                    className="h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button size="sm" variant="outline" className="h-9 px-2 lg:px-3">
                    <Filter className="h-4 w-4" />
                    <span className="ml-2 hidden lg:inline">Filter</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="h-9 px-2 lg:px-3">
                    <Search className="h-4 w-4" />
                    <span className="ml-2 hidden lg:inline">Advanced Search</span>
                  </Button>
                  <Button className="h-9 gap-1">
                    <Plus className="h-4 w-4" />
                    <span>New Test Case</span>
                  </Button>
                </div>
              </div>

              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
                <TabsList className="bg-muted">
                  <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                  <TabsTrigger value="passed" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Passed
                  </TabsTrigger>
                  <TabsTrigger value="failed" className="text-xs">
                    <XCircle className="h-3 w-3 mr-1" />
                    Failed
                  </TabsTrigger>
                  <TabsTrigger value="blocked" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Blocked
                  </TabsTrigger>
                  <TabsTrigger value="untested" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Untested
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="mb-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredTestCases.length}</span> test cases
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className={`h-8 w-8 p-0 ${viewMode === "grid" ? "bg-accent" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid">
                      <rect width="7" height="7" x="3" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="14" rx="1" />
                      <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`h-8 w-8 p-0 ${viewMode === "list" ? "bg-accent" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                      <line x1="8" x2="21" y1="6" y2="6" />
                      <line x1="8" x2="21" y1="12" y2="12" />
                      <line x1="8" x2="21" y1="18" y2="18" />
                      <line x1="3" x2="3.01" y1="6" y2="6" />
                      <line x1="3" x2="3.01" y1="12" y2="12" />
                      <line x1="3" x2="3.01" y1="18" y2="18" />
                    </svg>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        Sort by
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                      <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                      <DropdownMenuItem>Date Created (newest)</DropdownMenuItem>
                      <DropdownMenuItem>Date Created (oldest)</DropdownMenuItem>
                      <DropdownMenuItem>Last Run (recent)</DropdownMenuItem>
                      <DropdownMenuItem>Status</DropdownMenuItem>
                      <DropdownMenuItem>Priority</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {filteredTestCases.length === 0 ? (
                <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed bg-background p-8">
                  <div className="text-center">
                    <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No test cases found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {searchQuery ? "Try adjusting your search or filters." : "Get started by creating your first test case."}
                    </p>
                    <Button className="mt-4 gap-1">
                      <Plus className="h-4 w-4" />
                      Create Test Case
                    </Button>
                  </div>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  {filteredTestCases.map((testCase) => (
                    <TestCaseItem key={testCase.id} {...testCase} />
                  ))}
                </div>
              ) : (
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted px-4 py-2 text-xs font-medium">
                    <div className="col-span-5">Name</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Priority</div>
                    <div className="col-span-2">Last Run</div>
                    <div className="col-span-1"></div>
                  </div>
                  <div className="divide-y">
                    {filteredTestCases.map((testCase) => (
                      <div key={testCase.id} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-muted/50">
                        <div className="col-span-5">
                          <div className="font-medium">{testCase.title}</div>
                          <div className="text-xs text-muted-foreground">{testCase.id}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-1.5">
                            {testCase.status === "passed" && (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                <span className="text-sm">Passed</span>
                              </>
                            )}
                            {testCase.status === "failed" && (
                              <>
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-sm">Failed</span>
                              </>
                            )}
                            {testCase.status === "blocked" && (
                              <>
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                                <span className="text-sm">Blocked</span>
                              </>
                            )}
                            {testCase.status === "untested" && (
                              <>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">Untested</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Badge variant="outline" className={`
                            ${testCase.priority === "critical" 
                              ? "bg-red-100 text-red-800"
                              : testCase.priority === "high"
                              ? "bg-amber-100 text-amber-800"
                              : testCase.priority === "medium"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                            }
                          `}>
                            {testCase.priority}
                          </Badge>
                        </div>
                        <div className="col-span-2 text-sm">{testCase.lastRun}</div>
                        <div className="col-span-1 flex justify-end">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Clone</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestCasesPage;
