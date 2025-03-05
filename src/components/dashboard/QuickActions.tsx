
import React from "react";
import { PlusCircle, Play, BarChart3, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: `${action} Action Triggered`,
      description: `The ${action} action would be executed in a full implementation.`,
    });
  };

  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button 
          className="justify-start gap-2" 
          size="sm"
          onClick={() => handleAction("New Test Case")}
          as={Link}
          to="/test-cases"
        >
          <PlusCircle className="h-4 w-4" />
          New Test Case
        </Button>
        <Button 
          className="justify-start gap-2" 
          size="sm"
          onClick={() => handleAction("Start Test Run")}
          as={Link}
          to="/test-runs"
        >
          <Play className="h-4 w-4" />
          Start Test Run
        </Button>
        <Button 
          className="justify-start gap-2" 
          size="sm"
          onClick={() => handleAction("Generate Report")}
        >
          <BarChart3 className="h-4 w-4" />
          Generate Report
        </Button>
        <Button 
          className="justify-start gap-2" 
          size="sm"
          onClick={() => handleAction("New Milestone")}
        >
          <Calendar className="h-4 w-4" />
          New Milestone
        </Button>
        <Button 
          className="justify-start gap-2" 
          size="sm"
          onClick={() => handleAction("Add User")}
        >
          <Users className="h-4 w-4" />
          Add User
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
