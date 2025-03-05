
import React from "react";
import { ListChecks, Play, CheckCircle2, XCircle } from "lucide-react";
import MetricsCard from "@/components/dashboard/MetricsCard";

const MetricsGrid = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <MetricsCard
        title="Total Test Cases"
        value="245"
        change={8}
        icon={<ListChecks className="h-5 w-5 text-primary" />}
      />
      <MetricsCard
        title="Test Runs"
        value="32"
        change={12}
        icon={<Play className="h-5 w-5 text-primary" />}
      />
      <MetricsCard
        title="Pass Rate"
        value="87%"
        change={-3}
        icon={<CheckCircle2 className="h-5 w-5 text-primary" />}
      />
      <MetricsCard
        title="Open Issues"
        value="18"
        change={-5}
        icon={<XCircle className="h-5 w-5 text-primary" />}
      />
    </div>
  );
};

export default MetricsGrid;
