
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
      <Link to="/history" className="w-full block">
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full"
        >
          View All Activity
        </Button>
      </Link>
    </DashboardCard>
  );
};

export default RecentActivitiesList;
