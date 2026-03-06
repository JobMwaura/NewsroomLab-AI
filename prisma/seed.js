// ─── NewsroomLab AI — Prisma Seed Script ─────────────────
// Populates the database with all template content so the platform
// can generate real courses even before AI integration.
//
// Run: npx prisma db seed
// Or:  node prisma/seed.js

import { PrismaClient } from "@prisma/client"
import {
  seedCourseTemplates,
  seedAssignmentTemplates,
  seedRubricTemplates,
  seedLessonCards,
  seedReflectionPrompts,
  seedDemoUsers,
  seedAllCourses,
} from "../src/lib/seed-from-templates.js"

const prisma = new PrismaClient()

// ─── Helpers ─────────────────────────────────────────────

function storyTypeToEnum(type) {
  const valid = [
    "HARD_NEWS","FOLLOW_UP","FEATURE","PROFILE","OBITUARY","INVESTIGATIVE",
    "PRESS_RELEASE","COURTS","PARLIAMENT","BUSINESS","SPORTS","DISASTER",
    "ONLINE_UPDATE","BROADCAST_VO","BROADCAST_PKG","PODCAST","MOJO",
    "DATA_STORY","LIVE_BLOG","EDITORIAL","REVIEW",
  ]
  return valid.includes(type) ? type : "HARD_NEWS"
}

// ─── Main ─────────────────────────────────────────────────

async function main() {
  console.log("🌱 NewsroomLab AI — Seeding database…\n")

  // ── 1. Seed Demo Users ─────────────────────────────────
  console.log("👤 Seeding users…")
  const users = seedDemoUsers()
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role },
      create: {
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        password: "$2b$10$demo_hashed_password_placeholder", // placeholder
      },
    })
  }
  console.log(`   ✓ ${users.length} users seeded`)

  // ── 2. Seed Rubric Templates ───────────────────────────
  console.log("📋 Seeding rubric templates…")
  const rubrics = seedRubricTemplates()
  for (const r of rubrics) {
    await prisma.rubric.upsert({
      where: { id: r.id },
      update: { name: r.name, categories: r.categories, isTemplate: true },
      create: {
        id: r.id,
        name: r.name,
        isTemplate: true,
        storyType: null,
        courseId: null,
        categories: r.categories,
      },
    })
  }
  console.log(`   ✓ ${rubrics.length} rubric templates seeded`)

  // ── 3. Seed Courses from All Templates ─────────────────
  console.log("📘 Seeding courses from templates…")
  const lecturerId = "user_lecturer_001"
  const allSeeds = seedAllCourses({
    lecturerId,
    semester: "Jan 2026",
    startDate: new Date("2026-01-12"),
  })

  for (const seed of allSeeds) {
    // Create the course
    await prisma.course.upsert({
      where: { id: seed.course.id },
      update: {
        title: seed.course.title,
        code: seed.course.code,
        description: seed.course.description,
        semester: seed.course.semester,
      },
      create: {
        id: seed.course.id,
        code: seed.course.code,
        title: seed.course.title,
        description: seed.course.description,
        semester: seed.course.semester,
        isArchived: false,
        lecturerId,
      },
    })

    // Enroll the demo students
    const studentIds = ["user_student_001", "user_student_002", "user_student_003"]
    for (const studentId of studentIds) {
      await prisma.courseEnrollment.upsert({
        where: { courseId_userId: { courseId: seed.course.id, userId: studentId } },
        update: {},
        create: {
          courseId: seed.course.id,
          userId: studentId,
          roleInCourse: "STUDENT",
          status: "ACTIVE",
        },
      })
    }

    // Create assignments
    for (const a of seed.assignments) {
      // Resolve rubric id — use existing rubric or null
      let rubricId = null
      if (a.rubricId) {
        const rubricExists = await prisma.rubric.findUnique({ where: { id: a.rubricId } })
        if (rubricExists) rubricId = a.rubricId
      }

      await prisma.assignment.upsert({
        where: { id: a.id },
        update: {
          title: a.title,
          brief: a.brief,
          storyType: storyTypeToEnum(a.storyType),
          dueAt: new Date(a.dueAt),
          constraints: a.constraints,
          requiredComponents: a.requiredComponents,
          requiredSections: a.requiredSections,
          verificationRules: a.verificationRules,
          aiModules: a.aiModules,
          templateId: a.templateId,
          microLessonIds: a.microLessonIds,
          reflectionSetId: a.reflectionQuestionSetId || null,
          isPublished: true,
        },
        create: {
          id: a.id,
          courseId: seed.course.id,
          title: a.title,
          brief: a.brief,
          storyType: storyTypeToEnum(a.storyType),
          dueAt: new Date(a.dueAt),
          constraints: a.constraints,
          requiredComponents: a.requiredComponents,
          requiredSections: a.requiredSections,
          verificationRules: a.verificationRules,
          aiModules: a.aiModules || { copyEditor: true, factChecker: true, ethicsLaw: false, framingAnalyst: false },
          rubricId,
          templateId: a.templateId,
          microLessonIds: a.microLessonIds,
          reflectionSetId: a.reflectionQuestionSetId || null,
          isPublished: true,
        },
      })
    }

    console.log(`   ✓ ${seed.course.code} — ${seed.assignments.length} assignments`)
  }

  // ── 4. Summary ─────────────────────────────────────────
  const courseCount = await prisma.course.count()
  const assignmentCount = await prisma.assignment.count()
  const userCount = await prisma.user.count()

  console.log("\n═══════════════════════════════════════════")
  console.log("  ✅ Seed complete!")
  console.log(`     Users:       ${userCount}`)
  console.log(`     Courses:     ${courseCount}`)
  console.log(`     Assignments: ${assignmentCount}`)
  console.log(`     Rubrics:     ${rubrics.length}`)
  console.log("═══════════════════════════════════════════\n")
}

main()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
