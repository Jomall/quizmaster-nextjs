"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, PlayCircle, TrendingUp } from "lucide-react";
import { DashboardNav } from "@/components/navigation/dashboard-nav";

export default function StudentDashboard() {
  const { data: session } = useSession();
  
  // Mock data - replace with actual data fetching
  const availableQuizzes = [
    {
      id: "1",
      title: "Introduction to Algebra",
      teacher: "Mr. Smith",
      questions: 10,
      timeLimit: 30,
      dueDate: "2024-01-15"
    },
    {
      id: "2",
      title: "World History - World War II",
      teacher: "Ms. Johnson",
      questions: 15,
      timeLimit: 45,
      dueDate: "2024-01-20"
    }
  ];

  const completedQuizzes = [
    {
      id: "3",
      title: "Basic Geometry",
      score: 85,
      maxScore: 100,
      completedAt: "2024-01-10"
    },
    {
      id: "4",
      title: "Chemistry Basics",
      score: 92,
      maxScore: 100,
      completedAt: "2024-01-08"
    }
  ];

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {session.user?.name || "Student"}!
          </h1>
          <p className="text-gray-600 mt-1">
            Student ID: {session.user?.id} | Email: {session.user?.email}
          </p>
        </div>
        <DashboardNav role="student" />

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Available Quizzes</CardTitle>
              <CardDescription>Quizzes ready to take</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <PlayCircle className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-3xl font-bold">{availableQuizzes.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Completed</CardTitle>
              <CardDescription>Quizzes you've taken</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                <span className="text-3xl font-bold">{completedQuizzes.length}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Avg. Score</CardTitle>
              <CardDescription>Your average performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600 mr-3" />
                <span className="text-3xl font-bold">88%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Quizzes</h2>
            <div className="space-y-4">
              {availableQuizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <CardDescription>
                      <p>Teacher: {quiz.teacher}</p>
                      <p>{quiz.questions} questions • {quiz.timeLimit} minutes</p>
                      <p>Due: {quiz.dueDate}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/student/quiz/${quiz.id}/take`}>
                      <Button className="w-full">
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Start Quiz
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Completed Quizzes</h2>
            <div className="space-y-4">
              {completedQuizzes.map((quiz) => (
                <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <CardDescription>
                      <p>Score: {quiz.score}/{quiz.maxScore}</p>
                      <p>Completed: {quiz.completedAt}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/student/quiz/${quiz.id}/results`}>
                      <Button variant="outline" className="w-full">
                        View Results
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
