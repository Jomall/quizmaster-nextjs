"use client";

import { useSession } from "next-auth/react";
import { getContentForStudents } from "@/lib/content";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Video, Link as LinkIcon } from "lucide-react";

export default function StudentContent() {
  const { data: session } = useSession();
  const studentContent = getContentForStudents();

  const getIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "link":
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "note":
        return "bg-blue-100 text-blue-800";
      case "video":
        return "bg-red-100 text-red-800";
      case "link":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Learning Resources
          </h1>
          <p className="text-gray-600">
            Access notes, videos, and resources from your teachers
          </p>
        </div>

        <div className="grid gap-6">
          {studentContent.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">
                  No learning resources available yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          ) : (
            studentContent.map((content) => (
              <Card key={content.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getColor(content.type)}`}>
                        {getIcon(content.type)}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{content.title}</CardTitle>
                        <CardDescription>{content.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{content.subject}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>By: {content.teacherName}</span>
                      <span>Uploaded: {content.uploadDate}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <a
                        href={content.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Open {content.type === "note" ? "Notes" : content.type === "video" ? "Video" : "Link"}
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
