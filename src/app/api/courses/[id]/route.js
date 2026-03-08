// ─── Single Course API ───────────────────────────────
// GET: Fetch a single course
// PATCH: Update course (publish/unpublish, archive)

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request, { params }) {
  try {
    const { id } = await params

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        assignments: {
          orderBy: { dueAt: "asc" },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      course: {
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
        startDate: course.startDate?.toISOString() || "2026-01-20T08:00:00Z",
        studentCount: course._count.enrollments,
        assignmentCount: course.assignments?.length || 0,
        assignments: course.assignments,
        lecturerId: course.lecturerId,
      },
    })
  } catch (error) {
    console.error("Failed to fetch course:", error)
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    )
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()

    const { isPublished, isArchived } = body

    const updateData = {}
    if (typeof isPublished === "boolean") updateData.isPublished = isPublished
    if (typeof isArchived === "boolean") updateData.isArchived = isArchived

    const course = await prisma.course.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ course })
  } catch (error) {
    console.error("Failed to update course:", error)
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    )
  }
}
