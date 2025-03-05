
import React from "react";
import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { Link } from "react-router-dom";

interface ActivityItem {
  id: string;
  type: "passed" | "failed" | "pending" | "created" | "updated";
  title: string;
  description: string;
  user: string;
  timestamp: string;
}

interface RecentActivitiesListProps {
  activities: ActivityItem[];
}

const RecentActivitiesList = ({ activities }: RecentActivitiesListProps) => {
  return (
    <DashboardCard title="Recent Activity">
      <RecentActivity activities={activities} />
      <div className="mt-4 w-full">
        <Link to="/reports">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
          >
            View All Activity
          </Button>
        </Link>
      </div>
    </DashboardCard>
  );
};

export default RecentActivitiesList;
