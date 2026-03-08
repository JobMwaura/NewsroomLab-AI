// ─── NewsroomLab AI — Lecturer Resource Centre ──────────────────────
// Real-life examples and teaching resources organized by type and course

export const resourceCategories = [
  {
    id: "press-releases",
    title: "Press Releases",
    description: "Professional press releases — good, bad, and notable examples",
    icon: "📣",
    color: "amber",
    courses: ["HCC312", "HCC109"],
  },
  {
    id: "news-stories",
    title: "News Stories",
    description: "Published news articles showcasing different styles and techniques",
    icon: "📰",
    color: "blue",
    courses: ["HCC109", "HCC205", "HCC314"],
  },
  {
    id: "features",
    title: "Features & Profiles",
    description: "Longform journalism, profiles, and narrative non-fiction",
    icon: "📖",
    color: "emerald",
    courses: ["HCC316", "HCC205"],
  },
  {
    id: "broadcast",
    title: "Broadcast Scripts",
    description: "Radio and TV scripts with timing and production notes",
    icon: "📺",
    color: "purple",
    courses: ["HCC109", "HCC205"],
  },
  {
    id: "editorials",
    title: "Editorials & Opinion",
    description: "Opinion pieces, editorials, and persuasive writing examples",
    icon: "✍️",
    color: "rose",
    courses: ["HCC420"],
  },
  {
    id: "reviews",
    title: "Reviews & Criticism",
    description: "Film, book, restaurant, and cultural reviews",
    icon: "⭐",
    color: "yellow",
    courses: ["HCC420"],
  },
  {
    id: "crisis-comms",
    title: "Crisis Communications",
    description: "Case studies of crisis PR — successes and failures",
    icon: "🚨",
    color: "red",
    courses: ["HCC312"],
  },
  {
    id: "style-guides",
    title: "Style Guides & References",
    description: "AP Style quick references, newsroom guidelines",
    icon: "📚",
    color: "slate",
    courses: ["HCC109", "HCC205", "HCC312", "HCC314", "HCC316", "HCC420"],
  },
]

