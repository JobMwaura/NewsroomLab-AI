"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { BookOpen, FileText, CheckCircle2, Brain, Sparkles, Eye, Shield, Lock, ChevronRight, GraduationCap, X, Layers, AlertTriangle, Save, Clock, RotateCcw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { demoAssignments, demoFactCheckerReview, demoEthicsReview, demoFramingReview } from "@/lib/demo-data"
import { STORY_TYPE_LABELS } from "@/lib/types"
import { getMicroLesson } from "@/lib/templates/micro-lessons"
import { getReflectionPromptSet } from "@/lib/templates/reflection-prompts"
import { canFinalSubmit } from "@/lib/verification-gate"
import { getStoryTemplate } from "@/lib/templates/story-templates"

// Storage key for auto-save
const STORAGE_KEY = "newsroomlab_editor_draft"

// Enhanced copy editor review with inline issues
function generateCopyEditorReview(text) {
  if (!text || text.length < 50) {
    return { issues: [], overallScore: 0, overallNotes: "Not enough text to review." }
  }
  
  const issues = []
  const sentences = text.split(/[.!?]+/).filter(s => s.trim())
  
  // Check for passive voice
  const passivePatterns = [/was \w+ed/gi, /were \w+ed/gi, /is being/gi, /has been/gi, /had been/gi, /will be \w+ed/gi]
  passivePatterns.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      matches.forEach(match => {
        const index = text.toLowerCase().indexOf(match.toLowerCase())
        issues.push({
          type: "passive_voice",
          severity: "warning",
          text: match,
          position: index,
          message: "Passive voice detected. Consider using active voice for stronger, clearer writing.",
          suggestion: "Rewrite in active voice: [Subject] [verb] [object]",
          color: "bg-yellow-200 dark:bg-yellow-900/50"
        })
      })
    }
  })
  
  // Check for wordy phrases
  const wordyPhrases = {
    "in order to": "to",
    "due to the fact that": "because",
    "at this point in time": "now",
    "in the event that": "if",
    "for the purpose of": "to",
    "in spite of the fact that": "although",
    "a large number of": "many",
    "the majority of": "most",
    "in close proximity to": "near",
    "at the present time": "now",
    "it is important to note that": "[delete]",
    "it should be noted that": "[delete]",
    "there is": "[rewrite sentence]",
    "there are": "[rewrite sentence]",
  }
  
  Object.entries(wordyPhrases).forEach(([phrase, fix]) => {
    const regex = new RegExp(phrase, "gi")
    const matches = text.match(regex)
    if (matches) {
      matches.forEach(match => {
        const index = text.toLowerCase().indexOf(phrase.toLowerCase())
        issues.push({
          type: "wordy",
          severity: "suggestion",
          text: match,
          position: index,
          message: `Wordy phrase: "${match}"`,
          suggestion: `Replace with: "${fix}"`,
          color: "bg-blue-200 dark:bg-blue-900/50"
        })
      })
    }
  })
  
  // Check for clichés
  const cliches = ["at the end of the day", "think outside the box", "game changer", "moving forward", "paradigm shift", "synergy", "leverage", "stakeholders", "circle back", "touch base", "low-hanging fruit"]
  cliches.forEach(cliche => {
    if (text.toLowerCase().includes(cliche)) {
      const index = text.toLowerCase().indexOf(cliche)
      issues.push({
        type: "cliche",
        severity: "warning",
        text: cliche,
        position: index,
        message: `Cliché detected: "${cliche}"`,
        suggestion: "Replace with more specific, original language.",
        color: "bg-orange-200 dark:bg-orange-900/50"
      })
    }
  })
  
  // Check for long sentences (>35 words)
  sentences.forEach((sentence, idx) => {
    const words = sentence.trim().split(/\s+/)
    if (words.length > 35) {
      const index = text.indexOf(sentence.trim())
      issues.push({
        type: "long_sentence",
        severity: "error",
        text: sentence.trim().slice(0, 50) + "...",
        position: index,
        message: `Sentence too long (${words.length} words). Aim for 20-25 words max.`,
        suggestion: "Break into shorter sentences for clarity.",
        color: "bg-red-200 dark:bg-red-900/50"
      })
    }
  })
  
  // Check for repeated words
  const words = text.toLowerCase().match(/\b\w{4,}\b/g) || []
  const wordCounts = {}
  words.forEach(word => { wordCounts[word] = (wordCounts[word] || 0) + 1 })
  Object.entries(wordCounts).forEach(([word, count]) => {
    if (count > 3 && !["that", "this", "with", "from", "have", "been", "were", "said", "will", "would", "their", "they", "there", "about"].includes(word)) {
      issues.push({
        type: "repetition",
        severity: "suggestion",
        text: word,
        position: text.toLowerCase().indexOf(word),
        message: `Word "${word}" repeated ${count} times.`,
        suggestion: "Use synonyms or restructure to avoid repetition.",
        color: "bg-purple-200 dark:bg-purple-900/50"
      })
    }
  })
  
  // Check for missing attribution
  const quotePattern = /"[^"]+"/g
  const quotes = text.match(quotePattern) || []
  quotes.forEach(quote => {
    const index = text.indexOf(quote)
    const after = text.slice(index + quote.length, index + quote.length + 50)
    if (!after.match(/said|says|according to|stated|noted|explained|added|wrote|reported/i)) {
      issues.push({
        type: "attribution",
        severity: "error",
        text: quote.slice(0, 30) + (quote.length > 30 ? "..." : ""),
        position: index,
        message: "Quote may be missing attribution.",
        suggestion: "Add attribution: who said this?",
        color: "bg-red-200 dark:bg-red-900/50"
      })
    }
  })
  
  // Check for AP style issues
  const apIssues = [
    { pattern: /\b(\d),(\d{3})\b/g, message: "AP Style: Use numerals for numbers above 10", fix: "Check AP style for numbers" },
    { pattern: /\bpercent\b/gi, message: "AP Style: Use % symbol with numerals", fix: "e.g., '50%' not '50 percent'" },
    { pattern: /\b(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2},/gi, message: "AP Style: Abbreviate months with dates", fix: "e.g., 'Jan. 5' not 'January 5'" },
  ]
  
  apIssues.forEach(({ pattern, message, fix }) => {
    const matches = text.match(pattern)
    if (matches) {
      matches.slice(0, 2).forEach(match => {
        issues.push({
          type: "ap_style",
          severity: "suggestion",
          text: match,
          position: text.indexOf(match),
          message,
          suggestion: fix,
          color: "bg-cyan-200 dark:bg-cyan-900/50"
        })
      })
    }
  })
  
  // Calculate score
  const errorCount = issues.filter(i => i.severity === "error").length
  const warningCount = issues.filter(i => i.severity === "warning").length
  const suggestionCount = issues.filter(i => i.severity === "suggestion").length
  const score = Math.max(0, 100 - (errorCount * 15) - (warningCount * 8) - (suggestionCount * 3))
  
  return {
    issues: issues.sort((a, b) => b.severity === "error" ? 1 : -1),
    overallScore: score,
    overallNotes: score >= 80 
      ? "Good work! Minor improvements suggested." 
      : score >= 60 
        ? "Several issues need attention before submission."
        : "Significant revision needed. Address the highlighted issues."
  }
}

