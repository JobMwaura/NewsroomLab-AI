// ─── Courses API ─────────────────────────────────────
// GET: Fetch all courses from database
// POST: Create a new course from template

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request) {
  try {
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: {
            assignments: true,
            enrollments: true,
          },
        },
      },
      orderBy: { code: "asc" },
    })

    // Transform to match frontend expectations
    const transformed = courses.map((course) => ({
      id: course.id,
      title: course.title,
      code: course.code,
      series: course.series,
      institution: course.institution,
      semester: course.semester,
      description: course.description,
      outcomes: course.outcomes || [],
      templateId: course.templateId,
      isArchived: course.isArchived,
      isPublished: course.isPublished,
      studentCount: course._count.enrollments,
      assignmentCount: course._count.assignments,
      lecturerId: course.lecturerId,
    }))

    return NextResponse.json({ courses: transformed })
  } catch (error) {
    console.error("Failed to fetch courses:", error)
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { templateId, title, semester, lecturerId } = body

    // Import the course template
    const { getCourseTemplate } = await import("@/lib/templates")
    const template = getCourseTemplate(templateId)

    if (!template) {
      return NextResponse.json(
        { error: "Invalid template ID" },
        { status: 400 }
      )
    }

    // Series mapping
    const seriesMap = {
      HCC109: "100",
      HCC205: "200",
      HCC312: "300",
      HCC314: "300",
      HCC316: "300",
      HCC420: "400",
    }

    // Create the course
    const course = await prisma.course.create({
      data: {
        title: title || template.title,
        code: template.code,
        series: seriesMap[templateId] || "300",
        description: template.description,
        semester: semester || "Semester 1 2026",
        outcomes: template.outcomes,
        templateId,
        isPublished: false,
        isArchived: false,
        lecturerId,
      },
    })

    return NextResponse.json({ course })
  } catch (error) {
    console.error("Failed to create course:", error)
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    )
  }
}
