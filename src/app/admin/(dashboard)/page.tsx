"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  FileText,
  CalendarDays,
  Image as ImageIcon,
  MessageSquare,
  Megaphone,
  HelpCircle,
} from "lucide-react";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

interface DashboardData {
  postCount: number;
  eventCount: number;
  messageCount: number;
  announcementCount: number;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [posts, events, messages, announcements] = await Promise.all([
          getDocs(collection(db, "posts")),
          getDocs(collection(db, "events")),
          getDocs(collection(db, "contactSubmissions")),
          getDocs(collection(db, "announcements")),
        ]);

        setData({
          postCount: posts.size,
          eventCount: events.size,
          messageCount: messages.size,
          announcementCount: announcements.size,
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  const stats = [
    { title: "Blog Posts", value: data?.postCount ?? 0, icon: FileText },
    { title: "Events", value: data?.eventCount ?? 0, icon: CalendarDays },
    { title: "Messages", value: data?.messageCount ?? 0, icon: MessageSquare },
    { title: "Announcements", value: data?.announcementCount ?? 0, icon: Megaphone },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">
          Welcome to your admin dashboard. Here&apos;s an overview.
        </p>
      </div>

      <DashboardStats stats={stats} />

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/blog"
              className="block rounded-lg p-3 text-sm hover:bg-surface-secondary transition-colors"
            >
              ✏️ Write a new blog post
            </a>
            <a
              href="/admin/events"
              className="block rounded-lg p-3 text-sm hover:bg-surface-secondary transition-colors"
            >
              📅 Create an event
            </a>
            <a
              href="/admin/announcements"
              className="block rounded-lg p-3 text-sm hover:bg-surface-secondary transition-colors"
            >
              📢 Add announcement
            </a>
            <a
              href="/admin/messages"
              className="block rounded-lg p-3 text-sm hover:bg-surface-secondary transition-colors"
            >
              💬 View messages
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
