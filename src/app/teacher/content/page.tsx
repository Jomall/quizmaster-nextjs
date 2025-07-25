"use client";

import { useSession } from "next-auth/react";
import { getContentByTeacher } from "@/lib/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Video, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function TeacherContent() {
  const { data: session } = useSession();
  
  if (!session) {
    return <div>Please sign in to view your content</div>;
  }

  const teacherContent = getContentByTeacher(session.user?.id || "");

  const getIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "link":
        return <LinkIcon className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Content</h1>
          <Link href="/teacher/content/create">
            <Button>
              Create New Content
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {teacherContent.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No content uploaded yet. Create your first content!</p>
              </CardContent>
            </Card>
          ) : (
            teacherContent.map((content) => (
              <Card key={content.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getIcon(content.type)}
                        {content.title}
                      </CardTitle>
                      <CardDescription>{content.description}</CardDescription>
                    </div>
                    <Badge variant={content.type === "video" ? "default" : "secondary"}>
                      {content.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Subject:</strong> {content.subject}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Upload Date:</strong> {content.uploadDate}
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={content.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <Button size="sm" variant="outline">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Content
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
