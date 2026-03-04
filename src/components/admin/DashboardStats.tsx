"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  className?: string;
}

export function DashboardStats({ stats }: { stats: StatCardProps[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={cn("relative overflow-hidden", stat.className)}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary">{stat.title}</p>
                    <p className="mt-1 text-2xl font-bold text-text-primary">
                      {stat.value}
                    </p>
                    {stat.trend && (
                      <p
                        className={cn(
                          "mt-1 text-xs font-medium",
                          stat.trend.isPositive
                            ? "text-green-600"
                            : "text-red-600"
                        )}
                      >
                        {stat.trend.isPositive ? "↑" : "↓"}{" "}
                        {Math.abs(stat.trend.value)}%
                      </p>
                    )}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-950/30">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
