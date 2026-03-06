// ─── POST /api/submissions/[id]/final-submit ─────────────
// Server-side verification gate.
// Blocks final submission unless ALL rules are met:
//   • story plan complete
//   • verification table ≥ min rows
//   • high-risk claims have ≥ 2 sources
//   • word count in range
//   • required sections present
//   • reflection filled in
//   • AI disclosure present
//   • ethics mitigation (if required)
//   • right of reply (if required)
//   • custom flags (proof pack, photo permissions, etc.)

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { canFinalSubmit, getGatePresetRules } from "@/lib/verification-gate"
import { getStoryTemplate } from "@/lib/templates/story-templates"
import { getCourseTemplate } from "@/lib/templates/course-templates"

export async function POST(request, { params }) {
  const { id: submissionId } = await params

  // ── Fetch submission with all related data ─────────────
  let submission
  try {
    submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        assignment: {
          include: { course: true },
        },
        reportingPlan: true,
        verificationItems: true,
        reflection: true,
        aiDisclosure: true,
        versions: { orderBy: { versionNumber: "desc" }, take: 1 },
      },
    })
  } catch (err) {
    return NextResponse.json({ error: "Database error fetching submission" }, { status: 500 })
  }

  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 })
  }

  if (submission.status === "SUBMITTED_FINAL" || submission.status === "GRADED") {
    return NextResponse.json({ error: "Submission already finalised" }, { status: 409 })
  }

  const assignment = submission.assignment
  const latestVersion = submission.versions[0]

  // ── Build the submission object for the gate ───────────
  const gateInput = {
    plan: submission.reportingPlan
      ? {
          angle: submission.reportingPlan.storyAngle,
          sources: submission.reportingPlan.sourcesToSeek,
          questions: submission.reportingPlan.keyQuestions,
        }
      : null,
    verificationTable: (submission.verificationItems || []).map((v) => ({
      id: v.id,
      claim: v.claim,
      evidence: v.evidence,
      sources: [v.sourceRef, v.secondSourceRef].filter(Boolean),
      confidence: v.confidence,
      riskLevel: v.riskLevel,
    })),
    sources: (submission.verificationItems || []).map((v) => ({
      ref: v.sourceRef,
      type: v.sourceType,
      named: v.sourceRef && !v.sourceRef.toLowerCase().includes("anonymous"),
    })),
    draftText: latestVersion?.content || "",
    reflection: submission.reflection
      ? {
          text: submission.reflection.reflectionText,
          framingAnswers: submission.reflection.framingAnswers,
        }
      : null,
    aiDisclosure: submission.aiDisclosure
      ? {
          tools: submission.aiDisclosure.toolsUsed,
          usage: submission.aiDisclosure.whatUsedFor,
          verification: submission.aiDisclosure.verificationStatement,
        }
      : null,
    ethicsReview: null, // extend when ethics model added
    sections: {}, // extend when section tracking added
  }

  // ── Determine gate rules ───────────────────────────────
  // Priority: assignment.verificationRules → course template gate preset → standard
  let rules = {}
  if (assignment.verificationRules && typeof assignment.verificationRules === "object") {
    rules = assignment.verificationRules
  } else if (assignment.course) {
    // Try to get course template gate preset
    const courseCode = assignment.course.code?.replace(/\s/g, "") // e.g. "HCC314"
    if (courseCode) {
      const courseTemplate = getCourseTemplate(courseCode)
      if (courseTemplate?.gatePreset) {
        rules = getGatePresetRules(courseTemplate.gatePreset)
      }
    }
  }

  // ── Get template config for word-count / sections ──────
  const templateConfig = assignment.templateId
    ? getStoryTemplate(assignment.templateId) || {}
    : {}

  // ── Run the gate ───────────────────────────────────────
  const gateResult = canFinalSubmit(gateInput, rules, {
    wordCountRange: templateConfig.wordCountRange || null,
    requiredSections: assignment.requiredSections || templateConfig.requiredSections || [],
  })

  // ── If gate fails — return 422 Unprocessable Entity ───
  if (!gateResult.allowed) {
    return NextResponse.json(
      {
        allowed: false,
        failures: gateResult.failures,
        warnings: gateResult.warnings,
        message: `Submission blocked: ${gateResult.failures.length} gate(s) failed.`,
      },
      { status: 422 }
    )
  }

  // ── Gate passed — update submission to SUBMITTED_FINAL ─
  try {
    const updated = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: "SUBMITTED_FINAL",
        submittedAt: new Date(),
      },
    })

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: submission.studentId,
        action: "SUBMISSION_FINAL_SUBMIT",
        metadata: {
          submissionId,
          assignmentId: assignment.id,
          courseId: assignment.courseId,
          warningCount: gateResult.warnings.length,
          gateRules: Object.keys(rules),
        },
      },
    })

    return NextResponse.json({
      allowed: true,
      submissionId,
      status: updated.status,
      submittedAt: updated.submittedAt,
      warnings: gateResult.warnings,
      message: "Submission accepted. Your work has been submitted for grading.",
    })
  } catch (err) {
    return NextResponse.json({ error: "Failed to update submission status" }, { status: 500 })
  }
}
