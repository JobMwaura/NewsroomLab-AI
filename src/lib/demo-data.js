// ─── Demo Data for Local Development ────────────────────
// This provides realistic mock data so the UI works without a database

import { weeklyModules, isWeekUnlocked, calculateUnlockDate } from "./templates/weekly-modules"

// ─── Year/Course Level Helpers ──────────────────────────
// Course series: 100 = Year 1, 200 = Year 2, 300 = Year 3, 400 = Year 4

export function getCourseYear(series) {
  const seriesNum = parseInt(series)
  if (seriesNum >= 100 && seriesNum < 200) return 1
  if (seriesNum >= 200 && seriesNum < 300) return 2
  if (seriesNum >= 300 && seriesNum < 400) return 3
  if (seriesNum >= 400 && seriesNum < 500) return 4
  return 1
}

// Returns: "active" (current year), "completed" (past year), "future" (not yet), "locked" (inaccessible)
export function canAccessCourse(userYearOfStudy, courseSeries, completedYears = []) {
  const courseYear = getCourseYear(courseSeries)
  
  // Current year course = active
  if (courseYear === userYearOfStudy) return "active"
  
  // Past year that's been completed
  if (completedYears.includes(courseYear)) return "completed"
  
  // Future year (not yet reached)
  if (courseYear > userYearOfStudy) return "future"
  
  // Past year not completed (shouldn't normally happen)
  return "locked"
}

export function isCourseCompleted(courseSeries, completedYears = []) {
  const courseYear = getCourseYear(courseSeries)
  return completedYears.includes(courseYear)
}

export function getYearLabel(year) {
  const labels = { 1: "1st Year", 2: "2nd Year", 3: "3rd Year", 4: "4th Year" }
  return labels[year] || `Year ${year}`
}

// ─── Module/Week Helpers ────────────────────────────────

export function getCourseModules(courseTemplateId, courseStartDate = null) {
  const template = weeklyModules[courseTemplateId]
  if (!template) return []
  
  const currentDate = new Date()
  // Default start date: 6 weeks ago (so weeks 1-6 are unlocked)
  const startDate = courseStartDate || new Date(currentDate.getTime() - 42 * 24 * 60 * 60 * 1000)
  
  return template.weeks.map((week) => ({
    ...week,
    unlockAt: calculateUnlockDate(startDate, week.week),
    isUnlocked: isWeekUnlocked(startDate, week.week, currentDate),
    courseCode: template.courseCode,
    courseTitle: template.courseTitle,
  }))
}

export function getModuleByWeek(courseTemplateId, weekNumber, courseStartDate = null) {
  const modules = getCourseModules(courseTemplateId, courseStartDate)
  return modules.find((m) => m.week === weekNumber) || null
}

export function getCurrentWeek(courseStartDate) {
  if (!courseStartDate) return 1
  const start = new Date(courseStartDate)
  const now = new Date()
  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24))
  const week = Math.floor(diffDays / 7) + 1
  return Math.max(1, Math.min(10, week))
}

// ─── Users ──────────────────────────────────────────────

export const demoUsers = [
  {
    id: "user-admin-1",
    name: "Dr. Sarah Ochieng",
    email: "admin@newsroomlab.ai",
    role: "ADMIN",
    avatarUrl: "",
  },
  {
    id: "user-lecturer-1",
    name: "Prof. James Kamau",
    email: "jkamau@university.ac.ke",
    role: "LECTURER",
    avatarUrl: "",
  },
  {
    id: "user-student-1",
    name: "Amina Wanjiku",
    email: "amina.w@student.ac.ke",
    role: "STUDENT",
    avatarUrl: "",
    yearOfStudy: 3, // 3rd year student
    completedYears: [1, 2], // Completed 1st and 2nd year
  },
  {
    id: "user-student-2",
    name: "Brian Otieno",
    email: "brian.o@student.ac.ke",
    role: "STUDENT",
    avatarUrl: "",
    yearOfStudy: 2, // 2nd year student
    completedYears: [1], // Completed 1st year
  },
  {
    id: "user-student-3",
    name: "Cynthia Muthoni",
    email: "cynthia.m@student.ac.ke",
    role: "STUDENT",
    avatarUrl: "",
    yearOfStudy: 4, // 4th year student (final year)
    completedYears: [1, 2, 3], // Completed years 1-3
  },
  {
    id: "user-student-4",
    name: "David Kiprop",
    email: "david.k@student.ac.ke",
    role: "STUDENT",
    avatarUrl: "",
    yearOfStudy: 1, // 1st year student
    completedYears: [], // No completed years
  },
  {
    id: "user-student-5",
    name: "Esther Akinyi",
    email: "esther.a@student.ac.ke",
    role: "STUDENT",
    avatarUrl: "",
    yearOfStudy: 4, // 4th year student who finished
    completedYears: [1, 2, 3, 4], // Completed all years (graduated)
    isGraduated: true,
  },
]

