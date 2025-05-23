import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ClipboardList,
  FileText,
  Home,
  LineChart,
  Settings,
  Users,
  BookOpen,
  Network,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

interface NavigationItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  badge?: string | number;
  isNew?: boolean;
}

const NavigationItem = ({
  href,
  label,
  icon,
  isActive = false,
  badge,
  isNew = false,
}: NavigationItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex items-center gap-sm p-sm mb-xs rounded-lg text-[var(--text-secondary)] text-sm font-medium transition-all duration-fast ease-out overflow-hidden hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:translate-x-[3px]",
        isActive &&
          "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-primary before:scale-y-100 before:origin-center before:transition-transform before:duration-normal before:ease-out before:rounded-r-sm",
      )}
    >
      <span
        className={cn(
          "w-5 h-5 flex-shrink-0 transition-transform duration-fast ease-out",
          !isActive && "group-hover:scale-110 group-hover:rotate-5",
        )}
      >
        {icon}
      </span>
      <span>{label}</span>
      {badge && (
        <span className="ml-auto py-0.5 px-2 bg-danger text-white text-xs font-bold rounded-full animate-badge-bounce">
          {badge}
        </span>
      )}
      {isNew && (
        <span className="ml-auto py-0.5 px-2 bg-primary text-white text-xs font-bold rounded-full animate-pulse">
          New
        </span>
      )}
    </Link>
  );
};

const Navigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const mainNavItems = [
    {
      href: "/",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/materiality",
      label: "Materiality Assessment",
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      href: "/implementation",
      label: "Implementation",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      href: "/data-gaps",
      label: "Data Gaps",
      icon: <BarChart3 className="h-5 w-5" />,
      badge: 4,
    },
    {
      href: "/ai-insights",
      label: "AI Insights",
      icon: <Sparkles className="h-5 w-5" />,
      isNew: true,
    },
  ];

  const resourceNavItems = [
    {
      href: "/frameworks",
      label: "Frameworks",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      href: "/experts",
      label: "Expert Network",
      icon: <Network className="h-5 w-5" />,
    },
    {
      href: "/reports",
      label: "Reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      href: "/stakeholders",
      label: "Stakeholders",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div>
      <div className="mb-lg">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-sm px-sm">
          Main
        </div>
        {mainNavItems.map((item) => (
          <NavigationItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href}
            badge={item.badge}
            isNew={item.isNew}
          />
        ))}
      </div>

      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-sm px-sm">
          Resources
        </div>
        {resourceNavItems.map((item) => (
          <NavigationItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href}
            badge={item.badge}
            isNew={item.isNew}
          />
        ))}
      </div>
    </div>
  );
};

export default Navigation;
