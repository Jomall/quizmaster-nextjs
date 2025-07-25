import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const quizId = searchParams.get('quizId')

    let whereClause: any = {}
    
    if (user.role === 'STUDENT') {
      whereClause.studentId = user.id
    } else if (quizId) {
      whereClause.quizId = quizId
    }

    const attempts = await db.quizAttempt.findMany({
      where: whereClause,
      include: {
        quiz: {
          select: { title: true, timeLimit: true }
        },
        student: {
          select: { name: true, email: true }
        },
        answers: {
          include: {
            question: {
              select: { questionText: true, points: true }
            }
          }
        }
      },
      orderBy: { startedAt: 'desc' }
    })

    return NextResponse.json(attempts)
  } catch (error) {
    console.error('Error fetching quiz attempts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || user.role !== 'STUDENT') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { quizId, answers } = body

    // Check if quiz exists
    const quiz = await db.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true }
    })

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
    }

    // Calculate score
    let totalScore = 0
    const quizAnswers = answers.map((answer: any) => {
      const question = quiz.questions.find((q: any) => q.id === answer.questionId)
      if (!question) return null

      const isCorrect = answer.answer === question.correctAnswer
      const points = isCorrect ? question.points : 0
      totalScore += points

      return {
        questionId: answer.questionId,
        answer: answer.answer,
        isCorrect,
        points
      }
    }).filter(Boolean)

    // Create attempt and answers
    const attempt = await db.quizAttempt.create({
      data: {
        quizId,
        studentId: user.id,
        score: totalScore,
        completedAt: new Date(),
        answers: {
          create: quizAnswers
        }
      },
      include: {
        quiz: {
          select: { title: true }
        },
        answers: {
          include: {
            question: {
              select: { questionText: true, correctAnswer: true, points: true }
            }
          }
        }
      }
    })

    return NextResponse.json(attempt, { status: 201 })
  } catch (error) {
    console.error('Error creating quiz attempt:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