// ─── Courses ────────────────────────────────────────────
// All 6 writing courses from the syllabus - fully developed

export const demoCourses = [
  {
    id: "course-hcc109",
    title: "Writing for Mass Media",
    code: "HCC 109",
    series: "100",
    institution: "University of Nairobi",
    semester: "Semester 1 2026",
    description:
      "Foundational writing course covering news, broadcast, PR, feature, and opinion writing formats. Students master structure, clarity, audience awareness, and basic verification across multiple media platforms.",
    lecturerId: "user-lecturer-1",
    studentCount: 52,
    assignmentCount: 10,
    isArchived: false,
    isPublished: true,
    templateId: "HCC109",
    startDate: "2026-01-20T08:00:00Z", // 7 weeks ago from March 8
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
    id: "course-hcc205",
    title: "Media Writing and Reporting",
    code: "HCC 205",
    series: "200",
    institution: "University of Nairobi",
    semester: "Semester 1 2026",
    description:
      "Intermediate reporting course. Students produce beat stories, live updates, interview pieces, broadcast packages, MoJo stories, podcasts, and data mini-stories. Stronger verification gates and multi-source requirements.",
    lecturerId: "user-lecturer-1",
    studentCount: 45,
    assignmentCount: 10,
    isArchived: false,
    isPublished: true,
    templateId: "HCC205",
    startDate: "2026-01-20T08:00:00Z",
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
    id: "course-hcc312",
    title: "Public Relations Writing",
    code: "HCC 312",
    series: "300",
    institution: "University of Nairobi",
    semester: "Semester 1 2026",
    description:
      "Professional writing for public relations and corporate communications. Students produce pitch letters, news releases, backgrounders, fact sheets, newsletters, and web/brochure copy.",
    lecturerId: "user-lecturer-1",
    studentCount: 38,
    assignmentCount: 10,
    isArchived: false,
    isPublished: true,
    templateId: "HCC312",
    startDate: "2026-01-20T08:00:00Z",
    outcomes: [
      "Draft an effective pitch letter targeted to a specific journalist",
      "Write a news-style press release that meets journalistic standards",
      "Produce a backgrounder document with verified facts and context",
      "Create a fact sheet with scannable formatting and verifiable data",
      "Write newsletter copy balancing information with engagement",
      "Create brochure or web landing page copy for a target audience",
    ],
  },
  {
    id: "course-hcc314",
    title: "Newspaper Writing",
    code: "HCC 314",
    series: "300",
    institution: "University of Nairobi",
    semester: "Semester 1 2026",
    description:
      "Advanced newspaper journalism. Story-type library approach: profiles, obituaries, investigative, courts, parliament, business, sports, disaster, press conference. Includes newspaper analysis applying media theory.",
    lecturerId: "user-lecturer-1",
    studentCount: 45,
    assignmentCount: 10,
    isArchived: false,
    isPublished: true,
    templateId: "HCC314",
    startDate: "2026-01-20T08:00:00Z",
    outcomes: [
      "Write a compelling profile using multiple interviews and descriptive detail",
      "Produce a respectful, accurate obituary with verified biographical facts",
      "Demonstrate investigative techniques including document analysis and evidence chains",
      "Write accurate court reports respecting sub judice rules and fair trial rights",
      "Cover parliament and government proceedings with precision and context",
      "Write business reporting with accessible financial data and jargon translation",
      "Produce polished sports reports with statistics and post-match reactions",
      "Write sensitive disaster/breaking news updates under time pressure",
    ],
  },
  {
    id: "course-hcc316",
    title: "Feature & Magazine Writing",
    code: "HCC 316",
    series: "300",
    institution: "University of Nairobi",
    semester: "Semester 1 2026",
    description:
      "Advanced feature writing, editing, and magazine production. Feature studio with scene-builder prompts, edit-a-feature exercises, layout companion, and magazine production workflow.",
    lecturerId: "user-lecturer-1",
    studentCount: 32,
    assignmentCount: 10,
    isArchived: false,
    isPublished: true,
    templateId: "HCC316",
    startDate: "2026-01-20T08:00:00Z",
    outcomes: [
      "Write long-form features with narrative structure, scene-setting, and nut graf",
      "Use scene-builder prompts to create vivid, immersive openings",
      "Apply the nut graf technique to ground features in news relevance",
      "Edit another writer's feature draft and produce a professional edit memo",
      "Understand magazine layout principles and visual storytelling",
      "Write effective captions, pull quotes, and display copy",
    ],
  },
  {
    id: "course-hcc420",
    title: "Writing Editorials and Reviews",
    code: "HCC 420",
    series: "400",
    institution: "University of Nairobi",
    semester: "Semester 1 2026",
    description:
      "Advanced opinion journalism. Editorials, reviews (film, book, event, product, music, restaurant), editorial analysis. Features editorial mode, review mode, language tools, and opinion/fact labelling.",
    lecturerId: "user-lecturer-1",
    studentCount: 28,
    assignmentCount: 10,
    isArchived: false,
    isPublished: true,
    templateId: "HCC420",
    startDate: "2026-01-20T08:00:00Z",
    outcomes: [
      "Write persuasive editorials with clear thesis, evidence, and steelmanned counterargument",
      "Produce informed film/book reviews with criteria-based evaluation",
      "Produce experiential event/product reviews with transparency and disclosure",
      "Produce music or restaurant reviews demonstrating specialised review skills",
      "Craft effective headlines and captions that are accurate and compelling",
      "Conduct editorial analysis applying agenda-setting, gatekeeping, and framing theory",
    ],
  },
]

