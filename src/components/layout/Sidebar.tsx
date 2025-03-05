
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ListChecks,
  Play,
  BarChart3,
  Calendar,
  Settings,
  ChevronRight,
  FolderClosed,
  FolderOpen,
  PlusCircle,
  Tag,
  Users,
  CheckSquare,
  FileText,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive?: boolean;
  onClick?: () => void;
};

const SidebarItem = ({ icon: Icon, label, to, isActive, onClick }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

type SidebarGroupProps = {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
};

const SidebarGroup = ({ title, children, defaultExpanded = true }: SidebarGroupProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="py-1">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <span className="uppercase tracking-wider">{title}</span>
        <ChevronRight
          className={cn("h-4 w-4 transition-transform", expanded && "rotate-90")}
        />
      </button>
      {expanded && <div className="mt-1 space-y-1 px-1">{children}</div>}
    </div>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const path = location.pathname;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full md:hidden shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform border-r border-border bg-sidebar transition-transform duration-200 ease-in-out",
          {
            "translate-x-0": isOpen || isMobileOpen,
            "-translate-x-full": !isOpen && !isMobileOpen,
            "md:translate-x-0": !isOpen && !isMobileOpen && window.innerWidth >= 768,
          }
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
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
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="px-3 py-4">
            <div className="space-y-1 pb-2">
              <SidebarItem
                icon={Home}
                label="Dashboard"
                to="/"
                isActive={path === "/"}
                onClick={() => setIsMobileOpen(false)}
              />
            </div>

            <Separator className="my-4" />

            <SidebarGroup title="Test Management">
              <SidebarItem
                icon={ListChecks}
                label="Test Cases"
                to="/test-cases"
                isActive={path === "/test-cases"}
                onClick={() => setIsMobileOpen(false)}
              />
              <SidebarItem
                icon={FolderClosed}
                label="Test Suites"
                to="/test-suites"
                isActive={path === "/test-suites"}
                onClick={() => setIsMobileOpen(false)}
              />
              <SidebarItem
                icon={FileText}
                label="Test Plans"
                to="/test-plans"
                isActive={path === "/test-plans"}
                onClick={() => setIsMobileOpen(false)}
              />
            </SidebarGroup>

            <SidebarGroup title="Test Execution">
              <SidebarItem
                icon={Play}
                label="Test Runs"
                to="/test-runs"
                isActive={path === "/test-runs"}
                onClick={() => setIsMobileOpen(false)}
              />
              <SidebarItem
                icon={CheckSquare}
                label="Results"
                to="/results"
                isActive={path === "/results"}
                onClick={() => setIsMobileOpen(false)}
              />
              <SidebarItem
                icon={Clock}
                label="History"
                to="/history"
                isActive={path === "/history"}
                onClick={() => setIsMobileOpen(false)}
              />
            </SidebarGroup>

            <SidebarGroup title="Analysis">
              <SidebarItem
                icon={BarChart3}
                label="Reports"
                to="/reports"
                isActive={path === "/reports"}
                onClick={() => setIsMobileOpen(false)}
              />
              <SidebarItem
                icon={Calendar}
                label="Milestones"
                to="/milestones"
                isActive={path === "/milestones"}
                onClick={() => setIsMobileOpen(false)}
              />
              <SidebarItem
                icon={Tag}
                label="Releases"
                to="/releases"
                isActive={path === "/releases"}
                onClick={() => setIsMobileOpen(false)}
              />
            </SidebarGroup>

            <SidebarGroup title="Administration">
              <SidebarItem
                icon={Users}
                label="Users"
                to="/users"
                isActive={path === "/users"}
                onClick={() => setIsMobileOpen(false)}
              />
              <SidebarItem
                icon={Settings}
                label="Settings"
                to="/settings"
                isActive={path === "/settings"}
                onClick={() => setIsMobileOpen(false)}
              />
            </SidebarGroup>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
