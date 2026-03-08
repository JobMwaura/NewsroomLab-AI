// ─── Database Seed Script ─────────────────────────────
// Creates the 6 HCC journalism courses in the database
// Run with: npx prisma db seed

import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

async function main() {
  const connectionString = process.env.DATABASE_URL
  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)
  
  const prisma = new PrismaClient({ adapter })
  
  console.log("🌱 Seeding database...")

  // First, create a lecturer user if not exists
  const lecturer = await prisma.user.upsert({
    where: { email: "lecturer@newsroomlab.ai" },
    update: {},
    create: {
      id: "lecturer-main",
      email: "lecturer@newsroomlab.ai",
      name: "Dr. Job Mwaura",
      password: "$2a$10$K8wj8I8Z9X0d3cYkGq5Zu.3P3qY8mZU5LV5T8yHvT3Y4X7WZ5.abcde", // Hashed placeholder
      role: "LECTURER",
    },
  })
  console.log("✓ Lecturer user ready:", lecturer.email)

  // The 6 HCC journalism courses
  const courses = [
    {
      title: "Writing for Mass Media",
      code: "HCC 109",
      series: "100",
      templateId: "HCC109",
      description: "Foundational writing course covering news, broadcast, PR, feature, and opinion writing formats. Students master structure, clarity, audience awareness, and basic verification across multiple media platforms.",
      outcomes: [
        "Write a hard news story using inverted pyramid structure with verified facts",
        "Write a press release that meets journalistic standards and passes the journalist test",
        "Write a broadcast script (VO) demonstrating write-to-be-heard principles",
        "Write a short feature story with a scene-setting lead and nut graf",
        "Write an opinion/editorial piece with a clear thesis and counterargument",
        "Rewrite a print story for interactive/web format demonstrating digital-first thinking",
      ],
    },
    {
      title: "Media Writing and Reporting",
      code: "HCC 205",
      series: "200",
      templateId: "HCC205",
      description: "Intermediate reporting course. Students produce beat stories, live updates, interview pieces, broadcast packages, MoJo stories, podcasts, and data mini-stories. Stronger verification gates and multi-source requirements.",
      outcomes: [
        "Produce a polished beat story with multiple verified sources and proper attribution",
        "Write and produce a live update sequence (rolling blog or developing story)",
        "Produce an interview-driven piece demonstrating advanced interviewing skills",
        "Write a broadcast package script (VO/SOT/PKG) with cue sheet",
        "Produce a MoJo story using mobile-only tools",
        "Script and structure a podcast episode",
        "Produce a data mini-story with transparent methodology and sourced data",
      ],
    },
    {
      title: "Public Relations Writing",
      code: "HCC 312",
      series: "300",
      templateId: "HCC312",
      description: "Advanced PR writing for strategic communications. Students master media kits, thought leadership, crisis comms, internal comms, and integrated campaigns. Professional deliverables aligned with industry standards.",
      outcomes: [
        "Produce a complete media kit (release, backgrounder, FAQ, visuals)",
        "Develop a thought-leadership platform: article + social thread + media pitch",
        "Craft crisis communications: holding statement, Q&A, stakeholder messages",
        "Write an internal comms package: CEO memo, all-staff update, manager brief",
        "Execute an integrated campaign: key message doc, multi-channel rollout, analytics summary",
      ],
    },
    {
      title: "Newspaper Writing",
      code: "HCC 314",
      series: "300",
      templateId: "HCC314",
      description: "Specialized newspaper journalism. Students produce in-depth news features, investigative projects, court/parliament coverage, and multi-platform packages. Emphasis on accountability journalism and ethical practice.",
      outcomes: [
        "Produce an in-depth news feature with multiple sources and deep verification",
        "Execute an investigative story with document analysis and ethical handling",
        "Cover courts or parliament demonstrating specialized procedural knowledge",
        "Produce a multi-platform package (print lead, sidebar, visual explainer, audio cut)",
        "Write a major profile demonstrating balanced access and fair characterization",
      ],
    },
    {
      title: "Feature & Magazine Writing",
      code: "HCC 316",
      series: "300",
      templateId: "HCC316",
      description: "Long-form narrative journalism. Students craft immersive features, personal essays, travel/lifestyle pieces, and service journalism. Emphasis on voice, structure, and reader engagement.",
      outcomes: [
        "Write an immersive narrative feature (2500+ words) with scenes, characters, and theme",
        "Craft a personal essay with authentic voice and reflective depth",
        "Produce a travel/lifestyle piece with sensory detail and practical value",
        "Create service journalism (how-to or explainer) that solves reader problems",
        "Write a first-person participatory piece demonstrating ethical immersion",
      ],
    },
    {
      title: "Writing Editorials & Reviews",
      code: "HCC 420",
      series: "400",
      templateId: "HCC420",
      description: "Advanced opinion and critical writing. Students produce institutional editorials, persuasive columns, cultural reviews, and satirical pieces. Emphasis on argument craft, voice, and ethical persuasion.",
      outcomes: [
        "Write an institutional editorial with clear position, evidence, and call to action",
        "Craft a persuasive column with personal voice and ethical argumentation",
        "Produce a cultural review (film, book, music, art) with critical framework",
        "Write a satirical or humor piece demonstrating craft and ethical boundaries",
        "Develop an op-ed submission package ready for publication pitch",
      ],
    },
  ]

  for (const courseData of courses) {
    const course = await prisma.course.upsert({
      where: { 
        // Use a composite check - find by code and semester
        id: `course-${courseData.templateId?.toLowerCase()}` 
      },
      update: {
        title: courseData.title,
        description: courseData.description,
        outcomes: courseData.outcomes,
      },
      create: {
        id: `course-${courseData.templateId?.toLowerCase()}`,
        title: courseData.title,
        code: courseData.code,
        series: courseData.series,
        templateId: courseData.templateId,
        description: courseData.description,
        outcomes: courseData.outcomes,
        semester: "Semester 1 2026",
        lecturerId: lecturer.id,
        isPublished: true,
        startDate: new Date("2026-01-20T08:00:00Z"),
      },
    })
    console.log(`✓ Course ready: ${course.code} - ${course.title}`)
  }

  console.log("\n✅ Seed complete! 6 courses created.")
  
  await prisma.$disconnect()
  await pool.end()
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
