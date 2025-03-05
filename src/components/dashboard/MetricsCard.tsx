
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  className?: string;
}

const MetricsCard = ({ title, value, change, icon, className }: MetricsCardProps) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className={cn("rounded-lg border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-semibold">{value}</p>
          
          {typeof change !== "undefined" && (
            <div className="mt-2 flex items-center">
              {isPositive ? (
                <ArrowUp className="mr-1 h-4 w-4 text-emerald-500" />
              ) : isNegative ? (
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              ) : null}
              <span
                className={cn("text-sm font-medium", {
                  "text-emerald-500": isPositive,
                  "text-red-500": isNegative,
                  "text-muted-foreground": !isPositive && !isNegative,
                })}
              >
                {Math.abs(change)}% from last period
              </span>
            </div>
          )}
        </div>

        <div className="rounded-full bg-primary/10 p-3">{icon}</div>
      </div>
    </div>
  );
};

export default MetricsCard;