// ─── Assignments ────────────────────────────────────────

export const demoAssignments = [
  {
    id: "assignment-1",
    courseId: "course-1",
    courseName: "HCC 314 — Newspaper Writing",
    title: "Breaking News: County Budget Allocation",
    storyType: "HARD_NEWS",
    brief: `You are a reporter for the Daily Nation. Nairobi County has just released its 2026/27 budget allocation. 
    
Key documents have been provided to you (see attachments). Your task is to write a hard news story of 500–700 words covering:

1. The total budget figure and key allocations
2. What changed from last year
3. Reactions from at least 2 stakeholders (ward rep + civil society)
4. Context on what this means for residents

**Important:** You must verify all figures independently. Do not rely on press release language. Attribution is mandatory for all claims.`,
    scenario:
      "The County Government of Nairobi has released its annual budget. You have 48 hours to file a hard news story.",
    constraints: {
      wordCountMin: 500,
      wordCountMax: 700,
      sourcesRequired: 3,
      noAnonymousSources: true,
      minVoices: 2,
    },
    dueAt: "2026-03-15T23:59:00Z",
    requiredComponents: {
      reportingPlan: true,
      verificationTable: true,
      ethicsMemo: false,
      mediaReflection: true,
    },
    aiModules: {
      copyEditor: true,
      factChecker: true,
      ethicsLaw: true,
      framingAnalyst: true,
    },
    verificationRules: {
      minItems: 8,
      minHighConfidence: 3,
      requireSourceLinks: true,
      requireTwoSourcesHighRisk: true,
      blockIfLowOver: 0.4,
    },
    isPublished: true,
    submissionCount: 32,
    gradedCount: 18,
  },
  {
    id: "assignment-2",
    courseId: "course-1",
    courseName: "HCC 314 — Newspaper Writing",
    title: "Feature Story: Student Mental Health",
    storyType: "FEATURE",
    brief: `Write a 1000–1500 word feature on student mental health at your university.

You must include:
- At least 3 student voices (anonymised if needed — but explain why in ethics memo)
- 1 professional source (counsellor, psychologist, or administrator)
- Data/statistics from a credible source
- Narrative lead (not hard news lead)

This assignment requires an ethics memo because of the sensitive subject matter.`,
    constraints: {
      wordCountMin: 1000,
      wordCountMax: 1500,
      sourcesRequired: 4,
      noAnonymousSources: false,
      minVoices: 3,
    },
    dueAt: "2026-03-22T23:59:00Z",
    requiredComponents: {
      reportingPlan: true,
      verificationTable: true,
      ethicsMemo: true,
      mediaReflection: true,
    },
    aiModules: {
      copyEditor: true,
      factChecker: true,
      ethicsLaw: true,
      framingAnalyst: true,
    },
    verificationRules: {
      minItems: 10,
      minHighConfidence: 4,
      requireSourceLinks: true,
      requireTwoSourcesHighRisk: false,
      blockIfLowOver: 0.3,
    },
    isPublished: true,
    submissionCount: 28,
    gradedCount: 12,
  },
  {
    id: "assignment-3",
    courseId: "course-1",
    courseName: "HCC 314 — Newspaper Writing",
    title: "Court Reporting: The Corruption Trial",
    storyType: "COURTS",
    brief: `You are covering a corruption trial at the Milimani Law Courts. A county official is charged with embezzlement of public funds.

Write a court report (400–600 words) based on the scenario documents provided. Pay careful attention to:

- Sub judice rules
- Fair trial rights
- Accurate attribution of testimony
- Avoiding defamatory statements about the accused
- Proper use of legal terminology`,
    constraints: {
      wordCountMin: 400,
      wordCountMax: 600,
      sourcesRequired: 2,
      noAnonymousSources: true,
      minVoices: 2,
    },
    dueAt: "2026-04-05T23:59:00Z",
    requiredComponents: {
      reportingPlan: true,
      verificationTable: true,
      ethicsMemo: true,
      mediaReflection: false,
    },
    aiModules: {
      copyEditor: true,
      factChecker: true,
      ethicsLaw: true,
      framingAnalyst: false,
    },
    verificationRules: {
      minItems: 6,
      minHighConfidence: 2,
      requireSourceLinks: true,
      requireTwoSourcesHighRisk: true,
      blockIfLowOver: 0.5,
    },
    isPublished: true,
    submissionCount: 15,
    gradedCount: 0,
  },
  {
    id: "assignment-4",
    courseId: "course-1",
    courseName: "HCC 314 — Newspaper Writing",
    title: "Profile: A Community Leader",
    storyType: "PROFILE",
    brief: `Write a profile piece (800–1200 words) on a community leader in your neighbourhood.

Requirements:
- Interview the subject directly
- Interview at least 2 people who know the subject
- Include scene-setting/descriptive details
- Narrative structure (not inverted pyramid)`,
    constraints: {
      wordCountMin: 800,
      wordCountMax: 1200,
      sourcesRequired: 3,
      noAnonymousSources: false,
      minVoices: 3,
    },
    dueAt: "2026-04-19T23:59:00Z",
    requiredComponents: {
      reportingPlan: true,
      verificationTable: true,
      ethicsMemo: false,
      mediaReflection: true,
    },
    aiModules: {
      copyEditor: true,
      factChecker: true,
      ethicsLaw: false,
      framingAnalyst: true,
    },
    verificationRules: {
      minItems: 8,
      minHighConfidence: 3,
      requireSourceLinks: false,
      requireTwoSourcesHighRisk: false,
      blockIfLowOver: 0.3,
    },
    isPublished: false,
    submissionCount: 0,
    gradedCount: 0,
  },
]

