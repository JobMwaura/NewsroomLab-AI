import { NextResponse } from "next/server"
import { demoCourses, demoAssignments, demoUsers, demoSubmissions } from "@/lib/demo-data"

const DEFAULT_GRADE_SCALE = [
  { grade: "A", min: 75, max: 100 },
  { grade: "B", min: 65, max: 74 },
  { grade: "C", min: 50, max: 64 },
  { grade: "D", min: 40, max: 49 },
  { grade: "E", min: 0, max: 39 },
]

function calculateGrade(score) {
  if (score === null || score === undefined || score === "") return ""
  const n = parseFloat(score)
  for (const { grade, min, max } of DEFAULT_GRADE_SCALE) {
    if (n >= min && n <= max) return grade
  }
  return "E"
}

function escapeCSV(val) {
  if (val === null || val === undefined) return ""
  const s = String(val)
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

function row(...cells) {
  return cells.map(escapeCSV).join(",") + "\r\n"
}

// GET /api/courses/:courseId/marksheet  →  returns CSV
export async function GET(request, { params }) {
  try {
    const { id: courseId } = await params

    const course = demoCourses.find((c) => c.id === courseId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const courseAssignments = demoAssignments
      .filter((a) => a.courseId === courseId || a.courseName === course.title)
      .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt))

    const students = demoUsers
      .filter((u) => u.role === "STUDENT")
      .sort((a, b) => a.name.localeCompare(b.name))

    let csv = ""

    // Header block
    csv += row("NEWSROOMLAB AI - COURSE MARKSHEET")
    csv += row("Course:", course.title)
    csv += row("Course Code:", course.code)
    csv += row("Generated:", new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }))
    csv += row("CA Weight:", "30%", "Exam Weight:", "70%")
    csv += "\r\n"

    // Grade scale
    csv += row("GRADE SCALE")
    csv += row("Grade", "Min %", "Max %")
    for (const { grade, min, max } of DEFAULT_GRADE_SCALE) {
      csv += row(grade, min, max)
    }
    csv += "\r\n"

    // Column headers
    const assignmentHeaders = courseAssignments.length > 0
      ? courseAssignments.map((a, i) => `CA${i + 1}: ${a.title} (/${a.maxMarks || 10})`)
      : ["CA1 (/10)", "CA2 (/10)", "CA3 (/10)"]

    csv += row("No.", "Student Name", "Student Email", ...assignmentHeaders, "CA Total (%)", "Exam (%)", "Overall (%)", "Grade", "Remarks")

    // Student rows
    students.forEach((student, idx) => {
      const assignmentScores = courseAssignments.length > 0
        ? courseAssignments.map((a) => {
            const sub = demoSubmissions.find((s) => s.studentId === student.id && s.assignmentId === a.id)
            return sub?.overallScore != null ? sub.overallScore : ""
          })
        : ["", "", ""]

      const scoredAssignments = assignmentScores.filter((s) => s !== "")
      const caTotal = scoredAssignments.length > 0
        ? Math.round(scoredAssignments.reduce((a, b) => a + Number(b), 0) / scoredAssignments.length)
        : ""

      const examScore = ""
      const overall = caTotal !== "" && examScore !== ""
        ? Math.round(caTotal * 0.3 + Number(examScore) * 0.7)
        : ""

      csv += row(
        idx + 1,
        student.name,
        student.email,
        ...assignmentScores,
        caTotal,
        examScore,
        overall,
        calculateGrade(overall),
        ""
      )
    })

    csv += "\r\n"
    csv += row("", "", "Total Students:", students.length)

    const filename = `${course.code || courseId}_marksheet_${new Date().toISOString().slice(0, 10)}.csv`

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Marksheet generation error:", error)
    return NextResponse.json({ error: "Failed to generate marksheet" }, { status: 500 })
  }
}
