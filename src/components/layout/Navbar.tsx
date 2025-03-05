
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Bell, Settings, User, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="h-16 border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <span className="font-semibold text-lg">TestFlow</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={path === "/" ? "secondary" : "ghost"} 
                className={`rounded-md px-3 py-2 text-sm font-medium ${path === "/" ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-foreground"}`}
              >
                Dashboard
              </Button>
            </Link>
            <Link to="/test-cases">
              <Button 
                variant={path.includes("/test-cases") ? "secondary" : "ghost"} 
                className={`rounded-md px-3 py-2 text-sm font-medium ${path.includes("/test-cases") ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-foreground"}`}
              >
                Test Cases
              </Button>
            </Link>
            <Link to="/test-runs">
              <Button 
                variant={path.includes("/test-runs") ? "secondary" : "ghost"} 
                className={`rounded-md px-3 py-2 text-sm font-medium ${path.includes("/test-runs") ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-foreground"}`}
              >
                Test Runs
              </Button>
            </Link>
            <Link to="/reports">
              <Button 
                variant={path.includes("/reports") ? "secondary" : "ghost"} 
                className={`rounded-md px-3 py-2 text-sm font-medium ${path.includes("/reports") ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:text-foreground"}`}
              >
                Reports
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create New</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Search className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full h-9 w-9 overflow-hidden border border-border bg-white"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
