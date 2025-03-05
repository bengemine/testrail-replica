import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TestProvider } from "@/context/TestContext";
import Dashboard from "@/pages/Dashboard";
import TestCases from "@/pages/TestCases";
import TestCaseDetail from "@/pages/TestCaseDetail";
import TestRuns from "@/pages/TestRuns";
import TestRunDetail from "@/pages/TestRunDetail";
import TestSuites from "@/pages/TestSuites";
import Results from "@/pages/Results";
import Analytics from "@/pages/Analytics";
import Issues from "@/pages/Issues";
import Reports from "./pages/Reports";
import History from "@/pages/History";
import Milestones from "@/pages/Milestones";
import Releases from "@/pages/Releases";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TestProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/test-cases" element={<TestCases />} />
            <Route path="/test-cases/:id" element={<TestCaseDetail />} />
            <Route path="/test-runs" element={<TestRuns />} />
            <Route path="/test-runs/:id" element={<TestRunDetail />} />
            <Route path="/test-suites" element={<TestSuites />} />
            <Route path="/test-suites/:id" element={<TestSuites />} />
            <Route path="/results" element={<Results />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/pass-rate" element={<Analytics />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/:id" element={<Issues />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/:id" element={<History />} />
            <Route path="/milestones" element={<Milestones />} />
            <Route path="/milestones/:id" element={<Milestones />} />
            <Route path="/releases" element={<Releases />} />
            <Route path="/releases/:id" element={<Releases />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TestProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
