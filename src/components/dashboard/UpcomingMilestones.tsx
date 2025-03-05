
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardCard from "@/components/dashboard/DashboardCard";

interface MilestoneItem {
  name: string;
  date: string;
  progress: number;
}

interface UpcomingMilestonesProps {
  milestones: MilestoneItem[];
}

const UpcomingMilestones = ({ milestones }: UpcomingMilestonesProps) => {
  return (
    <DashboardCard title="Upcoming Milestones">
      <div className="space-y-4">
        {milestones.map((milestone, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{milestone.name}</span>
              <span className="text-xs text-muted-foreground">{milestone.date}</span>
            </div>
            <Progress
              value={milestone.progress}
              className="h-2 bg-muted"
              indicatorClassName="bg-primary"
            />
            <p className="text-xs text-muted-foreground text-right">
              {milestone.progress}% complete
            </p>
          </div>
        ))}
      </div>
      <Button variant="outline" size="sm" className="mt-4 w-full">
        View All Milestones
      </Button>
    </DashboardCard>
  );
};

export default UpcomingMilestones;
