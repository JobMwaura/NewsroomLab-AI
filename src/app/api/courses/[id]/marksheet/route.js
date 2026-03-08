import { NextResponse } from "next/server"
import ExcelJS from "exceljs"

// Demo data for marksheet generation (since we're using demo data flow)
import { demoCourses, demoAssignments, demoUsers, demoSubmissions } from "@/lib/demo-data"

// Default grade scale
const DEFAULT_GRADE_SCALE = [
  { grade: "A", min: 75, max: 100 },
  { grade: "B", min: 65, max: 74 },
  { grade: "C", min: 50, max: 64 },
  { grade: "D", min: 40, max: 49 },
  { grade: "E", min: 0, max: 39 },
]

// Calculate grade from score using grade scale
function calculateGrade(score, gradeScale = DEFAULT_GRADE_SCALE) {
  if (score === null || score === undefined || score === "") return ""
  const numScore = parseFloat(score)
  for (const { grade, min, max } of gradeScale) {
    if (numScore >= min && numScore <= max) return grade
  }
  return "E"
}

// GET /api/courses/:courseId/marksheet.xlsx
export async function GET(request, { params }) {
  try {
    const { id: courseId } = await params

    // Find the course
    const course = demoCourses.find((c) => c.id === courseId)
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    // Get assignments for this course that count toward CA
    const courseAssignments = demoAssignments
      .filter((a) => a.courseId === courseId || a.courseName === course.title)
      .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt))

    // Get enrolled students (demo: all students)
    const students = demoUsers
      .filter((u) => u.role === "STUDENT")
      .sort((a, b) => a.name.localeCompare(b.name))

    // Get grading config (default values)
    const gradingConfig = {
      caWeight: 30,
      examWeight: 70,
      gradeScale: DEFAULT_GRADE_SCALE,
    }

    // Assignment max marks (default 10 each)
    const assignmentConfigs = courseAssignments.map((a, idx) => ({
      assignmentId: a.id,
      title: a.title,
      maxMarks: a.maxMarks || 10,
      caSlot: idx + 1,
    }))

    // Create workbook
    const workbook = new ExcelJS.Workbook()
    workbook.creator = "NewsroomLab AI"
    workbook.created = new Date()

    const worksheet = workbook.addWorksheet("Marksheet", {
      views: [{ state: "frozen", xSplit: 3, ySplit: 8 }], // Freeze first 3 columns and header rows
    })

    // ─── HEADER BLOCK (rows 1-6) ───────────────────────────
    const headerStyle = {
      font: { bold: true, size: 11 },
      alignment: { vertical: "middle" },
    }

    worksheet.mergeCells("A1:F1")
    worksheet.getCell("A1").value = "NEWSROOMLAB AI - COURSE MARKSHEET"
    worksheet.getCell("A1").font = { bold: true, size: 14 }
    worksheet.getCell("A1").alignment = { horizontal: "center" }

    worksheet.getCell("A3").value = "UNIT NAME:"
    worksheet.getCell("B3").value = course.title
    worksheet.getCell("A3").font = headerStyle.font

    worksheet.getCell("A4").value = "COURSE CODE:"
    worksheet.getCell("B4").value = course.code || "N/A"
    worksheet.getCell("A4").font = headerStyle.font

    worksheet.getCell("D3").value = "SEMESTER/YEAR:"
    worksheet.getCell("E3").value = course.semester || "N/A"
    worksheet.getCell("D3").font = headerStyle.font

    worksheet.getCell("D4").value = "LECTURER:"
    const lecturer = demoUsers.find((u) => u.id === course.lecturerId)
    worksheet.getCell("E4").value = lecturer?.name || "N/A"
    worksheet.getCell("D4").font = headerStyle.font

    worksheet.getCell("A5").value = "DATE OF EXPORT:"
    worksheet.getCell("B5").value = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    worksheet.getCell("A5").font = headerStyle.font

    // ─── COLUMN HEADERS (row 8) ────────────────────────────
    const headerRow = 8
    const headers = [
      "S. No.",
      "REG. NO.",
      "STUDENT NAME",
      ...assignmentConfigs.map((a) => a.title.length > 15 ? a.title.substring(0, 15) + "..." : a.title),
      `CA Total (${gradingConfig.caWeight})`,
      `Exam (${gradingConfig.examWeight})`,
      "IE Total (100)",
      "EE Mark (100)",
      "Agreed Mark (100)",
      "Grade",
    ]

    // Calculate total max marks for CA scaling
    const totalMaxMarks = assignmentConfigs.reduce((sum, a) => sum + a.maxMarks, 0)

    // Set column widths
    worksheet.columns = [
      { width: 6 },  // S. No.
      { width: 15 }, // Reg No
      { width: 25 }, // Name
      ...assignmentConfigs.map(() => ({ width: 12 })), // Assignment columns
      { width: 12 }, // CA Total
      { width: 10 }, // Exam
      { width: 12 }, // IE Total
      { width: 12 }, // EE Mark
      { width: 14 }, // Agreed Mark
      { width: 8 },  // Grade
    ]

    // Add header row
    const headerRowObj = worksheet.getRow(headerRow)
    headers.forEach((header, idx) => {
      const cell = headerRowObj.getCell(idx + 1)
      cell.value = header
      cell.font = { bold: true, size: 10 }
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true }
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9E1F2" }, // Light blue
      }
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      }
    })
    headerRowObj.height = 30

    // ─── STUDENT DATA ROWS ─────────────────────────────────
    const dataStartRow = 9
    const assignmentStartCol = 4 // Column D
    const caCol = assignmentStartCol + assignmentConfigs.length
    const examCol = caCol + 1
    const ieCol = examCol + 1
    const eeCol = ieCol + 1
    const agreedCol = eeCol + 1
    const gradeCol = agreedCol + 1

    students.forEach((student, studentIdx) => {
      const rowNum = dataStartRow + studentIdx
      const row = worksheet.getRow(rowNum)

      // S. No.
      row.getCell(1).value = studentIdx + 1
      row.getCell(1).alignment = { horizontal: "center" }

      // Reg No (using email prefix as demo reg number)
      row.getCell(2).value = student.email.split("@")[0].toUpperCase()
      row.getCell(2).alignment = { horizontal: "center" }

      // Student Name
      row.getCell(3).value = student.name

      // Assignment scores (demo: random scores between 5-10)
      assignmentConfigs.forEach((config, aIdx) => {
        const cell = row.getCell(assignmentStartCol + aIdx)
        // Demo: Generate a realistic score
        const submission = demoSubmissions?.find(
          (s) => s.studentId === student.id && s.assignmentId === config.assignmentId
        )
        const score = submission?.overallScore 
          ? Math.round((submission.overallScore / 100) * config.maxMarks * 10) / 10
          : Math.round((5 + Math.random() * 5) * 10) / 10 // Random 5-10
        cell.value = Math.min(score, config.maxMarks)
        cell.alignment = { horizontal: "center" }
        
        // Data validation for assignment marks
        cell.dataValidation = {
          type: "decimal",
          operator: "between",
          formula1: 0,
          formula2: config.maxMarks,
          showErrorMessage: true,
          errorTitle: "Invalid Mark",
          error: `Mark must be between 0 and ${config.maxMarks}`,
        }
      })

      // CA Total formula (scaled to 30)
      const assignmentRange = assignmentConfigs.length > 0
        ? `${getColLetter(assignmentStartCol)}${rowNum}:${getColLetter(assignmentStartCol + assignmentConfigs.length - 1)}${rowNum}`
        : null
      
      if (assignmentRange && totalMaxMarks > 0) {
        row.getCell(caCol).value = {
          formula: `ROUND((SUM(${assignmentRange})/${totalMaxMarks})*${gradingConfig.caWeight},1)`,
        }
      } else {
        row.getCell(caCol).value = 0
      }
      row.getCell(caCol).alignment = { horizontal: "center" }
      row.getCell(caCol).font = { bold: true }
      row.getCell(caCol).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF2F2F2" },
      }

      // Exam (blank, editable)
      row.getCell(examCol).value = ""
      row.getCell(examCol).alignment = { horizontal: "center" }
      row.getCell(examCol).dataValidation = {
        type: "decimal",
        operator: "between",
        formula1: 0,
        formula2: gradingConfig.examWeight,
        showErrorMessage: true,
        errorTitle: "Invalid Exam Mark",
        error: `Exam mark must be between 0 and ${gradingConfig.examWeight}`,
      }

      // IE Total formula
      row.getCell(ieCol).value = {
        formula: `IF(${getColLetter(examCol)}${rowNum}="","",${getColLetter(caCol)}${rowNum}+${getColLetter(examCol)}${rowNum})`,
      }
      row.getCell(ieCol).alignment = { horizontal: "center" }
      row.getCell(ieCol).font = { bold: true }
      row.getCell(ieCol).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF2F2F2" },
      }

      // EE Mark (blank, editable)
      row.getCell(eeCol).value = ""
      row.getCell(eeCol).alignment = { horizontal: "center" }
      row.getCell(eeCol).dataValidation = {
        type: "decimal",
        operator: "between",
        formula1: 0,
        formula2: 100,
        showErrorMessage: true,
        errorTitle: "Invalid EE Mark",
        error: "EE mark must be between 0 and 100",
      }

      // Agreed Mark formula (average of IE and EE, or manual override)
      row.getCell(agreedCol).value = {
        formula: `IF(${getColLetter(eeCol)}${rowNum}="","",ROUND((${getColLetter(ieCol)}${rowNum}+${getColLetter(eeCol)}${rowNum})/2,0))`,
      }
      row.getCell(agreedCol).alignment = { horizontal: "center" }
      row.getCell(agreedCol).font = { bold: true }
      row.getCell(agreedCol).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFFF2CC" }, // Light yellow for agreed mark
      }

      // Grade formula
      const finalMarkRef = `IF(${getColLetter(agreedCol)}${rowNum}<>"",${getColLetter(agreedCol)}${rowNum},${getColLetter(ieCol)}${rowNum})`
      row.getCell(gradeCol).value = {
        formula: `IF(${finalMarkRef}="","",IF(${finalMarkRef}>=75,"A",IF(${finalMarkRef}>=65,"B",IF(${finalMarkRef}>=50,"C",IF(${finalMarkRef}>=40,"D","E")))))`,
      }
      row.getCell(gradeCol).alignment = { horizontal: "center" }
      row.getCell(gradeCol).font = { bold: true }
      row.getCell(gradeCol).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE2EFDA" }, // Light green for grade
      }

      // Add borders to all cells in row
      for (let col = 1; col <= headers.length; col++) {
        row.getCell(col).border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        }
      }
    })

    // ─── FOOTER / SIGNATURE BLOCK ──────────────────────────
    const footerStartRow = dataStartRow + students.length + 3

    worksheet.getCell(`A${footerStartRow}`).value = "Name of Lecturer:"
    worksheet.getCell(`C${footerStartRow}`).value = "_______________________"
    worksheet.getCell(`E${footerStartRow}`).value = "Sign:"
    worksheet.getCell(`F${footerStartRow}`).value = "_____________"
    worksheet.getCell(`G${footerStartRow}`).value = "Date:"
    worksheet.getCell(`H${footerStartRow}`).value = "_____________"

    worksheet.getCell(`A${footerStartRow + 2}`).value = "Name of External Examiner:"
    worksheet.getCell(`C${footerStartRow + 2}`).value = "_______________________"
    worksheet.getCell(`E${footerStartRow + 2}`).value = "Sign:"
    worksheet.getCell(`F${footerStartRow + 2}`).value = "_____________"
    worksheet.getCell(`G${footerStartRow + 2}`).value = "Date:"
    worksheet.getCell(`H${footerStartRow + 2}`).value = "_____________"

    // ─── LEGEND / GRADE SCALE ──────────────────────────────
    const legendRow = footerStartRow + 5
    worksheet.getCell(`A${legendRow}`).value = "GRADE SCALE:"
    worksheet.getCell(`A${legendRow}`).font = { bold: true }
    
    DEFAULT_GRADE_SCALE.forEach((g, idx) => {
      worksheet.getCell(`B${legendRow + idx}`).value = `${g.grade}: ${g.min}-${g.max}%`
    })

    // ─── GENERATE AND RETURN FILE ──────────────────────────
    const buffer = await workbook.xlsx.writeBuffer()

    const filename = `${course.code || "Course"}_Marksheet_${new Date().toISOString().split("T")[0]}.xlsx`

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error generating marksheet:", error)
    return NextResponse.json(
      { error: "Failed to generate marksheet", details: error.message },
      { status: 500 }
    )
  }
}

// Helper: Convert column number to Excel letter (1 = A, 2 = B, etc.)
function getColLetter(colNum) {
  let letter = ""
  let num = colNum
  while (num > 0) {
    const mod = (num - 1) % 26
    letter = String.fromCharCode(65 + mod) + letter
    num = Math.floor((num - 1) / 26)
  }
  return letter
}
