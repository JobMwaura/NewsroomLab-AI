// ─── NewsroomLab AI — Seed Data Generator ───────────────
// Converts template data into seed-ready objects matching the Prisma schema.
// Run: node src/lib/seed-from-templates.js (or import in a seed script)

import { courseTemplates, courseTemplateCodes } from "./templates/course-templates.js"
import { storyTemplates, getStoryTemplate } from "./templates/story-templates.js"
import { rubricPresets, getRubricPreset } from "./templates/rubric-presets.js"
import { reflectionPromptSets, getReflectionPromptSet } from "./templates/reflection-prompts.js"

/**
 * Generate a full course seed object from a template code.
 * Returns a course + its assignments + rubrics ready for DB insertion.
 */
export function seedCourseFromTemplate(templateCode, options = {}) {
  const template = courseTemplates[templateCode]
  if (!template) throw new Error(`Unknown course template: ${templateCode}`)

  const {
    lecturerId = "lecturer_seed_001",
    semester = "Sept 2025",
    startDate = new Date("2025-09-01"),
  } = options

  const courseId = `course_${templateCode.toLowerCase().replace(/\s/g, "")}_${Date.now()}`

  const course = {
    id: courseId,
    code: template.code,
    title: template.title,
    description: template.description,
    semester,
    startDate: startDate.toISOString(),
    isArchived: false,
    createdById: lecturerId,
    outcomes: template.outcomes,
    weeklyPlan: template.weeklyPlan,
    templateId: templateCode,
  }

  // Generate assignments from template assignment IDs
  const assignments = template.assignmentTemplateIds.map((storyId, index) => {
    const storyTemplate = getStoryTemplate(storyId)
    if (!storyTemplate) {
      console.warn(`Story template not found: ${storyId}`)
      return null
    }

    const weekOffset = Math.floor((index / template.assignmentTemplateIds.length) * 14)
    const dueDate = new Date(startDate)
    dueDate.setDate(dueDate.getDate() + (weekOffset + 2) * 7)

    return {
      id: `assign_${courseId}_${storyId}_${index}`,
      courseId,
      title: storyTemplate.label,
      brief: `Write a ${storyTemplate.label}. Follow the ${storyTemplate.category} conventions.`,
      storyType: mapStoryTypeToEnum(storyId),
      dueAt: dueDate.toISOString(),
      isPublished: true,
      constraints: {
        wordCountMin: storyTemplate.wordCountRange[0],
        wordCountMax: storyTemplate.wordCountRange[1],
      },
      requiredComponents: {
        verificationTable: (storyTemplate.requiredComponents || []).includes("verification_table"),
        reportingPlan: (storyTemplate.requiredComponents || []).includes("reporting_plan"),
        ethicsMemo: (storyTemplate.requiredComponents || []).includes("ethics_memo"),
        aiDisclosure: (storyTemplate.requiredComponents || []).includes("ai_disclosure"),
        reflection: (storyTemplate.requiredComponents || []).includes("reflection"),
        cueSheet: (storyTemplate.requiredComponents || []).includes("cue_sheet"),
      },
      verificationRules: storyTemplate.verificationDefaults || { minItems: 3, minHighConfidence: 1 },
      rubricId: storyTemplate.rubricId || template.defaultRubricId,
      templateId: storyId,
      microLessonIds: storyTemplate.microLessonIds || [],
      requiredSections: storyTemplate.requiredSections || [],
    }
  }).filter(Boolean)

  // Collect unique rubric IDs
  const rubricIds = [...new Set(assignments.map(a => a.rubricId).filter(Boolean))]
  const rubrics = rubricIds.map(id => getRubricPreset(id)).filter(Boolean)

  // Get reflection prompts for this course
  const reflectionSet = getReflectionPromptSet(template.reflectionPromptSetId)

  return {
    course,
    assignments,
    rubrics,
    reflectionPrompts: reflectionSet,
  }
}

/**
 * Generate seed data for ALL course templates.
 */
export function seedAllCourses(options = {}) {
  return courseTemplateCodes.map((code) => {
    try {
      return seedCourseFromTemplate(code, options)
    } catch (err) {
      console.error(`Failed to seed ${code}:`, err.message)
      return null
    }
  }).filter(Boolean)
}

