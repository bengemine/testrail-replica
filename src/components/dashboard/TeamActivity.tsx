
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TeamActivity = () => {
  return (
    <Card className="col-span-full md:col-span-3">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Team Activity</CardTitle>
        <CardDescription>Recent contributions from your team members</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-primary">JS</span>
              </div>
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-xs text-muted-foreground">
                  Created 12 test cases, executed 24 tests
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Today</div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-primary">EJ</span>
              </div>
              <div>
                <p className="font-medium">Emily Johnson</p>
                <p className="text-xs text-muted-foreground">
                  Updated 8 test cases, created 2 milestones
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Yesterday</div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-primary">MB</span>
              </div>
              <div>
                <p className="font-medium">Michael Brown</p>
                <p className="text-xs text-muted-foreground">
                  Executed 36 tests, reported 5 issues
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">2 days ago</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full gap-1">
          View All Team Activity <ArrowRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TeamActivity;
