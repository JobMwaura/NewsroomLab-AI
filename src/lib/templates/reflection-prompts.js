// ─── NewsroomLab AI — Reflection Prompt Library ─────────
// Reflection prompts per course type and assignment type.
// Referenced by reflectionPromptSetId in course-templates and story-templates.

export const reflectionPromptSets = {
  // ═══════════════════════════════════════════════════════
  // HCC109 — Intro to Communication & Media Studies
  // ═══════════════════════════════════════════════════════

  intro_journalism: {
    id: "intro_journalism",
    label: "Introduction to Journalism",
    prompts: [
      {
        id: "ij_1",
        question: "What did you find most surprising or challenging about writing in journalistic style for the first time?",
        hint: "Think about the differences between academic writing and news writing.",
      },
      {
        id: "ij_2",
        question: "How did you decide what the most newsworthy element was in your story? What criteria did you use?",
        hint: "Refer to news values: timeliness, proximity, impact, prominence, conflict, novelty.",
      },
      {
        id: "ij_3",
        question: "Did your understanding of 'objectivity' in journalism change during this assignment? How?",
        hint: "Consider whether true objectivity is possible, and what 'fairness' means instead.",
      },
      {
        id: "ij_4",
        question: "What role does the media play in society, based on what you experienced in this assignment?",
        hint: "Connect your experience to theories like agenda-setting, gatekeeping, or the watchdog role.",
      },
      {
        id: "ij_5",
        question: "If you could re-do this assignment, what would you change and why?",
        hint: "Be specific — mention structure, sourcing, language, or research.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // HCC205 — News Reporting & Writing
  // ═══════════════════════════════════════════════════════

  news_reporting: {
    id: "news_reporting",
    label: "News Reporting & Writing",
    prompts: [
      {
        id: "nr_1",
        question: "Walk through your source selection process. How did you decide whom to interview and why?",
        hint: "Consider diversity of perspectives, authority, and relevance.",
      },
      {
        id: "nr_2",
        question: "Were there any claims in your story that were difficult to verify? How did you handle them?",
        hint: "Describe your verification process, including tools and methods used.",
      },
      {
        id: "nr_3",
        question: "How did you handle the tension between accuracy and deadline pressure?",
        hint: "Be honest about trade-offs you made and how you'd handle them differently.",
      },
      {
        id: "nr_4",
        question: "Examine the lead of your story. Does it contain the most newsworthy element? Could it be stronger?",
        hint: "Compare your lead to the inverted pyramid model.",
      },
      {
        id: "nr_5",
        question: "Did you encounter any ethical dilemmas during reporting? How did you resolve them?",
        hint: "Consider right of reply, source protection, harm minimisation.",
      },
      {
        id: "nr_6",
        question: "What feedback from the AI editor was most useful? What feedback did you disagree with, and why?",
        hint: "Critical engagement with AI feedback shows professional maturity.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // HCC312 — Public Relations Writing
  // ═══════════════════════════════════════════════════════

  pr_writing: {
    id: "pr_writing",
    label: "Public Relations Writing",
    prompts: [
      {
        id: "pr_1",
        question: "How did you balance advocating for your client while maintaining factual accuracy?",
        hint: "Consider the ethical line between favourable framing and misleading claims.",
      },
      {
        id: "pr_2",
        question: "Would a journalist actually use your press release? Why or why not?",
        hint: "Apply the news values test: timeliness, impact, novelty, etc.",
      },
      {
        id: "pr_3",
        question: "Who is the target audience for this piece? How did audience awareness shape your writing?",
        hint: "Consider language, tone, channel, and what the audience needs to know.",
      },
      {
        id: "pr_4",
        question: "How does PR writing differ from journalism in terms of purpose, ethics, and accountability?",
        hint: "Reflect on the power dynamics between PR practitioners and journalists.",
      },
      {
        id: "pr_5",
        question: "If you were a journalist receiving this press release, what questions would you ask?",
        hint: "Identify potential weaknesses or gaps in your own work.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // HCC314 — Newspaper & Magazine Production
  // ═══════════════════════════════════════════════════════

  newspaper_writing: {
    id: "newspaper_writing",
    label: "Newspaper Production",
    prompts: [
      {
        id: "nw_1",
        question: "How did editorial decisions about what to include/exclude shape the final product?",
        hint: "Reflect on gatekeeping — what stories were prioritised and why.",
      },
      {
        id: "nw_2",
        question: "What did you learn about the editing process? How does editing improve (or change) writing?",
        hint: "Consider both the technical and relational aspects of editing.",
      },
      {
        id: "nw_3",
        question: "How do headlines, captions, and visual elements contribute to a story's impact?",
        hint: "Think about what readers see first and how visual hierarchy works.",
      },
      {
        id: "nw_4",
        question: "Analyse the layout of your story/page. What principles guided your design choices?",
        hint: "Consider visual hierarchy, white space, entry points, and reading flow.",
      },
      {
        id: "nw_5",
        question: "How did working collaboratively (as editor/writer) change the final product?",
        hint: "Reflect on feedback, negotiation, and professional communication.",
      },
    ],
  },

  magazine_feature: {
    id: "magazine_feature",
    label: "Magazine Feature Writing",
    prompts: [
      {
        id: "mf_1",
        question: "How did your scene-setting opening aim to draw the reader in? Was it effective?",
        hint: "Evaluate your use of sensory detail, character, and setting.",
      },
      {
        id: "mf_2",
        question: "Describe the structure of your feature. How did you balance scenes, data, and quotes?",
        hint: "Think about pacing — the 'zig-zag' between intimate moments and broader context.",
      },
      {
        id: "mf_3",
        question: "How did your feature bring a human element to a broader issue?",
        hint: "Consider whether your subject represents something larger than themselves.",
      },
      {
        id: "mf_4",
        question: "What was your greatest challenge in writing long-form? How did you overcome it?",
        hint: "Be specific: sustaining narrative, finding enough material, maintaining focus.",
      },
      {
        id: "mf_5",
        question: "How does your visual/layout plan enhance the storytelling?",
        hint: "Think about how images, pull quotes, and design serve the narrative.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // HCC316 — Broadcast Journalism
  // ═══════════════════════════════════════════════════════

  broadcast: {
    id: "broadcast",
    label: "Broadcast Journalism",
    prompts: [
      {
        id: "br_1",
        question: "How did writing for the ear change your writing style compared to writing for print?",
        hint: "Consider sentence length, attribution placement, tense, and vocabulary.",
      },
      {
        id: "br_2",
        question: "How did you select your sound bites? What made them effective?",
        hint: "Evaluate whether SOTs added emotion, authority, or unique information.",
      },
      {
        id: "br_3",
        question: "Describe the technical challenges you faced (audio, video, editing). How did you overcome them?",
        hint: "MoJo and podcast production have specific technical constraints.",
      },
      {
        id: "br_4",
        question: "How did you balance speed with accuracy in a live or breaking news scenario?",
        hint: "Reflect on the ethical tensions of real-time reporting.",
      },
      {
        id: "br_5",
        question: "What would you do differently if you could re-produce this broadcast piece?",
        hint: "Consider technical quality, content selection, and storytelling structure.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // HCC420 — Editorial & Opinion Writing
  // ═══════════════════════════════════════════════════════

  editorial_review: {
    id: "editorial_review",
    label: "Editorial & Opinion Writing",
    prompts: [
      {
        id: "er_1",
        question: "What is the core argument of your editorial? Can you state it in one sentence?",
        hint: "If you can't, the argument may lack focus.",
      },
      {
        id: "er_2",
        question: "How did you engage with the strongest counterargument to your position?",
        hint: "Did you 'steelman' the opposition or set up a straw man?",
      },
      {
        id: "er_3",
        question: "Where is the line between opinion and fact in your piece? How did you maintain that distinction?",
        hint: "Check: are all factual claims verifiable? Are opinions clearly labelled?",
      },
      {
        id: "er_4",
        question: "What criteria did you use to evaluate the work you reviewed (film, book, event)?",
        hint: "Were your criteria explicit and consistently applied?",
      },
      {
        id: "er_5",
        question: "How does your editorial voice balance authority with humility?",
        hint: "Consider conviction vs. arrogance, passion vs. ranting.",
      },
      {
        id: "er_6",
        question: "What ethical considerations did you navigate in writing persuasively?",
        hint: "Think about cherry-picking data, emotional manipulation, ad hominem attacks.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Cross-cutting prompt sets (linked to story templates)
  // ═══════════════════════════════════════════════════════

  feature_writing: {
    id: "feature_writing",
    label: "Feature Writing",
    prompts: [
      {
        id: "fw_1",
        question: "How did your opening scene connect to the larger theme of the story?",
        hint: "A good scene-setter is a microcosm of the bigger issue.",
      },
      {
        id: "fw_2",
        question: "Who were your sources and why did you choose them?",
        hint: "Consider range, authority, affected voices, and expert analysis.",
      },
      {
        id: "fw_3",
        question: "What was the most difficult part of this story to write, and how did you handle it?",
        hint: "Be honest about challenges in reporting, structure, or ethics.",
      },
      {
        id: "fw_4",
        question: "How did you maintain accuracy while creating a narrative experience?",
        hint: "Features must be as accurate as hard news, despite their literary style.",
      },
    ],
  },

  digital_journalism: {
    id: "digital_journalism",
    label: "Digital Journalism",
    prompts: [
      {
        id: "dj_1",
        question: "How did the digital medium shape your storytelling choices?",
        hint: "Consider audience behaviour (scanning, mobile-first), multimedia, interactivity.",
      },
      {
        id: "dj_2",
        question: "How did you verify information from social media or digital sources?",
        hint: "Describe your verification process step by step.",
      },
      {
        id: "dj_3",
        question: "What challenges do digital platforms create for journalistic standards?",
        hint: "Think about speed vs. accuracy, algorithms vs. editorial judgment, engagement vs. importance.",
      },
    ],
  },

  legal_ethics: {
    id: "legal_ethics",
    label: "Legal & Ethical Reporting",
    prompts: [
      {
        id: "le_1",
        question: "What legal considerations shaped your reporting on this story?",
        hint: "Consider sub judice rules, defamation, contempt of court, privacy.",
      },
      {
        id: "le_2",
        question: "How did you ensure fairness in reporting on someone accused of wrongdoing?",
        hint: "Right of reply, presumption of innocence, balanced sourcing.",
      },
      {
        id: "le_3",
        question: "Were there moments where the public interest conflicted with individual privacy? How did you decide?",
        hint: "Document your ethical reasoning process.",
      },
    ],
  },

  investigative: {
    id: "investigative",
    label: "Investigative Reporting",
    prompts: [
      {
        id: "inv_1",
        question: "Describe your evidence chain. How does each key claim connect to verifiable proof?",
        hint: "Map: Claim → Source → Verification → Confidence level.",
      },
      {
        id: "inv_2",
        question: "How did you protect your sources? What security measures did you take?",
        hint: "Consider communication methods, storage of documents, legal risks.",
      },
      {
        id: "inv_3",
        question: "What is the public interest justification for this investigation?",
        hint: "Exposing crime, protecting health/safety, preventing the public from being misled.",
      },
      {
        id: "inv_4",
        question: "What would you need to do before publication that you haven't done yet?",
        hint: "Right of reply, legal review, editorial sign-off, source re-confirmation.",
      },
      {
        id: "inv_5",
        question: "How did you handle the emotional or psychological impact of this investigation?",
        hint: "Investigative work can be stressful. Reflecting on wellbeing is professional, not weak.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Generic / universal reflection prompts
  // ═══════════════════════════════════════════════════════

  general: {
    id: "general",
    label: "General Reflection",
    prompts: [
      {
        id: "gen_1",
        question: "What was the most important thing you learned from this assignment?",
        hint: "Focus on a specific skill, concept, or insight.",
      },
      {
        id: "gen_2",
        question: "How does this assignment connect to professional journalism practice?",
        hint: "Think about what a working journalist would do differently — or the same.",
      },
      {
        id: "gen_3",
        question: "What feedback (from AI, peers, or lecturer) was most valuable? Why?",
        hint: "Show that you can learn from critique.",
      },
      {
        id: "gen_4",
        question: "How did you use the AI tools in this assignment? Were they helpful? Were there limitations?",
        hint: "Critical engagement with AI tools is a 21st-century skill.",
      },
      {
        id: "gen_5",
        question: "What would you tell a student starting this assignment for the first time?",
        hint: "This reveals what you've internalised.",
      },
    ],
  },
}

export function getReflectionPromptSet(id) {
  return reflectionPromptSets[id] || reflectionPromptSets.general
}

export function getReflectionPromptsForCourse(courseTemplateId, courseTemplates) {
  const course = courseTemplates[courseTemplateId]
  if (!course) return reflectionPromptSets.general
  return reflectionPromptSets[course.reflectionPromptSetId] || reflectionPromptSets.general
}

export const reflectionPromptSetIds = Object.keys(reflectionPromptSets)