// ─── Submissions ────────────────────────────────────────

export const demoSubmissions = [
  {
    id: "sub-1",
    assignmentId: "assignment-1",
    assignmentTitle: "Breaking News: County Budget Allocation",
    studentId: "user-student-1",
    studentName: "Amina Wanjiku",
    status: "AI_REVIEWED",
    currentVersion: 1,
    wordCount: 580,
    verificationItemCount: 9,
    submittedAt: "2026-03-10T14:30:00Z",
  },
  {
    id: "sub-2",
    assignmentId: "assignment-1",
    assignmentTitle: "Breaking News: County Budget Allocation",
    studentId: "user-student-2",
    studentName: "Brian Otieno",
    status: "GRADED",
    currentVersion: 2,
    wordCount: 645,
    verificationItemCount: 10,
    overallScore: 78,
    submittedAt: "2026-03-12T09:15:00Z",
    gradedAt: "2026-03-14T16:00:00Z",
  },
  {
    id: "sub-3",
    assignmentId: "assignment-1",
    assignmentTitle: "Breaking News: County Budget Allocation",
    studentId: "user-student-3",
    studentName: "Cynthia Muthoni",
    status: "SUBMITTED_V1",
    currentVersion: 1,
    wordCount: 510,
    verificationItemCount: 6,
    submittedAt: "2026-03-11T11:45:00Z",
  },
  {
    id: "sub-4",
    assignmentId: "assignment-1",
    assignmentTitle: "Breaking News: County Budget Allocation",
    studentId: "user-student-4",
    studentName: "David Kiprop",
    status: "DRAFT",
    currentVersion: 0,
    wordCount: 0,
    verificationItemCount: 0,
  },
  {
    id: "sub-5",
    assignmentId: "assignment-2",
    assignmentTitle: "Feature Story: Student Mental Health",
    studentId: "user-student-1",
    studentName: "Amina Wanjiku",
    status: "SUBMITTED_FINAL",
    currentVersion: 2,
    wordCount: 1280,
    verificationItemCount: 12,
    submittedAt: "2026-03-20T18:00:00Z",
  },
  {
    id: "sub-6",
    assignmentId: "assignment-2",
    assignmentTitle: "Feature Story: Student Mental Health",
    studentId: "user-student-5",
    studentName: "Esther Akinyi",
    status: "RESUBMIT_REQUESTED",
    currentVersion: 2,
    wordCount: 920,
    verificationItemCount: 7,
    submittedAt: "2026-03-19T10:30:00Z",
  },
]

