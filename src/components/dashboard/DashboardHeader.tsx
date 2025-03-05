
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col gap-2 mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
      <p className="text-muted-foreground">
        Here's an overview of your testing progress and recent activities
      </p>
    </div>
  );
};

export default DashboardHeader;
