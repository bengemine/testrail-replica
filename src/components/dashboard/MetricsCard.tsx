import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  onClick?: () => void;
}

const MetricsCard = ({
  title,
  value,
  change,
  icon,
  onClick
}: MetricsCardProps) => {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        "overflow-hidden transition-all duration-200",
        onClick && "cursor-pointer hover:shadow-md hover:scale-[1.02]"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{value}</p>
              {change !== 0 && (
                <span className={cn(
                  "text-xs font-medium",
                  change > 0 ? "text-emerald-500" : "text-red-500"
                )}>
                  {change > 0 ? "+" : ""}{change}% from last period
                </span>
              )}
            </div>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