// ─── Rubric Templates ──────────────────────────────────

export const defaultHardNewsRubric = [
  {
    key: "news_value",
    label: "News Value & Focus",
    description: "Is the story newsworthy? Is the angle clear and focused?",
    maxPoints: 10,
    levels: [
      { score: 10, label: "Excellent", description: "Strong news value, clear focused angle" },
      { score: 7, label: "Good", description: "Solid news value, mostly focused" },
      { score: 5, label: "Adequate", description: "Some news value, angle unclear" },
      { score: 3, label: "Weak", description: "Limited news value, unfocused" },
      { score: 0, label: "Missing", description: "No clear news value" },
    ],
  },
  {
    key: "lead_structure",
    label: "Lead & Structure",
    description: "Is the lead compelling and accurate? Is the inverted pyramid applied correctly?",
    maxPoints: 15,
    levels: [
      { score: 15, label: "Excellent", description: "Sharp lead, perfect structure, smooth flow" },
      { score: 11, label: "Good", description: "Effective lead, solid structure" },
      { score: 8, label: "Adequate", description: "Serviceable lead, some structural issues" },
      { score: 4, label: "Weak", description: "Buried lead or poor structure" },
      { score: 0, label: "Missing", description: "No recognisable news structure" },
    ],
  },
  {
    key: "attribution",
    label: "Attribution & Sourcing",
    description: "Are all claims attributed? Are sources credible and diverse?",
    maxPoints: 15,
    levels: [
      { score: 15, label: "Excellent", description: "All claims attributed, diverse credible sources" },
      { score: 11, label: "Good", description: "Most claims attributed, good sources" },
      { score: 8, label: "Adequate", description: "Some attribution gaps" },
      { score: 4, label: "Weak", description: "Significant attribution problems" },
      { score: 0, label: "Missing", description: "No attribution" },
    ],
  },
  {
    key: "accuracy",
    label: "Accuracy & Verification Discipline",
    description: "Are facts verified? Is the verification table complete?",
    maxPoints: 20,
    levels: [
      { score: 20, label: "Excellent", description: "All claims verified, complete evidence chain" },
      { score: 15, label: "Good", description: "Most claims verified, minor gaps" },
      { score: 10, label: "Adequate", description: "Some verification effort, notable gaps" },
      { score: 5, label: "Weak", description: "Minimal verification" },
      { score: 0, label: "Missing", description: "No verification evidence" },
    ],
  },
  {
    key: "language",
    label: "Language & Style",
    description: "Is the writing clear, concise, and appropriate for news?",
    maxPoints: 10,
    levels: [
      { score: 10, label: "Excellent", description: "Clean, professional prose" },
      { score: 7, label: "Good", description: "Mostly clean, minor style issues" },
      { score: 5, label: "Adequate", description: "Readable but needs editing" },
      { score: 3, label: "Weak", description: "Significant language issues" },
      { score: 0, label: "Missing", description: "Unreadable" },
    ],
  },
  {
    key: "ethics",
    label: "Ethics & Legal Compliance",
    description: "Are ethical standards met? Any legal risks?",
    maxPoints: 10,
    levels: [
      { score: 10, label: "Excellent", description: "Fully compliant, ethics considered" },
      { score: 7, label: "Good", description: "Mostly compliant, minor oversights" },
      { score: 5, label: "Adequate", description: "Some ethical awareness" },
      { score: 3, label: "Weak", description: "Ethical concerns present" },
      { score: 0, label: "Missing", description: "Serious ethical/legal issues" },
    ],
  },
  {
    key: "reflection",
    label: "Media Studies Reflection",
    description: "Quality of framing analysis and critical reflection",
    maxPoints: 10,
    levels: [
      { score: 10, label: "Excellent", description: "Deep, nuanced critical reflection" },
      { score: 7, label: "Good", description: "Solid reflection with some depth" },
      { score: 5, label: "Adequate", description: "Surface-level reflection" },
      { score: 3, label: "Weak", description: "Minimal reflection" },
      { score: 0, label: "Missing", description: "No reflection submitted" },
    ],
  },
  {
    key: "revision",
    label: "Revision Quality",
    description: "How well did the student respond to AI and peer feedback?",
    maxPoints: 10,
    levels: [
      { score: 10, label: "Excellent", description: "Significant, thoughtful revisions" },
      { score: 7, label: "Good", description: "Good revision effort" },
      { score: 5, label: "Adequate", description: "Some revisions made" },
      { score: 3, label: "Weak", description: "Minimal revision" },
      { score: 0, label: "Missing", description: "No revision from v1" },
    ],
  },
]

