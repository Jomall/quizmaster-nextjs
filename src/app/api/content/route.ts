import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject')
    const teacherId = searchParams.get('teacherId')

    let whereClause: any = { isActive: true }

    if (subject) {
      whereClause.subject = subject
    }

    if (teacherId) {
      whereClause.teacherId = teacherId
    }

    const contentItems = await db.contentItem.findMany({
      where: whereClause,
      include: {
        teacher: {
          select: { name: true, email: true }
        }
      },
      orderBy: { uploadDate: 'desc' }
    })

    return NextResponse.json(contentItems)
  } catch (error) {
    console.error('Error fetching content:', error)
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

    if (!user || user.role !== 'TEACHER') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { title, description, type, url, subject } = body

    const contentItem = await db.contentItem.create({
      data: {
        title,
        description,
        type,
        url,
        teacherId: user.id,
        subject,
        uploadDate: new Date()
      },
      include: {
        teacher: {
          select: { name: true, email: true }
        }
      }
    })

    return NextResponse.json(contentItem, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
