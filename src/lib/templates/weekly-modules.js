// ─── NewsroomLab AI — 10-Week Course Module Templates ─────────────
// Each course has exactly 10 weeks with videos, notes, and assignments
// Assignments contribute to CA (30/100), Exam = 70/100

export const weeklyModules = {
  // ═══════════════════════════════════════════════════════════════════
  // HCC 109 — Writing for Mass Media (10 weeks)
  // ═══════════════════════════════════════════════════════════════════
  HCC109: {
    courseCode: "HCC 109",
    courseTitle: "Writing for Mass Media",
    weeks: [
      {
        week: 1,
        title: "Introduction to Media Writing",
        overview: "News values, writing basics, clarity and accuracy across platforms.",
        video: { title: "Introduction to Media Writing", placeholder: true },
        notes: `
# Week 1: Introduction to Media Writing

## Learning Objectives
- Understand news values and what makes a story newsworthy
- Master the fundamentals of clear, accurate writing
- Recognize different media platforms and their requirements

## Key Concepts

### News Values (TIPCUP)
- **T**imeliness – Is it happening now?
- **I**mpact – How many people does it affect?
- **P**roximity – Is it close to your audience?
- **C**onflict – Is there tension or disagreement?
- **U**nusualness – Is it out of the ordinary?
- **P**rominence – Are important people involved?

### Writing Fundamentals
1. **Accuracy** – Get facts right, verify everything
2. **Clarity** – Write to be understood, avoid jargon
3. **Brevity** – Use as few words as needed
4. **Active voice** – Subject does the action

## Practical Exercise
Analyze how the same story appears in:
- A newspaper
- A broadcast script
- A press release
- A digital article

Note the differences in style, length, and approach.
        `,
        assignment: {
          title: "News Brief",
          brief: "Write a 250-word news brief about a simple campus event. Focus on accuracy, the 5Ws+H, and clear attribution.",
          storyType: "HARD_NEWS",
          wordCountMin: 200,
          wordCountMax: 300,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 2,
        title: "Leads & the Inverted Pyramid",
        overview: "Master the lead, attribution, and inverted pyramid structure.",
        video: { title: "Writing Effective Leads", placeholder: true },
        notes: `
# Week 2: Leads & the Inverted Pyramid

## Learning Objectives
- Write compelling, accurate leads
- Structure stories using the inverted pyramid
- Apply proper attribution

## The Lead (First Paragraph)

The lead is the most important sentence in your story. It must:
- Answer the most newsworthy W (usually Who or What)
- Hook the reader immediately
- Be 25-35 words maximum
- Use active voice

### Lead Types
1. **Summary lead** – Standard hard news, covers 5Ws
2. **Delayed lead** – Feature style, sets scene first
3. **Anecdotal lead** – Starts with a character/moment

## The Inverted Pyramid

Most important information first, decreasing in importance:

\`\`\`
   ▲ LEAD (Most important)
  ▲▲▲ Key details
 ▲▲▲▲▲ Supporting info
▲▲▲▲▲▲▲ Background/context
\`\`\`

This structure allows:
- Readers to get essentials quickly
- Editors to cut from the bottom
- Digital readers to scan

## Attribution Rules
- Always attribute claims and opinions
- Use "said" – it's invisible
- Attribution goes after the quote or fact
- "According to" for documents, "said" for people
        `,
        assignment: {
          title: "Hard News Story",
          brief: "Write a hard news story of 450-600 words using proper inverted pyramid structure. Include at least 3 sources with clear attribution.",
          storyType: "HARD_NEWS",
          wordCountMin: 450,
          wordCountMax: 600,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 3,
        title: "Press Releases",
        overview: "PR basics, structure, boilerplate, and the journalist test.",
        video: { title: "Writing Effective Press Releases", placeholder: true },
        notes: `
# Week 3: Press Releases

## Learning Objectives
- Understand PR writing vs journalism
- Write press releases that pass the journalist test
- Structure releases professionally

## Press Release Anatomy

### 1. Headline
- Clear, factual, no hype
- Max 10 words

### 2. Dateline
\`NAIROBI, March 8, 2026 —\`

### 3. Lead Paragraph
- Who, what, when, where, why
- Newsworthy angle first

### 4. Body Paragraphs
- Quote from spokesperson (2nd or 3rd paragraph)
- Supporting details
- Additional quotes
- Background/context

### 5. Boilerplate
- Standard "About [Organization]" paragraph
- 50-100 words, factual

### 6. Contact Information
- Media contact name, phone, email

## The Journalist Test
Would a journalist use this? Ask:
- Is there real news value?
- Are claims verifiable?
- Is it free of marketing speak?
- Does it answer journalist questions?

## Common Mistakes
- Excessive adjectives ("exciting," "revolutionary")
- Buried lead (news hidden in paragraph 3)
- Missing quotes
- Unverifiable claims
        `,
        assignment: {
          title: "Press Release + Media Advisory",
          brief: "Write a complete press release (400-500 words) for an upcoming campus event, plus a one-page media advisory. Include headline, dateline, lead, quotes, boilerplate, and contact info.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 4,
        title: "Broadcast Writing",
        overview: "Writing to be heard: scripting basics, VO cues, timing.",
        video: { title: "Writing for the Ear", placeholder: true },
        notes: `
# Week 4: Broadcast Writing

## Learning Objectives
- Write conversational copy for radio/TV
- Understand timing and pacing
- Format broadcast scripts correctly

## Write to Be Heard

Broadcast writing is different from print:

| Print | Broadcast |
|-------|-----------|
| Complex sentences | Short sentences |
| Past tense | Present tense |
| Passive OK | Active only |
| Formal style | Conversational |
| Long quotes | Paraphrased |

## Key Principles

### 1. Keep It Short
- Sentences: 15-20 words max
- Stories: 20-30 seconds (60-90 words)

### 2. Use Present Tense
- "The president SAYS" not "said"
- Creates immediacy

### 3. Write for the Ear
- Use contractions (it's, they're)
- Avoid numbers (say "about a thousand")
- Round numbers, simplify
- Spell out pronunciations

### 4. Read Aloud
If you stumble, rewrite.

## Script Formatting

\`\`\`
SLUG: BUDGET RELEASE
DATE: 08/03/26
DURATION: :30

ANCHOR (VO):
The county government has released its new
budget... allocating two billion shillings to
healthcare.

Governor Ochieng calls it a historic investment.

(SOT - Governor - :10)
"This budget puts people first..."

ANCHOR (TAG):
The county assembly votes on the budget next week.
\`\`\`
        `,
        assignment: {
          title: "Radio Script (VO)",
          brief: "Write a 60-90 second radio script (voiceover with cues) on a news topic. Include proper formatting, timing marks, and pronunciation guides.",
          storyType: "BROADCAST_VO",
          wordCountMin: 150,
          wordCountMax: 250,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 5,
        title: "Feature Writing Basics",
        overview: "Nut graf, scenes, human angle, and narrative structure.",
        video: { title: "The Art of Feature Writing", placeholder: true },
        notes: `
# Week 5: Feature Writing Basics

## Learning Objectives
- Write scene-setting leads
- Place and craft the nut graf
- Structure features for narrative flow

## Feature vs Hard News

| Hard News | Feature |
|-----------|---------|
| Inverted pyramid | Narrative structure |
| Summary lead | Scene-setting lead |
| Facts first | Story first |
| Who/what/when | Why/how |
| Objective tone | Voice allowed |

## The Scene-Setting Lead

Show, don't tell. Put the reader in the moment:

❌ "Mary Wanjiku is a market vendor who struggles financially."

✅ "Mary Wanjiku arrives at Gikomba market at 4 a.m., arranging tomatoes by the light of a kerosene lamp. Today, like every day, she hopes to sell enough to pay her daughter's school fees."

## The Nut Graf

The nut graf tells readers WHY this story matters. It:
- Comes after the scene-setting lead (paragraph 2-4)
- States the broader significance
- Bridges the anecdote to the news value

### Example:
[Scene lead about Mary]
**Nut graf:** "Mary is one of 50,000 informal traders whose livelihoods hang in the balance as Nairobi County plans to 'modernize' the city's markets."

## Feature Structure

1. **Scene-setting lead** (1-3 paragraphs)
2. **Nut graf** (the "so what")
3. **Background/context**
4. **Development** (alternating scenes and analysis)
5. **Kicker** (memorable ending, often returns to opening)
        `,
        assignment: {
          title: "Short Feature Story",
          brief: "Write a feature story (700-900 words) with a scene-setting lead and clear nut graf. Focus on one person's story that illustrates a larger issue.",
          storyType: "FEATURE",
          wordCountMin: 700,
          wordCountMax: 900,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 6,
        title: "Opinion & Editorials",
        overview: "Argument structure, evidence, fairness, and editorial voice.",
        video: { title: "Writing Persuasive Opinions", placeholder: true },
        notes: `
# Week 6: Opinion & Editorials

## Learning Objectives
- Structure persuasive arguments
- Support opinions with evidence
- Address counterarguments fairly

## Opinion vs Reporting

Opinion writing is different from news:
- You state your position clearly
- You use evidence to persuade
- You acknowledge opposing views
- You use "I" or institutional voice

BUT you still must:
- Be accurate with facts
- Be fair to opposing views
- Disclose conflicts of interest

## Editorial Structure

### 1. Hook + Thesis (Opening)
State your position clearly in the first 2 paragraphs.

### 2. Evidence (Body)
- Provide facts, data, expert views
- Use specific examples
- Build your case logically

### 3. Counterargument
- Acknowledge the strongest opposing view
- Explain why your position is still correct
- This shows intellectual honesty

### 4. Conclusion
- Restate your position
- Call to action (what should happen?)
- Memorable closing line

## Evidence Requirements

Every claim needs support:
- Statistics from credible sources
- Expert opinions
- Real examples
- Historical context

Label clearly: "In my view..." "The data shows..."
        `,
        assignment: {
          title: "Opinion/Editorial Piece",
          brief: "Write an op-ed (600-800 words) on a current issue. Include a clear thesis, evidence, counterargument, and call to action. Submit an evidence log listing your sources.",
          storyType: "EDITORIAL",
          wordCountMin: 600,
          wordCountMax: 800,
          sourcesRequired: 4,
          maxMarks: 10,
        },
      },
      {
        week: 7,
        title: "Digital/Interactive Writing",
        overview: "Web style, scannability, SEO basics, headlines and captions.",
        video: { title: "Writing for the Web", placeholder: true },
        notes: `
# Week 7: Digital/Interactive Writing

## Learning Objectives
- Adapt writing for web audiences
- Structure content for scannability
- Write effective headlines and captions

## Web Reading Behavior

Online readers:
- Scan, don't read word-by-word
- Spend 10-20 seconds deciding to stay
- Look for key information quickly
- Use multiple devices

## Web Writing Principles

### 1. Front-Load Information
Put the most important information first — in the headline, first sentence, and first paragraph.

### 2. Make It Scannable
- Short paragraphs (2-3 sentences)
- Subheadings every 2-3 paragraphs
- Bullet points for lists
- Bold key terms

### 3. Use Hyperlinks
- Link to sources
- Link to background
- Use descriptive link text ("Read the full report" not "click here")

## Headline Writing

Web headlines must:
- Work standalone (shared on social)
- Include keywords (SEO)
- Be accurate and clear
- Fit in 60-70 characters

### Headline Types
- **SEO headline**: Includes keywords, descriptive
- **Social headline**: Emotional hook, curiosity
- **Breaking news**: Factual, urgent

## Caption Writing
- Caption every image
- Don't repeat what's obvious
- Add context the photo can't show
- Use present tense
        `,
        assignment: {
          title: "Web Rewrite + Headlines & Captions",
          brief: "Rewrite your Week 2 hard news story for web format. Include: 3 headline versions, subheadings, scannable formatting, and captions for 2 images.",
          storyType: "ONLINE_UPDATE",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 8,
        title: "Editing & Copyediting",
        overview: "Editing scripts, copyediting fundamentals, edit memos.",
        video: { title: "The Art of Editing", placeholder: true },
        notes: `
# Week 8: Editing & Copyediting

## Learning Objectives
- Identify common writing errors
- Apply copyediting techniques
- Write professional edit memos

## Types of Editing

### 1. Structural Editing
- Is the story organized logically?
- Does the lead work?
- Is there a nut graf?
- Does the ending satisfy?

### 2. Line Editing
- Sentence flow and rhythm
- Word choice
- Transitions
- Voice consistency

### 3. Copyediting
- Grammar and punctuation
- Spelling
- Style guide compliance
- Fact-checking names/numbers

## Common Errors to Catch

### Grammar
- Subject-verb agreement
- Pronoun reference
- Tense consistency
- Dangling modifiers

### Style
- AP style numbers (spell out 1-9)
- Titles and honorifics
- Abbreviations
- Capitalization

### Accuracy
- Names spelled correctly
- Titles accurate
- Numbers add up
- Quotes accurate

## The Edit Memo

When editing another writer's work, write an edit memo:

1. **Summary**: Overall assessment (2-3 sentences)
2. **Strengths**: What works well
3. **Areas for improvement**: Specific issues
4. **Suggested changes**: Concrete fixes
5. **Questions**: Clarifications needed
        `,
        assignment: {
          title: "Edit Exercise + Edit Memo",
          brief: "Edit a provided draft story, making corrections and improvements. Submit the edited version plus a 300-word edit memo explaining your changes.",
          storyType: "HARD_NEWS",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
      {
        week: 9,
        title: "Ethics & Law in Media Writing",
        overview: "Defamation, privacy, minors, and ethical decision-making.",
        video: { title: "Legal and Ethical Considerations", placeholder: true },
        notes: `
# Week 9: Ethics & Law in Media Writing

## Learning Objectives
- Understand defamation and its defenses
- Apply privacy principles
- Protect minors in reporting
- Make ethical decisions

## Defamation

Defamation is a false statement that harms someone's reputation.

### Elements (all must be present):
1. A false statement
2. Published to a third party
3. Identifies the person
4. Causes damage to reputation

### Defenses:
- **Truth**: The most powerful defense
- **Fair comment**: Opinion on matters of public interest
- **Privilege**: Reporting court/parliament proceedings

## Privacy Considerations

### Private vs Public
- Public figures have less privacy protection
- Private citizens deserve more protection
- Location matters: public vs private spaces

### When to Protect Privacy
- Private grief
- Medical information
- Sexual orientation (unless relevant)
- Home address/contact details

## Reporting on Minors

Special protections for children:
- Never identify sexual abuse victims
- Obtain parental consent for interviews
- Consider long-term impact
- Use extra caution with vulnerable youth

## Ethics Memo

When covering sensitive stories, write an ethics memo:
1. What ethical issues exist?
2. What harm could result?
3. What is the public interest?
4. What safeguards are you applying?
        `,
        assignment: {
          title: "Ethics Memo + Revised Draft",
          brief: "Review a provided sensitive story scenario. Write a 400-word ethics memo identifying issues and safeguards, then write a 400-word draft that addresses the concerns.",
          storyType: "HARD_NEWS",
          wordCountMin: 700,
          wordCountMax: 900,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 10,
        title: "Portfolio Curation & Reflection",
        overview: "Final portfolio selection, reflection on growth, CA wrap-up.",
        video: { title: "Building Your Professional Portfolio", placeholder: true },
        notes: `
# Week 10: Portfolio Curation & Reflection

## Learning Objectives
- Select your strongest work
- Write reflective analysis
- Present work professionally

## Portfolio Assembly

### Selecting Your Best Work
Choose 4-5 pieces that demonstrate:
- Range (different formats/story types)
- Growth (compare early to late work)
- Skill (your strongest execution)
- Interest (topics you want to pursue)

### For Each Piece, Include:
1. The final polished version
2. Brief context (50 words): assignment, challenges, what you learned
3. Verification table (for news pieces)

## Reflection Writing

Your final reflection should address:

### 1. Technical Growth
- What writing skills improved most?
- What feedback was most valuable?
- What challenges did you overcome?

### 2. Professional Development
- How has your understanding of media changed?
- What ethical principles will guide you?
- What kind of journalist do you want to be?

### 3. Looking Forward
- What areas need more development?
- What topics interest you?
- What's your next step?

## CA Summary

Your Continuous Assessment (30% of total) includes:
- Weekly assignments
- Participation
- Portfolio quality
- Reflection depth

The remaining 70% comes from the final exam.
        `,
        assignment: {
          title: "Final Portfolio + Reflection",
          brief: "Submit your curated portfolio of 4-5 best pieces with context notes, plus a 500-word reflective essay on your growth as a writer this semester.",
          storyType: "FEATURE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // HCC 205 — Media Writing and Reporting (10 weeks)
  // ═══════════════════════════════════════════════════════════════════
  HCC205: {
    courseCode: "HCC 205",
    courseTitle: "Media Writing and Reporting",
    weeks: [
      {
        week: 1,
        title: "Ethics & Law + Reporting Mindset",
        overview: "Verification discipline, ethical frameworks, and the reporter's mindset.",
        video: { title: "The Verification Mindset", placeholder: true },
        notes: `
# Week 1: Ethics, Law & the Reporting Mindset

## Learning Objectives
- Understand verification as core discipline
- Apply ethical frameworks to reporting decisions
- Develop the reporter's mindset

## The Verification Discipline

Verification is not optional — it's the foundation of journalism.

### The Verification Table
For every claim in your story:
| Claim | Source | Evidence | Confidence |
|-------|--------|----------|------------|
| [Statement] | [Who said it] | [How verified] | High/Med/Low |

### Confidence Levels
- **High**: Two independent sources, documentary evidence
- **Medium**: One credible source, plausible context
- **Low**: Single source, unverified (flag or don't publish)

## Ethical Frameworks

### 1. Seek Truth & Report It
- Verify before publishing
- Be transparent about sources
- Correct errors promptly

### 2. Minimize Harm
- Consider impact on subjects
- Show compassion
- Weigh public interest vs private harm

### 3. Act Independently
- Avoid conflicts of interest
- Resist pressure from sources
- Disclose unavoidable conflicts

### 4. Be Accountable
- Explain your methods
- Respond to criticism
- Acknowledge mistakes
        `,
        assignment: {
          title: "Source Map + Reporting Plan",
          brief: "Choose a local issue and create: 1) A source map (10+ potential sources categorized by type), 2) A reporting plan (key questions, documents needed, timeline).",
          storyType: "HARD_NEWS",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 10,
          maxMarks: 10,
        },
      },
      {
        week: 2,
        title: "Finding Stories & Pitching",
        overview: "Beat development, spot news, and story pitching.",
        video: { title: "Finding Stories That Matter", placeholder: true },
        notes: `
# Week 2: Finding Stories & Pitching

## Learning Objectives
- Develop a beat and find stories
- Recognize different story opportunities
- Pitch stories effectively

## Finding Stories

### Beat Development
A beat is your area of expertise:
- Build source networks
- Monitor institutions
- Track patterns and trends
- Read widely

### Story Sources
1. **Documents**: Budgets, reports, court records
2. **Meetings**: Public hearings, board meetings
3. **People**: Whistleblowers, experts, affected communities
4. **Data**: Statistics, databases, FOIA requests
5. **Social media**: Trends, breaking news, sources

## The Pitch

A pitch sells your story idea to an editor.

### Pitch Structure (1 page max)
1. **Headline**: Working title
2. **Lead**: Your opening paragraph
3. **Nut graf**: Why this matters now
4. **Key sources**: Who you'll interview
5. **Evidence**: What documents/data support this
6. **Timeline**: When you'll deliver
7. **Format**: Length, multimedia elements

### What Editors Want
- News value (why now?)
- Feasibility (can you deliver?)
- Uniqueness (why us?)
- Impact (who cares?)
        `,
        assignment: {
          title: "3 Pitches + 1 Approved Plan",
          brief: "Submit 3 story pitches (one page each). After feedback, develop the strongest into a full reporting plan with source list, key questions, and timeline.",
          storyType: "HARD_NEWS",
          wordCountMin: 500,
          wordCountMax: 800,
          sourcesRequired: 5,
          maxMarks: 10,
        },
      },
      {
        week: 3,
        title: "Interviewing & Sourcing",
        overview: "Advanced interviewing, note-taking, and sourcing rules.",
        video: { title: "The Art of the Interview", placeholder: true },
        notes: `
# Week 3: Interviewing & Sourcing

## Learning Objectives
- Conduct effective interviews
- Take usable notes
- Apply sourcing rules

## Interview Preparation

### Before the Interview
1. Research the person thoroughly
2. Prepare 10-15 questions
3. Know what you need (quotes, facts, color)
4. Test your recording equipment

### Question Types
- **Open-ended**: "Tell me about..." (gets stories)
- **Follow-up**: "What do you mean by...?" (gets detail)
- **Closed**: "Did you...?" (gets confirmation)
- **Tough**: Save for later in interview

## During the Interview

### Best Practices
- Listen more than you talk
- Let silences happen
- Take notes even if recording
- Note observations (setting, behavior)

### Getting Good Quotes
- Ask them to explain simply
- Ask "What was that like?"
- Ask them to repeat if unclear
- Verify spelling of names

## Sourcing Rules

### Attribution Levels
1. **On the record**: Name and title used
2. **On background**: Information used, source described
3. **Off the record**: Cannot use at all
4. **Deep background**: Information only, no attribution

### The Default
Unless agreed otherwise, everything is ON THE RECORD.
        `,
        assignment: {
          title: "Interview-Based Story",
          brief: "Write a 600-800 word story based on original interviews with at least 2 sources. Include a verification table and your interview notes.",
          storyType: "HARD_NEWS",
          wordCountMin: 600,
          wordCountMax: 800,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 4,
        title: "Live Reporting & Updates",
        overview: "Covering planned events, live reporting basics, rolling updates.",
        video: { title: "Live and Developing News", placeholder: true },
        notes: `
# Week 4: Live Reporting & Updates

## Learning Objectives
- Cover planned events effectively
- Write rolling updates
- Distinguish confirmed from unconfirmed

## Live Reporting Mindset

Live reporting requires:
- Speed with accuracy
- Clear attribution
- Constant updates
- Transparent corrections

## The Live Update Sequence

### Structure
Each update should include:
1. **Timestamp**: Always include time
2. **New information**: What's changed
3. **Attribution**: Who says this
4. **Context**: Brief background

### Example:
> **2:45 PM**: County officials confirm budget passed by 8-5 vote. Finance chief says implementation begins next month. [Full story developing]

## Confirmed vs Unconfirmed

### Always Distinguish:
- ✅ "Police confirm..."
- ✅ "Witnesses report..."
- ✅ "Unconfirmed reports suggest..."
- ❌ Never state unverified info as fact

### The Two-Source Rule
For high-stakes claims (deaths, arrests, major announcements):
- Require two independent sources
- Wait for official confirmation
- Flag uncertainty clearly

## After the Event

Compile updates into a full story:
1. New lead with final outcome
2. Key moments in chronological order
3. Reactions and context
4. Next steps
        `,
        assignment: {
          title: "Live Update Sequence + Final Story",
          brief: "Cover a live event (meeting, speech, game) with 6-10 timestamped updates, then compile into a final 500-word story. Include verification notes.",
          storyType: "LIVE_BLOG",
          wordCountMin: 800,
          wordCountMax: 1200,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 5,
        title: "Strong Leads & Structure",
        overview: "Advanced lead writing, structure variations, revision techniques.",
        video: { title: "Beyond the Basic Lead", placeholder: true },
        notes: `
# Week 5: Strong Leads & Structure

## Learning Objectives
- Write varied lead types
- Structure stories effectively
- Revise for impact

## Advanced Lead Types

### 1. Anecdotal Lead
Start with a person's story:
> At 4 a.m., when most of Nairobi sleeps, Jane Mwangi is already at work...

### 2. Scene-Setting Lead
Paint a picture:
> The courtroom falls silent as the judge enters...

### 3. Question Lead (use sparingly)
> What happens when a city runs out of water?

### 4. Quote Lead (rarely recommended)
Only if the quote is extraordinary.

## Story Structure Options

### Inverted Pyramid (Hard News)
Most important → Least important

### Hourglass
Lead + key facts → Chronological narrative → Ending

### Kabob/Wall Street Journal
Anecdote → Nut graf → Evidence → Return to anecdote

### Narrative
Beginning → Middle → End (with nut graf early)

## Revision Process

1. **Read aloud**: Does it flow?
2. **Cut the first paragraph**: Often you've buried the lead
3. **Check every sentence**: Does it earn its place?
4. **Verify one more time**: Names, numbers, quotes
        `,
        assignment: {
          title: "Story Rewrite",
          brief: "Rewrite your Week 3 interview story using a different lead type and structure. Include a 200-word reflection on what you changed and why.",
          storyType: "HARD_NEWS",
          wordCountMin: 700,
          wordCountMax: 1000,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 6,
        title: "Broadcast Elements",
        overview: "Voiceovers, packages, writing to pictures.",
        video: { title: "Broadcast Packages", placeholder: true },
        notes: `
# Week 6: Broadcast Elements

## Learning Objectives
- Write broadcast packages
- Select and write to sound bites
- Structure VO/SOT/PKG formats

## Broadcast Formats

### VO (Voice Over)
- Anchor reads over video
- 20-30 seconds
- No sound bites

### VO/SOT (Voice Over/Sound on Tape)
- Anchor reads, then sound bite plays
- 30-45 seconds total
- Usually one bite (10-15 seconds)

### PKG (Package)
- Reporter-narrated piece
- 1:30-2:30 minutes
- Multiple sound bites
- Standup (reporter on camera)

## Writing to Video

Match your words to pictures:
- Don't describe what viewers can see
- Add information the video can't show
- Time your script to video length

### Example:
❌ "Here we see the governor arriving..."
✅ "The governor's first stop was the children's ward..."

## Sound Bite Selection

Good bites:
- Say something you can't paraphrase
- Show emotion or personality
- Are concise (8-15 seconds ideal)
- Don't repeat your narration

### In/Out Cues
Document the first and last 3 words:
> SOT: Gov. Ochieng (10 sec)
> IN: "This budget represents..."
> OUT: "...for every family."
        `,
        assignment: {
          title: "Broadcast Package Script",
          brief: "Write a full package script (1:30-2:00) with VO narration, at least 2 SOTs, and a standup. Include timing marks and in/out cues.",
          storyType: "BROADCAST_PKG",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 7,
        title: "Digital/Social Reporting",
        overview: "Platform writing styles, verification for social, explainer threads.",
        video: { title: "Social Media Reporting", placeholder: true },
        notes: `
# Week 7: Digital/Social Reporting

## Learning Objectives
- Write for social platforms
- Verify social media content
- Create explainer threads

## Platform Differences

### Twitter/X
- 280 characters
- Thread format for depth
- Hashtags for discovery
- Retweet-friendly headlines

### Instagram
- Visual-first
- Story format for news
- Caption with key info
- Link in bio

### TikTok
- Video-first
- Hook in 3 seconds
- Explainer format popular
- Young audience

## Social Verification

Before sharing social content:
1. **Check the source**: Real account? History?
2. **Reverse image search**: Is this photo old?
3. **Geolocate**: Does location match?
4. **Check metadata**: When was this taken?
5. **Cross-reference**: Other sources confirming?

## Explainer Threads

Structure:
1. **Hook tweet**: Why should I care?
2. **Context**: Background needed
3. **Key points**: One per tweet
4. **Evidence**: Links, screenshots
5. **Implications**: What happens next?
6. **Sources**: Transparency

### Example:
> 🧵 The county budget just passed. Here's what's in it and why it matters. (Thread)
        `,
        assignment: {
          title: "Social Explainer Thread + Evidence Log",
          brief: "Create a 10-tweet explainer thread on a news topic. Include a linkable evidence log documenting your sources and verification steps.",
          storyType: "ONLINE_UPDATE",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 5,
          maxMarks: 10,
        },
      },
      {
        week: 8,
        title: "Data Journalism Basics",
        overview: "Finding data, simple analysis, interpretation and transparency.",
        video: { title: "Data Journalism Fundamentals", placeholder: true },
        notes: `
# Week 8: Data Journalism Basics

## Learning Objectives
- Find and evaluate data sources
- Perform simple data analysis
- Write data-driven stories

## Finding Data

### Public Data Sources
- Government portals (data.go.ke)
- International organizations (World Bank, UN)
- Research institutions
- FOI/access to information requests
- Scraped from websites

### Evaluating Data
- **Source**: Who collected it? Why?
- **Methodology**: How was it gathered?
- **Completeness**: What's missing?
- **Recency**: How current is it?

## Simple Analysis

### What You Can Do in a Spreadsheet
- **Sorting**: Find highest/lowest
- **Filtering**: Focus on subsets
- **Percentages**: Change over time
- **Averages**: Typical values
- **Comparisons**: This vs that

## Writing with Data

### Humanize the Numbers
❌ "The budget increased by 15%."
✅ "The budget increased by 15% — enough to hire 200 more teachers."

### Show Your Work
- Link to original data
- Explain your methodology
- Acknowledge limitations
- Let others verify

### Visualize When Helpful
- Simple charts beat complex tables
- Always include context
- Label everything clearly
        `,
        assignment: {
          title: "Data Mini-Story",
          brief: "Write a 400-600 word data-driven story using a public dataset. Include a methodology note, link to your data, and one simple visualization.",
          storyType: "DATA_STORY",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 9,
        title: "MoJo & Podcasting",
        overview: "Mobile journalism fundamentals, podcast scripting and structure.",
        video: { title: "Mobile Journalism & Audio Storytelling", placeholder: true },
        notes: `
# Week 9: MoJo & Podcasting

## Learning Objectives
- Produce stories using mobile tools
- Script and structure podcast episodes
- Record quality audio

## Mobile Journalism (MoJo)

### The MoJo Kit
- Smartphone with good camera
- External microphone
- Tripod or stabilizer
- Editing apps

### MoJo Shooting Tips
1. Hold horizontal for video
2. Stabilize your shots
3. Get close for audio
4. Shoot sequences (wide, medium, close)
5. Get natural sound

### MoJo Workflow
1. Plan your story before shooting
2. Shoot more than you need
3. Edit in the field if possible
4. Publish to platform

## Podcast Fundamentals

### Episode Structure
1. **Cold open**: Hook (10-30 seconds)
2. **Intro**: Theme + preview
3. **Segment 1**: Main content
4. **Break**: Transition or ad
5. **Segment 2**: Development
6. **Outro**: Wrap-up + teaser

### Script Format
Write conversationally:
- Short sentences
- Clear transitions
- Sound cues noted
- Timing marks

### Audio Quality
- Record in quiet spaces
- Use external mic when possible
- Check levels before recording
- Leave room for editing
        `,
        assignment: {
          title: "Podcast Script + Transcript",
          brief: "Write a podcast script (2-3 minutes, about 400-600 words) with a cold open, interview segment (real or simulated), and outro. Include a transcript and source list.",
          storyType: "PODCAST",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 10,
        title: "Freelance & Portfolio",
        overview: "Entrepreneurial journalism, pitch letters, portfolio polish.",
        video: { title: "Building Your Journalism Career", placeholder: true },
        notes: `
# Week 10: Freelance & Portfolio

## Learning Objectives
- Pitch to external publications
- Build a professional portfolio
- Understand freelance journalism

## Freelance Pitching

### The Query Letter
1. **Subject line**: Compelling, specific
2. **Opening**: Hook + why you
3. **Pitch**: Story idea (2-3 paragraphs)
4. **Bio**: Relevant clips and experience
5. **Call to action**: Next steps

### Finding Markets
- Study publications you want to write for
- Read their recent coverage
- Find gaps or angles
- Check submission guidelines

### Rates and Rights
- Know what you're worth
- Understand first rights vs all rights
- Get agreements in writing
- Invoice promptly

## Portfolio Building

### What to Include
- 5-7 best pieces
- Range of formats
- Your strongest work
- Recent work

### Presentation
- Clean, professional design
- Easy navigation
- Context for each piece
- Contact information

### Online Presence
- LinkedIn profile
- Twitter/X for journalists
- Personal website
- Consistent bio across platforms

## Career Development

- Build relationships, not just clips
- Specialize but stay flexible
- Keep learning new skills
- Protect your reputation
        `,
        assignment: {
          title: "Pitch Letter + Portfolio + Reflection",
          brief: "Write a professional pitch letter to a real publication. Compile your semester portfolio (5 best pieces). Write a 400-word reflection on your growth and goals.",
          storyType: "FEATURE",
          wordCountMin: 600,
          wordCountMax: 900,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // HCC 312 — Public Relations Writing (10 weeks)
  // ═══════════════════════════════════════════════════════════════════
  HCC312: {
    courseCode: "HCC 312",
    courseTitle: "Public Relations Writing",
    weeks: [
      {
        week: 1,
        title: "PR Writing Goals & Audience",
        overview: "PR writing fundamentals, media selection, and target audiences.",
        video: { title: "Introduction to PR Writing", placeholder: true },
        notes: `
# Week 1: PR Writing Goals & Audience

## Learning Objectives
- Understand PR writing vs journalism
- Identify target audiences
- Select appropriate media channels

## PR Writing Fundamentals

PR writing serves organizational goals while maintaining credibility.

### Key Differences from Journalism
| Journalism | PR Writing |
|------------|------------|
| Serves public | Serves client/org |
| Objective stance | Advocacy stance |
| Finds own stories | Pitches stories |
| Editorial control | Seeks coverage |

### The Credibility Balance
Good PR writing:
- Is factually accurate
- Respects journalistic standards
- Provides real news value
- Builds long-term relationships

## Audience Analysis

### The Audience Matrix
For any campaign, identify:
1. **Primary audience**: Who must receive the message?
2. **Secondary audience**: Who influences the primary?
3. **Tertiary audience**: Who else might see this?

### Audience Questions
- What do they already know?
- What do they need to know?
- What motivates them?
- Where do they get information?

## Media Selection

Match your audience to channels:
- **Print media**: Authority, depth
- **Broadcast**: Reach, emotion
- **Digital**: Speed, targeting
- **Social**: Engagement, youth
- **Direct**: Control, personalization
        `,
        assignment: {
          title: "Audience/Message Matrix",
          brief: "Choose a campaign scenario and create a comprehensive audience/message matrix. Identify 3 target audiences, their characteristics, key messages for each, and recommended channels.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 2,
        title: "News Values & PR Writing",
        overview: "Making PR content newsworthy through journalistic principles.",
        video: { title: "Writing Newsworthy PR Content", placeholder: true },
        notes: `
# Week 2: News Values & PR Writing

## Learning Objectives
- Apply news values to PR content
- Write newsworthy leads for PR
- Structure PR content journalistically

## News Values for PR

### The Journalist Test
Ask: Would a journalist use this?

Check for:
- **Timeliness**: Is there a news peg?
- **Impact**: Who is affected?
- **Significance**: Why does it matter?
- **Human interest**: Is there a story?

### Creating News Value
Transform announcements into stories:

❌ "Company launches new product"
✅ "New technology helps 10,000 farmers double crop yields"

## PR News Writing

### Structure
Use inverted pyramid:
1. News lead (not hype)
2. Key details
3. Quote from spokesperson
4. Background
5. Boilerplate

### Lead Writing
- Focus on impact, not organization
- Avoid "announces" leads
- Include the news value
- 25-35 words

### Quote Guidelines
- Sound like real speech
- Add perspective, not just facts
- Attribute clearly
- One quote per person typically
        `,
        assignment: {
          title: "PR News Story",
          brief: "Write a PR news story (400-600 words) that would pass the journalist test. Include a news-focused lead, at least one quote, proper structure, and boilerplate.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 3,
        title: "Message Strategy & Clarity",
        overview: "Developing key messages, maintaining tone, ensuring clarity.",
        video: { title: "Crafting Key Messages", placeholder: true },
        notes: `
# Week 3: Message Strategy & Clarity

## Learning Objectives
- Develop strategic key messages
- Maintain consistent tone
- Write with clarity and precision

## Key Message Development

### What Are Key Messages?
Core statements that:
- Communicate your main points
- Are memorable and repeatable
- Support organizational goals
- Can withstand scrutiny

### The Message Triangle
Three key messages maximum:
1. What we do/offer
2. Why it matters
3. What we want audiences to do

### Message Testing
Ask:
- Is it true?
- Is it clear?
- Is it memorable?
- Does it differentiate?

## Q&A Preparation

### Anticipate Questions
For any announcement:
- What will journalists ask?
- What will critics say?
- What are the tough questions?
- What can't we answer (and why)?

### Answer Structure
- **Bridge**: Acknowledge the question
- **Message**: Deliver key point
- **Proof**: Support with evidence
- **Hook**: Invite follow-up

## Writing Clearly

### Clarity Checklist
- One idea per sentence
- Active voice
- Concrete language
- No jargon without explanation
- Short paragraphs
        `,
        assignment: {
          title: "Key Message Document + Q&A",
          brief: "For a given scenario, develop a key message document (3 messages with supporting points) and a Q&A sheet anticipating 10 likely questions with approved answers.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 4,
        title: "Pitch Letters",
        overview: "Media relations through effective pitch letters.",
        video: { title: "The Art of the Pitch", placeholder: true },
        notes: `
# Week 4: Pitch Letters

## Learning Objectives
- Write compelling pitch emails
- Target appropriate journalists
- Follow up professionally

## The Pitch Email

### Structure
1. **Subject line**: Clear, compelling (6-10 words)
2. **Opening hook**: Why now? Why them?
3. **The story**: What's the news?
4. **The offer**: What can you provide?
5. **Call to action**: Next steps
6. **Contact info**: Easy to reach you

### Subject Line Examples
✅ "Local startup's water tech reaches 50,000 rural homes"
❌ "Press release: XYZ Company announces product launch"

### The Opening
- Reference their recent work
- Show you know their beat
- Establish relevance immediately

## Targeting Journalists

### Research First
- Read their recent stories
- Understand their beat
- Check their preferences
- Follow them on social

### Personalization
- Use their name (spelled correctly)
- Reference specific stories
- Explain fit with their coverage
- Don't mass-mail pitches

## Follow-Up

### Timing
- Wait 2-3 days before following up
- One follow-up maximum usually
- Mornings are often best
- Avoid Mondays and Fridays

### The Follow-Up
- Brief and respectful
- Offer new angle if possible
- Accept no gracefully
        `,
        assignment: {
          title: "Pitch Email + Follow-Up Script",
          brief: "Write a pitch email to a specific, real journalist about a story idea. Include research on why this journalist is the right target. Add a follow-up email script.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 400,
          wordCountMax: 550,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 5,
        title: "News Releases",
        overview: "Complete press release structure, quotes, and boilerplate.",
        video: { title: "Writing Professional Press Releases", placeholder: true },
        notes: `
# Week 5: News Releases

## Learning Objectives
- Write complete, professional press releases
- Craft effective quotes
- Verify all claims

## Press Release Anatomy

### Required Elements
1. **FOR IMMEDIATE RELEASE** header
2. **Headline**: Clear, factual
3. **Dateline**: City, Date
4. **Lead**: News value first
5. **Body**: Key details, quotes
6. **Boilerplate**: About the organization
7. **Contact**: Media contact info
8. **###** ending mark

### Quote Best Practices
- Sound natural, not scripted
- Add perspective, not facts
- One quote per spokesperson
- Attribution after quote

### Example Quote
> "This investment demonstrates our commitment to rural communities," said Jane Ochieng, CEO of WaterTech Kenya. "Every family deserves clean water."

## Verification Requirement

### Fact-Check Everything
- All statistics cited
- All claims attributed
- Names and titles correct
- Dates and numbers verified

### The Fact-Check Table
| Claim | Source | Verified |
|-------|--------|----------|
| 50,000 homes served | Internal data | ✓ |
| 40% reduction | Third-party study | ✓ |
        `,
        assignment: {
          title: "Full Press Release + Fact-Check Table",
          brief: "Write a complete press release (450-550 words) with all required elements. Include a fact-check table verifying every factual claim in the release.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 450,
          wordCountMax: 550,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 6,
        title: "Backgrounders & Fact Sheets",
        overview: "Creating depth documents for media kits.",
        video: { title: "Backgrounders and Fact Sheets", placeholder: true },
        notes: `
# Week 6: Backgrounders & Fact Sheets

## Learning Objectives
- Write comprehensive backgrounders
- Create scannable fact sheets
- Support press releases with depth

## The Backgrounder

### Purpose
Provides context and depth that doesn't fit in a press release:
- Organizational history
- Industry context
- Technical explanations
- Leadership profiles

### Structure
1. **Title**: Clear identification
2. **Summary**: Key points (2-3 sentences)
3. **Body**: Organized sections
4. **Sources**: Citations for claims

### Writing Style
- Third person, objective tone
- Factual, not promotional
- Well-organized sections
- Verifiable claims only

## The Fact Sheet

### Purpose
Quick reference document:
- Key statistics
- Timeline of events
- Product specifications
- Organization facts

### Design Principles
- **Scannable**: Bullets, not paragraphs
- **Organized**: Logical sections
- **Verified**: Every fact sourced
- **Current**: Update regularly

### Example Format
\`\`\`
FACT SHEET: WaterTech Kenya

OVERVIEW
• Founded: 2018
• Headquarters: Nairobi
• Employees: 150

KEY STATISTICS
• Homes served: 50,000+
• Counties reached: 12
• Water points: 500+
\`\`\`
        `,
        assignment: {
          title: "Backgrounder + Fact Sheet",
          brief: "Create a backgrounder document (400-500 words) and a one-page fact sheet for an organization. Ensure all facts are verifiable and sourced.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 5,
          maxMarks: 10,
        },
      },
      {
        week: 7,
        title: "Ethics in PR Writing",
        overview: "Misleading claims, omissions, disclosure, and ethical boundaries.",
        video: { title: "Ethics in Public Relations", placeholder: true },
        notes: `
# Week 7: Ethics in PR Writing

## Learning Objectives
- Identify ethical issues in PR writing
- Avoid misleading claims
- Apply disclosure standards

## The Ethics Challenge

PR professionals face competing pressures:
- Client/employer interests
- Public interest
- Professional standards
- Legal requirements

## Common Ethical Issues

### 1. Misleading Claims
- Exaggeration of benefits
- Cherry-picked statistics
- Unverifiable claims
- Missing context

### 2. Omission
- Hiding negative information
- Selective quoting
- Incomplete disclosure
- Burying bad news

### 3. Disclosure Failures
- Undisclosed conflicts
- Hidden sponsorships
- Fake grassroots (astroturfing)
- Anonymous sources

## Ethical Standards

### The IPRA Code
- Honest communication
- Transparent methods
- Respect for truth
- Fair dealing

### Practical Guidelines
1. Don't write what you can't verify
2. Disclose relevant conflicts
3. Correct errors promptly
4. Respect journalist relationships

## The Ethics Memo

When facing ethical dilemmas:
1. What are the issues?
2. Who might be harmed?
3. What are the alternatives?
4. What is the right choice?
        `,
        assignment: {
          title: "Ethics Case Analysis + Rewrite",
          brief: "Analyze a provided PR case with ethical issues. Write a 300-word analysis identifying problems, then rewrite the problematic content to meet ethical standards.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 8,
        title: "Newsletters & Web Copy",
        overview: "Writing for newsletters, brochures, and websites.",
        video: { title: "Digital PR Content", placeholder: true },
        notes: `
# Week 8: Newsletters & Web Copy

## Learning Objectives
- Write engaging newsletter content
- Create effective web landing copy
- Balance information with engagement

## Newsletter Writing

### Purpose
- Build relationships
- Share news and updates
- Drive action
- Maintain presence

### Structure
1. **Subject line**: Open-worthy
2. **Header**: Visual, branded
3. **Featured content**: Lead story
4. **Secondary items**: Brief updates
5. **CTA**: Clear next step
6. **Footer**: Contact, unsubscribe

### Writing Tips
- Conversational tone
- Short paragraphs
- Scannable format
- Clear value proposition

## Web Landing Copy

### Purpose
Convert visitors to action:
- Sign up
- Learn more
- Contact us
- Purchase

### Structure
1. **Headline**: Clear value proposition
2. **Subheadline**: Supporting detail
3. **Body**: Benefits, not features
4. **Social proof**: Testimonials, stats
5. **CTA**: Clear, urgent action

### SEO Considerations
- Include keywords naturally
- Write for humans first
- Use descriptive headings
- Include internal links
        `,
        assignment: {
          title: "Newsletter + Web Landing Copy",
          brief: "Write a complete newsletter (400-500 words with sections) and a web landing page (300-400 words) for an organization. Include subject line, CTAs, and SEO considerations.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 600,
          wordCountMax: 900,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 9,
        title: "Broadcast PR Writing",
        overview: "Radio PSAs, TV talking points, spokesperson briefs.",
        video: { title: "Writing for Broadcast Media", placeholder: true },
        notes: `
# Week 9: Broadcast PR Writing

## Learning Objectives
- Write effective PSAs
- Prepare spokesperson talking points
- Adapt PR content for broadcast

## Public Service Announcements (PSAs)

### Format
- 15, 30, or 60 seconds
- Clear single message
- Call to action
- Production notes

### Writing Tips
- Write for the ear
- One message per PSA
- Use conversational language
- End with action

### Example :30 PSA
\`\`\`
AUDIO: [SOUND OF WATER RUNNING]
VOICE: Every drop counts.

In Kenya, millions still lack clean water.
But you can help.

Text WATER to 40444 to donate.

Clean water. Healthy communities.
WaterTech Kenya.
\`\`\`

## Spokesperson Preparation

### Talking Points Document
Structure:
1. **Key messages**: 3 main points
2. **Supporting facts**: Evidence for each
3. **Anticipated questions**: And answers
4. **Bridging phrases**: Transition language
5. **Don't say**: What to avoid

### Interview Preparation
- Practice out loud
- Time your answers
- Prepare for tough questions
- Know your limits
        `,
        assignment: {
          title: "Radio PSA OR Spokesperson Talking Points",
          brief: "Write either: A) A 30-second radio PSA with production notes, or B) Complete spokesperson talking points (key messages, Q&A, bridging phrases) for a media interview.",
          storyType: "BROADCAST_VO",
          wordCountMin: 300,
          wordCountMax: 500,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 10,
        title: "Integrated PR Pack & Portfolio",
        overview: "Complete media kit assembly and portfolio.",
        video: { title: "Building Your PR Portfolio", placeholder: true },
        notes: `
# Week 10: Integrated PR Pack & Portfolio

## Learning Objectives
- Assemble a complete media kit
- Present PR work professionally
- Reflect on PR practice

## The Media Kit (Press Kit)

### Components
1. **Press release**: The news
2. **Backgrounder**: Context/history
3. **Fact sheet**: Quick reference
4. **Executive bios**: Leadership
5. **High-res images**: With captions
6. **Contact sheet**: Media contacts

### Quality Checklist
- All facts verified
- Consistent branding
- Current information
- Easy to navigate
- Multiple formats (PDF, online)

## Portfolio Assembly

### What to Include
- Range of PR formats
- Your strongest work
- Campaigns you led
- Results when available

### Presentation
- Professional layout
- Brief context for each piece
- Clean, organized
- Contact information

## Reflection

### Questions to Consider
- What is the PR writer's responsibility to truth?
- How do you balance client and public interest?
- What ethical principles will guide your work?
- How has your understanding of PR changed?

## Course Summary

Your CA includes:
- Weekly assignments
- Participation
- Media kit quality
- Reflection depth

Final exam: 70% of total grade
        `,
        assignment: {
          title: "Complete PR Media Kit + Reflection",
          brief: "Compile a complete media kit (press release, backgrounder, fact sheet, one additional element) for a campaign. Include a 400-word reflection on PR ethics and your development.",
          storyType: "PRESS_RELEASE",
          wordCountMin: 600,
          wordCountMax: 900,
          sourcesRequired: 5,
          maxMarks: 10,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // HCC 314 — Newspaper Writing (10 weeks)
  // ═══════════════════════════════════════════════════════════════════
  HCC314: {
    courseCode: "HCC 314",
    courseTitle: "Newspaper Writing",
    weeks: [
      {
        week: 1,
        title: "Newspaper Environment & Story Types",
        overview: "Understanding the newspaper ecosystem and story categories.",
        video: { title: "The Newspaper Landscape", placeholder: true },
        notes: `
# Week 1: Newspaper Environment & Story Types

## Learning Objectives
- Understand the newspaper ecosystem
- Recognize different story types
- Analyze newspaper structure and sourcing

## The Newspaper Ecosystem

### Key Roles
- **Reporters**: Gather and write
- **Sub-editors**: Edit and headline
- **Editors**: Direct coverage
- **Photographers**: Visual storytelling

### Story Types in Newspapers
1. **Hard news**: Breaking, timely events
2. **Features**: In-depth, human interest
3. **Profiles**: Focus on individuals
4. **Investigations**: Deep accountability
5. **Columns**: Opinion, analysis
6. **Beat coverage**: Specialized areas

## Newspaper Analysis

### Reading Critically
- What stories lead the paper?
- What sources are used?
- What voices are missing?
- What framing is applied?

### Structure Analysis
- Lead type (summary, anecdotal, etc.)
- Story organization
- Quote placement
- Background integration

## This Course

Over 10 weeks, you'll write:
- News stories (general, courts, parliament)
- Profiles and obituaries
- Investigative pieces
- Beat coverage (business, sports)
- Online adaptations
        `,
        assignment: {
          title: "Newspaper Analysis",
          brief: "Analyze 2 newspaper stories from the same day's paper. Compare structure, sourcing, lead types, and news judgment. Write a 400-500 word analysis.",
          storyType: "HARD_NEWS",
          wordCountMin: 400,
          wordCountMax: 500,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 2,
        title: "News Stories: Leads & Structure",
        overview: "General news stories, leads, and inverted pyramid.",
        video: { title: "Writing Hard News", placeholder: true },
        notes: `
# Week 2: News Stories: Leads & Structure

## Learning Objectives
- Write effective hard news leads
- Structure stories using inverted pyramid
- Apply attribution rules

## The Hard News Lead

### Elements
- Most newsworthy information first
- Answer the key W (who, what, when, where, why)
- 25-35 words maximum
- Active voice

### Lead Checklist
✓ Does it answer "so what?"
✓ Is it specific, not vague?
✓ Is it attributed if needed?
✓ Does it avoid jargon?

## Inverted Pyramid Deep Dive

### Why It Works
- Readers get essentials fast
- Editors can cut from bottom
- Breaking news can be updated
- Works across platforms

### Paragraph by Paragraph
1. **Lead**: The news
2. **Second graf**: Key detail or quote
3. **Third graf**: Context or second most important
4. **Following**: Decreasing importance
5. **Final**: Background, future

## Attribution Rules

### When to Attribute
- All claims and opinions
- All non-obvious facts
- All quotes (obviously)
- Anything that could be challenged

### How to Attribute
- "said" is invisible (use it)
- Attribution after the fact/quote
- Full name and title first mention
        `,
        assignment: {
          title: "Hard News Story",
          brief: "Write a hard news story (500-700 words) on a current campus or local issue. Include at least 3 sources with proper attribution. Submit a verification table.",
          storyType: "HARD_NEWS",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 3,
        title: "Profiles & Interviewing",
        overview: "Interview skills and profile story structure.",
        video: { title: "The Art of the Profile", placeholder: true },
        notes: `
# Week 3: Profiles & Interviewing

## Learning Objectives
- Conduct profile interviews
- Structure profile stories
- Bring subjects to life

## Profile Preparation

### Research First
- Background information
- Previous coverage
- Social media
- Public records

### Interview Planning
- Core questions (must answer)
- Open-ended questions (stories)
- Detail questions (scenes)
- Tough questions (challenges)

## The Profile Interview

### Building Rapport
- Start with easy questions
- Listen actively
- Follow unexpected threads
- Note surroundings and behaviors

### Getting Detail
Ask:
- "Can you describe that moment?"
- "What were you thinking?"
- "What did that feel like?"
- "Show me where..."

## Profile Structure

### Options
1. **Chronological**: Life story
2. **Thematic**: Key themes
3. **Scene-based**: Key moments
4. **Day-in-the-life**: Present tense

### Required Elements
- Physical description
- Direct quotes showing personality
- Scenes or anecdotes
- Context and significance
- Multiple perspectives (others about them)
        `,
        assignment: {
          title: "Profile Story",
          brief: "Write a profile story (800-1000 words) based on original interviews. Include physical description, multiple scenes, direct quotes, and at least one additional source commenting on the subject.",
          storyType: "PROFILE",
          wordCountMin: 800,
          wordCountMax: 1000,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 4,
        title: "Obituaries",
        overview: "Writing respectful, accurate obituaries with proper sourcing.",
        video: { title: "The Obituary as Storytelling", placeholder: true },
        notes: `
# Week 4: Obituaries

## Learning Objectives
- Write accurate, respectful obituaries
- Navigate sensitivity and verification
- Honor subjects while maintaining standards

## The Obituary's Purpose

An obituary:
- Records a life for history
- Honors the deceased
- Informs the community
- Provides closure

## Standard Structure

### 1. Lead
Name, age, when died, often how died (if appropriate):
> "Mary Wanjiku Kamau, a pioneering educator who taught thousands of students over four decades, died Monday at her Nairobi home. She was 78."

### 2. Significance
Why this person mattered.

### 3. Life Story
Key events, achievements, turning points.

### 4. Survivors
Family members who survive them.

### 5. Services
When, where, details.

## Verification Challenges

### Sensitive Issues
- Cause of death: Verify, but respect family
- Achievements: Don't inflate
- Controversies: Handle fairly
- Family disputes: Don't take sides

### Source Log
Document every fact:
- Family interviews
- Employer records
- Awards/honors
- Published clips
        `,
        assignment: {
          title: "Obituary",
          brief: "Write an obituary (400-600 words) based on a provided scenario or a recently deceased public figure. Include proper verification and a source log documenting how you verified each key fact.",
          storyType: "OBITUARY",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 5,
        title: "Courts & Legal Reporting",
        overview: "Sub judice rules, fair trial, and legal constraints.",
        video: { title: "Reporting from the Courts", placeholder: true },
        notes: `
# Week 5: Courts & Legal Reporting

## Learning Objectives
- Apply sub judice rules
- Report fairly on trials
- Navigate legal constraints

## Sub Judice

"Sub judice" = under judicial consideration

### What You CANNOT Do
Once charged until verdict:
- Publish opinion on guilt/innocence
- Publish evidence not in open court
- Identify protected witnesses
- Conduct media trial

### What You CAN Do
- Report what happens in open court
- Use "alleged" and "accused"
- Quote from public proceedings
- Provide context

## Fair Trial Rights

### Balance Required
- Right to fair trial vs public interest
- Presumption of innocence
- Right to legal representation
- Protection of victims

### Practical Guidelines
- Always use "alleged" before verdict
- Report both prosecution and defense
- Don't characterize evidence
- Note: "The trial continues"

## Court Story Structure

### Lead
Who, what charge, what happened today:
> "A county official pleaded not guilty Monday to charges of embezzling Sh 5 million in public funds."

### Body
- Key testimony or arguments
- Both sides represented
- Context without prejudice

### Closing
- Next hearing date
- "The trial continues" or similar
        `,
        assignment: {
          title: "Courts Story",
          brief: "Write a court story (400-600 words) from a provided scenario. Apply sub judice rules, use proper legal language, include high-risk claim tagging, and submit a verification table with two-source confirmation for key facts.",
          storyType: "COURTS",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 6,
        title: "Parliament & Government",
        overview: "Government reporting, parliamentary privilege, budget coverage.",
        video: { title: "Covering Government", placeholder: true },
        notes: `
# Week 6: Parliament & Government

## Learning Objectives
- Cover parliamentary proceedings
- Use official documents
- Apply parliamentary privilege

## Parliamentary Privilege

### What It Means
MPs are protected from defamation liability for statements in Parliament.

### For Journalists
- Can quote parliamentary proceedings fairly
- Must be fair and accurate
- Cannot add your own defamatory comments
- Context matters

## Covering Parliament

### Sources
- Hansard (official record)
- Bills and committee reports
- MPs and staff
- Parliamentary committees
- Written answers

### Story Types
- Debate coverage
- Bill analysis
- Committee hearings
- Budget reporting

## Budget Reporting

### Key Elements
- Total figures and changes
- Main allocations
- Winners and losers
- Context and comparison

### Documents to Request
- Budget speech
- Estimates books
- Committee reports
- Previous years' data

## Document-Based Evidence

### Why Documents Matter
- Verify claims
- Provide context
- Stand up to scrutiny
- Enable accountability
        `,
        assignment: {
          title: "Government/Parliament Story",
          brief: "Write a parliament or government story (500-700 words) based on documents (provided or sourced). Include document-based evidence, multiple sources, and a verification table.",
          storyType: "PARLIAMENT",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 7,
        title: "Business & Sports",
        overview: "Specialized beat writing styles.",
        video: { title: "Beat Writing: Business & Sports", placeholder: true },
        notes: `
# Week 7: Business & Sports Writing

## Learning Objectives
- Write accessible business stories
- Produce engaging sports coverage
- Translate specialized jargon

## Business Writing

### Challenges
- Complex concepts
- Jargon and acronyms
- Numbers overload
- Access to sources

### Translation Principle
Make it human:
❌ "Revenue increased 15% YoY"
✅ "Sales grew 15% from last year — enough to hire 200 workers"

### Key Numbers
- Revenue vs profit
- Percentage changes
- Per-share calculations
- Comparisons (context)

### Business Story Elements
- Lead with impact
- Explain the "so what"
- Quote multiple perspectives
- Provide context and comparison

## Sports Writing

### Beyond the Score
- Human stories behind the game
- Context and history
- Post-match reactions
- Looking ahead

### Avoid Clichés
❌ "Gave 110%"
❌ "At the end of the day"
❌ "Literally"

### Sports Story Structure
- Lead with outcome and significance
- Key plays/moments
- Stats with context
- Quotes from participants
- What's next
        `,
        assignment: {
          title: "Business Brief OR Sports Match Report",
          brief: "Write EITHER a business story (300-500 words) making financial information accessible, OR a sports match report (400-600 words) avoiding clichés and including meaningful quotes. Include verification.",
          storyType: "BUSINESS",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 8,
        title: "Investigative Techniques",
        overview: "Document analysis, evidence chains, investigative planning.",
        video: { title: "Investigative Journalism Basics", placeholder: true },
        notes: `
# Week 8: Investigative Techniques

## Learning Objectives
- Plan investigative stories
- Build evidence chains
- Apply document analysis

## What Makes Investigations Different

- Longer timeline
- Higher stakes
- More rigorous verification
- Public interest imperative

## The Investigative Plan

### Components
1. **Hypothesis**: What you're investigating
2. **Key questions**: What you need to answer
3. **Sources**: Documents and people
4. **Evidence needed**: What would prove/disprove
5. **Timeline**: Realistic schedule
6. **Legal review**: Potential issues

## Document Analysis

### Finding Documents
- FOI requests
- Court records
- Company filings
- Leaked materials
- Public databases

### Analyzing Documents
- What does it say?
- What's missing?
- Who wrote it? Why?
- Can it be verified?
- What does it prove?

## Evidence Chains

### Building Your Case
Each claim needs:
1. Primary source
2. Corroborating evidence
3. Context
4. Response from accused

### The Two-Source Rule
High-risk claims require two independent sources.
        `,
        assignment: {
          title: "Investigative Plan + Partial Draft",
          brief: "Create an investigative plan for a story (hypothesis, key questions, sources, timeline). Write the first 500-700 words of the story. Include a detailed verification table.",
          storyType: "INVESTIGATIVE",
          wordCountMin: 700,
          wordCountMax: 1000,
          sourcesRequired: 4,
          maxMarks: 10,
        },
      },
      {
        week: 9,
        title: "Online Adaptation",
        overview: "Adapting newspaper content for digital, web critique.",
        video: { title: "Newspapers in the Digital Age", placeholder: true },
        notes: `
# Week 9: Online Adaptation

## Learning Objectives
- Adapt print stories for web
- Critique online news presentation
- Apply digital best practices

## Print vs Digital

### Different Behaviors
| Print | Digital |
|-------|---------|
| Linear reading | Scanning |
| Single session | Multiple visits |
| Complete article | Headlines first |
| Fixed edition | Constantly updated |

### Adaptation Needs
- Shorter paragraphs
- More subheadings
- Hyperlinks for depth
- Multimedia integration
- SEO consideration

## Web Critique Framework

### Evaluate:
1. **Headlines**: Accurate? Clear? Clickworthy but not bait?
2. **Structure**: Scannable? Front-loaded?
3. **Links**: Sourced? Useful?
4. **Updates**: Current? Corrections visible?
5. **Multimedia**: Value-adding?

### Common Problems
- Buried leads
- Wall of text
- Missing links
- Outdated content
- Misleading headlines

## Rewriting for Digital

### Process
1. Identify the core news
2. Rewrite lead for scanning
3. Add subheadings
4. Chunk into short paragraphs
5. Add relevant links
6. Consider multimedia
        `,
        assignment: {
          title: "Web Critique + Digital Rewrite",
          brief: "Critique a published online news story (300 words) identifying strengths and weaknesses. Then rewrite a print story for web format with subheadings, links, and scannable structure.",
          storyType: "ONLINE_UPDATE",
          wordCountMin: 600,
          wordCountMax: 900,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 10,
        title: "Ethics & Portfolio",
        overview: "Ethical review, portfolio packaging, and reflection.",
        video: { title: "Ethics and Your Portfolio", placeholder: true },
        notes: `
# Week 10: Ethics & Portfolio

## Learning Objectives
- Apply ethical principles consistently
- Package work professionally
- Reflect on growth and standards

## Newspaper Ethics Review

### Core Principles
1. **Accuracy**: Verify everything
2. **Fairness**: All sides heard
3. **Independence**: No conflicts
4. **Accountability**: Own your work
5. **Minimize harm**: Consider impact

### Kenya Media Council Code
- Accuracy and fairness
- Independence from interest
- Respect for privacy
- Protection of minors
- Right of reply

## Portfolio Assembly

### Selection Criteria
Choose 5-6 pieces showing:
- Range of story types
- Verification discipline
- Writing growth
- Your best work

### For Each Piece
- Final polished version
- Brief context (50 words)
- Verification table
- Any corrections/updates

## Final Reflection

Consider:
- How has your writing changed?
- What verification habits will you keep?
- What ethical principles guide you?
- What kind of journalist will you be?

## CA Summary

Weekly assignments contribute to your CA (30%).
Exam is 70% of total.

Quality of portfolio and reflection matters.
        `,
        assignment: {
          title: "Portfolio + Reflection + CA Wrap",
          brief: "Submit your portfolio of 5-6 best pieces with verification tables and context notes. Write a 500-word reflection on your development and the ethical principles that will guide your work.",
          storyType: "FEATURE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // HCC 316 — Feature & Magazine Writing (10 weeks)
  // ═══════════════════════════════════════════════════════════════════
  HCC316: {
    courseCode: "HCC 316",
    courseTitle: "Feature & Magazine Writing",
    weeks: [
      {
        week: 1,
        title: "Magazine Parts & Voice",
        overview: "Magazine structure, audience, and editorial voice.",
        video: { title: "Understanding Magazine Publishing", placeholder: true },
        notes: `
# Week 1: Magazine Parts & Voice

## Learning Objectives
- Understand magazine structure
- Identify target audiences
- Analyze editorial voice

## Magazine Anatomy

### Front of Book
- Cover and contents
- Editor's letter
- Short items/news
- Columns

### Feature Well
- Long-form features
- Photo essays
- Investigations
- Profiles

### Back of Book
- Reviews
- Listings
- Service pieces
- Final page essay

## Editorial Voice

### What Is Voice?
The distinctive tone and style that makes a magazine recognizable:
- Word choices
- Sentence structure
- Attitude
- Relationship with reader

### Voice Analysis
- Formal or conversational?
- Expert or accessible?
- Serious or playful?
- Distant or intimate?

## Audience Analysis

### Key Questions
- Who reads this magazine?
- What do they care about?
- What language do they use?
- What problems do they have?

### Creating Reader Personas
- Demographics (age, income, education)
- Psychographics (values, interests)
- Reading habits
- Content preferences
        `,
        assignment: {
          title: "Magazine Concept + Section Plan",
          brief: "Develop a magazine concept: target audience, editorial voice, 5 main sections. Write a 100-word editor's letter. Include reader persona and section descriptions.",
          storyType: "FEATURE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 2,
        title: "Feature Techniques",
        overview: "Finding angles, developing voice, building scenes.",
        video: { title: "Feature Writing Techniques", placeholder: true },
        notes: `
# Week 2: Feature Techniques

## Learning Objectives
- Find and develop story angles
- Build vivid scenes
- Develop your voice

## Finding the Angle

### The Angle vs The Topic
- Topic: "Climate change"
- Angle: "How one farmer is adapting to drought"

### Angle Questions
- What's the human story?
- What's surprising?
- What's the conflict?
- Why now?

## Scene Building

### Show, Don't Tell
Let readers experience moments:

❌ "She was nervous about the interview."

✅ "She smoothed her skirt for the third time, then checked her phone. 9:47. Thirteen minutes to go."

### Scene Elements
- Setting (where, when, sensory details)
- Character (appearance, actions, dialogue)
- Tension (what's at stake)
- Movement (something happens)

## Voice Development

### Finding Your Voice
- Read widely
- Write regularly
- Experiment
- Get feedback

### Voice Choices
- POV: First, second, third?
- Tense: Past or present?
- Formality: How close to reader?
- Personality: Your distinctive style
        `,
        assignment: {
          title: "Feature Pitch + Reporting Plan",
          brief: "Pitch a feature story (angle, nut graf, key sources). Include a reporting plan with key questions, sources to interview, and scenes to capture.",
          storyType: "FEATURE",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 4,
          maxMarks: 10,
        },
      },
      {
        week: 3,
        title: "Writing Features",
        overview: "Nut graf, structure, pacing, and drafting.",
        video: { title: "Writing the Feature", placeholder: true },
        notes: `
# Week 3: Writing Features

## Learning Objectives
- Place and craft the nut graf
- Structure features effectively
- Control pacing

## The Nut Graf

### What It Does
- Tells readers why they should care
- Connects the opening to larger significance
- Usually comes in paragraph 3-6
- Answers "so what?"

### Nut Graf Formula
[Opening anecdote/scene]
**This is one example of [broader trend/issue], which [significance].**

## Feature Structure Options

### 1. Chronological
Events in order. Good for:
- Investigations with reveals
- Day-in-the-life
- Historical pieces

### 2. Thematic
Organized by themes. Good for:
- Complex issues
- Multiple perspectives
- Analysis pieces

### 3. Alternating
Scene → analysis → scene → analysis. Good for:
- Most features
- Balancing story and significance

## Pacing

### Fast vs Slow
- Scenes: Slow down, show detail
- Transitions: Speed up
- Key revelations: Slow down
- Background: Summarize quickly

### The Kicker
End memorably:
- Return to opening
- Final scene
- Resonant quote
- Looking forward
        `,
        assignment: {
          title: "Feature Draft",
          brief: "Write a feature story (900-1200 words) with scene-setting lead, clear nut graf, alternating structure, and memorable kicker. Include verification table.",
          storyType: "FEATURE",
          wordCountMin: 900,
          wordCountMax: 1200,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 4,
        title: "Editing Workflow",
        overview: "Editor roles, revision process, edit memos.",
        video: { title: "The Editing Process", placeholder: true },
        notes: `
# Week 4: Editing Workflow

## Learning Objectives
- Understand editor roles
- Apply revision techniques
- Write professional edit memos

## Editorial Roles

### Commissioning Editor
- Assigns stories
- Works with writers on angle
- Manages deadlines

### Structural Editor
- Reviews organization
- Identifies gaps
- Suggests restructuring

### Copy Editor
- Line-by-line editing
- Grammar and style
- Fact-checking coordination

## Self-Editing Process

### First Pass: Structure
- Does the lead work?
- Is there a clear nut graf?
- Does the ending satisfy?
- Are sections in right order?

### Second Pass: Paragraphs
- Does each paragraph have one idea?
- Are transitions smooth?
- Is there variety in length?

### Third Pass: Sentences
- Are sentences clear?
- Is voice consistent?
- Any redundancy?

### Fourth Pass: Words
- Any jargon?
- Active voice?
- Precise verbs?

## The Edit Memo

### Structure
1. **Summary**: Overall impression
2. **Strengths**: What works
3. **Issues**: Problems identified
4. **Suggestions**: Specific fixes
5. **Questions**: Clarifications needed
        `,
        assignment: {
          title: "Edit Your Feature + Revision Memo",
          brief: "Revise your Week 3 feature based on self-editing and any feedback. Submit the revised version plus a 300-word revision memo explaining your changes.",
          storyType: "FEATURE",
          wordCountMin: 1000,
          wordCountMax: 1400,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 5,
        title: "Captions & Visual Storytelling",
        overview: "Writing captions, photo notes, visual narrative.",
        video: { title: "Words and Images", placeholder: true },
        notes: `
# Week 5: Captions & Visual Storytelling

## Learning Objectives
- Write effective captions
- Understand visual narrative
- Integrate text and images

## Caption Fundamentals

### Purpose
- Identify what's in the image
- Add information not visible
- Connect to larger story
- Engage the reader

### Caption Structure
1. **Lead-in**: What's happening (present tense)
2. **Context**: What we can't see
3. **Credit**: Photographer/source

### Example
> Jane Mwangi sorts tomatoes at Gikomba market before dawn. She has worked here for 15 years, arriving at 4 a.m. daily to secure her spot. Photo: James Kamau

## Caption Rules

### Do:
- Use present tense for action
- Add information beyond obvious
- Be specific
- Credit the photographer

### Don't:
- State the obvious
- Use "pictured" or "shown"
- Editorialize
- Be vague

## Photo Selection

### Visual Storytelling
- Opening image: Set the scene
- Detail shots: Support the narrative
- Closing image: Resolution/reflection

### Photo Notes
For each image, document:
- Who is in it (and consent)
- Where and when taken
- Context/significance
        `,
        assignment: {
          title: "Caption Package + Photo Notes",
          brief: "Write captions for 10 provided images (or your own photos). Include photo notes documenting context, consent, and significance. Write a 200-word reflection on visual storytelling.",
          storyType: "FEATURE",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
      {
        week: 6,
        title: "Design & Layout Basics",
        overview: "Layout principles, visual hierarchy, design tools.",
        video: { title: "Magazine Layout Fundamentals", placeholder: true },
        notes: `
# Week 6: Design & Layout Basics

## Learning Objectives
- Apply basic layout principles
- Use design tools (Canva/similar)
- Create visual hierarchy

## Layout Principles

### Visual Hierarchy
Guide the reader's eye:
1. Headline (largest)
2. Images (attention-grabbing)
3. Pull quotes (entry points)
4. Body text
5. Captions

### Grid Systems
- Columns create structure
- Consistent margins
- White space is design element
- Alignment creates order

### Typography Basics
- Headline fonts: Bold, attention
- Body fonts: Readable, clean
- Limit font families (2-3 max)
- Consistent sizing

## Magazine Spread Elements

### Required:
- Headline
- Byline
- Body text
- At least one image
- Caption

### Optional:
- Pull quote
- Sidebar
- Info graphic
- Drop cap

## Tools

### Canva (Recommended)
- Templates available
- Easy to use
- Export as PDF

### Adobe InDesign
- Industry standard
- More complex
- Professional results
        `,
        assignment: {
          title: "Magazine Layout Mock",
          brief: "Create a 2-page magazine layout in Canva or similar tool. Include headline, body text (can be placeholder), images with captions, and at least one pull quote. Export as PDF.",
          storyType: "FEATURE",
          wordCountMin: 200,
          wordCountMax: 400,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
      {
        week: 7,
        title: "Photo Composition",
        overview: "Understanding and analyzing photo composition.",
        video: { title: "Photo Composition for Writers", placeholder: true },
        notes: `
# Week 7: Photo Composition

## Learning Objectives
- Understand composition principles
- Evaluate images critically
- Direct photographers effectively

## Composition Basics

### Rule of Thirds
- Divide frame into 3x3 grid
- Place key elements at intersections
- Creates dynamic balance

### Leading Lines
- Lines guide viewer's eye
- Roads, fences, arms pointing
- Lead toward subject

### Framing
- Use elements to frame subject
- Doorways, windows, branches
- Creates depth and focus

## Photo Types

### Establishing Shot
- Wide view
- Sets the scene
- Shows context

### Medium Shot
- Subject in environment
- Shows action
- Relates subject to setting

### Close-Up
- Detail or face
- Shows emotion
- Creates intimacy

## Working with Photographers

### Shot List
Before a shoot, communicate:
- Key moments needed
- Types of shots
- Must-have subjects
- Creative latitude

### Photo Selection
When choosing images:
- Technical quality
- Storytelling power
- Ethical considerations
- Diversity and representation
        `,
        assignment: {
          title: "Photo Composition Analysis",
          brief: "Select 5 photos from published magazines. For each, write a 100-word analysis of composition: rule of thirds, leading lines, framing, lighting. Include annotated copies marking key elements.",
          storyType: "FEATURE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 5,
          maxMarks: 10,
        },
      },
      {
        week: 8,
        title: "Ethics, Law & Permissions",
        overview: "Consent, permissions, contracts, and ethical practice.",
        video: { title: "Legal and Ethical Considerations", placeholder: true },
        notes: `
# Week 8: Ethics, Law & Permissions

## Learning Objectives
- Obtain proper permissions
- Navigate consent requirements
- Apply ethical principles

## Photo Permissions

### When You Need Permission
- Private property
- Identifiable individuals (often)
- Minors (always)
- Sensitive contexts

### Release Forms
Document:
- Who is in the photo
- Where it will be used
- How it will be used
- Signature and date

## Written Content Permissions

### Quotes and Interviews
- On the record is default
- Document consent
- Respect boundaries
- Allow review if agreed

### Vulnerable Subjects
Extra care for:
- Minors
- Trauma survivors
- Marginalized communities
- Mental health contexts

## Ethical Principles

### Representation
- Avoid stereotypes
- Include diverse voices
- Consider power dynamics
- Check your assumptions

### Harm Minimization
- Consider long-term impact
- Protect privacy
- Balance public interest
- Enable informed consent

## The Permissions Checklist

✓ Photo releases signed
✓ Interview consent documented
✓ Minors have guardian consent
✓ Sensitive content discussed
✓ Right of reply offered
        `,
        assignment: {
          title: "Permissions Checklist + Ethics Memo",
          brief: "Complete a permissions checklist for your feature story. Write a 400-word ethics memo addressing: consent, representation, potential harm, and safeguards you've applied.",
          storyType: "FEATURE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
      {
        week: 9,
        title: "Mini Magazine Production",
        overview: "Compiling a mini magazine issue.",
        video: { title: "Magazine Production Workflow", placeholder: true },
        notes: `
# Week 9: Mini Magazine Production

## Learning Objectives
- Apply production workflow
- Compile multiple elements
- Meet deadline under pressure

## Production Workflow

### Pre-Production
- Assign stories
- Set deadlines
- Create flat plan
- Coordinate photographers

### Production
- Receive copy
- Edit and revise
- Design layouts
- Integrate images

### Post-Production
- Proofread
- Final approval
- Export/publish
- Archive materials

## The Flat Plan

Visual map of your magazine:
- Page-by-page layout
- Story placement
- Ad placement
- Flow and pacing

## Mini Issue Requirements

### 2-3 Pages Including:
- One feature or short feature
- Visual elements (photos, graphics)
- Captions
- At least one sidebar or box

### Format
- PDF export
- Professional layout
- Consistent style
- Proofread

## Time Management

### Deadline Discipline
- Work backward from deadline
- Build in buffer time
- Prioritize must-haves
- Communicate problems early
        `,
        assignment: {
          title: "Mini Magazine Issue",
          brief: "Produce a 2-3 page mini magazine issue in PDF format. Include: one feature or two short pieces, photos with captions, pull quotes, and consistent layout.",
          storyType: "FEATURE",
          wordCountMin: 800,
          wordCountMax: 1200,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 10,
        title: "Portfolio & Reflection",
        overview: "Final portfolio assembly and course reflection.",
        video: { title: "Building Your Magazine Portfolio", placeholder: true },
        notes: `
# Week 10: Portfolio & Reflection

## Learning Objectives
- Assemble professional portfolio
- Reflect on creative development
- Plan future growth

## Portfolio Assembly

### What to Include
- 4-5 best pieces
- Range of work (features, captions, layouts)
- Verification documentation
- Permissions records

### Presentation
- Clean, professional design
- Brief context for each piece
- Easy navigation
- Contact information

## Feature Writing Portfolio

### For Each Feature:
- Final polished version
- Edit memo showing revision process
- Verification table
- Photo permissions if applicable

### Layout Portfolio
- PDF layouts
- Design notes
- Before/after if revised

## Reflection Questions

### Creative Development
- How has your voice evolved?
- What techniques have you mastered?
- What challenges did you overcome?

### Professional Growth
- What kind of magazine writing interests you?
- What skills need more development?
- What ethical principles guide you?

### Looking Forward
- Where do you want to publish?
- What stories do you want to tell?
- What's your next step?

## CA Summary

Portfolio quality and reflection depth contribute to CA (30%).
Exam is 70% of total.
        `,
        assignment: {
          title: "Final Portfolio + Reflection",
          brief: "Submit your complete portfolio: 4-5 pieces with context, verification tables, permissions, and layouts. Write a 500-word reflection on your development as a magazine writer.",
          storyType: "FEATURE",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // HCC 420 — Writing Editorials & Reviews (10 weeks)
  // ═══════════════════════════════════════════════════════════════════
  HCC420: {
    courseCode: "HCC 420",
    courseTitle: "Writing Editorials & Reviews",
    weeks: [
      {
        week: 1,
        title: "Introduction to Editorials",
        overview: "Editorial purpose, topics, and the opinion function.",
        video: { title: "The Role of Opinion Journalism", placeholder: true },
        notes: `
# Week 1: Introduction to Editorials

## Learning Objectives
- Understand editorial purpose and function
- Identify suitable editorial topics
- Distinguish opinion from reporting

## The Editorial Function

### Purpose
- Guide public opinion
- Hold power accountable
- Stimulate debate
- Represent institutional voice

### Historical Context
- Fourth estate tradition
- Editorial boards
- Separation from news
- Transparency of stance

## Opinion vs Reporting

### Key Differences
| Reporting | Opinion |
|-----------|---------|
| What happened | What it means |
| Multiple views | One view |
| Neutral voice | Persuasive voice |
| Facts only | Facts + argument |

### What They Share
- Accuracy requirement
- Verification of facts
- Fairness to subjects
- Ethical standards

## Choosing Topics

### Good Editorial Topics
- Timely (news peg)
- Consequential (affects readers)
- Debatable (reasonable disagreement)
- Actionable (something can be done)

### Avoid
- Settled matters
- Pure personal preference
- Topics requiring expertise you lack
- Strawman arguments
        `,
        assignment: {
          title: "3 Editorial Topic Proposals",
          brief: "Propose 3 editorial topics. For each: explain the news peg, why it matters, your angle, and what action you'll recommend. Include a preliminary evidence list.",
          storyType: "EDITORIAL",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 3,
          maxMarks: 10,
        },
      },
      {
        week: 2,
        title: "Grammar & Clarity Refresher",
        overview: "Precision in language, common errors, clarity techniques.",
        video: { title: "Writing with Precision", placeholder: true },
        notes: `
# Week 2: Grammar & Clarity Refresher

## Learning Objectives
- Eliminate common errors
- Write with precision
- Edit for clarity

## Common Grammar Issues

### Subject-Verb Agreement
✓ The committee HAS decided
✗ The committee have decided
(Collective nouns are singular)

### Pronoun Reference
Every noun needs a clear pronoun referent.
✗ "When the minister met the president, HE was angry."
(Who was angry?)

### Modifiers
Place modifiers next to what they modify.
✗ "Walking to work, the rain soaked her."
(The rain wasn't walking)
✓ "Walking to work, she was soaked by rain."

## Clarity Techniques

### Cut Unnecessary Words
❌ "Due to the fact that" → ✓ "Because"
❌ "At this point in time" → ✓ "Now"
❌ "In order to" → ✓ "To"

### Use Active Voice
❌ "The decision was made by the board"
✓ "The board decided"

### One Idea Per Sentence
Complex ≠ sophisticated. Clear = professional.

## Editing Exercise

### Process
1. Read aloud
2. Cut 20%
3. Check every "that" and "which"
4. Verify every claim
5. Read aloud again
        `,
        assignment: {
          title: "Edit Exercise + Rewrite",
          brief: "Edit a provided problematic text (400 words). Submit: the corrected version, a list of all changes made with explanations, and a 200-word reflection on what you learned.",
          storyType: "EDITORIAL",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
      {
        week: 3,
        title: "Editorial Structure & Arguments",
        overview: "Thesis, evidence, counterargument, and editorial craft.",
        video: { title: "Building the Editorial Argument", placeholder: true },
        notes: `
# Week 3: Editorial Structure & Arguments

## Learning Objectives
- Structure persuasive arguments
- Support opinions with evidence
- Address counterarguments

## Editorial Structure

### 1. Hook + Thesis (Par 1-2)
- Open with news peg or striking fact
- State your position clearly
- Preview your argument

### 2. Evidence (Body)
- Supporting point 1 + evidence
- Supporting point 2 + evidence
- Supporting point 3 + evidence

### 3. Counterargument (Near end)
- Acknowledge strongest objection
- Explain why your position still holds
- Shows intellectual honesty

### 4. Conclusion
- Restate position
- Call to action
- Memorable close

## Evidence Standards

### Types of Evidence
- Statistics (sourced)
- Expert opinion (attributed)
- Examples (specific)
- Historical precedent
- Logical reasoning

### Opinion/Fact Labeling
Distinguish clearly:
- "The government allocated Sh 5 billion" (FACT)
- "This allocation is insufficient" (OPINION)

## The Steel Man

### What It Is
Present the STRONGEST version of the opposing argument, then refute it.

### Why It Matters
- Shows intellectual honesty
- Strengthens your argument
- Builds credibility
- Respects readers' intelligence
        `,
        assignment: {
          title: "Editorial 1",
          brief: "Write your first editorial (600-800 words) with clear thesis, evidence, and counterargument. Label each claim as FACT or OPINION. Include an evidence log citing all sources.",
          storyType: "EDITORIAL",
          wordCountMin: 600,
          wordCountMax: 800,
          sourcesRequired: 4,
          maxMarks: 10,
        },
      },
      {
        week: 4,
        title: "Clichés, Jargon & Concision",
        overview: "Eliminating clichés, translating jargon, writing concisely.",
        video: { title: "Cutting the Fat", placeholder: true },
        notes: `
# Week 4: Clichés, Jargon & Concision

## Learning Objectives
- Identify and eliminate clichés
- Translate jargon
- Write concisely

## Cliché Detection

### What Is a Cliché?
An overused expression that has lost its impact:
- "At the end of the day"
- "Going forward"
- "Think outside the box"
- "Level the playing field"

### Why Avoid Them
- Show lazy thinking
- Lack specificity
- Lose reader attention
- Weaken your voice

### Fix: Be Specific
❌ "The policy is a game-changer"
✓ "The policy will reduce waiting times from 6 months to 2 weeks"

## Jargon Busting

### When to Translate
- Always for general audiences
- Technical terms need explanation
- Acronyms defined on first use

### How to Translate
1. Use plain language
2. Explain in parentheses
3. Use analogies
4. Give examples

## Concision

### Cut Words, Keep Meaning
| Wordy | Concise |
|-------|---------|
| "In spite of the fact that" | "Although" |
| "A large number of" | "Many" |
| "Is able to" | "Can" |
| "Make a decision" | "Decide" |

### The 20% Rule
Your first draft is probably 20% too long. Cut ruthlessly.
        `,
        assignment: {
          title: "Concision Drill + Revised Editorial",
          brief: "Complete cliché/jargon exercises (provided). Then revise your Week 3 editorial: cut at least 15% of word count while keeping all key points. Submit both versions with revision notes.",
          storyType: "EDITORIAL",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 4,
          maxMarks: 10,
        },
      },
      {
        week: 5,
        title: "Headlines & Captions",
        overview: "Headline craft, caption writing, accuracy in display copy.",
        video: { title: "Headlines That Work", placeholder: true },
        notes: `
# Week 5: Headlines & Captions

## Learning Objectives
- Write accurate, compelling headlines
- Craft informative captions
- Understand display copy function

## Headline Fundamentals

### Purpose
- Attract attention
- Convey the news
- Fit the space
- Be accurate

### Headline Types
1. **News headline**: States the news
2. **Feature headline**: Creates intrigue
3. **Question headline**: Raises issue
4. **Quote headline**: Uses key quote

### Rules
- Active voice
- Present tense
- Specific, not vague
- No articles (a, an, the) usually
- Count characters

## Caption Writing

### Caption Elements
1. Who/what is in the image
2. What's happening
3. Context not visible
4. Photo credit

### Style
- Present tense for action
- Past tense for completed events
- Don't state the obvious
- Add value

## Accuracy in Display

### Critical Importance
Headlines and captions are often all people read.
- Must be accurate
- No clickbait
- Represent story fairly
- Avoid sensationalism

### Common Errors
- Overpromising
- Misleading emphasis
- Missing attribution
- Sensationalizing
        `,
        assignment: {
          title: "Headline & Caption Set",
          brief: "Write 20 items: 10 headlines (various types) for provided stories and 10 captions for provided images. Include analysis of what makes each effective.",
          storyType: "EDITORIAL",
          wordCountMin: 400,
          wordCountMax: 600,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
      {
        week: 6,
        title: "Writing Reviews",
        overview: "Criteria-based evaluation, fairness, and review structure.",
        video: { title: "The Art of the Review", placeholder: true },
        notes: `
# Week 6: Writing Reviews

## Learning Objectives
- Apply criteria-based evaluation
- Write fair, informed reviews
- Structure reviews effectively

## Review vs Criticism

### Review
- Evaluates specific work
- Helps reader decide
- Accessible language
- Clear recommendation

### Criticism
- Analyzes deeply
- Places in context
- For specialized audience
- May not recommend

## Criteria-Based Review

### Establish Criteria
Before reviewing, identify:
- What makes this type of thing good?
- What standards apply?
- What does the audience want?

### Evaluate Against Criteria
- Be specific
- Give examples
- Be fair
- Acknowledge your biases

## Review Structure

### 1. Hook
- Attention-grabbing opening
- Establishes tone

### 2. Overview
- What is it? (Brief description)
- Context (Creator, genre, etc.)

### 3. Evaluation
- Strengths (with examples)
- Weaknesses (with examples)
- Comparison to similar works

### 4. Verdict
- Clear recommendation
- Who should/shouldn't engage
- Overall assessment

## Fairness in Reviews

### Principles
- Evaluate on its own terms
- Consider intended audience
- Acknowledge your biases
- Don't spoil unnecessarily
        `,
        assignment: {
          title: "Film or Book Review",
          brief: "Write a review (500-800 words) of a film or book. Include explicit criteria, specific evidence, fair assessment, and clear recommendation. Submit a criteria table showing how you evaluated.",
          storyType: "REVIEW",
          wordCountMin: 500,
          wordCountMax: 800,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 7,
        title: "Event & Product Reviews",
        overview: "Experiential reviews, transparency, and disclosure.",
        video: { title: "Reviewing Experiences and Products", placeholder: true },
        notes: `
# Week 7: Event & Product Reviews

## Learning Objectives
- Review experiences and products
- Apply transparency standards
- Disclose relevant information

## Experiential Reviews

### Events
- Concerts, exhibitions, conferences
- Focus on experience
- Service and logistics matter
- Audience perspective

### Products
- Consumer goods, technology
- Hands-on testing required
- Comparative evaluation
- Value assessment

## Transparency Requirements

### Disclose:
- How you obtained the product (free, purchased, loaned)
- Your relationship to the subject
- Relevant biases or conflicts
- Testing conditions

### Example Disclosures
> "I received a review unit from the manufacturer."
> "I attended as a paying guest."
> "Full disclosure: I have been a fan of this artist for years."

## Review Methodology

### For Products
- How long did you use it?
- What did you test?
- How does it compare?
- What's the value proposition?

### For Events
- What was the setting?
- Who was the audience?
- What was the program?
- How was the execution?

## Ethical Considerations

### Independence
- Don't let freebies bias you
- Disclose all relationships
- Be honest about disappointments
- Consider reader trust
        `,
        assignment: {
          title: "Event or Product Review",
          brief: "Write a review (500-800 words) of an event or product you've experienced. Include disclosure statement, criteria, specific evidence, and recommendation.",
          storyType: "REVIEW",
          wordCountMin: 500,
          wordCountMax: 800,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 8,
        title: "Specialized Reviews",
        overview: "Music and restaurant reviewing with specialized criteria.",
        video: { title: "Specialized Review Writing", placeholder: true },
        notes: `
# Week 8: Specialized Reviews

## Learning Objectives
- Apply specialized review criteria
- Write informed niche reviews
- Balance expertise with accessibility

## Music Reviews

### Criteria
- Performance quality
- Songwriting/composition
- Production
- Originality
- Emotional impact

### Language
- Technical terms explained
- Genre context
- Comparative references
- Avoid clichés

### Structure
- Opening hook
- Artist/album context
- Track-by-track or thematic
- Overall assessment

## Restaurant Reviews

### Criteria
- Food quality and taste
- Service
- Atmosphere
- Value
- Consistency

### Methodology
- Multiple visits ideal
- Try range of menu
- Note details
- Consider price point

### Ethics
- Pay for your own meal when possible
- Disclose if hosted
- Don't punish for one bad night
- Consider staff and workers

## Balancing Expertise

### The Challenge
- Know enough to evaluate
- Write for general audience
- Don't be elitist
- Share genuine enthusiasm
        `,
        assignment: {
          title: "Music or Restaurant Review",
          brief: "Write a specialized review (500-800 words): music (album, concert, or artist) OR restaurant. Apply specific criteria, demonstrate knowledge, and remain accessible to general readers.",
          storyType: "REVIEW",
          wordCountMin: 500,
          wordCountMax: 800,
          sourcesRequired: 2,
          maxMarks: 10,
        },
      },
      {
        week: 9,
        title: "Editorial Analysis",
        overview: "Analyzing editorials using media theory.",
        video: { title: "Analyzing Opinion Journalism", placeholder: true },
        notes: `
# Week 9: Editorial Analysis

## Learning Objectives
- Apply media theory to editorials
- Identify framing and agenda-setting
- Critique editorial practice

## Media Theory for Editorials

### Agenda-Setting
Media doesn't tell us WHAT to think, but WHAT to think ABOUT.

Questions:
- What topics does this editorial choose?
- What's excluded?
- What's the priority order?

### Framing
How an issue is presented shapes how it's understood.

Questions:
- What frame is used?
- What's emphasized?
- What's minimized?
- How would different frames change meaning?

### Gatekeeping
Who decides what gets published?

Questions:
- Who wrote this?
- Who approved it?
- What perspectives are missing?
- What voices are amplified?

## Editorial Analysis Framework

### 1. Context
- Publication and its stance
- When published and why
- Target audience

### 2. Argument Analysis
- What's the thesis?
- What evidence is used?
- How is counterargument handled?

### 3. Theory Application
- What agenda is set?
- What frame is used?
- Who is gatekeeper?

### 4. Critical Evaluation
- Is it effective?
- Is it fair?
- What's missing?
        `,
        assignment: {
          title: "Editorial Analysis",
          brief: "Analyze 2 editorials from different publications on the same topic. Apply agenda-setting, framing, and gatekeeping theory. Write a comparative analysis (800-1200 words).",
          storyType: "EDITORIAL",
          wordCountMin: 800,
          wordCountMax: 1200,
          sourcesRequired: 4,
          maxMarks: 10,
        },
      },
      {
        week: 10,
        title: "Portfolio & Reflection",
        overview: "Final editorial revision, portfolio, and reflection.",
        video: { title: "Your Opinion Writing Portfolio", placeholder: true },
        notes: `
# Week 10: Portfolio & Reflection

## Learning Objectives
- Revise based on peer feedback
- Assemble professional portfolio
- Reflect on opinion journalism

## Peer Critique Process

### Giving Feedback
- Be specific
- Be constructive
- Focus on the work
- Offer solutions

### Receiving Feedback
- Listen openly
- Ask clarifying questions
- Consider all feedback
- Decide what to apply

## Portfolio Assembly

### Include:
- 2-3 best editorials
- 2-3 best reviews
- Headline/caption work
- Editorial analysis
- Evidence of revision

### Present:
- Clean formatting
- Brief context for each
- Easy navigation
- Contact information

## Reflection Questions

### On Opinion Journalism
- What responsibilities come with opinion writing?
- How do you balance advocacy with fairness?
- How has your understanding of editorials changed?

### On Your Development
- What skills have you developed?
- What feedback was most valuable?
- What will you continue to work on?

### Looking Forward
- What opinion writing interests you?
- How will you use these skills?
- What's your next step?

## CA Summary

Portfolio and reflection contribute to CA (30%).
Exam is 70% of total.
        `,
        assignment: {
          title: "Portfolio + Final Reflection",
          brief: "Submit your revised portfolio: 2 editorials, 2 reviews, headline/caption work, analysis. Include a 500-word reflective essay on opinion journalism and your development.",
          storyType: "EDITORIAL",
          wordCountMin: 500,
          wordCountMax: 700,
          sourcesRequired: 0,
          maxMarks: 10,
        },
      },
    ],
  },
}

// ─── Helper Functions ───────────────────────────────────────────────

export function getWeeklyModules(courseCode) {
  return weeklyModules[courseCode] || null
}

export function getWeek(courseCode, weekNumber) {
  const course = weeklyModules[courseCode]
  if (!course) return null
  return course.weeks.find((w) => w.week === weekNumber) || null
}

export function getAllCourseCodes() {
  return Object.keys(weeklyModules)
}

// Calculate unlock date based on course start date
export function calculateUnlockDate(courseStartDate, weekNumber) {
  if (!courseStartDate) return null
  const startDate = new Date(courseStartDate)
  const unlockDate = new Date(startDate)
  unlockDate.setDate(startDate.getDate() + (weekNumber - 1) * 7)
  return unlockDate
}

// Check if a week is unlocked
export function isWeekUnlocked(courseStartDate, weekNumber, currentDate = new Date()) {
  const unlockDate = calculateUnlockDate(courseStartDate, weekNumber)
  if (!unlockDate) return true // No start date = all unlocked
  return currentDate >= unlockDate
}

// Get CA weight for week (equal distribution by default)
export function getWeekCAWeight(weekNumber, totalWeeks = 10) {
  // Each week contributes equally to CA
  // CA is 30% total, so each week is 3%
  return 30 / totalWeeks
}