// ─── Demo AI Review ─────────────────────────────────────

export const demoCopyEditorReview = {
  mustFix: [
    {
      id: "cf-1",
      severity: "critical",
      category: "Lead",
      quote: "The Nairobi County government yesterday released its budget.",
      issue: "Passive, vague lead. Missing the most newsworthy figure.",
      fix: "Lead with the total figure and the most significant allocation change.",
    },
    {
      id: "cf-2",
      severity: "important",
      category: "Attribution",
      quote: "Sources say the allocation for health increased by 15%.",
      issue: '"Sources say" is too vague for a hard news story.',
      fix: "Name the source or cite the specific document.",
    },
    {
      id: "cf-3",
      severity: "suggestion",
      category: "Style",
      quote: "The budget is very big and will affect many people.",
      issue: "Vague, editorialising language.",
      fix: 'Use specific figures: "The Ksh 38.7 billion budget..."',
    },
  ],
  lineEdits: [
    {
      quote: "The county allocated money for roads",
      suggestion: "The county allocated Ksh 4.2 billion for road infrastructure",
      reason: "Be specific with figures",
    },
  ],
  structureScore: 3,
  rewriteExamples: [
    {
      original: "The Nairobi County government yesterday released its budget.",
      rewritten:
        "Nairobi County has allocated Ksh 38.7 billion for the 2026/27 financial year, with health and education taking the largest shares in a budget Governor Sakaja called 'transformative.'",
      explanation: "Lead with the most newsworthy figure and attribution.",
    },
  ],
  overallNotes:
    "Your story has good reporting instincts but needs stronger leads, specific figures throughout, and tighter attribution. Structure follows inverted pyramid loosely — tighten the nut graf.",
}

export const demoFactCheckerReview = {
  unsupportedClaims: [
    {
      quote: "Health allocation increased by 15%",
      reason: "No source document or official cited for this figure",
      evidenceNeeded: "Link to the actual budget document or quote from county finance officer",
    },
    {
      quote: "Residents expressed anger at the cuts",
      reason: "No named resident quoted, no evidence of 'anger'",
      evidenceNeeded: "At least one named resident with a direct quote",
    },
  ],
  attributionFlags: [
    {
      quote: "According to experts, the budget is insufficient",
      issue: "Which experts? Unnamed attribution",
      suggestion: "Name the expert(s) and their institutional affiliation",
    },
  ],
  questionsForReporter: [
    "Can you confirm the 15% figure against last year's actual budget (not projected)?",
    "Have you contacted the County Assembly Budget Committee for their analysis?",
    "What is the total recurrent vs development expenditure split?",
  ],
  verificationGapScore: 4.2,
}

