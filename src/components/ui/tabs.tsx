"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { label: string; value: string }[];
  defaultValue?: string;
  children: (activeTab: string) => ReactNode;
  className?: string;
}

function Tabs({ tabs, defaultValue, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex gap-1 border-b border-border mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px cursor-pointer",
              activeTab === tab.value
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children(activeTab)}
    </div>
  );
}

export { Tabs };
