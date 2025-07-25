"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Link, FileText } from "lucide-react";
import LocalFileUpload from "@/components/upload/LocalFileUpload";

export default function CreateContent() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "note" as "note" | "video" | "link",
    url: "",
    subject: "",
  });
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const handleFileUploadComplete = (url: string) => {
    setUploadedUrl(url);
    setFormData({ ...formData, url, type: "video" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          url: uploadedUrl || formData.url
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create content');
      }

      alert("Content created successfully!");
      // Reset form
      setFormData({
        title: "",
        description: "",
        type: "note",
        url: "",
        subject: "",
      });
      setUploadedUrl("");
    } catch (error) {
      console.error('Error creating content:', error);
      alert("Failed to create content");
    }
  };

  if (!session) {
    return <div>Please sign in to create content</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload Learning Content</h1>
          
          <div className="space-y-8">
            <LocalFileUpload 
              onFileSelect={() => {}} 
              onUploadComplete={handleFileUploadComplete}
            />

            <Card>
              <CardHeader>
                <CardTitle>Create New Content</CardTitle>
                <CardDescription>
                  Upload notes, videos, or links for your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter content title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the content"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Content Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="note">
                          <div className="flex items-center">
                            <FileText className="mr-2 h-4 w-4" />
                            Note/PDF
                          </div>
                        </SelectItem>
                        <SelectItem value="video">
                          <div className="flex items-center">
                            <Upload className="mr-2 h-4 w-4" />
                            Video
                          </div>
                        </SelectItem>
                        <SelectItem value="link">
                          <div className="flex items-center">
                            <Link className="mr-2 h-4 w-4" />
                            Web Link
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {uploadedUrl ? (
                    <div>
                      <Label>Uploaded File URL</Label>
                      <Input value={uploadedUrl} readOnly className="bg-gray-100" />
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="url">URL/Link</Label>
                      <Input
                        id="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        placeholder={
                          formData.type === "note"
                            ? "https://example.com/notes.pdf"
                            : formData.type === "video"
                            ? "https://youtube.com/watch?v=..."
                            : "https://example.com/resource"
                        }
                        required
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Mathematics, History, Science"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create Content
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
