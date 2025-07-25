"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface Question {
  id: string;
  questionText: string;
  questionType: 'multiple-choice' | 'true-false' | 'short-answer';
  options: string[];
  correctAnswer: string;
  points: number;
}

export default function CreateQuizPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: Date.now().toString(),
    questionText: "",
    questionType: "multiple-choice",
    options: ["", ""],
    correctAnswer: "",
    points: 1
  });

  const addQuestion = () => {
    if (currentQuestion.questionText.trim() && currentQuestion.correctAnswer) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        id: Date.now().toString(),
        questionText: "",
        questionType: "multiple-choice",
        options: ["", ""],
        correctAnswer: "",
        points: 1
      });
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestionOption = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ""]
    });
  };

  const removeOption = (index: number) => {
    const newOptions = currentQuestion.options.filter((_, i) => i !== index);
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save to your backend
    console.log("Quiz Data:", {
      title,
      description,
      timeLimit,
      questions
    });
    
    // For now, redirect back to dashboard
    router.push("/teacher/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Quiz</h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Quiz Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter quiz description"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    min="1"
                    max="180"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Question Type</Label>
                  <select
                    value={currentQuestion.questionType}
                    onChange={(e) => setCurrentQuestion({
                      ...currentQuestion,
                      questionType: e.target.value as 'multiple-choice' | 'true-false' | 'short-answer',
                      options: e.target.value === 'multiple-choice' ? ["", ""] : [],
                      correctAnswer: ""
                    })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                  </select>
                </div>

                <div>
                  <Label>Question Text</Label>
                  <Textarea
                    value={currentQuestion.questionText}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, questionText: e.target.value })}
                    placeholder="Enter your question"
                    rows={2}
                  />
                </div>

                <div>
                  <Label>Points</Label>
                  <Input
                    type="number"
                    value={currentQuestion.points}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: Number(e.target.value) })}
                    min="1"
                  />
                </div>

                {currentQuestion.questionType === 'multiple-choice' && (
                  <div className="space-y-2">
                    <Label>Options</Label>
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateQuestionOption(index, e.target.value)}
                          placeholder={`Option ${index + 1}`}
                        />
                        {currentQuestion.options.length > 2 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                    >
                      Add Option
                    </Button>
                  </div>
                )}

                {currentQuestion.questionType === 'true-false' && (
                  <div>
                    <Label>Correct Answer</Label>
                    <select
                      value={currentQuestion.correctAnswer}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select answer</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  </div>
                )}

                {currentQuestion.questionType === 'short-answer' && (
                  <div>
                    <Label>Correct Answer</Label>
                    <Input
                      value={currentQuestion.correctAnswer}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                      placeholder="Enter correct answer"
                    />
                  </div>
                )}

                {currentQuestion.questionType === 'multiple-choice' && (
                  <div>
                    <Label>Correct Answer</Label>
                    <select
                      value={currentQuestion.correctAnswer}
                      onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select correct answer</option>
                      {currentQuestion.options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addQuestion}
                  className="w-full"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </CardContent>
            </Card>

            {questions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Questions ({questions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">Question {index + 1}</h4>
                            <p className="text-sm text-gray-600">{question.questionText}</p>
                            <p className="text-sm text-gray-500">Type: {question.questionType} • Points: {question.points}</p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Button type="submit" size="lg" className="w-full">
              Create Quiz
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
