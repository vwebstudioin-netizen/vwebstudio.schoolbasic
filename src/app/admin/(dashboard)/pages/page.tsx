"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, serverTimestamp, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/admin/FormField";
import { TiptapEditor } from "@/components/admin/TiptapEditor";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Tabs } from "@/components/ui/tabs";

const pageKeys = ["about", "academics", "admissions"] as const;

export default function PagesAdminPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pages, setPages] = useState<Record<string, { title: string; content: string }>>({});

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDocs(collection(db, "pages"));
        const data: Record<string, { title: string; content: string }> = {};
        snap.docs.forEach((d) => {
          data[d.id] = { title: d.data().title || "", content: d.data().content || "" };
        });
        setPages(data);
      } catch { toast.error("Failed to load pages"); }
      finally { setLoading(false); }
    }
    load();
  }, []);

  const updatePage = (key: string, field: "title" | "content", value: string) => {
    setPages((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleSave = async (key: string) => {
    setSaving(true);
    try {
      await setDoc(doc(db, "pages", key), {
        ...pages[key],
        updatedAt: serverTimestamp(),
      }, { merge: true });
      toast.success(`${key} page saved!`);
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Pages</h1>
        <p className="text-text-secondary">Manage static page content</p>
      </div>

      <Tabs
        tabs={pageKeys.map((key) => ({ label: key.charAt(0).toUpperCase() + key.slice(1), value: key }))}
        defaultValue="about"
      >
        {(activeTab) => (
          <>
            {pageKeys.map((key) =>
              activeTab === key ? (
                <Card key={key}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="capitalize">{key} Page</CardTitle>
                    <Button onClick={() => handleSave(key)} disabled={saving} size="sm">
                      <Save className="mr-2 h-4 w-4" />{saving ? "Saving..." : "Save"}
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField label="Page Title" name={`${key}-title`}>
                      <Input
                        value={pages[key]?.title || ""}
                        onChange={(e) => updatePage(key, "title", e.target.value)}
                      />
                    </FormField>
                    <FormField label="Content" name={`${key}-content`}>
                      <TiptapEditor
                        content={pages[key]?.content || ""}
                        onChange={(val) => updatePage(key, "content", val)}
                      />
                    </FormField>
                  </CardContent>
                </Card>
              ) : null
            )}
          </>
        )}
      </Tabs>
    </div>
  );
}
