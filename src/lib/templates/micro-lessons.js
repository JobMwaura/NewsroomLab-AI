// ─── NewsroomLab AI — Micro-Lessons (Lesson Coach) ──────
// Short teaching cards displayed inside the editor.
// Each card: title, content, example, trigger condition.

export const microLessons = {
  // ═══════════════════════════════════════════════════════
  // CORE NEWS WRITING
  // ═══════════════════════════════════════════════════════

  lead_writing: {
    id: "lead_writing",
    title: "How to Write a Lead",
    category: "News Writing",
    icon: "✍️",
    content: `Your lead is the single most important sentence in your story. It must answer the most newsworthy of the 5Ws+H (Who, What, When, Where, Why, How) in one sentence — ideally under 35 words.

**Rules:**
• Lead with the **most newsworthy** element, not the chronological first
• Be **specific** — use names, numbers, and places
• Use **active voice** ("Police arrested..." not "A man was arrested...")
• Avoid starting with a time element ("Yesterday..." or "On Monday...")
• Never start with a quote`,
    example: {
      bad: "The Nairobi County government yesterday released its annual budget for the coming financial year.",
      good: "Nairobi County has allocated Ksh 38.7 billion for 2026/27, with health receiving the largest increase of 15 per cent to Ksh 12.1 billion.",
      why: "The good lead includes the specific figure, the most significant allocation, and the percentage change — all in one sentence.",
    },
    triggerConditions: ["lead_too_long", "lead_missing_figures", "lead_starts_with_time", "lead_passive_voice"],
  },

  inverted_pyramid: {
    id: "inverted_pyramid",
    title: "The Inverted Pyramid",
    category: "News Writing",
    icon: "🔻",
    content: `The inverted pyramid organises information from **most important to least important**. If an editor cuts from the bottom, the story should still make sense.

**Structure:**
1. **Lead** — the most newsworthy fact
2. **Nut graf** — why this matters (the "so what")
3. **Key details** — supporting facts, quotes, context
4. **Background** — history, previous events
5. **Additional detail** — less critical information

**Why it works:** Readers scan. Editors cut. The pyramid ensures the essential survives.`,
    example: {
      bad: "Last Monday, the County Assembly met to discuss various issues. One of the items on the agenda was the budget. The Finance Executive presented the figures...",
      good: "Nairobi County allocated Ksh 38.7B for 2026/27 [LEAD]. The budget prioritises health and education [NUT GRAF]. 'This is transformative,' said Governor Sakaja [KEY DETAIL].",
      why: "The good version puts the conclusion first. The bad version buries it in chronological narration.",
    },
    triggerConditions: ["chronological_structure", "buried_lead"],
  },

  attribution_rules: {
    id: "attribution_rules",
    title: "Attribution Rules",
    category: "News Writing",
    icon: "💬",
    content: `**Every factual claim must be attributed to a source.** This is non-negotiable in journalism.

**Rules:**
• Use "said" — not "stated", "revealed", "admitted" (these editorialize)
• Attribution goes **after** the quote, not before: "The budget is transformative," Governor Sakaja **said**.
• For paraphrased claims: "according to" or "X said"
• **Never** use "sources say" without naming the source
• For anonymous sources: explain **why** they can't be named

**On/off the record:**
• **On the record** — can quote by name (default)
• **On background** — can use info but not name
• **Off the record** — can't use at all
• **Deep background** — can't even attribute to "a source"`,
    example: {
      bad: "Sources say the allocation for health increased by 15%.",
      good: "The allocation for health increased by 15 per cent, according to the budget estimates tabled in the County Assembly on Monday.",
      why: "The good version attributes to a specific, verifiable document rather than unnamed 'sources'.",
    },
    triggerConditions: ["unnamed_sources", "missing_attribution", "said_alternatives"],
  },

  nut_graf: {
    id: "nut_graf",
    title: "The Nut Graf",
    category: "News Writing",
    icon: "🥜",
    content: `The nut graf (short for "nutshell paragraph") tells the reader **why this story matters**. It's the "so what" paragraph.

**In hard news:** Usually paragraph 2 or 3. It provides context and significance.
**In features:** Comes after the scene-setting opening. It transitions from the anecdote to the bigger story.

**A good nut graf answers:**
• Why should I care?
• Why now?
• What's the bigger picture?

**Tip:** If you remove the nut graf and the story loses all meaning, you've found it.`,
    example: {
      bad: "The county government released several documents about the budget.",
      good: "The allocation marks the largest investment in public health since devolution began in 2013, and comes as Nairobi's public hospitals face critical shortages of drugs and equipment.",
      why: "The good nut graf explains significance (largest since devolution) and relevance (hospital shortages).",
    },
    triggerConditions: ["missing_nut_graf", "weak_context"],
  },

  specificity: {
    id: "specificity",
    title: "Be Specific, Not Vague",
    category: "News Writing",
    icon: "🎯",
    content: `Vague writing kills credibility. Replace every vague word with a specific one.

**Replace:**
• "a lot of money" → "Ksh 38.7 billion"
• "recently" → "on Monday" or "last week"
• "many people" → "45 residents" or "three in five Kenyans"
• "a significant increase" → "a 15 per cent increase"
• "a senior official" → "County Finance Executive Mary Ndung'u"
• "the area" → "Kibera" or "Nairobi's Eastlands"

**Rule of thumb:** If you can add a number, a name, or a place — do it.`,
    example: {
      bad: "The budget is very big and will affect many people.",
      good: "The Ksh 38.7 billion budget will fund services for Nairobi's 4.4 million residents.",
      why: "Numbers and specifics make the story credible and verifiable.",
    },
    triggerConditions: ["vague_language", "missing_figures", "unspecific_claims"],
  },

  news_values: {
    id: "news_values",
    title: "News Values",
    category: "News Writing",
    icon: "📰",
    content: `What makes something newsworthy? Apply these criteria:

**The classic news values:**
• **Timeliness** — Is it new? Is it happening now?
• **Proximity** — Is it close to your audience?
• **Impact** — How many people are affected?
• **Prominence** — Does it involve well-known people?
• **Conflict** — Is there disagreement or tension?
• **Novelty / Unusualness** — Is it surprising or rare?
• **Human interest** — Does it tug at emotions?

**Your lead should emphasise the strongest news value.** A budget story leads with impact (Ksh 38.7B). A celebrity arrest leads with prominence. A one-in-a-million event leads with novelty.`,
    example: null,
    triggerConditions: ["weak_news_value"],
  },

  right_of_reply: {
    id: "right_of_reply",
    title: "Right of Reply",
    category: "News Writing",
    icon: "⚖️",
    content: `If your story criticises someone, they have the **right to respond**. This is a fundamental journalism principle.

**Rules:**
• Contact the subject **before** publication
• Give them **reasonable time** to respond
• Include their response **in the story**, even if brief
• If they decline: write "X did not respond to requests for comment" or "X declined to comment"
• If unreachable: "Attempts to reach X were unsuccessful"

**Why it matters:** Failure to seek right of reply can make your story legally vulnerable (defamation) and ethically indefensible.`,
    example: {
      bad: "The governor misused county funds, according to audit reports. [No response sought]",
      good: "The governor misused county funds, according to audit reports. Governor Sakaja's office said the audit contained 'factual errors' and that a formal response would be issued within 14 days.",
      why: "Including the response — even a denial — makes the story fairer and stronger.",
    },
    triggerConditions: ["missing_right_of_reply", "one_sided_story"],
  },

  // ═══════════════════════════════════════════════════════
  // FOLLOW-UP & DEVELOPING STORIES
  // ═══════════════════════════════════════════════════════

  follow_up_angles: {
    id: "follow_up_angles",
    title: "Finding Follow-Up Angles",
    category: "Developing Stories",
    icon: "🔄",
    content: `A follow-up story must contain **new information**. Don't just rewrite the same story.

**Where to find second-day angles:**
• **New reactions** — who hasn't spoken yet?
• **Consequences** — what happened as a result?
• **Questions raised** — what doesn't add up?
• **Context** — how does this compare to similar situations?
• **Affected people** — who's impacted and how?
• **Official response** — has the government/institution responded?

**Your follow-up lead should signal what's new:**
"In the wake of..." / "Following Monday's..." / "New figures show..."`,
    example: null,
    triggerConditions: ["follow_up_no_new_info"],
  },

  advancing_story: {
    id: "advancing_story",
    title: "Advancing the Story",
    category: "Developing Stories",
    icon: "⏩",
    content: `"Advancing the story" means moving it forward with new information, not just summarising what happened before.

**Checklist:**
✅ What's happened since the last story?
✅ Have you found a new source?
✅ Is there data that wasn't available before?
✅ Has someone changed their position?
✅ Are there consequences or ripple effects?

**Structure:** Brief recap (1-2 sentences) → New information → New source → Implications`,
    example: null,
    triggerConditions: [],
  },

  // ═══════════════════════════════════════════════════════
  // COURTS & LEGAL
  // ═══════════════════════════════════════════════════════

  sub_judice_rules: {
    id: "sub_judice_rules",
    title: "Sub Judice Rules",
    category: "Legal Reporting",
    icon: "⚖️",
    content: `**Sub judice** means a case is before the court. Reporting restrictions apply to protect fair trial rights.

**You MUST NOT:**
• Publish anything that could influence the jury/judge
• Speculate on guilt or innocence
• Publish confessions not admitted in court
• Interview witnesses about their testimony
• Use words like "guilty", "criminal", "corrupt" before conviction

**You CAN:**
• Report what was said **in open court**
• Report the charge(s) and plea
• Report the judge's/magistrate's rulings
• Describe the courtroom scene

**Safe language:** "charged with", "accused of", "alleged", "the court heard that"`,
    example: {
      bad: "The corrupt county official finally faced justice in court yesterday.",
      good: "A county official charged with embezzlement of Ksh 4.5 million appeared before Milimani Law Courts yesterday.",
      why: "'Charged with' is factual. 'Corrupt' is a judgment that could prejudice the trial.",
    },
    triggerConditions: ["prejudicial_language", "guilty_before_conviction"],
  },

  fair_trial_rights: {
    id: "fair_trial_rights",
    title: "Fair Trial Rights",
    category: "Legal Reporting",
    icon: "🏛️",
    content: `Every accused person has the right to a fair trial. Your reporting must respect this.

**Key principles:**
• **Presumption of innocence** — they are "accused" or "charged", not "guilty"
• **Balance** — report both prosecution AND defence
• **Accuracy** — get names, charges, and dates exactly right
• **Identification** — be careful with names of minors or sexual offence complainants
• **Photos** — don't publish photos that could be prejudicial (e.g., in handcuffs before conviction)

**Kenya-specific:** The Constitution of Kenya (Art. 50) guarantees fair trial rights.`,
    example: null,
    triggerConditions: ["presumption_of_guilt", "one_sided_court_report"],
  },

  legal_terminology: {
    id: "legal_terminology",
    title: "Legal Terminology for Reporters",
    category: "Legal Reporting",
    icon: "📜",
    content: `Use correct legal terms. Getting them wrong undermines your credibility.

**Common terms:**
• **Accused / Defendant** — the person facing charges
• **Plaintiff / Complainant** — the person bringing the case
• **Charge** — the formal accusation (not "crime")
• **Plea** — guilty or not guilty
• **Bail / Bond** — conditions for release pending trial
• **Remand** — kept in custody
• **Sentence** — punishment after conviction
• **Acquittal** — found not guilty
• **Conviction** — found guilty

**Never confuse:** "charged" (formal accusation) with "arrested" (detained by police).`,
    example: null,
    triggerConditions: ["wrong_legal_terms"],
  },

  court_reporting_basics: {
    id: "court_reporting_basics",
    title: "Court Reporting Structure",
    category: "Legal Reporting",
    icon: "🔨",
    content: `Court stories follow a specific structure:

**Lead:** Who appeared + charge + court + outcome (bail/remand/conviction)
**Para 2:** Details of the charge(s)
**Para 3:** Prosecution case
**Para 4:** Defence response (or "The accused denied the charges")
**Para 5:** Magistrate/judge ruling
**Para 6:** Next hearing date

**Always include:**
• Full name and title of the accused
• The court name
• The magistrate/judge name
• The charge section (e.g., "contrary to Section 45 of the Anti-Corruption Act")
• The next hearing date`,
    example: null,
    triggerConditions: [],
  },

  // ═══════════════════════════════════════════════════════
  // BROADCAST WRITING
  // ═══════════════════════════════════════════════════════

  broadcast_writing_basics: {
    id: "broadcast_writing_basics",
    title: "Broadcast Writing Basics",
    category: "Broadcast",
    icon: "📺",
    content: `Broadcast writing is fundamentally different from print. You're writing to be **heard**, not read.

**Key rules:**
• **One idea per sentence**
• **Short sentences** (under 20 words ideally)
• **Active voice always** ("Police arrested..." not "A man was arrested...")
• **Present tense** where possible ("The president says..." not "The president said...")
• **Write numbers out** for the reader: "thirty-eight-point-seven billion shillings"
• **Avoid subordinate clauses** — they lose listeners
• **Attribution first** in broadcast: "Police say three people were arrested" (not "Three people were arrested, police say")`,
    example: {
      bad: "The County Finance Executive, who was speaking at a budget presentation event held at City Hall, said that the allocation for health had been increased.",
      good: "The county says it's spending more on health. Finance Executive Mary Ndung'u announced a fifteen per cent increase — to twelve-point-one billion shillings.",
      why: "Short sentences. Active voice. Attribution first. Numbers written out.",
    },
    triggerConditions: ["long_sentences_broadcast", "passive_voice_broadcast"],
  },

  write_to_be_heard: {
    id: "write_to_be_heard",
    title: "Write to Be Heard",
    category: "Broadcast",
    icon: "👂",
    content: `**Read your script aloud.** If you stumble, rewrite.

**Tips:**
• Use conversational language (not formal/academic)
• Avoid acronyms — say them in full or explain them
• Round numbers: "nearly forty billion" not "thirty-eight-point-seven billion"
• Use "says" not "said" (present tense = urgency)
• Avoid parenthetical phrases (listeners can't re-read)
• Write in the way you'd tell a friend the story

**The "friend test":** Would you say this sentence to a friend? If not, rewrite it.`,
    example: null,
    triggerConditions: ["too_formal_broadcast", "acronyms_unexplained"],
  },

  sot_selection: {
    id: "sot_selection",
    title: "Selecting Sound Bites (SOTs)",
    category: "Broadcast",
    icon: "🎙️",
    content: `Sound bites (SOTs) should add emotion, authority, or unique information that your narration can't provide.

**Good SOTs are:**
• Emotional or passionate (not flat readings of facts)
• In the interviewee's own words (their unique perspective)
• 10-20 seconds long (not longer)
• Self-contained (make sense without extra context)

**Bad SOTs are:**
• Just restating facts you could narrate
• Too long (listeners tune out after 20 seconds)
• Requiring extensive setup to understand

**Rule:** If you could say it better yourself, don't use the SOT. Use SOTs for things only the interviewee can say.`,
    example: null,
    triggerConditions: [],
  },

  pkg_structure: {
    id: "pkg_structure",
    title: "Broadcast Package (PKG) Structure",
    category: "Broadcast",
    icon: "🎬",
    content: `A broadcast package (PKG) typically follows this structure:

**1. Anchor intro** (read live by anchor)
**2. Reporter track** (your narration over pictures)
**3. SOT 1** (first sound bite)
**4. Bridge** (narration transitioning to next point)
**5. SOT 2** (second sound bite — different perspective)
**6. Standup / PTC** (piece to camera — reporter on location)
**7. Tag** (final narration, out words)

**Total duration:** Usually 1:30 - 2:30 for a standard package.

**Always include a cue sheet** with: slug, duration, SOT timecodes, out words.`,
    example: null,
    triggerConditions: [],
  },

  // ═══════════════════════════════════════════════════════
  // FEATURE WRITING
  // ═══════════════════════════════════════════════════════

  scene_setting: {
    id: "scene_setting",
    title: "Scene-Setting Leads",
    category: "Feature Writing",
    icon: "🎬",
    content: `A scene-setting lead puts the reader **in the moment**. Use sensory details to create a vivid picture.

**Show, don't tell:**
• ❌ "The hospital was crowded and understaffed."
• ✅ "Three patients shared a single bed in Ward 7. A nurse moved between them, checking IVs, her worn shoes squeaking on the linoleum."

**Include:**
• What you can **see**
• What you can **hear**
• What you can **smell** (powerful memory trigger)
• **Specific details** (brand names, colours, exact times)
• **Action** (people doing things, not just existing)

**Then transition** to the nut graf: "This scene plays out daily in Nairobi's public hospitals, where..."`,
    example: {
      bad: "Mental health is a big problem for university students.",
      good: "At 2 a.m. in a cramped Roysambu bedsitter, Amina Wanjiru stares at her phone screen — the counselling hotline number glowing white. She has been sitting like this for an hour, unable to press call.",
      why: "The scene puts you in the room. You see, feel, and understand before any statistics appear.",
    },
    triggerConditions: ["no_scene_setting", "tell_not_show"],
  },

  show_dont_tell: {
    id: "show_dont_tell",
    title: "Show, Don't Tell",
    category: "Feature Writing",
    icon: "👁️",
    content: `The most powerful rule in feature writing: **show the reader, don't tell them.**

**Telling:** "He was nervous."
**Showing:** "His fingers drummed the table. He glanced at the door twice before answering."

**Telling:** "The market was busy."
**Showing:** "Tomatoes rolled off a toppling pyramid as two hawkers collided between the stalls."

**How to show:**
• Use **action verbs** (not "was" or "had")
• Include **specific sensory detail**
• Let **dialogue** reveal character
• Use **physical description** of emotions

**When telling is OK:** Background facts, data, transitions. Don't try to "show" statistics.`,
    example: null,
    triggerConditions: ["excessive_telling", "no_sensory_detail"],
  },

  interview_for_profiles: {
    id: "interview_for_profiles",
    title: "Interviewing for Profiles",
    category: "Feature Writing",
    icon: "🎤",
    content: `Profile interviews need more than facts — they need **character, emotion, and story**.

**Preparation:**
• Research extensively before the interview
• Talk to people who know the subject first
• Prepare questions but be ready to abandon them

**During the interview:**
• Spend time **observing** (note details of appearance, environment, habits)
• Ask **open-ended** questions ("Tell me about..." not "Did you...?")
• Ask "What was that like?" to get emotional depth
• Ask "Can you give me an example?" for specifics
• Be comfortable with **silence** — let them fill it

**The golden questions:**
• "What's the hardest decision you've had to make?"
• "What would surprise people about you?"
• "Is there anything I should have asked that I didn't?"`,
    example: null,
    triggerConditions: [],
  },

  pacing_structure: {
    id: "pacing_structure",
    title: "Pacing & Feature Structure",
    category: "Feature Writing",
    icon: "📐",
    content: `Features need **rhythm** — alternating between scenes, quotes, data, and analysis.

**The "zig-zag" principle:**
Scene → Data → Quote → Scene → Expert → Data → Scene → Conclusion

**Pacing tips:**
• After a dense paragraph of statistics, follow with a human moment
• After a long interview passage, insert a brief scene or transition
• Vary paragraph length (short punchy paragraphs create urgency)
• Use **subheads** in long features to help readers navigate

**Don't front-load:** Spread your best material throughout. Give readers a reason to keep reading.`,
    example: null,
    triggerConditions: ["monotone_pacing", "all_quotes_together"],
  },

  descriptive_writing: {
    id: "descriptive_writing",
    title: "Descriptive Writing",
    category: "Feature Writing",
    icon: "🖊️",
    content: `Good description makes the reader **feel present**. Bad description is either too vague or too purple.

**Rules:**
• One sharp detail beats three vague ones
• Use **concrete nouns** and **strong verbs**
• Avoid adjective pileups ("the big, beautiful, old, sprawling house")
• Describe **what people do**, not just what they look like
• Include at least two senses (sight + sound, sight + smell)

**Kill these clichés:**
• "bustling city" → describe what makes it bustling
• "humble abode" → describe the actual house
• "beaming smile" → describe what about the smile makes it distinctive`,
    example: null,
    triggerConditions: ["cliche_descriptions", "no_physical_detail"],
  },

  // ═══════════════════════════════════════════════════════
  // PR WRITING
  // ═══════════════════════════════════════════════════════

  press_release_structure: {
    id: "press_release_structure",
    title: "Press Release Structure",
    category: "PR Writing",
    icon: "📣",
    content: `A press release must read like a **news story** — because that's what you want it to become.

**Standard structure:**
1. **FOR IMMEDIATE RELEASE** + date
2. **Headline** (active, specific, newsworthy)
3. **Dateline** (City, Date)
4. **Lead paragraph** (5Ws+H — like a news lead)
5. **Body** (supporting details, data, quotes)
6. **Quote** from spokesperson (must sound human, not corporate)
7. **Boilerplate** (standard "About [organisation]" paragraph)
8. **Contact information** (name, phone, email)

**The journalist test:** Would a journalist rewrite this as a news story? If not, it's not newsworthy enough.`,
    example: null,
    triggerConditions: [],
  },

  pr_vs_journalism: {
    id: "pr_vs_journalism",
    title: "PR vs Journalism",
    category: "PR Writing",
    icon: "🔄",
    content: `Understanding the difference is crucial for both professions:

**Journalism serves the public interest.** PR serves the client's interest.
**Journalism is independent.** PR is advocacy.
**Journalism seeks all sides.** PR presents one side.

**But good PR:**
• Is factually accurate (verifiable claims only)
• Is transparent about who it serves
• Doesn't mislead journalists
• Provides genuine news value

**The ethical line:** PR can present information favourably. It must **never** fabricate, mislead, or omit material facts.

**Think about:** When you write a press release, you're trying to pass through a journalist's **gatekeeping** — what does that tell you about media power?`,
    example: null,
    triggerConditions: [],
  },

  newsworthiness_for_pr: {
    id: "newsworthiness_for_pr",
    title: "Making PR Content Newsworthy",
    category: "PR Writing",
    icon: "🎯",
    content: `Journalists ignore most press releases. Make yours impossible to ignore.

**Newsworthy PR angles:**
• **Data/research** — "Our survey of 1,000 Kenyans found..."
• **First/biggest/new** — genuine firsts or milestones
• **Human impact** — how real people are affected
• **Timeliness** — tie to current events or trending topics
• **Local angle** — make it relevant to the journalist's audience
• **Expert availability** — offer a spokesperson for a trending story

**Red flags journalists spot instantly:**
• Puffery words: "excited to announce", "world-class", "cutting-edge"
• No real news: just a company promoting itself
• No data: claims without evidence
• No human element: all corporate speak`,
    example: null,
    triggerConditions: ["puffery_language", "no_news_angle_pr"],
  },

  // ═══════════════════════════════════════════════════════
  // EDITORIAL & OPINION
  // ═══════════════════════════════════════════════════════

  editorial_structure: {
    id: "editorial_structure",
    title: "Editorial Structure",
    category: "Opinion Writing",
    icon: "✍️",
    content: `An editorial argues a position. It must be **persuasive but fair**.

**Structure:**
1. **Hook** — news peg or provocative opening
2. **Thesis** — your clear position (stated explicitly)
3. **Evidence** — facts, data, examples supporting your position
4. **Counterargument** — the strongest opposing view (don't straw-man it)
5. **Rebuttal** — why your position still holds despite the counter
6. **Conclusion** — call to action or forward-looking statement

**Rules:**
• You're entitled to your opinion, not your own facts
• All factual claims must still be verifiable
• Acknowledge complexity — simplistic arguments are weak arguments
• Distinguish between your opinion and reporting others' views`,
    example: null,
    triggerConditions: [],
  },

  counterargument_technique: {
    id: "counterargument_technique",
    title: "The Counterargument",
    category: "Opinion Writing",
    icon: "🔄",
    content: `The counterargument is what separates a strong editorial from a rant.

**"Steelman" the opposition:** Present the strongest version of the opposing argument, not a weak caricature.

**Structure:**
1. Acknowledge: "Critics argue that..."
2. Present their best evidence: "They point to..."
3. Concede what's valid: "This concern is legitimate because..."
4. But rebut: "However, this argument fails to account for..."

**Why it matters:**
• Shows intellectual honesty
• Makes your argument stronger (you've already addressed objections)
• Builds credibility with readers who disagree
• Demonstrates critical thinking (essential for your grade!)`,
    example: {
      bad: "Some people think the budget is fine, but they're wrong.",
      good: "Defenders of the budget point to the 15% increase in health spending — a genuine achievement. However, this figure obscures the fact that 60% of the increase covers inflation, leaving real-terms growth at just 6%.",
      why: "The good version acknowledges the opposing argument's strength before dismantling it with evidence.",
    },
    triggerConditions: ["no_counterargument", "straw_man"],
  },

  opinion_vs_reporting: {
    id: "opinion_vs_reporting",
    title: "Opinion vs Reporting",
    category: "Opinion Writing",
    icon: "📝",
    content: `Even in opinion writing, facts are sacred.

**You CAN:**
• State your position clearly
• Use persuasive language
• Make value judgments
• Call for action
• Use first person ("I believe...")

**You CANNOT:**
• Fabricate or distort facts
• Misrepresent others' positions
• Present opinion as news
• Omit inconvenient facts

**Key distinction:**
• **Reporting:** "The budget allocates Ksh 12.1B to health." (fact)
• **Analysis:** "The health allocation may not keep pace with inflation." (interpretation of facts)
• **Opinion:** "The county should have allocated more to health." (value judgment)

All three have a place. Label them correctly.`,
    example: null,
    triggerConditions: ["opinion_disguised_as_fact"],
  },

  persuasion_ethics: {
    id: "persuasion_ethics",
    title: "Ethical Persuasion",
    category: "Opinion Writing",
    icon: "🎭",
    content: `Editorials persuade. But there's a line between persuasion and manipulation.

**Ethical persuasion uses:**
• Verifiable evidence
• Logical reasoning
• Emotional appeals grounded in real stories
• Transparent disclosure of the writer's perspective

**Manipulation uses:**
• Cherry-picked data
• Emotional exploitation
• Ad hominem attacks (attacking the person, not the argument)
• False dichotomies ("either you support this budget or you don't care about health")
• Appeal to authority without evidence

**Ask yourself:** Am I helping readers think, or am I trying to prevent them from thinking?`,
    example: null,
    triggerConditions: ["ad_hominem", "false_dichotomy"],
  },

  editorial_voice: {
    id: "editorial_voice",
    title: "Finding Your Editorial Voice",
    category: "Opinion Writing",
    icon: "🗣️",
    content: `Editorial voice is authoritative but not arrogant, passionate but not ranting.

**Tips:**
• Write with **conviction** — hedging ("maybe", "perhaps", "it could be argued") weakens your argument
• Use **strong verbs** — "The county must..." not "The county should perhaps consider..."
• Be **specific** — vague opinions are weak opinions
• Show **expertise** — demonstrate you've done the research
• Maintain **respect** — disagree without contempt

**Read editorials you admire.** Notice how they balance authority with humility, passion with precision.`,
    example: null,
    triggerConditions: ["hedging_language", "weak_verbs_editorial"],
  },

  // ═══════════════════════════════════════════════════════
  // MEDIA THEORY
  // ═══════════════════════════════════════════════════════

  agenda_setting_theory: {
    id: "agenda_setting_theory",
    title: "Agenda-Setting Theory",
    category: "Media Theory",
    icon: "📋",
    content: `**Agenda-setting theory** (McCombs & Shaw, 1972) argues that media doesn't tell people **what to think**, but **what to think about**.

**How it works:**
• Stories that get prominent coverage become "important" in the public mind
• Issues that are ignored by media are ignored by the public
• **First-level:** which topics get covered
• **Second-level:** which attributes of those topics are emphasised

**Apply to your analysis:**
• What stories dominate the front page this week?
• What stories are absent?
• Whose problems are treated as newsworthy?
• What does the pattern tell you about media priorities?`,
    example: null,
    triggerConditions: [],
  },

  gatekeeping_theory: {
    id: "gatekeeping_theory",
    title: "Gatekeeping Theory",
    category: "Media Theory",
    icon: "🚪",
    content: `**Gatekeeping** refers to the process by which information is filtered before it reaches the public.

**Gatekeepers include:**
• Reporters (what they choose to cover)
• Editors (what they choose to publish)
• News directors (what gets airtime)
• Algorithms (what gets promoted online)
• Owners (what's allowed to be published)

**Questions for analysis:**
• Who decided this story was newsworthy?
• What stories were killed or demoted?
• What institutional pressures shaped the coverage?
• How do advertising relationships affect editorial decisions?
• In digital media, how do algorithms act as gatekeepers?`,
    example: null,
    triggerConditions: [],
  },

  framing_theory: {
    id: "framing_theory",
    title: "Framing Theory",
    category: "Media Theory",
    icon: "🖼️",
    content: `**Framing** is how media organise and present information, emphasising certain aspects over others.

**The same event, framed differently:**
• "Government invests Ksh 12.1B in health" → **Progress frame**
• "Health budget fails to keep pace with inflation" → **Accountability frame**
• "Hospitals still lack drugs despite budget increase" → **Human impact frame**

**Types of frames:**
• Conflict, human interest, economic consequences, morality, attribution of responsibility

**For your reflection:**
• What frame does your story use?
• What alternative frames exist?
• Whose interests does your frame serve?
• What voices are amplified or silenced by your framing choices?`,
    example: null,
    triggerConditions: [],
  },

  political_economy_media: {
    id: "political_economy_media",
    title: "Political Economy of Media",
    category: "Media Theory",
    icon: "💰",
    content: `**Political economy** asks: who owns the media, and how does ownership shape content?

**Key questions:**
• Who owns this media outlet?
• What are their other business interests?
• How is the outlet funded (advertising, subscriptions, government)?
• Are there stories that ownership would discourage?
• How does concentration of media ownership affect diversity of views?

**In Kenya:**
• Consider the ownership structures of Nation Media, Standard Group, Royal Media, Mediamax
• How do political connections affect editorial lines?
• How does advertising revenue from government affect coverage?

**For your analysis:** Follow the money. Ownership patterns often explain editorial patterns.`,
    example: null,
    triggerConditions: [],
  },

  // ═══════════════════════════════════════════════════════
  // STYLE & LANGUAGE
  // ═══════════════════════════════════════════════════════

  cliches_wordiness: {
    id: "cliches_wordiness",
    title: "Clichés & Wordiness",
    category: "Style & Language",
    icon: "✂️",
    content: `Clichés are the enemy of good journalism. They signal lazy thinking.

**Kill these:**
• "at the end of the day" → delete
• "going forward" → delete
• "a step in the right direction" → say what the step actually is
• "the powers that be" → name them
• "remains to be seen" → say what might happen
• "stakeholders" → say which specific people/groups
• "in terms of" → delete and restructure

**Wordiness kills:**
• "at this point in time" → "now"
• "due to the fact that" → "because"
• "in the event that" → "if"
• "a large number of" → specify the number

**Rule:** Can you cut a word without losing meaning? Cut it.`,
    example: null,
    triggerConditions: ["cliche_detected", "wordy_phrases"],
  },

  active_voice: {
    id: "active_voice",
    title: "Active Voice",
    category: "Style & Language",
    icon: "⚡",
    content: `News writing demands active voice. It's clearer, shorter, and more direct.

**Passive:** "The budget was released by the county government."
**Active:** "The county government released the budget."

**Passive:** "Three people were arrested by police."
**Active:** "Police arrested three people."

**When passive is OK:**
• When the action matters more than the actor: "The building was destroyed in the fire" (who destroyed it is unknown)
• When the victim is more important: "She was shot during the robbery"

**Default to active.** Switch to passive only with good reason.`,
    example: null,
    triggerConditions: ["passive_voice_detected"],
  },

  // ═══════════════════════════════════════════════════════
  // DIGITAL / DATA
  // ═══════════════════════════════════════════════════════

  social_verification: {
    id: "social_verification",
    title: "Social Media Verification",
    category: "Digital Journalism",
    icon: "🔍",
    content: `Never trust social media content at face value.

**Verification checklist:**
• **Source:** Who posted it? Is the account verified? How old is it?
• **Date:** When was it actually taken? (Check metadata, weather, landmarks)
• **Location:** Reverse image search, geolocate using landmarks
• **Manipulation:** Has the image/video been edited? Check for inconsistencies
• **Context:** Is the content being used in its original context?

**Tools:** Google Reverse Image Search, TinEye, InVID, Wayback Machine

**Rule:** If you can't verify it, don't publish it. And if you publish it, disclose the verification status.`,
    example: null,
    triggerConditions: ["unverified_social_content"],
  },

  data_in_stories: {
    id: "data_in_stories",
    title: "Using Data in Stories",
    category: "Digital Journalism",
    icon: "📊",
    content: `Data makes stories credible. Bad data use makes them misleading.

**Rules:**
• **Always cite the source** of data
• **Provide context** — is this number big or small? Compare it
• **Use human language** — "One in five students" not "20% of the sample"
• **Show the trend** — is it going up, down, or steady?
• **Acknowledge limitations** — no dataset is perfect
• **Don't cherry-pick** — use data honestly

**Make numbers human:**
• "Ksh 38.7 billion" → "That's roughly Ksh 8,800 per resident"
• "A 15% increase" → "If you earned Ksh 100 last year, you'd earn Ksh 115 this year"`,
    example: null,
    triggerConditions: ["data_without_context", "unsourced_statistics"],
  },

  // ═══════════════════════════════════════════════════════
  // SENSITIVITY & ETHICS
  // ═══════════════════════════════════════════════════════

  sensitivity_victims: {
    id: "sensitivity_victims",
    title: "Reporting on Victims & Vulnerable People",
    category: "Ethics",
    icon: "🤝",
    content: `When reporting on vulnerable people (victims, children, people with mental illness, refugees), extra care is required.

**Principles:**
• **Do no harm** — will publication worsen their situation?
• **Informed consent** — do they understand what publication means?
• **Anonymity** — offer it and explain what it means
• **Dignity** — they are people, not props for your story
• **Agency** — let them tell their own story, don't speak for them
• **Follow-up** — consider the impact after publication

**Kenyan law:** Children's names and identities are protected. Sexual offence complainants cannot be named.

**Ask yourself:** If this were my family member, would I be comfortable with this coverage?`,
    example: null,
    triggerConditions: ["victim_identification_risk", "vulnerable_subjects"],
  },

  breaking_news_accuracy: {
    id: "breaking_news_accuracy",
    title: "Accuracy Under Pressure",
    category: "Ethics",
    icon: "⚡",
    content: `In breaking news, the pressure to publish fast is intense. But **accuracy always beats speed**.

**Rules:**
• Only publish what you have **confirmed from at least one reliable source**
• Label unconfirmed information clearly: "Reports suggest..." / "Unconfirmed reports..."
• **Update and correct** as new information emerges
• Don't speculate — say "It is not yet clear why..."
• Be cautious with casualty figures (they always change)

**The correction culture:** Making corrections is professional, not shameful. Refusing to correct is unprofessional.

**Remember:** One wrong fact in a breaking news story can follow you for your entire career.`,
    example: null,
    triggerConditions: ["unverified_breaking_claim"],
  },

  whistleblower_ethics: {
    id: "whistleblower_ethics",
    title: "Whistleblower Ethics",
    category: "Ethics",
    icon: "🔐",
    content: `Protecting sources — especially whistleblowers — is a fundamental journalistic obligation.

**Your duties:**
• **Never reveal** a confidential source without their consent
• Understand the **risks they face** (job loss, prosecution, harm)
• Use **secure communication** (encrypted messaging, not regular email)
• **Verify independently** — don't rely solely on the whistleblower
• **Document your promise** of confidentiality

**Legal reality in Kenya:**
• There is no shield law protecting journalists from revealing sources
• Courts can compel disclosure
• Weigh this risk honestly with your source before promising protection`,
    example: null,
    triggerConditions: [],
  },

  // ═══════════════════════════════════════════════════════
  // ADDITIONAL SPECIALISED LESSONS
  // ═══════════════════════════════════════════════════════

  sports_writing_tips: { id: "sports_writing_tips", title: "Sports Writing Tips", category: "Specialist", icon: "⚽",
    content: "Sports writing must balance excitement with accuracy. Lead with the result and significance, not chronology. Avoid clichés ('at the end of the day', 'game of two halves'). Include statistics but make them meaningful. Always get post-match reactions. Remember: sports writing is still journalism — accuracy, attribution, and fairness apply.",
    example: null, triggerConditions: [] },

  business_jargon: { id: "business_jargon", title: "Translating Business Jargon", category: "Specialist", icon: "💼",
    content: "Your readers are not economists. Translate jargon into plain language. 'Revenue' = money the company earned. 'EBITDA' = profit before various deductions. 'Year-on-year growth' = compared to the same period last year. Always explain acronyms on first use. Use analogies to make large numbers meaningful.",
    example: null, triggerConditions: ["business_jargon_detected"] },

  parliamentary_privilege: { id: "parliamentary_privilege", title: "Parliamentary Privilege", category: "Legal Reporting", icon: "🏛️",
    content: "Parliamentary privilege protects MPs from legal action for what they say in parliament. You can report these statements — but privilege does NOT extend to your reporting. If an MP makes a defamatory statement in parliament, you're protected only if your report is fair, accurate, and made without malice. Outside parliament, no privilege applies.",
    example: null, triggerConditions: [] },

  budget_reporting: { id: "budget_reporting", title: "Budget Reporting", category: "Specialist", icon: "📊",
    content: "Budget stories must compare this year to last year (nominal AND real terms, accounting for inflation). Show both revenue and expenditure sides. Break down allocations by sector. Explain what 'development' vs 'recurrent' spending means. Always get reactions from both government and opposition/civil society. Use per-capita figures to make numbers relatable.",
    example: null, triggerConditions: [] },

  document_analysis: { id: "document_analysis", title: "Document Analysis for Investigators", category: "Investigative", icon: "📄",
    content: "Every document tells a story — and hides others. Look for: inconsistencies between documents, missing signatures or dates, figures that don't add up, names that appear across multiple documents, timeline gaps. Cross-reference public records (company registrations, land records, court filings). Always get the original document, not a summary.",
    example: null, triggerConditions: [] },

  evidence_chains: { id: "evidence_chains", title: "Building Evidence Chains", category: "Investigative", icon: "🔗",
    content: "An evidence chain connects your claim to verifiable proof. For each key claim: What is the claim? → What document/source supports it? → Can it be independently verified? → What's the confidence level? A single source is a tip. Two sources are interesting. Three sources make a story. Every link must be documented in your verification table.",
    example: null, triggerConditions: [] },

  public_interest_defence: { id: "public_interest_defence", title: "The Public Interest Defence", category: "Investigative", icon: "⚖️",
    content: "When your investigation invades privacy or reveals confidential information, you need a public interest justification. Public interest includes: exposing crime, protecting public health/safety, preventing the public from being misled, exposing incompetence in public office. Private embarrassment or public curiosity is NOT public interest. Document your reasoning in an ethics memo.",
    example: null, triggerConditions: [] },

  methodology_transparency: { id: "methodology_transparency", title: "Methodology Transparency", category: "Digital Journalism", icon: "🔬",
    content: "When using data, be transparent about your methodology. Explain: Where the data came from, how it was collected, what analysis you performed, what the limitations are. Readers should be able to replicate your analysis. If your sample is small, say so. If the data has gaps, acknowledge them. Transparency builds trust.",
    example: null, triggerConditions: [] },

  obituary_conventions: { id: "obituary_conventions", title: "Obituary Conventions", category: "Specialist", icon: "🕊️",
    content: "Obituaries celebrate and record a life. Lead with the person's name, significance, and age. Focus on achievements and contributions, but be honest — don't fabricate virtues. Include tributes from multiple people. Verify all biographical facts (dates, titles, achievements). Be sensitive to the family's wishes. Include survivors and funeral arrangements if available.",
    example: null, triggerConditions: [] },

  // Editor-specific lessons
  editing_principles: { id: "editing_principles", title: "Editing Principles", category: "Editing", icon: "✏️",
    content: "Good editing improves without imposing. Preserve the writer's voice while fixing problems. Prioritise: 1) factual errors, 2) structural problems, 3) clarity issues, 4) style preferences. Always explain your changes. Ask questions rather than making assumptions. The best edits are invisible — the story reads better but still sounds like the writer.",
    example: null, triggerConditions: [] },

  structural_editing: { id: "structural_editing", title: "Structural Editing", category: "Editing", icon: "🏗️",
    content: "Structural editing examines the overall architecture. Does the lead work? Is the nut graf clear? Does the story flow logically? Are there sections that should be moved, combined, or cut? Is the ending satisfying? A good structural edit often involves reorganising paragraphs and identifying missing elements.",
    example: null, triggerConditions: [] },

  line_editing: { id: "line_editing", title: "Line Editing", category: "Editing", icon: "📝",
    content: "Line editing works sentence by sentence. Check for: clarity, conciseness, active voice, specific language, correct grammar, consistent style, smooth transitions. Cut unnecessary words. Replace vague language with specifics. Fix attribution errors. Ensure every sentence earns its place.",
    example: null, triggerConditions: [] },

  constructive_feedback: { id: "constructive_feedback", title: "Giving Constructive Feedback", category: "Editing", icon: "💡",
    content: "Good feedback is specific, actionable, and respectful. Instead of 'This doesn't work', say 'The lead buries the key figure — consider leading with the Ksh 38.7B allocation.' Always note what works well, not just problems. Frame suggestions as questions when possible: 'Would this read better if...?' Focus on the writing, not the writer.",
    example: null, triggerConditions: [] },

  // Visual / layout lessons
  layout_principles: { id: "layout_principles", title: "Magazine Layout Principles", category: "Visual", icon: "📐",
    content: "Good layout guides the eye. Use visual hierarchy: the most important element should be the largest/most prominent. Create entry points (headline, subhead, pull quote, image) that draw readers in. Use white space — don't crowd the page. Align elements on a grid. Contrast creates emphasis. Consistency creates professionalism.",
    example: null, triggerConditions: [] },

  caption_writing: { id: "caption_writing", title: "Writing Captions", category: "Visual", icon: "🖼️",
    content: "Captions are the most-read text on a page after headlines. Rules: 1) Identify everyone in the photo by name, 2) Explain what's happening (not just what you can see), 3) Add information not in the photo, 4) Use present tense for the action ('Prime Minister addresses...'), 5) Never state the obvious ('Pictured above is...'). A good caption tells a mini-story.",
    example: null, triggerConditions: [] },

  pull_quote_selection: { id: "pull_quote_selection", title: "Selecting Pull Quotes", category: "Visual", icon: "💬",
    content: "Pull quotes break up text and hook scanners into reading. Choose quotes that are: 1) Compelling or provocative, 2) Self-contained (make sense without context), 3) Representative of the story's key message, 4) Not the lead or most obvious quote. A pull quote should make a scanner think: 'I need to read this story.'",
    example: null, triggerConditions: [] },

  visual_hierarchy: { id: "visual_hierarchy", title: "Visual Hierarchy", category: "Visual", icon: "👁️",
    content: "Visual hierarchy controls what readers see first, second, and third. Create hierarchy with: Size (bigger = more important), Position (top-left in Western reading patterns), Contrast (bold against light, colour against grey), White space (isolation draws attention). Apply to: headlines > images > subheads > body text > captions.",
    example: null, triggerConditions: [] },

  // Additional micro-lessons
  headline_craft: { id: "headline_craft", title: "Headline Craft", category: "Editing", icon: "📰",
    content: "Headlines must be accurate, specific, and engaging. Use active verbs. Include the most newsworthy element. Avoid 'clickbait' that misleads. Types: statement ('Budget Rises 15%'), question ('Can Nairobi Afford Its Health Plans?'), label ('The Budget Battle'). For SEO: include key search terms. For print: make it fit the space. Always: tell the truth.",
    example: null, triggerConditions: [] },

  accuracy_in_display: { id: "accuracy_in_display", title: "Accuracy in Headlines & Captions", category: "Editing", icon: "✅",
    content: "Headlines and captions must be as accurate as the story. Common errors: oversimplifying complex stories, implying certainty where there is doubt, attributing quotes incorrectly, using misleading photos/captions. Every headline must be supportable by the story text. If the headline makes a stronger claim than the story, fix the headline.",
    example: null, triggerConditions: [] },

  podcast_storytelling: { id: "podcast_storytelling", title: "Podcast Storytelling", category: "Broadcast", icon: "🎧",
    content: "Podcast listeners are usually multitasking. Keep them hooked with: a strong cold open (tease the most compelling moment), clear signposting ('Coming up...'), varied pacing (alternate narration, interview, ambient sound), personality (podcasts are intimate — be yourself). Structure: hook → context → story → analysis → conclusion. Keep episodes focused on one topic.",
    example: null, triggerConditions: [] },

  live_blog_tips: { id: "live_blog_tips", title: "Live Blogging Tips", category: "Digital Journalism", icon: "⚡",
    content: "Live blogs require speed AND accuracy. Rules: timestamp every entry, source every claim, clearly mark unconfirmed reports, correct errors visibly (don't silently edit), pin the most important update at top, include a summary box for new readers, update regularly (even if just to say 'No new developments'). Balance: fast enough to be useful, careful enough to be trusted.",
    example: null, triggerConditions: [] },

  mojo_techniques: { id: "mojo_techniques", title: "Mobile Journalism (MoJo)", category: "Digital Journalism", icon: "📱",
    content: "MoJo = telling stories with what's in your pocket. Tips: hold phone horizontal for video, use a lapel mic for better audio, shoot stable (use both hands or lean against something), plan your shots before shooting, get B-roll (establishing shots, close-ups, details), interview in quiet locations, keep videos short (60-90 seconds for social, 2-3 minutes for web).",
    example: null, triggerConditions: [] },

  // Additional lessons
  backgrounder_structure: { id: "backgrounder_structure", title: "Backgrounder Structure", category: "PR Writing", icon: "📋",
    content: "A backgrounder provides depth and context. Structure: Overview (1-2 paragraphs summarising the key message), History (chronological development), Current Situation (what's happening now), Key Facts and Figures (specific, verifiable data), Future Outlook (what's planned), Contact Information. Keep it factual and well-sourced — journalists will check.",
    example: null, triggerConditions: [] },

  fact_sheet_design: { id: "fact_sheet_design", title: "Fact Sheet Design", category: "PR Writing", icon: "📊",
    content: "A fact sheet must be scannable. Use: bullet points (not paragraphs), bold for key figures, clear headings, consistent formatting. Every fact must be current and verifiable. Include: organisation name, date, key statistics, timeline if relevant, contact information. Fit on one page. If it takes more than 30 seconds to find a fact, redesign it.",
    example: null, triggerConditions: [] },

  newsletter_best_practices: { id: "newsletter_best_practices", title: "Newsletter Best Practices", category: "PR Writing", icon: "📧",
    content: "Good newsletters respect the reader's inbox. Rules: subject line under 50 characters, most important content first, one clear CTA (call to action) per section, keep paragraphs short (2-3 sentences), use subheads for scanning, include visual breaks, always provide an unsubscribe option. The tone should be conversational but professional.",
    example: null, triggerConditions: [] },

  audience_analysis: { id: "audience_analysis", title: "Know Your Audience", category: "PR Writing", icon: "👥",
    content: "Before writing, ask: Who is reading this? What do they already know? What do they need to know? What do they care about? What action do you want them to take? Write for THEIR interests, not yours. Use language they understand. Answer questions they would ask. Meet them where they are.",
    example: null, triggerConditions: [] },

  web_writing_principles: { id: "web_writing_principles", title: "Web Writing Principles", category: "PR Writing", icon: "🌐",
    content: "People scan web pages, they don't read them. Write for scanning: use descriptive subheadings, short paragraphs (2-3 sentences), bullet points for lists, bold key phrases, frontload each paragraph with the key point, use hyperlinks instead of long explanations. SEO basics: include keywords naturally, write clear meta descriptions, use descriptive URL slugs.",
    example: null, triggerConditions: [] },

  pitch_letter_tips: { id: "pitch_letter_tips", title: "Writing Effective Media Pitches", category: "PR Writing", icon: "✉️",
    content: "Journalists get hundreds of pitches. Yours must stand out. Rules: personalise (show you know their beat), lead with the news angle (not your client's importance), be concise (under 200 words), offer something specific (interview, data, exclusive), make it easy to say yes. Never attach press releases unsolicited. Follow up once, not five times.",
    example: null, triggerConditions: [] },

  review_writing_tips: { id: "review_writing_tips", title: "Writing Good Reviews", category: "Opinion Writing", icon: "⭐",
    content: "A review evaluates — it doesn't just describe. State your criteria upfront. Provide specific evidence for every judgment. Be fair — acknowledge strengths even in work you dislike. Distinguish between personal taste and quality. Avoid spoilers (or warn clearly). Remember: a negative review should help the creator improve; a positive review should help readers decide.",
    example: null, triggerConditions: [] },

  criteria_based_evaluation: { id: "criteria_based_evaluation", title: "Criteria-Based Evaluation", category: "Opinion Writing", icon: "📏",
    content: "Reviews are strongest when they evaluate against clear criteria. For films: storytelling, performances, cinematography, pacing, originality. For books: prose quality, character development, plot, themes, originality. For events: organisation, content quality, value for money, accessibility. State your criteria, then evaluate each one with specific evidence.",
    example: null, triggerConditions: [] },

  spoiler_ethics: { id: "spoiler_ethics", title: "Spoiler Ethics", category: "Opinion Writing", icon: "⚠️",
    content: "Spoiler policy: warn clearly before revealing plot points. For breaking books/films, avoid major spoilers entirely. For older works, use judgment. The purpose of a review is to help people decide whether to engage — you can do that without ruining the experience.",
    example: null, triggerConditions: [] },

  disclosure_transparency: { id: "disclosure_transparency", title: "Disclosure & Transparency", category: "Ethics", icon: "📢",
    content: "Transparency is the foundation of trust. Always disclose: how you obtained access (invited, paid, public), any freebies or sponsorship, personal connections to the subject, your potential biases or conflicts of interest. Readers can adjust their reading based on your disclosures. Hidden conflicts destroy credibility.",
    example: null, triggerConditions: [] },

  // ═══════════════════════════════════════════════════════
  // NEW LESSONS — Syllabus-Required Additions
  // ═══════════════════════════════════════════════════════

  audience_targeting: {
    id: "audience_targeting",
    title: "Audience Targeting Panel",
    category: "PR Writing",
    icon: "🎯",
    content: `Before writing any PR material, complete the audience targeting panel:

**1. Who is the primary audience?**
• Define demographics (age, location, profession)
• Define psychographics (values, interests, media habits)

**2. What do they already know?**
• Don't repeat what they know — add value

**3. What do they need to know?**
• Key message (ONE sentence)
• Supporting messages (3 max)

**4. What channel reaches them?**
• Print, web, social, broadcast, email?
• Which specific outlet/platform?

**5. What action do you want them to take?**
• Be specific: attend, donate, share, sign up, change behaviour

**The golden rule:** Write for THEIR interests, not yours. If you can't answer "why should they care?", rethink your angle.`,
    example: {
      bad: "Audience: the general public. Message: our company is great.",
      good: "Audience: Nairobi parents aged 25-40 who use WhatsApp. Message: Free immunisation clinic at Kenyatta National Hospital every Saturday in July. CTA: Share this post with your parenting groups.",
      why: "Specific audience, specific message, specific channel, specific action.",
    },
    triggerConditions: ["no_audience_defined", "generic_messaging"],
  },

  concision_coach: {
    id: "concision_coach",
    title: "Concision Coach",
    category: "Style & Language",
    icon: "✂️",
    content: `Every word must earn its place. If you can cut it without losing meaning, cut it.

**The Concision Test:**
Read each sentence. Ask: "Can I say this in fewer words?"

**Common cuts:**
• "It is important to note that" → delete entirely
• "In order to" → "To"
• "At the present time" → "Now"
• "The fact that" → delete and restructure
• "In the event that" → "If"
• "A total of 15 people" → "15 people"
• "Absolutely essential" → "Essential"
• "Basic fundamentals" → "Fundamentals"
• "Completely unanimous" → "Unanimous"
• "Currently existing" → "Current" or "Existing"

**The 10% rule:** After your first draft, try to cut 10% of the word count. Your story will almost always be better.

**Adverb audit:** Circle every adverb. Delete any that don't change the meaning. "She ran quickly" → "She sprinted."`,
    example: {
      bad: "Due to the fact that there was a very significant increase in the number of cases, the government decided to implement a comprehensive set of measures.",
      good: "Cases surged, so the government imposed new measures.",
      why: "28 words → 9 words. Same meaning. More impact.",
    },
    triggerConditions: ["wordy_phrases", "unnecessary_adverbs", "redundant_modifiers"],
  },

  cliche_jargon_detector: {
    id: "cliche_jargon_detector",
    title: "Cliché & Jargon Detector",
    category: "Style & Language",
    icon: "🚨",
    content: `Clichés signal lazy thinking. Jargon excludes your audience. Both kill good writing.

**Common journalism clichés to eliminate:**
• "At the end of the day" — say what actually happens
• "Going forward" — just delete it
• "A step in the right direction" — say what the step actually is
• "Remains to be seen" — say what the unknowns are
• "Stakeholders" — name the actual people/groups
• "Level playing field" — explain the actual inequality
• "Think outside the box" — describe the actual innovation
• "Game-changer" — explain what actually changed

**Jargon translation rules:**
• "Synergies" → "working together" or "combined benefits"
• "Leveraging" → "using"
• "Paradigm shift" → explain what actually changed
• "Robust" → "strong" or be specific about what's strong
• "Unprecedented" — almost nothing is truly unprecedented; be specific

**The reader test:** Would your grandmother understand this sentence? If not, translate it.

**Exception:** Technical terms are acceptable when writing FOR a specialist audience. But always explain on first use when writing for a general audience.`,
    example: {
      bad: "Stakeholders are leveraging synergies to create a paradigm shift going forward.",
      good: "University administrators and student leaders are combining their lobbying efforts to change the funding formula next year.",
      why: "The good version tells you who, what they're doing, and when. The bad version says nothing.",
    },
    triggerConditions: ["cliche_detected", "jargon_detected", "buzzword_detected"],
  },

  scene_builder_prompts: {
    id: "scene_builder_prompts",
    title: "Scene-Builder Prompts",
    category: "Feature Writing",
    icon: "🎬",
    content: `Use these prompts to build vivid scenes for your feature openings. Answer each one with specific, concrete detail.

**The Five-Sense Inventory:**
1. What can you **see**? (colours, shapes, movement, light)
2. What can you **hear**? (voices, machines, silence, music)
3. What can you **smell**? (food, chemicals, earth, perfume)
4. What can you **feel**? (temperature, texture, moisture, pain)
5. What can you **taste**? (only if relevant — food, dust, blood)

**The Character Snapshot:**
• What is your subject doing RIGHT NOW? (action, not state)
• What are they wearing? (one specific detail, not a catalogue)
• What habit or tic do you notice? (drumming fingers, checking phone, adjusting glasses)
• What's their voice like? (pace, volume, accent, hesitations)

**The Setting Card:**
• Time of day + weather/light
• One specific object that tells a story about this place
• What's the most surprising thing about this location?
• What don't you expect to see here?

**The Transition Bridge:**
After your scene, write one sentence that moves from this specific moment to the bigger story:
"This scene plays out daily in..." or "But behind this [description] lies..."`,
    example: null,
    triggerConditions: ["no_scene_setting", "weak_opening", "tell_not_show"],
  },

  review_criteria_methods: {
    id: "review_criteria_methods",
    title: "Review Criteria & Methods",
    category: "Opinion Writing",
    icon: "📏",
    content: `Strong reviews evaluate against explicit criteria. Weak reviews are just "I liked it / I didn't."

**Setting your criteria (before you review):**

**For film:**
• Storytelling (plot structure, pacing, coherence)
• Performances (acting quality, casting, character depth)
• Technical craft (cinematography, sound, editing)
• Originality (fresh ideas, avoidance of formula)
• Emotional impact (does it make you feel something?)

**For books:**
• Prose quality (style, voice, readability)
• Character development (depth, believability, growth)
• Plot/structure (pacing, surprises, resolution)
• Themes (depth, relevance, originality)
• Overall contribution (to genre, to literature, to reader)

**For music:**
• Musical composition (melody, harmony, arrangement)
• Performance quality (vocals, instrumentation, production)
• Lyrics (meaning, poetry, emotional resonance)
• Originality (within the genre, pushing boundaries)
• Overall experience (replay value, emotional journey)

**For restaurants:**
• Food quality (flavour, freshness, presentation)
• Service (attentiveness, knowledge, pace)
• Ambience (decor, noise level, comfort)
• Value for money (portion size, pricing, quality ratio)
• Overall experience (would you return? would you recommend?)

**For events:**
• Content quality (speakers, performances, information)
• Organisation (logistics, timing, communication)
• Engagement (audience interaction, energy, atmosphere)
• Value (ticket price vs. experience delivered)
• Accessibility (venue, inclusivity, accommodations)

**The fairness rule:** Apply the same criteria consistently. Don't judge a budget restaurant by Michelin standards or a student film by Hollywood standards. State your criteria upfront.`,
    example: null,
    triggerConditions: ["no_criteria_stated", "inconsistent_evaluation"],
  },

  opinion_fact_labelling: {
    id: "opinion_fact_labelling",
    title: "Opinion/Fact Labelling",
    category: "Opinion Writing",
    icon: "🏷️",
    content: `In editorial writing, you must clearly distinguish between facts and opinions. Use this labelling system:

**[FACT]** — A verifiable claim. Can be proved true or false.
• "The budget allocates Ksh 12.1 billion to health." [FACT]
• "Inflation rose 5.2% in the last quarter." [FACT]

**[OPINION]** — A value judgment or interpretation. Cannot be objectively verified.
• "The government should allocate more to health." [OPINION]
• "This budget is a betrayal of public trust." [OPINION]

**[ANALYSIS]** — An interpretation of facts. Based on evidence but involves judgment.
• "The health allocation may not keep pace with inflation." [ANALYSIS]
• "This represents a shift in government priorities." [ANALYSIS]

**Rules:**
• Every factual claim in your editorial must be verifiable
• Opinions must be clearly signalled ("I believe", "This editorial argues", "We contend")
• Analysis should show your working (which facts lead to this interpretation?)
• Never present opinion as fact or fact as opinion

**Why this matters:**
Readers trust editorials that are honest about what's fact and what's opinion. Blurring the line is how propaganda works.`,
    example: {
      bad: "The budget is a disaster that nobody supports.",
      good: "The budget allocates Ksh 12.1B to health [FACT], a 15% increase [FACT]. However, this editorial argues that this is insufficient [OPINION] given that 60% covers inflation [ANALYSIS based on Treasury data].",
      why: "The good version shows the reader which claims are verifiable and which are the writer's judgment.",
    },
    triggerConditions: ["opinion_disguised_as_fact", "unlabelled_claims"],
  },
}

export function getMicroLesson(id) {
  return microLessons[id] || null
}

export function getMicroLessonsForTemplate(templateId, storyTemplates) {
  const template = storyTemplates[templateId]
  if (!template) return []
  return (template.microLessonIds || []).map((id) => microLessons[id]).filter(Boolean)
}

export const microLessonIds = Object.keys(microLessons)
