"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, PlusCircle, Home } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";

interface DashboardNavProps {
  role: "student" | "teacher";
}

export function DashboardNav({ role }: DashboardNavProps) {
  if (role === "teacher") {
    return (
      <div className="flex flex-wrap gap-4 mb-8 items-center">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </Link>
        <Link href="/teacher/dashboard">
          <Button variant="outline" size="sm">
            <BookOpen className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/teacher/quiz/create">
          <Button variant="outline" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Quiz
          </Button>
        </Link>
        <Link href="/teacher/content">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            My Content
          </Button>
        </Link>
        <Link href="/teacher/content/create">
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Content
          </Button>
        </Link>
        <div className="ml-auto">
          <SignOutButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8 items-center">
      <Link href="/">
        <Button variant="ghost" size="sm">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Link href="/student/dashboard">
        <Button variant="outline" size="sm">
          <BookOpen className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/student/content">
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Learning Resources
        </Button>
      </Link>
      <div className="ml-auto">
        <SignOutButton />
      </div>
    </div>
  );
}
