
import React from "react";
import { CheckCircle2, XCircle, AlertCircle, Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type TestStatus = "passed" | "failed" | "blocked" | "untested";

export interface TestCaseItemProps {
  id: string;
  title: string;
  status?: TestStatus;
  priority?: "low" | "medium" | "high" | "critical";
  type?: string;
  createdBy?: string;
  lastRun?: string;
  tags?: string[];
  onClick?: () => void;
  className?: string;
}

const getStatusIcon = (status: TestStatus) => {
  switch (status) {
    case "passed":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "failed":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "blocked":
      return <AlertCircle className="h-4 w-4 text-amber-500" />;
    case "untested":
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "critical":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "high":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
    case "medium":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "low":
    default:
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
  }
};

const TestCaseItem = ({
  id,
  title,
  status = "untested",
  priority,
  type,
  createdBy,
  lastRun,
  tags = [],
  onClick,
  className,
}: TestCaseItemProps) => {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">ID: {id}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          {priority && (
            <Badge variant="outline" className={cn("text-xs", getPriorityColor(priority))}>
              {priority}
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {type && (
          <Badge variant="outline" className="bg-secondary text-secondary-foreground">
            {type}
          </Badge>
        )}
        {tags.map((tag) => (
          <Badge key={tag} variant="outline" className="flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-auto pt-3 flex items-center justify-between text-xs text-muted-foreground">
        {createdBy && <span>By: {createdBy}</span>}
        {lastRun && <span>Last run: {lastRun}</span>}
      </div>
    </div>
  );
};

export default TestCaseItem;
