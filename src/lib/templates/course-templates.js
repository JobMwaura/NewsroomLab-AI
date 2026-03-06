// ─── NewsroomLab AI — Course Templates ─────────────────
// Each template auto-creates: outcomes, weekly plan, assignment pack,
// rubric presets, verification rules, and reflection prompts.
// Aligned to detailed course-by-course syllabus specifications.

export const courseTemplates = {
  // ═══════════════════════════════════════════════════════
  // HCC 109 — Writing for Mass Media
  // ═══════════════════════════════════════════════════════
  HCC109: {
    code: "HCC 109",
    title: "Writing for Mass Media",
    description:
      "Foundational writing course covering news, broadcast, PR, feature, and opinion writing formats. Students master structure, clarity, audience awareness, and basic verification across multiple media platforms.",
    outcomes: [
      "Write a hard news story using inverted pyramid structure with verified facts",
      "Write a press release that meets journalistic standards and passes the journalist test",
      "Write a broadcast script (VO) demonstrating write-to-be-heard principles",
      "Write a short feature story with a scene-setting lead and nut graf",
      "Write an opinion/editorial piece with a clear thesis and counterargument",
      "Rewrite a print story for interactive/web format demonstrating digital-first thinking",
      "Apply basic attribution, sourcing, and verification discipline",
      "Demonstrate audience awareness across different media formats",
      "Evaluate their own writing critically through structured reflections",
    ],
    weeklyPlan: [
      { week: 1, topic: "Writing Across Media: An Overview", activities: ["Lecture: the media landscape — print, broadcast, digital, PR, opinion", "Exercise: compare how the same story appears across 4 platforms"] },
      { week: 2, topic: "The Inverted Pyramid & Hard News", activities: ["Lecture: lead writing, 5Ws+H, structure, clarity, active voice", "Exercise: write 5 leads from press releases"] },
      { week: 3, topic: "Sourcing, Attribution & Accuracy", activities: ["Lecture: on-the-record, off-the-record, verification basics", "Exercise: fix unattributed copy, identify sourcing gaps"] },
      { week: 4, topic: "Hard News Writing Workshop", activities: ["Assignment 1 due: Hard news story (400-600 words)", "Peer review workshop"] },
      { week: 5, topic: "PR Writing: The Press Release", activities: ["Lecture: press release structure, newsworthiness for PR, audience targeting", "Exercise: compare press release to published news story"] },
      { week: 6, topic: "PR Writing Workshop", activities: ["Assignment 2 due: Press release", "Peer review + journalist test"] },
      { week: 7, topic: "Broadcast Writing: Writing for the Ear", activities: ["Lecture: short sentences, active voice, present tense, write-to-be-heard", "Exercise: convert a print story to broadcast VO"] },
      { week: 8, topic: "Broadcast Script Workshop", activities: ["Assignment 3 due: Broadcast script (VO)", "In-class read-aloud test"] },
      { week: 9, topic: "Feature Writing: Scene-Setting & Nut Graf", activities: ["Lecture: show don't tell, narrative leads, the nut graf", "Exercise: write 3 scene-setting openings"] },
      { week: 10, topic: "Feature Writing Workshop", activities: ["Assignment 4 due: Short feature story (800-1200 words)", "Peer review workshop"] },
      { week: 11, topic: "Opinion Writing: Editorials & Arguments", activities: ["Lecture: thesis, evidence, counterargument, editorial voice", "Exercise: outline an editorial on a current issue"] },
      { week: 12, topic: "Opinion/Editorial Workshop", activities: ["Assignment 5 due: Opinion/editorial piece (600-900 words)", "Peer critique session"] },
      { week: 13, topic: "Digital-First: Interactive & Web Writing", activities: ["Lecture: web writing principles, scanning, SEO basics, multimedia integration", "Assignment 6 due: Interactive/web rewrite of a previous piece"] },
      { week: 14, topic: "Portfolio Assembly & Reflection", activities: ["Workshop: select best pieces, write reflections", "Final portfolio submission"] },
    ],
    assignmentTemplateIds: [
      "hard_news",
      "press_release",
      "broadcast_vo",
      "feature_short",
      "opinion_editorial",
      "interactive_web_rewrite",
    ],
    defaultRubricId: "mass_media_rubric",
    reflectionPromptSetId: "intro_journalism",
    rubricEmphasis: ["structure", "clarity", "audience_fit", "correctness", "editing_quality"],
    gatePreset: "standard",
  },

  // ═══════════════════════════════════════════════════════
  // HCC 205 — Media Writing and Reporting
  // ═══════════════════════════════════════════════════════
  HCC205: {
    code: "HCC 205",
    title: "Media Writing and Reporting",
    description:
      "Intermediate reporting course. Students produce beat stories, live updates, interview pieces, broadcast packages, MoJo stories, podcasts, and data mini-stories. Stronger verification gates and multi-source requirements.",
    outcomes: [
      "Produce a polished beat story with multiple verified sources and proper attribution",
      "Write and produce a live update sequence (rolling blog or developing story)",
      "Produce an interview-driven piece demonstrating advanced interviewing skills",
      "Write a broadcast package script (VO/SOT/PKG) with cue sheet",
      "Produce a MoJo story using mobile-only tools",
      "Script and structure a podcast episode",
      "Produce a data mini-story with transparent methodology and sourced data",
      "Apply advanced verification discipline using verification tables",
      "Demonstrate ethical reasoning through ethics memos for sensitive stories",
    ],
    weeklyPlan: [
      { week: 1, topic: "Advanced News Writing: Beyond the Basic Lead", activities: ["Lecture: delayed leads, anecdotal leads, scene-setting leads", "Exercise: rewrite 5 stories with different lead types"] },
      { week: 2, topic: "Beat Reporting & Multi-Source Journalism", activities: ["Lecture: building a beat, triangulating sources, source diversity", "Assignment 1: Beat story (500-700 words, min 4 sources)"] },
      { week: 3, topic: "Verification Discipline", activities: ["Lecture: the verification table, evidence chains, confidence levels", "Workshop: build verification tables for sample stories"] },
      { week: 4, topic: "Live & Developing News", activities: ["Lecture: live blogging, rolling updates, timestamping, confirmed vs unconfirmed", "Assignment 2: Live update sequence (min 5 timestamped entries)"] },
      { week: 5, topic: "The Interview Piece", activities: ["Lecture: long-form interviewing, building rapport, open-ended questions", "Assignment 3: Interview-driven piece (700-1000 words)"] },
      { week: 6, topic: "Broadcast News Production", activities: ["Lecture: PKG structure, SOT selection, writing to pictures", "Workshop: script a broadcast package"] },
      { week: 7, topic: "Broadcast Package Workshop", activities: ["Assignment 4: Broadcast package script (VO/SOT/PKG)", "In-class screening and critique"] },
      { week: 8, topic: "Mobile Journalism (MoJo)", activities: ["Lecture: MoJo techniques, shooting, editing, social distribution", "Assignment 5: MoJo story (video/audio + transcript + social captions)"] },
      { week: 9, topic: "Podcast Storytelling", activities: ["Lecture: podcast structure, cold opens, interview segments, narrative", "Workshop: plan a podcast episode"] },
      { week: 10, topic: "Podcast Production Workshop", activities: ["Assignment 6: Podcast script (800-1500 words)", "In-class playback and peer review"] },
      { week: 11, topic: "Data Journalism Fundamentals", activities: ["Lecture: finding data, basic analysis, methodology transparency", "Exercise: analyse a dataset for story leads"] },
      { week: 12, topic: "Data Mini-Story Workshop", activities: ["Assignment 7: Data mini-story (400-600 words)", "Peer review and verification audit"] },
      { week: 13, topic: "Ethics, Anonymous Sources & Sensitive Reporting", activities: ["Lecture: when to grant anonymity, shield laws, harm minimisation", "Ethics memo writing exercise"] },
      { week: 14, topic: "Portfolio & Critical Reflection", activities: ["Final portfolio assembly: 5 best pieces with verification tables", "Media studies reflection essay"] },
    ],
    assignmentTemplateIds: [
      "beat_story",
      "live_update_sequence",
      "interview_piece",
      "broadcast_pkg",
      "mojo_story",
      "podcast_script",
      "data_mini_story",
    ],
    defaultRubricId: "hard_news_rubric",
    reflectionPromptSetId: "news_reporting",
    rubricEmphasis: ["sourcing", "verification", "accuracy", "structure", "ethics"],
    gatePreset: "stronger",
  },

  // ═══════════════════════════════════════════════════════
  // HCC 312 — Public Relations Writing
  // ═══════════════════════════════════════════════════════
  HCC312: {
    code: "HCC 312",
    title: "Public Relations Writing",
    description:
      "Professional writing for public relations and corporate communications. Students produce pitch letters, news releases, backgrounders, fact sheets, newsletters, and web/brochure copy. Audience targeting panel and proof-pack verification required.",
    outcomes: [
      "Draft an effective pitch letter targeted to a specific journalist",
      "Write a news-style press release that meets journalistic standards",
      "Produce a backgrounder document with verified facts and context",
      "Create a fact sheet with scannable formatting and verifiable data",
      "Write newsletter copy balancing information with engagement",
      "Create brochure or web landing page copy for a target audience",
      "Use the audience targeting panel to demonstrate audience awareness",
      "Apply verification and accuracy standards to all PR materials",
      "Compile a complete media kit (proof pack) for final submission",
    ],
    weeklyPlan: [
      { week: 1, topic: "PR vs Journalism: Two Sides of the Media Coin", activities: ["Lecture: the PR-journalism relationship, gatekeeping, agenda-setting", "Exercise: compare press release to published news story"] },
      { week: 2, topic: "The Media Pitch", activities: ["Lecture: pitch letter structure, targeting journalists, follow-up etiquette", "Assignment 1: Pitch letter/email"] },
      { week: 3, topic: "The Press Release: Structure & Style", activities: ["Lecture: inverted pyramid for PR, newsworthiness, boilerplate", "Assignment 2: News release"] },
      { week: 4, topic: "The Backgrounder", activities: ["Lecture: context documents, history, depth information", "Assignment 3: Backgrounder document"] },
      { week: 5, topic: "Fact Sheets & Quick Reference Materials", activities: ["Lecture: data presentation, bullet formatting, accuracy", "Assignment 4: Fact sheet"] },
      { week: 6, topic: "Crisis Communication Writing", activities: ["Lecture: crisis statements, holding statements, spokesperson briefs", "Case study: crisis communication analysis"] },
      { week: 7, topic: "Newsletter Writing", activities: ["Lecture: audience analysis, tone, structure, CTAs", "Assignment 5: Newsletter copy"] },
      { week: 8, topic: "Brochure & Web Landing Copy", activities: ["Lecture: web writing principles, SEO basics, readability, brochure conventions", "Assignment 6: Brochure or web landing page copy"] },
      { week: 9, topic: "Social Media Content for PR", activities: ["Lecture: platform-specific writing, brand voice, engagement", "Exercise: social media content calendar"] },
      { week: 10, topic: "Audience Targeting & Analysis", activities: ["Workshop: audience targeting panel — define personas, channels, messaging", "Portfolio review checkpoint"] },
      { week: 11, topic: "Media Kit Assembly (Proof Pack)", activities: ["Workshop: compile pitch, press release, backgrounder, fact sheet, newsletter", "Proof pack verification checkpoint"] },
      { week: 12, topic: "Ethics in PR: Disclosure & Transparency", activities: ["Lecture: spin vs truth, disclosure requirements, ethical PR practice", "Ethics memo: analyse a PR campaign"] },
      { week: 13, topic: "PR Writing for Broadcast & Digital Media", activities: ["Lecture: VNRs, audio news releases, podcast pitches", "Exercise: adapt print press release for broadcast"] },
      { week: 14, topic: "Portfolio & Professional Reflection", activities: ["Final portfolio: complete media kit (proof pack) + reflections", "Reflection on PR ethics and media power"] },
    ],
    assignmentTemplateIds: [
      "pitch_letter",
      "press_release",
      "backgrounder",
      "fact_sheet",
      "newsletter_copy",
      "brochure_web_landing",
    ],
    defaultRubricId: "pr_writing_rubric",
    reflectionPromptSetId: "pr_writing",
    rubricEmphasis: ["audience_awareness", "accuracy", "format", "newsworthiness", "ethics_transparency"],
    gatePreset: "proof_pack",
  },

  // ═══════════════════════════════════════════════════════
  // HCC 314 — Newspaper Writing
  // ═══════════════════════════════════════════════════════
  HCC314: {
    code: "HCC 314",
    title: "Newspaper Writing",
    description:
      "Advanced newspaper journalism. Story-type library approach: profiles, obituaries, investigative, courts, parliament, business, sports, disaster, press conference. Includes newspaper analysis applying media theory.",
    outcomes: [
      "Write a compelling profile using multiple interviews and descriptive detail",
      "Produce a respectful, accurate obituary with verified biographical facts",
      "Demonstrate investigative techniques including document analysis and evidence chains",
      "Write accurate court reports respecting sub judice rules and fair trial rights",
      "Cover parliament and government proceedings with precision and context",
      "Write business reporting with accessible financial data and jargon translation",
      "Produce polished sports reports with statistics and post-match reactions",
      "Write sensitive disaster/breaking news updates under time pressure",
      "Write a press conference report distilling key announcements and reactions",
      "Conduct newspaper analysis applying media theory (agenda-setting, gatekeeping, framing)",
      "Apply the 2-source rule for high-risk claims in all stories",
    ],
    weeklyPlan: [
      { week: 1, topic: "The Newspaper in the Digital Age", activities: ["Lecture: newspaper writing standards, style guides, the sub-editor role", "Exercise: analyse front pages for news judgment and framing"] },
      { week: 2, topic: "The Profile", activities: ["Lecture: interview techniques, structure, descriptive writing", "Assignment 1: Profile piece (800-1200 words)"] },
      { week: 3, topic: "The Obituary", activities: ["Lecture: obituary conventions, sensitivity, accuracy", "Assignment 2: Obituary (500-800 words)"] },
      { week: 4, topic: "Investigative Journalism Techniques", activities: ["Lecture: documents, data, whistleblowers, public interest defence", "Workshop: document analysis exercise"] },
      { week: 5, topic: "Investigative Story Workshop", activities: ["Assignment 3: Investigative piece (1000-2000 words)", "Verification audit peer review"] },
      { week: 6, topic: "Courts & Legal Reporting", activities: ["Lecture: sub judice, contempt, fair trial, legal terminology", "Assignment 4: Court story (400-600 words)"] },
      { week: 7, topic: "Parliament & Government Reporting", activities: ["Lecture: parliamentary privilege, Hansard, budget reporting", "Assignment 5: Parliament/government story (500-700 words)"] },
      { week: 8, topic: "Business & Economic Reporting", activities: ["Lecture: financial statements, data sources, jargon-busting", "Assignment 6: Business story (300-500 words)"] },
      { week: 9, topic: "Sports Reporting", activities: ["Lecture: sports writing, statistics, clichés, post-match reactions", "Assignment 7: Sports report (400-600 words)"] },
      { week: 10, topic: "Disaster & Breaking News", activities: ["Lecture: breaking news protocols, sensitivity, updates", "Assignment 8: Disaster update (400-600 words)"] },
      { week: 11, topic: "The Press Conference Report", activities: ["Lecture: distilling announcements, multiple reactions, context", "Assignment 9: Press conference report (500-700 words)"] },
      { week: 12, topic: "Newspaper Analysis: Media Theory", activities: ["Lecture: agenda-setting, gatekeeping, framing, political economy", "Workshop: analyse a week of newspaper coverage"] },
      { week: 13, topic: "Newspaper Analysis Workshop", activities: ["Assignment 10: Newspaper analysis essay (800-1200 words)", "Peer review and critique session"] },
      { week: 14, topic: "Portfolio & Critical Reflection", activities: ["Final portfolio: 6 best pieces with verification tables & reflections", "Media studies reflection essay"] },
    ],
    assignmentTemplateIds: [
      "profile",
      "obituary",
      "investigative",
      "courts_story",
      "parliament_story",
      "business_brief",
      "sports_report",
      "disaster_update",
      "press_conference",
      "newspaper_analysis",
    ],
    defaultRubricId: "hard_news_rubric",
    reflectionPromptSetId: "newspaper_writing",
    rubricEmphasis: ["accuracy", "verification", "legal_compliance", "sourcing", "structure"],
    gatePreset: "two_source_high_risk",
  },

  // ═══════════════════════════════════════════════════════
  // HCC 316 — Feature & Magazine Writing
  // ═══════════════════════════════════════════════════════
  HCC316: {
    code: "HCC 316",
    title: "Feature & Magazine Writing",
    description:
      "Advanced feature writing, editing, and magazine production. Feature studio with scene-builder prompts, edit-a-feature exercises, layout companion, and magazine production workflow. Photo/source permissions required.",
    outcomes: [
      "Write long-form features with narrative structure, scene-setting, and nut graf",
      "Use scene-builder prompts to create vivid, immersive openings",
      "Apply the nut graf technique to ground features in news relevance",
      "Edit another writer's feature draft and produce a professional edit memo",
      "Understand magazine layout principles and visual storytelling",
      "Write effective captions, pull quotes, and display copy",
      "Produce a layout/visual assignment using design tools",
      "Compile a magazine production portfolio (feature + edit memo + layout)",
      "Demonstrate sensitivity, ethical judgment, and source permission documentation",
    ],
    weeklyPlan: [
      { week: 1, topic: "The Art of the Feature: Why Long-Form Matters", activities: ["Lecture: what makes a great magazine feature, structure types", "Reading analysis: dissect 2 published features"] },
      { week: 2, topic: "Scene-Setting & Show Don't Tell", activities: ["Lecture: sensory detail, scene reconstruction, character development", "Scene-builder workshop: write 3 openings using prompts"] },
      { week: 3, topic: "The Nut Graf & Feature Architecture", activities: ["Lecture: nut graf placement, story arc, pacing", "Assignment 1: Feature story (1500-2500 words)"] },
      { week: 4, topic: "Interviewing for Features", activities: ["Lecture: long-form interview techniques, building rapport", "Workshop: practice interviews with scene-builder notes"] },
      { week: 5, topic: "Feature Writing Workshop I", activities: ["Peer review of Assignment 1 drafts", "Revision workshop using AI editor + scene-builder prompts"] },
      { week: 6, topic: "The Art of Editing", activities: ["Lecture: structural editing vs line editing", "Exercise: edit a sample feature draft"] },
      { week: 7, topic: "Edit-a-Feature Exercise", activities: ["Assignment 2: Edit another student's draft + write edit memo", "Workshop: discussing edit memos"] },
      { week: 8, topic: "Visual Storytelling & Magazine Layout", activities: ["Lecture: layout principles, typography, visual hierarchy", "Tools introduction: Canva/InDesign basics"] },
      { week: 9, topic: "Captions, Pull Quotes & Display Copy", activities: ["Lecture: display copy that sells the story", "Exercise: write captions and pull quotes"] },
      { week: 10, topic: "Layout Companion Workshop", activities: ["Assignment 3: Layout/visual (PDF/Canva + captions + pull quotes)", "Design workshop with photo permissions documented"] },
      { week: 11, topic: "Magazine Production Planning", activities: ["Workshop: production workflow — roles, editorial calendar", "Photo and source permissions documentation"] },
      { week: 12, topic: "Feature Writing Workshop II", activities: ["Assignment 4: Second feature or profile (1500-2500 words)", "Advanced peer review with edit memos"] },
      { week: 13, topic: "Ethics in Feature Writing", activities: ["Lecture: consent, vulnerability, representation, power", "Ethics memo: ethical decisions in a published feature"] },
      { week: 14, topic: "Portfolio & Reflection", activities: ["Final portfolio: features, edit memos, layouts, permissions, reflections", "Media studies reflection on voice and representation"] },
    ],
    assignmentTemplateIds: [
      "feature_story",
      "feature_edit_exercise",
      "layout_visual",
      "feature_story",
    ],
    defaultRubricId: "feature_rubric",
    reflectionPromptSetId: "magazine_feature",
    rubricEmphasis: ["narrative", "scene_setting", "nut_graf", "editing_quality", "ethics_sensitivity"],
    gatePreset: "photo_source_permissions",
  },

  // ═══════════════════════════════════════════════════════
  // HCC 420 — Writing Editorials and Reviews
  // ═══════════════════════════════════════════════════════
  HCC420: {
    code: "HCC 420",
    title: "Writing Editorials and Reviews",
    description:
      "Advanced opinion journalism. Editorials, reviews (film, book, event, product, music, restaurant), editorial analysis. Features editorial mode, review mode, language tools (cliche/jargon detector, concision coach), and opinion/fact labelling.",
    outcomes: [
      "Write persuasive editorials with clear thesis, evidence, and steelmanned counterargument",
      "Produce informed film/book reviews with criteria-based evaluation",
      "Produce experiential event/product reviews with transparency and disclosure",
      "Produce music or restaurant reviews demonstrating specialised review skills",
      "Craft effective headlines and captions that are accurate and compelling",
      "Use language tools: cliche detector, jargon flagger, concision coach",
      "Conduct editorial analysis applying agenda-setting, gatekeeping, and framing theory",
      "Label all claims as opinion or fact using the opinion/fact labelling system",
      "Apply media theory (framing, ideology, political economy) to editorial analysis",
    ],
    weeklyPlan: [
      { week: 1, topic: "The Role of the Editorial: Democracy & The Fourth Estate", activities: ["Lecture: history of editorials, editorial boards, opinion vs reporting", "Reading analysis: compare editorials from 3 Kenyan newspapers"] },
      { week: 2, topic: "Argument Structure for Editorials", activities: ["Lecture: thesis, evidence, counterargument, conclusion", "Exercise: outline an editorial on a current issue"] },
      { week: 3, topic: "Writing the Editorial (Editorial Mode)", activities: ["Lecture: tone, voice, persuasion, avoiding propaganda", "Assignment 1: Editorial (600-900 words) with opinion/fact labels"] },
      { week: 4, topic: "Language Tools: Cliche Detector & Concision Coach", activities: ["Workshop: run language tools — eliminate cliches, tighten prose", "Exercise: rewrite wordy/cliched passages"] },
      { week: 5, topic: "The Art of the Review (Review Mode)", activities: ["Lecture: review vs criticism, criteria-based evaluation, fairness", "Exercise: mini-reviews of 3 things using review mode"] },
      { week: 6, topic: "Film & Book Reviews", activities: ["Lecture: film review conventions, book review structure, spoilers", "Assignment 2: Film or book review (500-800 words)"] },
      { week: 7, topic: "Event & Product Reviews", activities: ["Lecture: experiential reviewing, transparency, disclosure", "Assignment 3: Event or product review (500-800 words)"] },
      { week: 8, topic: "Specialised Reviews: Music & Restaurant", activities: ["Lecture: music review conventions, restaurant review ethics", "Assignment 4: Music or restaurant review (500-800 words)"] },
      { week: 9, topic: "Headline & Caption Craft", activities: ["Lecture: headline types, caption writing, accuracy", "Assignment 5: Headline + caption drills"] },
      { week: 10, topic: "Agenda-Setting Theory & Editorials", activities: ["Lecture: who sets the agenda? Media power in public discourse", "Analysis exercise: track editorial agenda across a week"] },
      { week: 11, topic: "Gatekeeping & Framing in Opinion Journalism", activities: ["Lecture: who decides what's published? How editorials frame issues", "Exercise: reframe an editorial from a different perspective"] },
      { week: 12, topic: "Editorial Analysis Workshop", activities: ["Assignment 6: Editorial analysis (800-1200 words)", "Peer review and critique session"] },
      { week: 13, topic: "Ethics in Opinion Journalism", activities: ["Lecture: disclosure, conflicts of interest, fairness in opinion", "Ethics memo workshop"] },
      { week: 14, topic: "Portfolio & Critical Reflection", activities: ["Final portfolio: editorials, reviews, headline exercises, analyses", "Media studies reflection on editorial power and responsibility"] },
    ],
    assignmentTemplateIds: [
      "editorial",
      "review_film_book",
      "review_event_product",
      "review_music_restaurant",
      "headline_caption_drill",
      "editorial_analysis",
    ],
    defaultRubricId: "editorial_rubric",
    reflectionPromptSetId: "editorial_review",
    rubricEmphasis: ["thesis_argument", "evidence", "counterargument", "language_voice", "media_theory"],
    gatePreset: "opinion_fact_labelling",
  },
}

// Helper: get all template codes
export const courseTemplateCodes = Object.keys(courseTemplates)

// Helper: get template by code
export function getCourseTemplate(code) {
  return courseTemplates[code] || null
}
