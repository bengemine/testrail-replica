import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTestContext } from "@/context/TestContext";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Tag, 
  Clock, 
  Play,
  History,
  Edit2,
  Trash2,
  Link as LinkIcon,
  MessageSquare,
  CheckSquare,
  AlertTriangle,
  BarChart2
} from "lucide-react";
import { cn } from "@/lib/utils";

const TestCaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { testCases } = useTestContext();
  const [activeTab, setActiveTab] = useState("overview");
  
  const testCase = testCases.find(test => test.id === id);

  // Mock data for demonstration
  const testSteps = [
    { id: 1, description: "Navigate to login page", expected: "Login page is displayed", data: "https://app.example.com/login" },
    { id: 2, description: "Enter valid credentials", expected: "Credentials are accepted", data: "username: test@example.com\npassword: ****" },
    { id: 3, description: "Click login button", expected: "User is successfully logged in", data: "" }
  ];

  const testHistory = [
    { id: 1, date: "2024-03-05", result: "passed", duration: "1m 23s", executor: "John Smith", environment: "Chrome 122" },
    { id: 2, date: "2024-03-01", result: "failed", duration: "1m 45s", executor: "Emily Johnson", environment: "Firefox 123" },
    { id: 3, date: "2024-02-28", result: "passed", duration: "1m 12s", executor: "John Smith", environment: "Safari 17" }
  ];

  const attachments = [
    { id: 1, name: "error-screenshot.png", type: "image", size: "245 KB", date: "2024-03-05" },
    { id: 2, name: "test-data.json", type: "json", size: "12 KB", date: "2024-03-01" }
  ];

  const comments = [
    { id: 1, user: "Emily Johnson", content: "Updated test steps to include new validation rules", date: "2024-03-05" },
    { id: 2, user: "John Smith", content: "Fixed flaky test by adding proper wait conditions", date: "2024-03-01" }
  ];
  
  if (!testCase) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-0 md:ml-64">
          <Navbar />
          <main className="container py-6 px-4 md:px-6 max-w-6xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6"
              onClick={() => navigate("/test-cases")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Test Cases
            </Button>
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <h2 className="text-xl font-semibold">Test Case Not Found</h2>
                  <p className="text-muted-foreground mt-2">
                    The test case you're looking for doesn't exist or has been deleted.
                  </p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "passed": return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20";
      case "failed": return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "blocked": return "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20";
      default: return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  const getResultBadge = (result: string) => {
    switch (result) {
      case "passed":
        return <Badge className="bg-emerald-500/10 text-emerald-500">Passed</Badge>;
      case "failed":
        return <Badge className="bg-red-500/10 text-red-500">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500/10 text-gray-500">{result}</Badge>;
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
              onClick={() => navigate("/test-cases")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Test Cases
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-2">
                <LinkIcon className="h-4 w-4" />
                Copy Link
              </Button>
              <Button variant="outline" className="gap-2">
                <Edit2 className="h-4 w-4" />
                Edit
              </Button>
              <Button variant="outline" className="gap-2 text-red-500 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
              <Button className="gap-2">
                <Play className="h-4 w-4" />
                Run Test
              </Button>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-bold">{testCase.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">ID: {testCase.id}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={cn("capitalize px-4 py-1", getStatusColor(testCase.status))}
                >
                  {testCase.status}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="steps">Test Steps</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="attachments">Attachments</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Type</dt>
                        <dd className="font-medium">{testCase.type}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Priority</dt>
                        <dd className="font-medium capitalize">{testCase.priority}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Created By</dt>
                        <dd className="font-medium">{testCase.createdBy}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Last Run</dt>
                        <dd className="font-medium flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {testCase.lastRun}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tags & Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {testCase.tags?.map(tag => (
                            <Badge key={tag} variant="outline" className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="steps" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Test Steps</CardTitle>
                    <Button variant="outline" size="sm">
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Steps
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testSteps.map((step, index) => (
                      <div key={step.id} className="p-4 rounded-lg border">
                        <div className="flex items-start gap-4">
                          <div className="flex-none w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {index + 1}
                          </div>
                          <div className="flex-1 space-y-2">
                            <h4 className="font-medium">Action</h4>
                            <p className="text-sm">{step.description}</p>
                            <h4 className="font-medium">Expected Result</h4>
                            <p className="text-sm">{step.expected}</p>
                            {step.data && (
                              <>
                                <h4 className="font-medium">Test Data</h4>
                                <pre className="text-sm bg-muted p-2 rounded">{step.data}</pre>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Execution History</CardTitle>
                    <Button variant="outline" size="sm">
                      <History className="h-4 w-4 mr-2" />
                      View Full History
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testHistory.map((run) => (
                      <div key={run.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          {getResultBadge(run.result)}
                          <div>
                            <p className="font-medium">{run.date}</p>
                            <p className="text-sm text-muted-foreground">
                              {run.executor} • {run.environment}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Duration: {run.duration}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attachments" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Attachments</CardTitle>
                    <Button variant="outline" size="sm">
                      Add Attachment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attachments.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {file.size} • {file.date}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Comments & Discussion</CardTitle>
                    <Button variant="outline" size="sm">
                      Add Comment
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="p-4 rounded-lg border">
                        <div className="flex items-start gap-4">
                          <div className="flex-none w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {comment.user.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{comment.user}</p>
                              <p className="text-sm text-muted-foreground">{comment.date}</p>
                            </div>
                            <p className="mt-1 text-sm">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-muted-foreground">Pass Rate</h4>
                      <p className="text-2xl font-bold text-emerald-500">85%</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-muted-foreground">Avg Duration</h4>
                      <p className="text-2xl font-bold">1m 26s</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <h4 className="text-sm font-medium text-muted-foreground">Last 30 Days</h4>
                      <p className="text-2xl font-bold">12 runs</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default TestCaseDetail; 