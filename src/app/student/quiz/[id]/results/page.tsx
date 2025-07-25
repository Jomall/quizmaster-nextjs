"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

export default function QuizResultsPage() {
  const params = useParams();

  // Mock results data - replace with actual data
  const results = {
    quizTitle: "Introduction to Algebra",
    score: 8,
    maxScore: 10,
    percentage: 80,
    questions: [
      {
        id: "1",
        questionText: "What is 2 + 2?",
        userAnswer: "4",
        correctAnswer: "4",
        isCorrect: true,
        points: 1
      },
      {
        id: "2",
        questionText: "Solve for x: x + 5 = 10",
        userAnswer: "5",
        correctAnswer: "5",
        isCorrect: true,
        points: 2
      },
      {
        id: "3",
        questionText: "What is 3 × 4?",
        userAnswer: "11",
        correctAnswer: "12",
        isCorrect: false,
        points: 1
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h1>
            <h2 className="text-xl text-gray-600">{results.quizTitle}</h2>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Your Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {results.percentage}%
              </div>
              <p className="text-xl text-gray-600">
                {results.score} / {results.maxScore} points
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Question Review</h3>
            {results.questions.map((question, index) => (
              <Card key={question.id} className={question.isCorrect ? "border-green-200" : "border-red-200"}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {question.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    Question {index + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">{question.questionText}</p>
                  <div className="space-y-1">
                    <p><strong>Your answer:</strong> {question.userAnswer}</p>
                    <p><strong>Correct answer:</strong> {question.correctAnswer}</p>
                    <p><strong>Points:</strong> {question.isCorrect ? question.points : 0}/{question.points}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="/student/dashboard" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
