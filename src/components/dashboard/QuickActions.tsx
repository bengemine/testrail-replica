
import React from "react";
import { PlusCircle, Play, BarChart3, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const QuickActions = () => {
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <Button className="justify-start gap-2" size="sm">
          <PlusCircle className="h-4 w-4" />
          New Test Case
        </Button>
        <Button className="justify-start gap-2" size="sm">
          <Play className="h-4 w-4" />
          Start Test Run
        </Button>
        <Button className="justify-start gap-2" size="sm">
          <BarChart3 className="h-4 w-4" />
          Generate Report
        </Button>
        <Button className="justify-start gap-2" size="sm">
          <Calendar className="h-4 w-4" />
          New Milestone
        </Button>
        <Button className="justify-start gap-2" size="sm">
          <Users className="h-4 w-4" />
          Add User
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
