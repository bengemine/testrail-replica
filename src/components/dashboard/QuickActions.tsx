
import React from "react";
import { PlusCircle, Play, BarChart3, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTestContext } from "@/context/TestContext";

const QuickActions = () => {
  const { toast } = useToast();
  const { incrementTestRuns, addActivity } = useTestContext();

  const handleStartTestRun = () => {
    incrementTestRuns();
    addActivity({
      type: "created",
      title: "New Test Run Started",
      description: "A new test run has been initiated",
      user: "Current User",
    });
    
    toast({
      title: "Test Run Started",
      description: "A new test run has been initiated successfully.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Your report has been generated successfully.",
    });
    
    // Navigate to reports page (handled by Link component)
  };

  const handleNewMilestone = () => {
    toast({
      title: "New Milestone Created",
      description: "Your milestone has been created successfully.",
    });
  };

  const handleAddUser = () => {
    toast({
      title: "User Invitation Sent",
      description: "An invitation has been sent to the new user.",
    });
  };

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Link to="/test-cases" className="w-full">
          <Button 
            className="justify-start gap-2 w-full" 
            size="sm"
          >
            <PlusCircle className="h-4 w-4" />
            New Test Case
          </Button>
        </Link>
        <Link to="/test-runs" className="w-full">
          <Button 
            className="justify-start gap-2 w-full" 
            size="sm"
            onClick={handleStartTestRun}
          >
            <Play className="h-4 w-4" />
            Start Test Run
          </Button>
        </Link>
        <Link to="/reports" className="w-full">
          <Button 
            className="justify-start gap-2 w-full" 
            size="sm"
            onClick={handleGenerateReport}
          >
            <BarChart3 className="h-4 w-4" />
            Generate Report
          </Button>
        </Link>
        <Button 
          className="justify-start gap-2" 
          size="sm"
          onClick={handleNewMilestone}
        >
          <Calendar className="h-4 w-4" />
          New Milestone
        </Button>
        <Button 
          className="justify-start gap-2" 
          size="sm"
          onClick={handleAddUser}
        >
          <Users className="h-4 w-4" />
          Add User
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
