"use client";

import { Sidebar, BottomTabs, ThemeToggle } from "@/components";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen flex">
      {/* Theme toggle - fixed top left - only on desktop */}
      <div className="hidden lg:block fixed top-4 left-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 lg:mr-64">
        <div className="pb-16 lg:pb-0">
          {children}
        </div>
      </div>
      
      {/* Sidebar for desktop - right side */}
      <Sidebar />
      
      {/* Bottom tabs for mobile */}
      <BottomTabs />
    </div>
  );
}