import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { UserNav } from "./UserNav";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)]">
      {/* Header */}
      <header className="fixed top-md left-1/2 -translate-x-1/2 w-[calc(100%-var(--space-lg))] max-w-[1400px] z-sticky animate-slide-down">
        <div className="glass flex items-center justify-between gap-lg p-sm md:p-md rounded-2xl shadow-lg relative overflow-hidden">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Logo */}
          <Logo className="shine" />

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-[500px] relative">
            <input
              type="search"
              className="w-full h-11 pl-11 pr-[var(--space-xl)] bg-[var(--bg-secondary)] border-2 border-transparent rounded-full text-sm text-[var(--text-primary)] transition-all duration-normal ease-out focus:bg-[var(--bg-primary)] focus:border-primary focus:shadow-[0_0_0_4px_hsla(var(--hue-primary),91%,60%,0.1)] focus:scale-[1.02] hover:bg-[var(--bg-primary)] hover:shadow-sm"
              placeholder="Search anything..."
              aria-label="Search"
            />
            <Search
              className="absolute left-md top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none transition-colors duration-fast ease-out"
              size={16}
            />
            <div className="absolute right-md top-1/2 -translate-y-1/2 flex gap-xs pointer-events-none">
              <span className="py-0.5 px-1.5 bg-[var(--neutral-100)] border border-[var(--neutral-200)] rounded-sm text-[11px] font-medium text-[var(--text-tertiary)] shadow-[0_2px_0_0_var(--neutral-200)]">
                ⌘
              </span>
              <span className="py-0.5 px-1.5 bg-[var(--neutral-100)] border border-[var(--neutral-200)] rounded-sm text-[11px] font-medium text-[var(--text-tertiary)] shadow-[0_2px_0_0_var(--neutral-200)]">
                K
              </span>
            </div>
          </div>

          {/* User Nav */}
          <UserNav />
        </div>
      </header>

      {/* Sidebar */}
      <nav
        className={`fixed left-md top-[calc(64px+var(--space-md)*2)] bottom-md w-[260px] bg-[var(--bg-elevated)] rounded-xl shadow-lg overflow-hidden z-elevated flex flex-col animate-slide-in-left ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} transition-transform duration-normal ease-out`}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-md scrollbar-thin">
          <Navigation />
        </div>

        <div className="p-md border-t border-[var(--border-secondary)] bg-[var(--bg-secondary)]">
          <div className="relative p-md bg-gradient-to-br from-primary to-accent rounded-lg text-white overflow-hidden group hover:shadow-glow transition-all duration-normal ease-out">
            <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-radial-gradient from-white/20 to-transparent animate-float group-hover:animate-none group-hover:scale-150 group-hover:opacity-30 transition-all duration-normal"></div>
            <div className="relative z-1">
              <div className="text-sm font-bold mb-xs">Unlock Pro Features</div>
              <div className="text-xs opacity-90 mb-sm">
                Get AI-powered insights and advanced analytics
              </div>
              <Button
                variant="ghost"
                className="bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 hover:border-white/30 hover:translate-y-[-2px] transition-all duration-normal ease-out"
              >
                Upgrade Now ✨
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-[var(--bg-overlay)] backdrop-blur-sm z-[299] md:hidden ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-normal ease-out`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Main content */}
      <main className="ml-0 md:ml-[calc(260px+var(--space-md)*2)] pt-[calc(64px+var(--space-md)*2)] p-md min-h-screen animate-fade-in-up">
        <div className="max-w-[1200px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
