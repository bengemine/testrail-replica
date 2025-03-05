import React from "react";
import { CheckCircle2, XCircle, AlertCircle, Clock, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

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

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "critical":
      return "text-purple-500";
    case "high":
      return "text-red-500";
    case "medium":
      return "text-amber-500";
    case "low":
      return "text-green-500";
    default:
      return "";
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
  className,
}: TestCaseItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/test-cases/${id}`);
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border bg-card p-4 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
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
