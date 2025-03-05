
import React from "react";
import { CheckCircle2, XCircle, Clock, User, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

type ActivityType = "passed" | "failed" | "pending" | "created" | "updated";

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  user: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  className?: string;
}

const ActivityIcon = ({ type }: { type: ActivityType }) => {
  switch (type) {
    case "passed":
      return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    case "failed":
      return <XCircle className="h-5 w-5 text-red-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-amber-500" />;
    case "created":
      return <CalendarDays className="h-5 w-5 text-blue-500" />;
    case "updated":
      return <CalendarDays className="h-5 w-5 text-violet-500" />;
    default:
      return <CalendarDays className="h-5 w-5 text-muted-foreground" />;
  }
};

const RecentActivity = ({ activities, className }: RecentActivityProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {activities.map((activity) => (
        <div key={activity.id} className="flex gap-4">
          <div className="mt-0.5 flex-shrink-0">
            <ActivityIcon type={activity.type} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{activity.title}</p>
              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span>{activity.user}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;