/**
 * Map story template IDs to Prisma StoryType enum values.
 */
function mapStoryTypeToEnum(templateId) {
  const map = {
    hard_news: "HARD_NEWS",
    follow_up: "FOLLOW_UP",
    courts_story: "COURTS",
    parliament_story: "HARD_NEWS",
    business_brief: "HARD_NEWS",
    sports_report: "HARD_NEWS",
    disaster_update: "HARD_NEWS",
    profile: "FEATURE",
    obituary: "FEATURE",
    investigative: "INVESTIGATIVE",
    broadcast_vo: "BROADCAST_VO",
    broadcast_pkg: "BROADCAST_PKG",
    podcast_script: "PODCAST",
    live_blog: "LIVE_BLOG",
    mojo_story: "MOJO",
    data_mini_story: "DATA_STORY",
    press_release: "PRESS_RELEASE",
    pitch_letter: "PRESS_RELEASE",
    backgrounder: "PRESS_RELEASE",
    fact_sheet: "PRESS_RELEASE",
    newsletter_copy: "PRESS_RELEASE",
    web_landing_copy: "PRESS_RELEASE",
    feature_story: "FEATURE",
    feature_edit_exercise: "FEATURE",
    layout_visual: "FEATURE",
    editorial: "EDITORIAL",
    review_film_book: "REVIEW",
    review_event_product: "REVIEW",
    headline_caption_drill: "HARD_NEWS",
    editorial_analysis: "EDITORIAL",
  }
  return map[templateId] || "HARD_NEWS"
}

/**
 * Generate demo users for seeding.
 */
export function seedDemoUsers() {
  return [
    {
      id: "user_admin_001",
      email: "admin@newsroomlab.ac.ke",
      name: "Dr. Sarah Kimani",
      role: "ADMIN",
    },
    {
      id: "user_lecturer_001",
      email: "lecturer@newsroomlab.ac.ke",
      name: "Prof. James Ochieng",
      role: "LECTURER",
    },
    {
      id: "user_lecturer_002",
      email: "lecturer2@newsroomlab.ac.ke",
      name: "Dr. Amina Hassan",
      role: "LECTURER",
    },
    {
      id: "user_student_001",
      email: "student@newsroomlab.ac.ke",
      name: "Wanjiku Kamau",
      role: "STUDENT",
    },
    {
      id: "user_student_002",
      email: "student2@newsroomlab.ac.ke",
      name: "David Omondi",
      role: "STUDENT",
    },
    {
      id: "user_student_003",
      email: "student3@newsroomlab.ac.ke",
      name: "Fatima Ali",
      role: "STUDENT",
    },
  ]
}

/**
 * Print a summary of what would be seeded.
 */
export function printSeedSummary() {
  const allSeeds = seedAllCourses({ lecturerId: "user_lecturer_001" })
  console.log("═══════════════════════════════════════")
  console.log("  NewsroomLab AI — Seed Data Summary")
  console.log("═══════════════════════════════════════")
  console.log(`  Users:   ${seedDemoUsers().length}`)
  console.log(`  Courses: ${allSeeds.length}`)

  let totalAssignments = 0
  let totalRubrics = new Set()

  for (const seed of allSeeds) {
    console.log(`\n  📘 ${seed.course.code} — ${seed.course.title}`)
    console.log(`     Assignments: ${seed.assignments.length}`)
    console.log(`     Rubrics: ${seed.rubrics.length}`)
    console.log(`     Reflection prompts: ${seed.reflectionPrompts.prompts.length}`)
    totalAssignments += seed.assignments.length
    seed.rubrics.forEach(r => totalRubrics.add(r.id))
  }

  console.log("\n═══════════════════════════════════════")
  console.log(`  Total assignments: ${totalAssignments}`)
  console.log(`  Unique rubrics:    ${totalRubrics.size}`)
  console.log("═══════════════════════════════════════\n")
}

// If run directly: node src/lib/seed-from-templates.js
if (typeof process !== "undefined" && process.argv?.[1]?.includes("seed-from-templates")) {
  printSeedSummary()
}
