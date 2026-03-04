"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, serverTimestamp, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "@/components/admin/FormField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Tabs } from "@/components/ui/tabs";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // General settings
  const [schoolName, setSchoolName] = useState("");
  const [tagline, setTagline] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [aboutText, setAboutText] = useState("");

  // Contact settings
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Social settings
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        const snap = await getDocs(collection(db, "siteConfig"));
        if (snap.docs.length > 0) {
          const data = snap.docs[0].data();
          setSchoolName(data.schoolName || "");
          setTagline(data.tagline || "");
          setLogoUrl(data.logoUrl || "");
          setAboutText(data.aboutText || "");
          setPhone(data.phone || "");
          setEmail(data.email || "");
          setAddress(data.address || "");
          setFacebook(data.socialLinks?.facebook || "");
          setTwitter(data.socialLinks?.twitter || "");
          setInstagram(data.socialLinks?.instagram || "");
          setYoutube(data.socialLinks?.youtube || "");
        }
      } catch { toast.error("Failed to load settings"); }
      finally { setLoading(false); }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "siteConfig", "main"), {
        schoolName, tagline, logoUrl, aboutText, phone, email, address,
        socialLinks: { facebook, twitter, instagram, youtube },
        updatedAt: serverTimestamp(),
      }, { merge: true });
      toast.success("Settings saved!");
    } catch { toast.error("Failed to save"); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><LoadingSpinner size="lg" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="text-text-secondary">Manage site configuration</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="mr-2 h-4 w-4" />{saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs
        tabs={[
          { label: "General", value: "general" },
          { label: "Contact", value: "contact" },
          { label: "Social Media", value: "social" },
        ]}
        defaultValue="general"
      >
        {(activeTab) => (
          <>
            {activeTab === "general" && (
              <Card>
                <CardHeader><CardTitle>General Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField label="School Name" name="schoolName">
                    <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                  </FormField>
                  <FormField label="Tagline" name="tagline">
                    <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
                  </FormField>
                  <FormField label="Logo" name="logo">
                    <ImageUploader value={logoUrl} onChange={setLogoUrl} folder="branding" aspectRatio="aspect-square" />
                  </FormField>
                  <FormField label="About Text" name="aboutText">
                    <Textarea value={aboutText} onChange={(e) => setAboutText(e.target.value)} rows={4} />
                  </FormField>
                </CardContent>
              </Card>
            )}

            {activeTab === "contact" && (
              <Card>
                <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField label="Phone" name="phone">
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </FormField>
                  <FormField label="Email" name="email">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                  </FormField>
                  <FormField label="Address" name="address">
                    <Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} />
                  </FormField>
                </CardContent>
              </Card>
            )}

            {activeTab === "social" && (
              <Card>
                <CardHeader><CardTitle>Social Media Links</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <FormField label="Facebook" name="facebook">
                    <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://facebook.com/..." />
                  </FormField>
                  <FormField label="Twitter" name="twitter">
                    <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://twitter.com/..." />
                  </FormField>
                  <FormField label="Instagram" name="instagram">
                    <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/..." />
                  </FormField>
                  <FormField label="YouTube" name="youtube">
                    <Input value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtube.com/..." />
                  </FormField>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Tabs>
    </div>
  );
}