function LessonCoachPanel({ lessonIds, onClose }) {
  const [activeLessonId, setActiveLessonId] = useState(lessonIds[0] || null)
  const activeLesson = activeLessonId ? getMicroLesson(activeLessonId) : null
  if (!lessonIds || lessonIds.length === 0) return null
  
  return (
    <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/30 dark:bg-blue-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            Lesson Coach
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {lessonIds.slice(0, 8).map((id) => {
            const lesson = getMicroLesson(id)
            if (!lesson) return null
            const isActive = activeLessonId === id
            return (
              <button
                key={id}
                onClick={() => setActiveLessonId(id)}
                className={isActive 
                  ? "text-xs px-2 py-1 rounded-md bg-blue-600 text-white" 
                  : "text-xs px-2 py-1 rounded-md bg-white dark:bg-zinc-800 border hover:bg-blue-100"}
              >
                {lesson.icon} {lesson.title.length > 20 ? lesson.title.slice(0, 20) + "..." : lesson.title}
              </button>
            )
          })}
        </div>
        {activeLesson && (
          <ScrollArea className="max-h-[350px]">
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">{activeLesson.icon} {activeLesson.title}</h4>
              <div className="text-xs text-muted-foreground whitespace-pre-line">{activeLesson.content}</div>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

const workflowSteps = [
  { id: "plan", label: "Reporting Plan", icon: BookOpen },
  { id: "draft", label: "Draft", icon: FileText },
  { id: "verification", label: "Verification", icon: CheckCircle2 },
  { id: "ai-review", label: "AI Review", icon: Brain },
  { id: "revision", label: "Revision", icon: Sparkles },
  { id: "reflection", label: "Reflection", icon: Eye },
  { id: "submit", label: "Submit", icon: Shield },
]

function EditorInner() {
  const searchParams = useSearchParams()
  const templateParam = searchParams.get("template")
  const storyTemplate = templateParam ? getStoryTemplate(templateParam) : null
  const demoAssignment = demoAssignments[0]
  
  const assignment = {
    ...demoAssignment,
    title: storyTemplate ? storyTemplate.name : demoAssignment.title,
    brief: storyTemplate ? storyTemplate.description : demoAssignment.brief,
    storyType: storyTemplate ? storyTemplate.category : demoAssignment.storyType,
    constraints: {
      wordCountMin: storyTemplate?.wordCountRange?.min ?? demoAssignment.constraints.wordCountMin,
      wordCountMax: storyTemplate?.wordCountRange?.max ?? demoAssignment.constraints.wordCountMax
    },
    verificationRules: storyTemplate?.verificationDefaults
      ? { minItems: storyTemplate.verificationDefaults.minItems }
      : demoAssignment.verificationRules,
  }
  
  const lessonIds = storyTemplate?.microLessonIds ?? ["lead_writing", "inverted_pyramid", "attribution_rules", "nut_graf"]
  const reflectionPromptSet = getReflectionPromptSet(storyTemplate?.reflectionQuestionSetId ?? "news_reporting")
  
  const [activeTab, setActiveTab] = useState("plan")
  const [draftContent, setDraftContent] = useState("")
  const [headline, setHeadline] = useState("")
  const [revisedContent, setRevisedContent] = useState("")
  const [planCompleted, setPlanCompleted] = useState(false)
  const [planData, setPlanData] = useState({ angle: "", questions: ["", "", "", "", ""] })
  const [showLessonCoach, setShowLessonCoach] = useState(true)
  const [reflectionAnswers, setReflectionAnswers] = useState({})
  const [aiDisclosure, setAiDisclosure] = useState({ tools: "", usage: "" })
  const [aiReviewRequested, setAiReviewRequested] = useState(false)
  const [aiReviewLoading, setAiReviewLoading] = useState(false)
  const [aiReviewData, setAiReviewData] = useState(null)
  const [revisionCompleted, setRevisionCompleted] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)
  const [hasSavedDraft, setHasSavedDraft] = useState(false)
  const [verificationItems, setVerificationItems] = useState([
    { id: "1", claim: "", evidence: "", sourceType: "URL", sourceRef: "", confidence: "MEDIUM", riskLevel: "LOW" }
  ])
  
  // Load saved draft on mount
  useEffect(() => {
    const savedKey = `${STORAGE_KEY}_${templateParam || "default"}`
    const saved = localStorage.getItem(savedKey)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setHasSavedDraft(true)
        // Don't auto-load, let user choose
      } catch (e) {
        console.error("Failed to parse saved draft:", e)
      }
    }
  }, [templateParam])
  
  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (draftContent || planData.angle || revisedContent) {
        saveDraft(true)
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [draftContent, planData, revisedContent, verificationItems, reflectionAnswers])
  
  const saveDraft = (auto = false) => {
    const savedKey = `${STORAGE_KEY}_${templateParam || "default"}`
    const data = {
      activeTab,
      draftContent,
      headline,
      revisedContent,
      planCompleted,
      planData,
      reflectionAnswers,
      aiDisclosure,
      aiReviewRequested,
      revisionCompleted,
      verificationItems,
      savedAt: new Date().toISOString(),
    }
    localStorage.setItem(savedKey, JSON.stringify(data))
    setLastSaved(new Date())
    if (!auto) {
      toast.success("Draft saved! You can continue later.")
    }
  }
  
  const loadSavedDraft = () => {
    const savedKey = `${STORAGE_KEY}_${templateParam || "default"}`
    const saved = localStorage.getItem(savedKey)
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setActiveTab(data.activeTab || "plan")
        setDraftContent(data.draftContent || "")
        setHeadline(data.headline || "")
        setRevisedContent(data.revisedContent || "")
        setPlanCompleted(data.planCompleted || false)
        setPlanData(data.planData || { angle: "", questions: ["", "", "", "", ""] })
        setReflectionAnswers(data.reflectionAnswers || {})
        setAiDisclosure(data.aiDisclosure || { tools: "", usage: "" })
        setAiReviewRequested(data.aiReviewRequested || false)
        setRevisionCompleted(data.revisionCompleted || false)
        setVerificationItems(data.verificationItems || [{ id: "1", claim: "", evidence: "", sourceType: "URL", sourceRef: "", confidence: "MEDIUM", riskLevel: "LOW" }])
        setHasSavedDraft(false)
        toast.success("Draft loaded! Continue where you left off.")
      } catch (e) {
        toast.error("Failed to load saved draft")
      }
    }
  }
  
  const clearSavedDraft = () => {
    const savedKey = `${STORAGE_KEY}_${templateParam || "default"}`
    localStorage.removeItem(savedKey)
    setHasSavedDraft(false)
    toast.success("Saved draft cleared. Starting fresh.")
  }
  
  const wordCount = draftContent.split(/\s+/).filter((w) => w.length > 0).length
  const verifiedItems = verificationItems.filter((v) => v.claim && v.evidence)
  
  const addVerificationItem = () => setVerificationItems((prev) => [
    ...prev,
    { id: String(prev.length + 1), claim: "", evidence: "", sourceType: "URL", sourceRef: "", confidence: "MEDIUM", riskLevel: "LOW" }
  ])
  
  const updateVerificationItem = (index, field, value) => setVerificationItems((prev) => {
    const updated = [...prev]
    updated[index] = { ...updated[index], [field]: value }
    return updated
  })
  
  const completionStatus = {
    plan: planCompleted,
    draft: wordCount >= (assignment.constraints.wordCountMin || 0),
    verification: verifiedItems.length >= (assignment.verificationRules.minItems || 0),
    "ai-review": aiReviewRequested,
    revision: revisionCompleted,
    reflection: Object.values(reflectionAnswers).join(" ").length >= 50,
    submit: false
  }
  
  const overallProgress = (Object.values(completionStatus).filter(Boolean).length / Object.values(completionStatus).length) * 100
  
  const submissionForGate = {
    plan: planCompleted ? { angle: "set" } : null,
    verificationTable: verifiedItems.map((v) => ({ ...v, sources: v.sourceRef ? [v.sourceRef] : [] })),
    sources: [],
    draftText: draftContent,
    reflection: Object.values(reflectionAnswers).join(" ") || null,
    aiDisclosure: aiDisclosure.tools ? { declared: true } : null,
    ethicsReview: {},
    sections: {}
  }
  
  const gateResult = canFinalSubmit(submissionForGate, {}, {
    wordCountRange: [assignment.constraints.wordCountMin, assignment.constraints.wordCountMax],
    requiredSections: []
  })
  
  const wordCountLabel = assignment.constraints.wordCountMin + "-" + assignment.constraints.wordCountMax + " words"

  return (
    <div className="space-y-6">
      {/* Saved Draft Banner */}
      {hasSavedDraft && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-sm">You have a saved draft</p>
                <p className="text-xs text-muted-foreground">Continue where you left off or start fresh</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearSavedDraft}>
                Start Fresh
              </Button>
              <Button size="sm" onClick={loadSavedDraft} className="gap-2">
                <RotateCcw className="h-3.5 w-3.5" />
                Load Draft
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>{assignment.courseName}</span>
            <ChevronRight className="h-3 w-3" />
            <Badge variant="secondary" className="text-xs">
              {storyTemplate?.category || STORY_TYPE_LABELS[assignment.storyType]}
            </Badge>
            {storyTemplate && (
              <>
                <ChevronRight className="h-3 w-3" />
                <Badge variant="outline" className="text-xs font-mono">{templateParam}</Badge>
              </>
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{assignment.title}</h1>
          <p className="text-muted-foreground mt-1">{wordCountLabel}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Save & Auto-save Status */}
          <div className="text-right">
            <Button variant="outline" size="sm" onClick={() => saveDraft(false)} className="gap-2">
              <Save className="h-3.5 w-3.5" />
              Save Draft
            </Button>
            {lastSaved && (
              <p className="text-xs text-muted-foreground mt-1">
                Last saved: {lastSaved.toLocaleTimeString()}
              </p>
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Progress</div>
            <div className="flex items-center gap-2">
              <Progress value={overallProgress} className="w-32 h-2" />
              <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
            </div>
          </div>
        </div>
      </div>

      {storyTemplate && (
        <div className="rounded-xl border bg-blue-50/50 dark:bg-blue-950/20 p-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900">
              <Layers className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm">{storyTemplate.name}</span>
                <Badge variant="secondary" className="text-xs">{storyTemplate.category}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{storyTemplate.description}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {workflowSteps.map((step, index) => {
          const isCompleted = completionStatus[step.id]
          const isActive = activeTab === step.id
          const StepIcon = step.icon
          let cn = "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap "
          if (isActive) cn += "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
          else if (isCompleted) cn += "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
          else cn += "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
          
          return (
            <button key={step.id} onClick={() => setActiveTab(step.id)} className={cn}>
              {isCompleted && !isActive ? <CheckCircle2 className="h-3 w-3" /> : <StepIcon className="h-3 w-3" />}
              {step.label}
              {index < workflowSteps.length - 1 && <ChevronRight className="h-3 w-3 ml-1 text-zinc-300" />}
            </button>
          )
        })}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="hidden">
          {workflowSteps.map((step) => (
            <TabsTrigger key={step.id} value={step.id}>{step.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Reporting Plan
              </CardTitle>
              <CardDescription>Plan your reporting approach before you start writing.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="angle">Story Angle *</Label>
                <Textarea 
                  id="angle" 
                  placeholder="What is the main angle or focus of your story?" 
                  className="min-h-[80px]" 
                  value={planData.angle}
                  onChange={(e) => setPlanData(prev => ({ ...prev, angle: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Key Questions to Answer</Label>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Input 
                    key={i} 
                    placeholder={"Question " + (i + 1)} 
                    className="mb-2" 
                    value={planData.questions[i]}
                    onChange={(e) => {
                      const newQuestions = [...planData.questions]
                      newQuestions[i] = e.target.value
                      setPlanData(prev => ({ ...prev, questions: newQuestions }))
                    }}
                  />
                ))}
              </div>
              <Button 
                onClick={() => { 
                  if (!planData.angle.trim()) {
                    toast.error("Please enter a story angle")
                    return
                  }
                  setPlanCompleted(true)
                  toast.success("Plan saved!")
                  setActiveTab("draft") 
                }} 
                className="gap-2"
                disabled={!planData.angle.trim()}
              >
                Save Plan & Continue <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Draft Editor
                  </CardTitle>
                  <CardDescription>Write your {storyTemplate?.name || "story"}.</CardDescription>
                </div>
                <div className="text-right text-sm">
                  <span className={"font-mono font-medium " + (wordCount < assignment.constraints.wordCountMin ? "text-red-600" : "text-green-600")}>
                    {wordCount}
                  </span>
                  <span className="text-muted-foreground"> / {wordCountLabel}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <details className="mb-6 rounded-lg border bg-zinc-50 dark:bg-zinc-900">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium">View Brief</summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground">{assignment.brief}</div>
              </details>
              
              {!showLessonCoach && (
                <Button variant="outline" size="sm" className="gap-2 text-blue-600 mb-4" onClick={() => setShowLessonCoach(true)}>
                  <GraduationCap className="h-3.5 w-3.5" />Show Lesson Coach
                </Button>
              )}
              
              <div className={showLessonCoach ? "grid gap-4 lg:grid-cols-[1fr_340px]" : ""}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="headline">Headline</Label>
                    <Input id="headline" placeholder="Write your headline..." className="text-base font-semibold" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="draft">Story Body</Label>
                    <Textarea 
                      id="draft" 
                      value={draftContent} 
                      onChange={(e) => setDraftContent(e.target.value)} 
                      placeholder="Start writing your story..." 
                      className="min-h-[400px] font-mono text-sm" 
                    />
                  </div>
                </div>
                {showLessonCoach && <LessonCoachPanel lessonIds={lessonIds} onClose={() => setShowLessonCoach(false)} />}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <Button variant="outline" size="sm">Save Draft</Button>
                <Button 
                  onClick={() => { toast.success("Draft saved!"); setActiveTab("verification") }} 
                  className="gap-2" 
                  disabled={wordCount < assignment.constraints.wordCountMin}
                >
                  Continue to Verification <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Verification Table
              </CardTitle>
              <CardDescription>
                Map every factual claim to evidence. Need at least <strong>{assignment.verificationRules.minItems}</strong> items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{verifiedItems.length} / {assignment.verificationRules.minItems}</span>
                </div>
                <Progress value={(verifiedItems.length / Math.max(assignment.verificationRules.minItems, 1)) * 100} className="h-2" />
              </div>
              
              <div className="space-y-4">
                {verificationItems.map((item, index) => (
                  <div key={item.id} className="rounded-xl border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Claim #{index + 1}</span>
                      <div className="flex gap-2">
                        <Select value={item.riskLevel} onValueChange={(v) => updateVerificationItem(index, "riskLevel", v)}>
                          <SelectTrigger className="w-36 h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="LOW">Low risk</SelectItem>
                            <SelectItem value="MEDIUM">Medium risk</SelectItem>
                            <SelectItem value="HIGH">High risk</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={item.confidence} onValueChange={(v) => updateVerificationItem(index, "confidence", v)}>
                          <SelectTrigger className="w-32 h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="HIGH">High conf.</SelectItem>
                            <SelectItem value="MEDIUM">Medium conf.</SelectItem>
                            <SelectItem value="LOW">Low conf.</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    {item.riskLevel === "HIGH" && (
                      <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-md px-2 py-1.5">
                        <AlertTriangle className="h-3 w-3" />
                        High-risk claim: requires 2 independent sources
                      </div>
                    )}
                    
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Claim</Label>
                        <Textarea 
                          placeholder="Quote the factual claim from your story..." 
                          className="min-h-[64px] text-sm" 
                          value={item.claim} 
                          onChange={(e) => updateVerificationItem(index, "claim", e.target.value)} 
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Evidence</Label>
                        <Textarea 
                          placeholder="Supporting evidence or quote..." 
                          className="min-h-[64px] text-sm" 
                          value={item.evidence} 
                          onChange={(e) => updateVerificationItem(index, "evidence", e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Source Type</Label>
                        <Select value={item.sourceType} onValueChange={(v) => updateVerificationItem(index, "sourceType", v)}>
                          <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="URL">URL/Website</SelectItem>
                            <SelectItem value="INTERVIEW">Interview</SelectItem>
                            <SelectItem value="DOCUMENT">Document</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Source Reference</Label>
                        <Input 
                          placeholder="URL or interviewee name" 
                          className="h-8 text-xs" 
                          value={item.sourceRef} 
                          onChange={(e) => updateVerificationItem(index, "sourceRef", e.target.value)} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={addVerificationItem}>+ Add Item</Button>
                <Button 
                  onClick={() => { toast.success("Verification saved!"); setActiveTab("ai-review") }} 
                  className="gap-2"
                >
                  Save & Request AI Review <Brain className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-review" className="space-y-6">
          {!aiReviewRequested ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle>Request AI Review</CardTitle>
                    <CardDescription>Four AI editors will review your draft</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-2">
                  {[
                    { icon: "✏️", title: "Copy Editor", desc: "Grammar, style, clarity, AP style" },
                    { icon: "🔍", title: "Fact-checker", desc: "Unsupported claims, verification gaps" },
                    { icon: "⚖️", title: "Ethics Review", desc: "Fairness, harm, privacy concerns" },
                    { icon: "🖼️", title: "Framing Analyst", desc: "Missing voices, bias detection" },
                  ].map((editor) => (
                    <div key={editor.title} className="rounded-lg border p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{editor.icon}</span>
                        <span className="font-medium text-sm">{editor.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{editor.desc}</p>
                    </div>
                  ))}
                </div>
                
                {draftContent.length < 100 && (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                    <AlertTriangle className="inline h-4 w-4 mr-2" />
                    Your draft is too short. Write at least 100 characters before requesting review.
                  </div>
                )}
                
                <Button 
                  onClick={async () => {
                    setAiReviewLoading(true)
                    // Simulate AI review processing
                    await new Promise(resolve => setTimeout(resolve, 2000))
                    // Generate real copy editor review based on draft content
                    const copyReview = generateCopyEditorReview(draftContent)
                    setAiReviewData({ copyEditor: copyReview })
                    setAiReviewRequested(true)
                    setAiReviewLoading(false)
                    toast.success("AI review complete! Check each editor's feedback.")
                  }} 
                  className="w-full gap-2"
                  disabled={draftContent.length < 100 || aiReviewLoading}
                >
                  {aiReviewLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Analyzing your draft...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" />
                      Request AI Review
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="rounded-xl border bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-6 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-blue-950/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Brain className="h-6 w-6 text-purple-600" />
                    <div>
                      <h2 className="text-lg font-bold">AI Edit Desk Review</h2>
                      <p className="text-sm text-muted-foreground">Four AI editors have reviewed your draft.</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    Complete
                  </Badge>
                </div>
              </div>
              
              <Tabs defaultValue="copy" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="copy">✏️ Copy Editor</TabsTrigger>
                  <TabsTrigger value="factcheck">🔍 Fact-checker</TabsTrigger>
                  <TabsTrigger value="ethics">⚖️ Ethics</TabsTrigger>
                  <TabsTrigger value="framing">🖼️ Framing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="copy">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-base">Copy Editor</CardTitle>
                          <CardDescription>{aiReviewData?.copyEditor?.overallNotes || "Analyzing..."}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Score:</span>
                          <Badge 
                            variant={aiReviewData?.copyEditor?.overallScore >= 80 ? "default" : aiReviewData?.copyEditor?.overallScore >= 60 ? "secondary" : "destructive"}
                            className="text-base px-3"
                          >
                            {aiReviewData?.copyEditor?.overallScore || 0}/100
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Highlighted Draft Preview */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Your Draft with Highlighted Issues</Label>
                        <div className="rounded-lg border bg-white dark:bg-zinc-900 p-4 text-sm font-mono leading-relaxed max-h-64 overflow-y-auto">
                          {draftContent.split(/(\s+)/).map((word, idx) => {
                            const issue = aiReviewData?.copyEditor?.issues?.find(i => 
                              word.toLowerCase().includes(i.text.toLowerCase().split(" ")[0])
                            )
                            if (issue) {
                              return (
                                <span 
                                  key={idx} 
                                  className={`${issue.color} px-0.5 rounded cursor-help`}
                                  title={`${issue.message}\n→ ${issue.suggestion}`}
                                >
                                  {word}
                                </span>
                              )
                            }
                            return <span key={idx}>{word}</span>
                          })}
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200"></span> Error</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200"></span> Warning</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-200"></span> Wordy</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-200"></span> Cliché</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-200"></span> Repetition</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-cyan-200"></span> AP Style</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Issue List */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Issues Found ({aiReviewData?.copyEditor?.issues?.length || 0})</Label>
                          <div className="flex gap-2 text-xs">
                            <Badge variant="destructive">{aiReviewData?.copyEditor?.issues?.filter(i => i.severity === "error").length || 0} errors</Badge>
                            <Badge variant="secondary">{aiReviewData?.copyEditor?.issues?.filter(i => i.severity === "warning").length || 0} warnings</Badge>
                            <Badge variant="outline">{aiReviewData?.copyEditor?.issues?.filter(i => i.severity === "suggestion").length || 0} suggestions</Badge>
                          </div>
                        </div>
                        <ScrollArea className="max-h-80">
                          <div className="space-y-2">
                            {aiReviewData?.copyEditor?.issues?.map((issue, idx) => (
                              <div 
                                key={idx} 
                                className={`rounded-lg border p-3 ${
                                  issue.severity === "error" ? "border-red-200 bg-red-50 dark:bg-red-950/30" :
                                  issue.severity === "warning" ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30" :
                                  "border-zinc-200 bg-zinc-50 dark:bg-zinc-900"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Badge 
                                        variant={issue.severity === "error" ? "destructive" : issue.severity === "warning" ? "secondary" : "outline"}
                                        className="text-xs"
                                      >
                                        {issue.type.replace(/_/g, " ")}
                                      </Badge>
                                      <span className={`px-1.5 py-0.5 rounded text-xs font-mono ${issue.color}`}>
                                        {issue.text}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{issue.message}</p>
                                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                                      <strong>Fix:</strong> {issue.suggestion}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {(!aiReviewData?.copyEditor?.issues || aiReviewData.copyEditor.issues.length === 0) && (
                              <div className="text-center py-8 text-muted-foreground">
                                <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                                <p>No issues found! Your copy looks clean.</p>
                              </div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="factcheck">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Fact-checker</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {demoFactCheckerReview.unsupportedClaims.map((c, i) => (
                        <div key={i} className="rounded-lg border border-red-200 bg-red-50 p-3 mb-2">
                          <p className="text-sm"><strong>Unsupported:</strong> {c.quote}</p>
                          <p className="text-sm">{c.reason}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="ethics">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Ethics Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {demoEthicsReview.riskIssues.map((issue, i) => (
                        <div key={i} className="rounded-lg border p-3 mb-2">
                          <Badge className="text-xs mb-1">{issue.category}</Badge>
                          <p className="text-sm">{issue.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="framing">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Framing Analysis</CardTitle>
                      <CardDescription>Dominant Frame: {demoFramingReview.dominantFrame}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-sm">Missing Voices</h3>
                      <ul className="list-disc list-inside">
                        {demoFramingReview.missingVoices.map((v, i) => (
                          <li key={i} className="text-sm">{v}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end">
                <Button onClick={() => setActiveTab("revision")} className="gap-2">
                  Start Revision <Sparkles className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="revision" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Draft v2 - Revision
                  </CardTitle>
                  <CardDescription>Address AI feedback and improve your draft.</CardDescription>
                </div>
                <div className="text-right text-sm">
                  <span className={"font-mono font-medium " + (revisedContent.length > draftContent.length ? "text-green-600" : "text-muted-foreground")}>
                    {revisedContent.split(/\s+/).filter(w => w.length > 0).length}
                  </span>
                  <span className="text-muted-foreground"> words</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {!aiReviewRequested && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                  <AlertTriangle className="inline h-4 w-4 mr-2" />
                  Complete the AI Review step first to get feedback for your revision.
                </div>
              )}
              
              <div className="rounded-lg border bg-zinc-50 dark:bg-zinc-900 p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">Original Draft (Reference)</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 text-xs"
                    onClick={() => setRevisedContent(draftContent)}
                  >
                    Copy to revision
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground max-h-32 overflow-y-auto">
                  {draftContent || "No draft content yet"}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Revised Draft</Label>
                <Textarea 
                  placeholder="Write your revised draft here... Address the feedback from the AI editors."
                  className="min-h-[400px] font-mono text-sm" 
                  value={revisedContent}
                  onChange={(e) => setRevisedContent(e.target.value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => setActiveTab("ai-review")}>
                  ← Back to AI Review
                </Button>
                <Button 
                  onClick={() => { 
                    if (revisedContent.length < 100) {
                      toast.error("Please write at least 100 characters")
                      return
                    }
                    setRevisionCompleted(true)
                    toast.success("Revision saved!") 
                    setActiveTab("reflection") 
                  }} 
                  className="gap-2"
                  disabled={revisedContent.length < 100}
                >
                  Save & Continue <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reflection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Reflection & AI Disclosure
              </CardTitle>
              <CardDescription>Reflect on your reporting process and disclose AI usage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Reflection Prompts</Label>
                {(reflectionPromptSet?.prompts || []).map((prompt) => (
                  <div key={prompt.id} className="space-y-2 rounded-lg border p-4">
                    <Label className="text-sm font-medium">{prompt.question}</Label>
                    <Textarea 
                      placeholder="Write your reflection..." 
                      className="min-h-[80px] text-sm" 
                      value={reflectionAnswers[prompt.id] || ""} 
                      onChange={(e) => setReflectionAnswers((prev) => ({ ...prev, [prompt.id]: e.target.value }))} 
                    />
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <h3 className="font-semibold">AI Usage Disclosure</h3>
              <div className="space-y-2">
                <Label>AI Tools Used</Label>
                <Input 
                  placeholder="e.g., NewsroomLab AI editors, ChatGPT..." 
                  value={aiDisclosure.tools} 
                  onChange={(e) => setAiDisclosure((p) => ({ ...p, tools: e.target.value }))} 
                />
              </div>
              <div className="space-y-2">
                <Label>What Did You Use AI For?</Label>
                <Textarea 
                  placeholder="e.g., I used the copy editor for grammar suggestions..." 
                  className="min-h-[80px]" 
                  value={aiDisclosure.usage} 
                  onChange={(e) => setAiDisclosure((p) => ({ ...p, usage: e.target.value }))} 
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => { toast.success("Reflection saved!"); setActiveTab("submit") }} className="gap-2">
                  Continue to Submit <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Final Submission Gate
              </CardTitle>
              <CardDescription>All gates must pass before you can submit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const gates = [
                  { gate: "plan", label: "Reporting plan completed", passed: planCompleted },
                  { gate: "draft", label: "Draft meets word count (" + wordCount + " / " + wordCountLabel + ")", passed: wordCount >= assignment.constraints.wordCountMin },
                  { gate: "verification", label: "Verification table (" + verifiedItems.length + " / " + assignment.verificationRules.minItems + " items)", passed: verifiedItems.length >= assignment.verificationRules.minItems },
                  { gate: "ai-review", label: "AI review completed", passed: aiReviewRequested },
                  { gate: "revision", label: "Revision completed", passed: revisionCompleted },
                  { gate: "reflection", label: "Reflection completed", passed: Object.values(reflectionAnswers).join(" ").length >= 50 },
                  { gate: "disclosure", label: "AI disclosure completed", passed: !!(aiDisclosure.tools || aiDisclosure.usage) },
                ]
                const passedCount = gates.filter(g => g.passed).length
                const allPassed = passedCount === gates.length
                
                return (
                  <>
                    <div className={"rounded-lg border p-3 text-sm " + (allPassed ? "border-green-200 bg-green-50 text-green-700" : "border-amber-200 bg-amber-50 text-amber-700")}>
                      {allPassed 
                        ? "✅ All gates passed. Ready to submit!" 
                        : `${gates.length - passedCount} gate(s) still need attention.`}
                    </div>
                    
                    <div className="space-y-2">
                      {gates.map(({ gate, label, passed }) => (
                        <div key={gate} className={"flex items-center gap-3 rounded-lg border p-3 " + (passed ? "border-green-200 bg-green-50" : "border-zinc-200 bg-zinc-50")}>
                          {passed ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <Lock className="h-5 w-5 text-zinc-400" />}
                          <span className={"text-sm flex-1 " + (passed ? "text-green-700" : "text-muted-foreground")}>{label}</span>
                          {!passed && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => setActiveTab(gate === "disclosure" ? "reflection" : gate)}
                            >
                              Go to step
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <Button 
                      size="lg" 
                      className="w-full gap-2" 
                      disabled={!allPassed} 
                      onClick={() => toast.success("🎉 Submission received! Your work is now with your lecturer.")}
                    >
                      {allPassed ? (
                        <><Shield className="h-4 w-4" />Submit Final Version</>
                      ) : (
                        <><Lock className="h-4 w-4" />Submit (Locked - {gates.length - passedCount} gates remaining)</>
                      )}
                    </Button>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function EditorPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-24">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    }>
      <EditorInner />
    </Suspense>
  )
}