export const demoEthicsReview = {
  riskLevel: "LOW",
  riskIssues: [
    {
      category: "Attribution",
      description: "Unnamed 'sources' could lead to credibility challenges",
      severity: "low",
    },
  ],
  safeRewriteSuggestions: [],
  harmMitigationSteps: [
    "Ensure all budget figures are attributed to official documents",
    "If quoting critics, give the county government right of reply",
  ],
}

export const demoFramingReview = {
  dominantFrame: "Government accountability / fiscal responsibility frame",
  missingVoices: [
    "Ordinary residents affected by the allocations",
    "Opposition ward representatives",
    "Civil society budget analysts",
  ],
  loadedLanguageFlags: [
    {
      phrase: "bloated budget",
      issue: "Editorialising — implies judgment without evidence",
      alternative: 'Use "increased budget" with the percentage and let the reader judge',
    },
  ],
  ideologyPowerNotes:
    "The story currently frames the budget primarily through the Governor's narrative. Consider whose interests are centred and whose are marginalised in the allocation priorities.",
  alternativeHeadlines: [
    {
      headline: "Nairobi allocates Ksh 38.7B, health and education get biggest share",
      framingImpact: "Neutral, fact-based — lets the reader assess",
    },
    {
      headline: "Nairobi residents question budget priorities as roads take 30% cut",
      framingImpact: "Accountability frame — centres residents' experience",
    },
    {
      headline: "Governor Sakaja's 'transformative' budget: what the numbers show",
      framingImpact: "Scrutiny frame — invites critical examination of claims",
    },
  ],
  reflectionPrompts: [
    "Whose voice dominates your story? Whose is absent?",
    "How would this story read differently if written from a Mathare resident's perspective?",
    "What power dynamics does the budget allocation reveal?",
  ],
}

// ─── Dashboard Stats ────────────────────────────────────

export const lecturerDashboardStats = {
  totalCourses: 2,
  activeAssignments: 4,
  pendingSubmissions: 15,
  averageScore: 72.4,
  totalStudents: 83,
  submissionsToGrade: 28,
  upcomingDeadlines: [
    { title: "Breaking News: County Budget", course: "HCC 314", dueAt: "2026-03-15", submissions: 32 },
    { title: "Feature Story: Mental Health", course: "HCC 314", dueAt: "2026-03-22", submissions: 28 },
    { title: "Court Reporting: Corruption Trial", course: "HCC 314", dueAt: "2026-04-05", submissions: 15 },
  ],
  recentActivity: [
    { action: "Amina Wanjiku submitted v1", assignment: "County Budget", time: "2 hours ago" },
    { action: "You graded Brian Otieno's submission", assignment: "County Budget", time: "4 hours ago" },
    { action: "Cynthia Muthoni received AI feedback", assignment: "County Budget", time: "6 hours ago" },
    { action: "Esther Akinyi requested resubmission review", assignment: "Mental Health Feature", time: "1 day ago" },
  ],
  commonIssues: [
    { issue: "Weak attribution", count: 18, percentage: 56 },
    { issue: "Insufficient verification items", count: 14, percentage: 44 },
    { issue: "Passive/vague leads", count: 12, percentage: 38 },
    { issue: "Missing right of reply", count: 8, percentage: 25 },
    { issue: "Editorialising language", count: 7, percentage: 22 },
  ],
}

export const studentDashboardStats = {
  activeCourses: 2,
  pendingAssignments: 3,
  completedAssignments: 2,
  averageScore: 74,
  upcomingDeadlines: [
    {
      title: "Breaking News: County Budget",
      course: "HCC 314",
      dueAt: "2026-03-15",
      status: "AI_REVIEWED",
    },
    {
      title: "Feature Story: Mental Health",
      course: "HCC 314",
      dueAt: "2026-03-22",
      status: "SUBMITTED_FINAL",
    },
    {
      title: "Court Reporting: Corruption Trial",
      course: "HCC 314",
      dueAt: "2026-04-05",
      status: "DRAFT",
    },
  ],
  recentFeedback: [
    {
      assignment: "County Budget",
      editor: "Copy Editor",
      summary: "3 must-fix items, structure score 3/5",
      time: "2 hours ago",
    },
    {
      assignment: "County Budget",
      editor: "Fact-checker",
      summary: "2 unsupported claims flagged",
      time: "2 hours ago",
    },
  ],
}