export const resourceItems = {
  // ═══════════════════════════════════════════════════════════════════
  // PRESS RELEASES
  // ═══════════════════════════════════════════════════════════════════
  "press-releases": [
    {
      id: "pr-good-1",
      title: "Apple Product Launch Press Release",
      source: "Apple Newsroom",
      year: 2024,
      quality: "excellent",
      description: "Classic example of effective product launch PR — clear, newsworthy, quotable.",
      teachingPoints: [
        "Strong lead with key announcement",
        "Strategic quote placement",
        "Includes all required boilerplate elements",
        "Easy for journalists to repurpose",
      ],
      content: `
FOR IMMEDIATE RELEASE

Apple Unveils iPhone 15 Pro with Revolutionary Titanium Design

CUPERTINO, CALIFORNIA — Apple today announced iPhone 15 Pro and iPhone 15 Pro Max, featuring a strong and light titanium design — a first for iPhone — along with the A17 Pro chip, a customizable Action button, and a new pro camera system with a 5x optical zoom camera.

"iPhone 15 Pro is the most advanced iPhone we've ever made," said Tim Cook, Apple's CEO. "With its groundbreaking titanium design, powerful A17 Pro chip, and incredible camera improvements, iPhone 15 Pro delivers an unparalleled smartphone experience."

iPhone 15 Pro features a aerospace-grade titanium band with a new brushed texture, making it the lightest Pro model ever. The new Action button replaces the traditional Ring/Silent switch, allowing users to customize quick access to their favorite features.

The A17 Pro chip, built on a 3-nanometer process, delivers the biggest graphics upgrade in iPhone history with a new 6-core GPU that enables hardware-accelerated ray tracing.

Pricing and Availability
iPhone 15 Pro starts at $999 (US), and iPhone 15 Pro Max starts at $1,199 (US). Both models will be available to preorder beginning Friday, September 15, and in stores beginning Friday, September 22.

About Apple
Apple revolutionized personal technology with the introduction of the Macintosh in 1984. Today, Apple leads the world in innovation with iPhone, iPad, Mac, Apple Watch, and Apple TV.

Press Contact:
Apple Media Helpline
media.help@apple.com
(408) 974-2042
      `,
      annotations: [
        { type: "structure", note: "Perfect inverted pyramid structure" },
        { type: "quote", note: "CEO quote adds authority and is easily excerpted" },
        { type: "boilerplate", note: "Clear company description and contact info" },
      ],
    },
    {
      id: "pr-good-2",
      title: "University Research Breakthrough",
      source: "University Communications Office",
      year: 2024,
      quality: "excellent",
      description: "Well-written academic press release that makes complex research accessible.",
      teachingPoints: [
        "Translates technical research for general audience",
        "Includes researcher quotes with context",
        "Provides publication details for verification",
        "Balances accuracy with accessibility",
      ],
      content: `
FOR IMMEDIATE RELEASE

University of Ghana Researchers Discover New Malaria Treatment Pathway

ACCRA — Scientists at the University of Ghana's Noguchi Memorial Institute have identified a promising new approach to treating drug-resistant malaria, potentially saving thousands of lives across West Africa.

The research, published today in the journal Nature Medicine, shows that a compound derived from a native Ghanaian plant can effectively block the malaria parasite's ability to reproduce, even in strains that have developed resistance to current medications.

"This discovery represents years of collaborative work between traditional medicine practitioners and modern laboratory scientists," said Dr. Akua Mensah, lead researcher and professor of biochemistry. "We've known for generations that this plant had healing properties — now we understand the science behind it."

The study involved laboratory testing on malaria parasites followed by controlled clinical trials with 200 patients across three teaching hospitals. Results showed a 94% cure rate among patients who had not responded to conventional artemisinin-based treatments.

"Drug-resistant malaria is one of the biggest public health challenges facing Africa," said Dr. Samuel Osei-Atweneboana, director of the Noguchi Institute. "This research offers genuine hope for a new generation of treatments."

The research team is now working with pharmaceutical partners to develop the compound into a medicine that can be manufactured at scale and distributed affordably across the continent.

The full study, "Novel antimalarial mechanism from Ghanaian traditional medicine," is available in Nature Medicine, DOI: 10.1038/nm.2024.xxxxx

Media Contact:
University of Ghana Communications
press@ug.edu.gh
+233 302 500 381

###
      `,
    },
    {
      id: "pr-bad-1",
      title: "Poorly Written Product Launch",
      source: "Anonymous Tech Company",
      year: 2023,
      quality: "poor",
      description: "Example of common press release mistakes — jargon, no news angle, unclear value.",
      teachingPoints: [
        "Identify the missing news hook",
        "Note excessive marketing language",
        "Spot missing essential elements",
        "Discuss how to improve",
      ],
      content: `
FOR IMMEDIATE RELEASE

TechCorp Solutions Leverages Synergistic Innovation to Deliver Next-Gen Customer Experiences

[CITY] — TechCorp Solutions, a leading provider of enterprise solutions, today announced the availability of its revolutionary platform that will transform how businesses engage with their customers.

Our cutting-edge solution leverages AI-powered analytics and machine learning algorithms to deliver unprecedented insights that drive business value across the enterprise ecosystem.

"We're thrilled to bring this game-changing solution to market," said John Smith, CEO. "Our team has worked tirelessly to create a best-in-class platform that will disrupt the industry."

Key features include:
• Advanced analytics dashboard
• Seamless integration capabilities  
• Cloud-native architecture
• Enterprise-grade security

TechCorp Solutions is committed to helping businesses thrive in the digital economy.

Contact TechCorp for more information.
      `,
      annotations: [
        { type: "error", note: "No actual news — what specifically is being announced?" },
        { type: "error", note: "Jargon-filled: 'leverages synergistic innovation' means nothing" },
        { type: "error", note: "No pricing, availability, or concrete details" },
        { type: "error", note: "Quote adds no information — just corporate speak" },
        { type: "error", note: "Missing: company description, proper contact, city name" },
      ],
    },
    {
      id: "pr-crisis-1",
      title: "Product Recall Announcement",
      source: "Consumer Products Company",
      year: 2023,
      quality: "excellent",
      description: "Model crisis communication — transparent, responsible, action-oriented.",
      teachingPoints: [
        "Note transparency about the problem",
        "Clear instructions for consumers",
        "Takes responsibility without excessive blame",
        "Provides multiple contact channels",
      ],
      content: `
FOR IMMEDIATE RELEASE

SafeHome Products Issues Voluntary Recall of 50,000 Portable Heaters Due to Fire Risk

BIRMINGHAM — SafeHome Products Ltd today announced a voluntary recall of approximately 50,000 Model PH-2000 portable heaters sold in the UK between September 2022 and January 2023 due to a potential fire hazard.

The company has received 12 reports of the heating element overheating, including two reports of minor property damage. No injuries have been reported.

"The safety of our customers is our absolute priority," said Sarah Thompson, CEO of SafeHome Products. "We are taking immediate action to address this issue and urge all customers with affected products to stop using them immediately."

WHAT CONSUMERS SHOULD DO:
• Stop using the PH-2000 heater immediately
• Unplug the unit and keep away from flammable materials
• Do not return to store — contact SafeHome directly
• Receive a full refund or replacement unit of your choice

HOW TO IDENTIFY AFFECTED PRODUCTS:
The recall affects Model PH-2000 heaters with serial numbers beginning with PH22 or PH23, located on the bottom of the unit.

CONTACT INFORMATION:
Recall Hotline: 0800-XXX-XXXX (24 hours)
Email: recall@safehome.co.uk
Website: www.safehome.co.uk/recall

SafeHome is working closely with trading standards authorities and has notified the appropriate regulatory bodies.

About SafeHome Products
SafeHome Products has been manufacturing home safety products for over 30 years, serving more than 2 million UK households.

###
      `,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // NEWS STORIES
  // ═══════════════════════════════════════════════════════════════════
  "news-stories": [
    {
      id: "news-hard-1",
      title: "Breaking News: Parliament Vote",
      source: "Teaching Example",
      year: 2024,
      quality: "excellent",
      description: "Classic hard news lead and inverted pyramid structure.",
      teachingPoints: [
        "Strong summary lead with the 5Ws",
        "Attribution in first paragraph",
        "Inverted pyramid structure",
        "Context provided efficiently",
      ],
      content: `
Parliament Approves Controversial Education Reform Bill

ACCRA — Parliament on Tuesday narrowly approved a sweeping education reform bill that will require all public universities to admit at least 30 percent of students from rural areas, sparking celebrations among advocates and warnings of legal challenges from opposition lawmakers.

The bill passed 147-139 after a marathon 12-hour debate in which legislators clashed over constitutional questions and the practical challenges of implementation.

"This is a historic day for educational equity in Ghana," said Education Minister Dr. Yaw Adutwum immediately after the vote. "For too long, our universities have served mainly urban elites. That changes now."

Opposition leader Haruna Iddrisu said his party would challenge the bill in the Supreme Court, calling the rural quota system "unconstitutional social engineering."

The legislation, which takes effect in September 2025, requires public universities to reserve nearly one-third of admissions for students who attended secondary school in designated rural districts. Universities that fail to meet the quota will face funding reductions of up to 20 percent.

University administrators have expressed concern about implementation timelines. Professor Emmanuel Gyimah-Boadi, Vice-Chancellor of the University of Ghana, said institutions need at least two years to develop adequate support systems for the influx of rural students.

"We support the goal of equity, but the timeline is unrealistic," Professor Gyimah-Boadi said in a statement. "These students will need academic support, accommodation, and financial assistance that we are not currently equipped to provide."

The bill was a key campaign promise of President Nana Akufo-Addo, who grew up in a rural community before attending elite schools in Accra.

An estimated 2 million students currently attend Ghana's 10 public universities, with fewer than 15 percent coming from rural backgrounds, according to Education Ministry data.
      `,
    },
    {
      id: "news-meeting-1",
      title: "City Council Meeting Coverage",
      source: "Teaching Example",
      year: 2024,
      quality: "good",
      description: "Solid meeting coverage that leads with the decision, not the meeting.",
      teachingPoints: [
        "Leads with decision/action, not 'The council met...'",
        "Includes vote count and key voices",
        "Provides context on impact",
        "Attributes opinions clearly",
      ],
      content: `
Council Approves $2.5 Million for New Youth Centre After Heated Debate

The City Council voted 5-2 Monday night to approve $2.5 million in funding for a new youth centre in the Riverside neighbourhood, overruling objections from residents who wanted the money spent on road repairs.

The 15,000-square-foot facility will include a gymnasium, computer lab, tutoring rooms, and after-school programming space. Construction is expected to begin in March and take approximately 18 months.

"Our young people deserve a safe place to go after school," said Councillor Maria Santos, who sponsored the proposal. "The youth centre will reduce crime, improve academic outcomes, and give families real support."

Councillors James Wright and Patricia Chen voted against the measure, arguing the city has more pressing infrastructure needs.

"We have roads falling apart, water mains bursting, and we're building a rec centre?" Wright said during the debate. "I support youth services, but our basic infrastructure is crumbling."

About 40 residents attended the meeting, with speakers roughly split between supporting youth programming and demanding infrastructure investment.

The funding will come from the city's capital improvement budget, meaning some planned road projects will be delayed to 2026.

The Riverside neighbourhood has the city's highest rate of juvenile crime and the lowest household income, according to recent census data.

The next council meeting is scheduled for February 15, when members will consider the youth centre's design plans.
      `,
    },
    {
      id: "news-data-1",
      title: "Data-Driven Story",
      source: "Teaching Example",
      year: 2024,
      quality: "excellent",
      description: "Example of using data effectively to tell a compelling story.",
      teachingPoints: [
        "Human lead despite data focus",
        "Data supports but doesn't overwhelm",
        "Context for numbers provided",
        "Multiple sources and perspectives",
      ],
      content: `
Hospital Wait Times Triple in Five Years, Data Shows

When Akosua Mensah arrived at Korle Bu Teaching Hospital's emergency department last month with severe chest pains, she waited six hours before seeing a doctor.

"I thought I was having a heart attack," said Mensah, 58. "I was terrified, sitting there in pain, watching the hours go by."

Her experience reflects a healthcare system under unprecedented strain. New Ministry of Health data obtained by this newspaper shows that average emergency room wait times at Ghana's four largest public hospitals have tripled from 45 minutes in 2019 to nearly 2.5 hours in 2024.

The figures, compiled from hospital administrative records, reveal:
• Korle Bu Teaching Hospital: 3.1 hours average wait (up from 52 minutes)
• Komfo Anokye Teaching Hospital: 2.4 hours (up from 38 minutes)
• Tamale Teaching Hospital: 2.1 hours (up from 44 minutes)
• Cape Coast Teaching Hospital: 1.9 hours (up from 41 minutes)

Health Minister Kwaku Agyeman-Manu acknowledged the crisis but said recent government investments would improve the situation.

"We have hired 2,000 additional nurses this year and are expanding emergency facilities at all teaching hospitals," he said. "Patients will see improvements by mid-2025."

The Ghana Medical Association blamed the crisis on a 40 percent increase in emergency visits over five years while staff levels remained essentially flat.

"Our doctors and nurses are working heroically under impossible conditions," said Dr. Justice Yankson, association president. "We need a fundamental increase in healthcare funding, not just promises."

International healthcare standards recommend emergency department wait times of under one hour for non-life-threatening conditions. Only 23 percent of Ghanaian patients currently meet that standard, down from 67 percent in 2019.

Patient advocacy groups have called for a parliamentary inquiry into the healthcare staffing crisis.
      `,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // FEATURES & PROFILES
  // ═══════════════════════════════════════════════════════════════════
  "features": [
    {
      id: "feature-profile-1",
      title: "Profile: The Market Woman",
      source: "Teaching Example",
      year: 2024,
      quality: "excellent",
      description: "Compelling human interest profile with scene-setting and character development.",
      teachingPoints: [
        "Anecdotal lead draws reader in",
        "Shows character through action and dialogue",
        "Balances scene with background info",
        "Universal theme (resilience) through specific story",
      ],
      content: `
The Queen of Makola Market

BY CORRESPONDENT

ACCRA — At 4:47 a.m., while most of the city sleeps, Auntie Grace is already shouting.

"Move that basket! Quick quick! The tomatoes will spoil in this heat!"

Grace Ampofo, 67, has been selling vegetables at Makola Market for 45 years. In that time, she has survived two market fires, three currency devaluations, one military coup, and a global pandemic. She has put four children through university on the proceeds of tomatoes, onions, and peppers.

She is not finished yet.

"Retirement is for people who don't like to eat," she says, laughing, her gold tooth catching the first rays of morning sun slanting through the market's corrugated iron roof.

At this hour, Makola is already in full motion. Porters balance impossible loads on their heads. Traders argue over prices in four languages. The air smells of fish, diesel, and the particular sweetness of overripe mangoes.

Grace navigates it all with the confidence of someone who knows every corner, every competitor, every customer by name.

"I started when I was 22," she says, arranging tomatoes into perfect pyramids with hands that have repeated this motion perhaps a million times. "My husband left. I had two babies. What choice?"

She borrowed money from her mother — 50 cedis, worth perhaps $5 at today's exchange rate — and bought vegetables from farmers outside the city. That first day, she sold everything by noon and doubled her investment.

"I thought: I can do this. I can survive."

Four and a half decades later, Grace employs three assistants and owns the stall outright. Her oldest daughter is a pharmacist. Her youngest son is studying engineering in Germany.

"Everything came from here," she says, gesturing at the market chaos surrounding her. "From tomatoes."

But the market Grace has known her entire adult life is changing. A new mall opened nearby last year. Young people prefer supermarkets. And the government has proposed relocating Makola's vendors to a new facility outside the city centre.

"They want to put us in some building in the bush," Grace says, her expression hardening. "They think we're dirty. Old-fashioned. They want to hide us."

She picks up a tomato, turns it slowly, inspecting for flaws.

"But I will be here. I was here before the mall. Before the politicians. I'll be here after."

The morning rush is beginning now. Grace stands, adjusts her head wrap, and assumes her position at the front of her stall.

"Tomatoes! Fine tomatoes! Come and see!"

Her voice carries across the market, strong and clear, as it has every morning for 45 years.
      `,
    },
    {
      id: "feature-trend-1",
      title: "Trend Story: The Co-Working Boom",
      source: "Teaching Example",
      year: 2024,
      quality: "good",
      description: "Solid trend piece balancing data with human examples.",
      teachingPoints: [
        "Concrete scene establishes trend",
        "Data provides scope and context",
        "Multiple perspectives (users, owners, experts)",
        "Addresses counterargument/limitations",
      ],
      content: `
Why Ghana's Young Professionals Are Abandoning Traditional Offices

On any given Tuesday afternoon, the iSpace Foundation's co-working hub in Osu buzzes with the particular energy of people who have opted out of the traditional 9-to-5.

Graphic designers hunch over laptops. Software developers argue over code. A YouTube content creator edits video in a corner booth. Someone is definitely recording a podcast.

None of them work for the same company. Most of them are under 35. And they represent a significant shift in how young Ghanaians are thinking about work.

Co-working spaces in Accra have more than tripled over the past five years, according to the Ghana Startup and Innovation Foundation. The city now hosts at least 47 such spaces, up from just 12 in 2019. Similar growth has occurred in Kumasi, Takoradi, and Tamale.

"The traditional office is dying for a lot of us," says Kofi Asante, 28, a freelance software developer who has worked from iSpace for three years. "Why would I commute an hour each way to sit in a cubicle when I can work here, meet interesting people, and actually enjoy my day?"

The co-working trend is driven by several factors: the growth of Ghana's tech and creative sectors, improved internet connectivity, and a generation that watched their parents spend decades in jobs they hated.

"Young people want flexibility and meaning," says Professor Akua Britwum, a sociologist at the University of Cape Coast who studies workplace trends. "They're less willing to sacrifice everything for job security."

But co-working isn't for everyone. Several spaces have closed in recent years as the initial hype faded. And critics argue the model works mainly for privileged urbanites in tech and creative fields.

"This is nice for software developers and designers," says labour organiser Emmanuel Anim. "But most Ghanaians can't choose where they work. They go where the jobs are."

Still, for those who can make it work, co-working offers something increasingly rare in modern life: a sense of community combined with professional freedom.

"I know everyone here," says Asante, gesturing around the busy room. "We help each other. We share opportunities. It's like having colleagues without having a boss."

He pauses, considers.

"Okay, the coffee's not as good as at corporate offices. But everything else is better."
      `,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // BROADCAST SCRIPTS
  // ═══════════════════════════════════════════════════════════════════
  "broadcast": [
    {
      id: "broadcast-hard-1",
      title: "Radio News Script: Breaking Story",
      source: "Teaching Example",
      year: 2024,
      quality: "excellent",
      description: "Clean radio news script with proper formatting and timing.",
      teachingPoints: [
        "Conversational language for ear",
        "Short sentences for easy delivery",
        "Time markers for producer",
        "Clear attribution within text",
      ],
      content: `
BREAKING NEWS — PARLIAMENT VOTE
Duration: 45 seconds
Anchor Read

---

Parliament has approved a controversial education bill that requires universities to admit more students from rural areas.

Lawmakers passed the measure just after midnight [or: early this morning] after a marathon debate lasting twelve hours. The final vote was close: one-forty-seven to one-thirty-nine.

Education Minister Yaw Adutwum called it — quote — "a historic day for educational equity."

But opposition leader Haruna Iddrisu says his party will challenge the bill in the Supreme Court.

The new law takes effect in September next year. It requires public universities to reserve nearly one-third of admissions for students from rural districts.

University leaders say they support the goal but worry about the tight timeline.

We'll have more on this developing story throughout the morning.

---

[END SCRIPT — 45 seconds at moderate pace]
      `,
    },
    {
      id: "broadcast-package-1",
      title: "TV News Package Script",
      source: "Teaching Example",
      year: 2024,
      quality: "excellent",
      description: "Full TV package with anchor intro, VO, SOT, and standup.",
      teachingPoints: [
        "Clear format markers (VO, SOT, etc.)",
        "Visual cues match narration",
        "Sound bites are concise and impactful",
        "Standup adds reporter presence",
      ],
      content: `
EDUCATION REFORM PACKAGE
Duration: 2:15
Reporter: Akua Nyarko

===================================

ANCHOR INTRO (15 sec)
---
A new education law is promising to transform who gets to attend Ghana's top universities. But not everyone is celebrating. Akua Nyarko reports from Parliament.

===================================

VO — PARLIAMENT EXTERIOR/INTERIOR (20 sec)
---
After twelve hours of heated debate, Parliament passed one of the most significant education reforms in decades. The new law requires public universities to reserve thirty percent of admissions for rural students.

===================================

SOT — DR. YAW ADUTWUM, Education Minister (10 sec)
"This is about fairness. For too long, university education has been reserved for those lucky enough to be born in the city."

===================================

VO — UNIVERSITY CAMPUS/STUDENTS (15 sec)  
---
The change affects all ten public universities, including the prestigious University of Ghana. Administrators say they support the goal but worry about implementation.

===================================

SOT — PROF. EMMANUEL GYIMAH-BOADI, Vice-Chancellor (12 sec)
"These students will need support — tutoring, financial aid, accommodation. We need time to build those systems."

===================================

VO — RURAL SCHOOL/STUDENTS (15 sec)
---
In rural communities, the news was met with hope. At this secondary school in Yendi, students say they finally see a path to higher education.

===================================

SOT — FATIMA IBRAHIM, Student (8 sec)
"I always thought university was for city people. Now maybe I can go too."

===================================

STANDUP — REPORTER AT PARLIAMENT (20 sec)
---
The opposition has promised to challenge this law in the Supreme Court, arguing the quota system is unconstitutional. But supporters say it's long overdue. The first class affected enters university in September twenty-twenty-five. Akua Nyarko, News Central, Parliament House.

===================================

TAG (ANCHOR) (5 sec)
---
We'll continue following this story as it develops.

===================================
[TOTAL: 2:15]
      `,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // EDITORIALS & OPINION
  // ═══════════════════════════════════════════════════════════════════
  "editorials": [
    {
      id: "editorial-1",
      title: "Editorial: A Welcome but Incomplete Reform",
      source: "Teaching Example",
      year: 2024,
      quality: "excellent",
      description: "Balanced editorial that takes a position while acknowledging complexity.",
      teachingPoints: [
        "Clear position stated early",
        "Acknowledges opposing arguments fairly",
        "Evidence supports claims",
        "Specific recommendations offered",
      ],
      content: `
EDITORIAL

A Welcome but Incomplete Reform

Parliament's passage of the university admission reform bill represents a genuine step toward educational equity. We welcome it — with reservations.

For decades, Ghana's public universities have served mainly urban elites. Children from rural areas, however talented, faced overwhelming barriers to admission. The new law addresses this injustice by requiring universities to reserve nearly one-third of places for rural students.

This is the right goal. Educational opportunity should not be determined by postal code.

But good intentions require sound implementation. Here, concerns are legitimate.

First, the timeline is too aggressive. Requiring full compliance by September 2025 gives universities barely eighteen months to develop support systems for students who may arrive with weaker academic preparation through no fault of their own. Setting these students up to fail would be crueler than the current system.

Second, the funding question remains unanswered. Where will the money come from for tutoring, financial aid, and accommodation? The bill imposes mandates without providing resources.

Third, the thirty percent quota, while perhaps necessary as a transitional measure, raises genuine constitutional questions. We encourage the Supreme Court to hear these arguments carefully, whatever the political pressures.

We urge the government to:

1. Extend the implementation timeline to September 2026, giving universities adequate preparation time.

2. Allocate specific funding for rural student support programs.

3. Establish clear metrics to evaluate the policy's effectiveness after three years.

This reform is long overdue. Let us implement it wisely.
      `,
    },
    {
      id: "column-1",
      title: "Opinion Column: Why I Changed My Mind",
      source: "Teaching Example",
      year: 2024,
      quality: "excellent",
      description: "Personal column with distinctive voice and intellectual honesty.",
      teachingPoints: [
        "First-person voice with clear perspective",
        "Intellectual honesty about changing position",
        "Personal experience supports argument",
        "Engages opposing view fairly",
      ],
      content: `
OPINION

Why I Changed My Mind on University Quotas

By Kweku Mensah

I used to think university admission quotas were a terrible idea. Let me explain why I was wrong.

Five years ago, I wrote a column in this newspaper arguing that any form of affirmative action was fundamentally unfair. "Merit should be the only criterion," I thundered. "Quotas patronize the very people they claim to help."

I meant every word.

Then I spent a year teaching at a rural secondary school in Upper West Region, and everything I thought I knew came apart.

My students were brilliant. Genuinely brilliant. Kids who devoured every book I could find them. Kids who solved math problems by candlelight because the electricity failed every evening. Kids who walked three hours each way to school.

And I watched, helplessly, as almost all of them failed to qualify for university.

Not because they lacked ability — but because they lacked preparation. Their school had no science lab, no library, no internet. They were competing against city students who had every advantage, and losing to students who were, frankly, less talented.

That's when I understood: the "merit" I had championed was itself a product of privilege. We were measuring outcomes, calling them ability, and pretending the race was fair.

Don't misunderstand me. I still have concerns about quotas. They're a blunt instrument. They don't address root causes. They can create resentment.

But sometimes blunt instruments are necessary. And sometimes the alternative — maintaining a system that systematically excludes talent based on geography — is worse.

My former student Fatima wants to study medicine. She's smarter than I was at her age. Under the old system, she had almost no chance.

Now she does.

That's not patronizing. That's justice.

---
Kweku Mensah is a columnist for this newspaper. Email: k.mensah@example.com
      `,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // REVIEWS
  // ═══════════════════════════════════════════════════════════════════
  "reviews": [
    {
      id: "review-film-1",
      title: "Film Review: 'The Fisherman's Daughter'",
      source: "Teaching Example",
      year: 2024,
      quality: "excellent",
      description: "Thoughtful film review balancing summary with analysis.",
      teachingPoints: [
        "Clear verdict without spoilers",
        "Context for the film provided",
        "Specific examples support judgments",
        "Balanced — acknowledges both strengths and weaknesses",
      ],
      content: `
FILM REVIEW

'The Fisherman's Daughter' — A Quiet Triumph
★★★★☆

Dir: Shirley Frimpong-Manso | Ghana/Nigeria | 118 min | Rating: 15

By FILM CRITIC

The fishing boats leave Cape Coast harbour before dawn, vanishing into darkness that seems to swallow everything. For ten-year-old Ama, watching from shore, they carry both her father and her fears.

This haunting image opens "The Fisherman's Daughter," Shirley Frimpong-Manso's finest film to date — a work of such delicate emotional precision that it lingers like morning fog on water.

The story is deceptively simple. After her father is lost at sea, Ama (remarkable newcomer Efua Asare) must navigate grief while her mother (Nana Ama McBrown, in a career-best performance) struggles to hold the family together. There are no easy resolutions, no Hollywood miracles at sea.

What we get instead is truth: the specific truth of a Ghanaian fishing community, and the universal truth of a child learning that parents cannot protect us from everything.

Frimpong-Manso shoots Cape Coast like someone who has spent years watching its light. Cinematographer Peter Budrić captures both the beauty and the danger of the sea — sometimes in the same frame. And the score, by Accra-based composer Worlasi, knows precisely when to swell and when to fall silent.

The film stumbles occasionally in its final act, where subplot about local politics feels grafted onto the intimate family story. And at nearly two hours, some viewers may find the deliberate pacing tests their patience.

But these are minor quibbles. "The Fisherman's Daughter" is that rare thing: a Ghanaian film that can stand alongside the best of world cinema, telling a story that is specifically ours yet speaks to everyone.

Bring tissues. You'll need them.

---
IN CINEMAS NOW
      `,
    },
    {
      id: "review-restaurant-1",
      title: "Restaurant Review: Azmera Ethiopian",
      source: "Teaching Example",
      year: 2024,
      quality: "good",
      description: "Engaging restaurant review with sensory detail and practical info.",
      teachingPoints: [
        "Sensory writing — taste, smell, texture",
        "Clear recommendation and value assessment",
        "Practical information included",
        "Personal voice without being self-indulgent",
      ],
      content: `
RESTAURANT REVIEW

Azmera Ethiopian Kitchen
★★★★☆

OBODAN ROAD, EAST LEGON

There's a moment, about three bites into an excellent meal, when you stop thinking about the food and simply surrender to it. At Azmera Ethiopian Kitchen, that moment arrived somewhere between the spicy doro wat and the cool tang of homemade ayib cheese.

This tiny restaurant — twelve tables, no reservations, perpetual queue — has been an open secret in East Legon for nearly two years. Owner and chef Hiwot Tesfaye learned to cook from her grandmother in Addis Ababa and brought those recipes, unchanged, to Accra.

The result is the most authentic Ethiopian food in the city, served with warmth and absolutely no pretension.

Start with the vegetarian sampler (65 cedis for two) — a vast platter of injera bread topped with six different stews. The misir wat, red lentils simmered in berbere spice, balances heat with earthy depth. The gomen, collard greens with garlic, provides cool contrast. And the injera itself — that spongy, sour flatbread that serves as both plate and utensil — is made fresh daily, with a tang that says someone actually took time to ferment it properly.

Meat-eaters should not miss the tibs (55 cedis), cubed beef sautéed with rosemary and jalapeño until crusty at the edges. Or the doro wat (75 cedis), the iconic Ethiopian chicken stew that takes three days to make and rewards every hour of patience.

Service can be slow when busy, which is most evenings. The space is cramped and loud. And the neighbourhood parking situation tests even Accra-hardened patience.

None of this matters. The food is simply too good.

Dinner for two with drinks: 180-250 cedis
Open: Tuesday-Sunday, 5pm-10pm
No reservations. Cash preferred.
      `,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // CRISIS COMMUNICATIONS
  // ═══════════════════════════════════════════════════════════════════
  "crisis-comms": [
    {
      id: "crisis-good-1",
      title: "Case Study: Johnson & Johnson Tylenol Recall (1982)",
      source: "Historical Analysis",
      year: 1982,
      quality: "excellent",
      description: "The gold standard of crisis communication — prioritized public safety over profits.",
      teachingPoints: [
        "Immediate, decisive action",
        "Transparency over defensiveness",
        "Public safety prioritized over short-term costs",
        "Long-term reputation protected",
      ],
      content: `
CRISIS COMMUNICATION CASE STUDY

Johnson & Johnson Tylenol Recall (1982)

THE CRISIS:
In September 1982, seven people in Chicago died after taking Tylenol capsules that had been laced with cyanide. The tampering occurred after the products left J&J's factories — the company was not at fault.

THE RESPONSE:
Despite being victims themselves, J&J took immediate, unprecedented action:

1. IMMEDIATE RECALL
Within days, J&J recalled 31 million bottles of Tylenol (value: $100 million) nationwide — not just in Chicago. CEO James Burke said: "The first responsibility is to the consumers."

2. FULL TRANSPARENCY
J&J established hotlines, held press conferences, and shared everything they knew. They didn't hide behind lawyers or issue carefully hedged statements.

3. COOPERATION WITH AUTHORITIES
The company worked closely with FBI and FDA, providing full access to facilities and records.

4. INNOVATION
J&J introduced tamper-evident packaging — now standard across the industry — before relaunching the product.

THE OUTCOME:
Tylenol's market share plunged from 35% to 8% immediately after the crisis. Within a year of relaunching with new safety features, it had recovered to 30%. Today it remains one of America's most trusted brands.

KEY LESSONS:
• Act fast, even if costly
• Prioritize safety over reputation — paradoxically, this protects reputation
• Be transparent, even when legally risky
• Take responsibility for solutions, even when not at fault
• Over-communicate rather than hide

This case remains the benchmark against which all crisis communication is measured.
      `,
    },
    {
      id: "crisis-bad-1",
      title: "Case Study: BP Deepwater Horizon Response (2010)",
      source: "Historical Analysis",
      year: 2010,
      quality: "poor",
      description: "How not to handle a crisis — defensiveness, minimization, and tone-deaf messaging.",
      teachingPoints: [
        "Minimizing the problem backfires",
        "Tone-deaf statements damage credibility",
        "Attempting to shift blame antagonizes public",
        "Recovery takes far longer than necessary",
      ],
      content: `
CRISIS COMMUNICATION CASE STUDY

BP Deepwater Horizon Response (2010)

THE CRISIS:
On April 20, 2010, the Deepwater Horizon oil rig exploded in the Gulf of Mexico, killing 11 workers and causing the largest marine oil spill in history. Nearly 5 million barrels of oil spilled over 87 days.

THE PROBLEMATIC RESPONSE:

1. MINIMIZATION
Initial estimates dramatically understated the spill rate. When independent scientists challenged BP's figures, the company appeared evasive.

CEO Tony Hayward: "The Gulf of Mexico is a very big ocean. The amount of volume of oil and dispersant we are putting into it is tiny in relation to the total water volume." (May 2010)

2. BLAME-SHIFTING
BP initially tried to blame contractors Transocean and Halliburton, antagonizing partners and appearing to dodge responsibility.

3. TONE-DEAF COMMENTS
Hayward made several statements that seemed to prioritize his own inconvenience over affected communities:

"I'd like my life back." (May 30, 2010)

While technically expressing frustration, this comment — made while Louisiana fishermen lost their livelihoods — was seen as callous and self-centered.

4. YACHT RACE ATTENDANCE
While oil still gushed into the Gulf, Hayward attended a yacht race in England, creating devastating optics.

THE OUTCOME:
BP spent over $65 billion on cleanup, compensation, and fines. Hayward was removed as CEO. The company's reputation took years to recover, and the "BP" name became synonymous with corporate irresponsibility.

LESSONS LEARNED:
• Don't minimize — acknowledge the full scope of the problem
• Take responsibility immediately — blame-shifting backfires
• Every statement will be scrutinized — avoid casual remarks
• Personal behavior of executives matters — optics are substance
• Trust, once lost, costs billions to rebuild

What could BP have done differently? Lead with empathy. Take immediate, visible responsibility. Over-communicate progress. Keep executives away from yachts.
      `,
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // STYLE GUIDES
  // ═══════════════════════════════════════════════════════════════════
  "style-guides": [
    {
      id: "style-ap-quick",
      title: "AP Style Quick Reference",
      source: "NewsroomLab Compilation",
      year: 2024,
      quality: "reference",
      description: "Essential AP Style rules every student should know.",
      teachingPoints: [
        "Numbers, dates, titles",
        "Attribution and quotations",
        "Common errors to avoid",
        "Ghana-specific adaptations",
      ],
      content: `
AP STYLE QUICK REFERENCE

NUMBERS
• Spell out one through nine; use figures for 10 and above
• Always use figures for: ages, money, percentages, time
• "The 5-year-old girl" (hyphenated as adjective)
• Spell out numbers that begin sentences: "Twenty people attended."

DATES & TIME
• Months: Spell out in text; abbreviate with dates (Jan. 15)
• Don't abbreviate March, April, May, June, July
• Time: 10 a.m., 3 p.m. (lowercase, periods, no :00)
• Dates: Feb. 14, 2024 (no "th" or "st")

TITLES
• Capitalize before name: President Akufo-Addo
• Lowercase standing alone: The president said...
• Lowercase after name: John Smith, president of the company

QUOTATIONS
• Periods and commas always inside quotes
• Colons and semicolons always outside quotes
• Attribution after quote: "We won," she said.
• Said is almost always best — avoid "stated," "noted," "shared"

COMMON ERRORS
• It's = it is; Its = possessive (no apostrophe!)
• Their (possession), there (place), they're (they are)
• Affect (verb) vs. effect (noun, usually)
• Principal (main/school head) vs. principle (rule)

NAMES
• First reference: full name with title
• Second reference: last name only
• Mr./Mrs./Ms. rarely used in news writing

LOCATIONS
• Spell out Ghana cities and regions
• Use recognised English spellings
• Provide context for lesser-known locations

ATTRIBUTION
• Use "said" for most quotes
• Present tense for ongoing situations: "says"
• Past tense for completed statements: "said"
• Place attribution at natural pause points
      `,
    },
  ],
}

// ─── Helper functions ────────────────────────────────────────────────

export function getResourceCategory(categoryId) {
  return resourceCategories.find(c => c.id === categoryId) || null
}

export function getResourcesByCourse(courseCode) {
  const normalized = courseCode?.replace(/\s+/g, "").toUpperCase()
  const relevantCategories = resourceCategories.filter(c => 
    c.courses.includes(normalized)
  )
  
  const resources = []
  relevantCategories.forEach(cat => {
    const items = resourceItems[cat.id] || []
    resources.push({
      category: cat,
      items: items,
    })
  })
  
  return resources
}

export function getResourceById(categoryId, resourceId) {
  const items = resourceItems[categoryId] || []
  return items.find(item => item.id === resourceId) || null
}

export function getAllResources() {
  return resourceCategories.map(cat => ({
    category: cat,
    items: resourceItems[cat.id] || [],
  }))
}
