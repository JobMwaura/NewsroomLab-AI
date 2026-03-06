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

// Accurate copy editor review with real issue detection
function generateCopyEditorReview(text) {
  if (!text || text.length < 50) {
    return { issues: [], overallScore: 100, overallNotes: "Not enough text to review." }
  }
  
  const issues = []
  const sentences = text.split(/[.!?]+/).filter(s => s.trim())
  const addedPositions = new Set() // Prevent duplicate issues at same position
  
  // Helper to add issue only if position is unique
  const addIssue = (issue) => {
    const key = `${issue.type}-${issue.position}-${issue.text}`
    if (!addedPositions.has(key)) {
      addedPositions.add(key)
      issues.push(issue)
    }
  }
  
  // 1. Check for passive voice (accurate regex)
  const passiveRegex = /\b(was|were|is|are|been|being|be)\s+(\w+ed|written|taken|given|made|done|shown|known|seen|found)\b/gi
  let match
  while ((match = passiveRegex.exec(text)) !== null) {
    addIssue({
      type: "passive_voice",
      severity: "warning",
      text: match[0],
      position: match.index,
      message: `Passive voice: "${match[0]}". Active voice is usually clearer.`,
      suggestion: "Rewrite: [Who] [did what] [to whom]",
      color: "bg-yellow-200 dark:bg-yellow-900/50"
    })
  }
  
  // 2. Check for wordy phrases (only exact matches)
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
  }
  
  Object.entries(wordyPhrases).forEach(([phrase, fix]) => {
    const regex = new RegExp(`\\b${phrase}\\b`, "gi")
    let m
    while ((m = regex.exec(text)) !== null) {
      addIssue({
        type: "wordy",
        severity: "suggestion",
        text: m[0],
        position: m.index,
        message: `Wordy: "${m[0]}" can be simpler.`,
        suggestion: `Replace with: "${fix}"`,
        color: "bg-blue-200 dark:bg-blue-900/50"
      })
    }
  })
  
  // 3. Check for clichés (exact phrase matches only)
  const cliches = [
    "at the end of the day", "think outside the box", "game changer", 
    "moving forward", "paradigm shift", "low-hanging fruit", 
    "circle back", "touch base", "best practices"
  ]
  cliches.forEach(cliche => {
    const regex = new RegExp(`\\b${cliche}\\b`, "gi")
    let m
    while ((m = regex.exec(text)) !== null) {
      addIssue({
        type: "cliche",
        severity: "warning",
        text: m[0],
        position: m.index,
        message: `Cliché: "${m[0]}"`,
        suggestion: "Use more specific, original language.",
        color: "bg-orange-200 dark:bg-orange-900/50"
      })
    }
  })
  
  // 4. Check for long sentences (>30 words is genuinely long)
  let sentenceStart = 0
  sentences.forEach((sentence) => {
    const trimmed = sentence.trim()
    if (!trimmed) return
    const wordCount = trimmed.split(/\s+/).length
    const position = text.indexOf(trimmed, sentenceStart)
    sentenceStart = position + trimmed.length
    
    if (wordCount > 30) {
      addIssue({
        type: "long_sentence",
        severity: "warning",
        text: trimmed.slice(0, 40) + "...",
        position: position,
        message: `Long sentence: ${wordCount} words. Consider breaking up.`,
        suggestion: "Aim for 15-25 words per sentence for readability.",
        color: "bg-red-200 dark:bg-red-900/50"
      })
    }
  })
  
  // 5. Check for repeated words (ACCURATE counting - only flag if truly excessive)
  const words = text.toLowerCase().match(/\b[a-z]{5,}\b/g) || [] // Only words 5+ chars
  const wordCounts = {}
  const commonWords = new Set([
    "about", "after", "again", "being", "could", "every", "first", "found", 
    "great", "house", "large", "little", "might", "never", "other", "people", 
    "place", "right", "should", "small", "still", "their", "there", "these", 
    "think", "those", "through", "under", "water", "where", "which", "while", 
    "would", "write", "years", "before", "between", "because", "through"
  ])
  
  words.forEach(word => {
    if (!commonWords.has(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1
    }
  })
  
  // Only flag words repeated 4+ times (not common words)
  Object.entries(wordCounts).forEach(([word, count]) => {
    if (count >= 4) {
      // Find all positions for context
      const positions = []
      let idx = 0
      const lowerText = text.toLowerCase()
      while ((idx = lowerText.indexOf(word, idx)) !== -1) {
        positions.push(idx)
        idx += word.length
      }
      
      addIssue({
        type: "repetition",
        severity: "suggestion",
        text: word,
        position: positions[0],
        message: `"${word}" appears ${count} times. Consider using synonyms.`,
        suggestion: `Found at positions: ${positions.slice(0, 3).map(p => `...${text.slice(Math.max(0,p-5), p+word.length+5)}...`).join(", ")}`,
        color: "bg-purple-200 dark:bg-purple-900/50"
      })
    }
  })
  
  // 6. Check for quotes without attribution (within 100 chars after quote)
  const quoteRegex = /"([^"]{10,})"/g
  while ((match = quoteRegex.exec(text)) !== null) {
    const afterQuote = text.slice(match.index + match[0].length, match.index + match[0].length + 100)
    const beforeQuote = text.slice(Math.max(0, match.index - 50), match.index)
    const hasAttribution = /\b(said|says|according to|stated|noted|explained|added|wrote|reported|told|asked)\b/i.test(afterQuote) ||
                          /\b(said|says|according to|stated|noted|explained|added|wrote|reported|told|asked)\b/i.test(beforeQuote)
    
    if (!hasAttribution) {
      addIssue({
        type: "attribution",
        severity: "error",
        text: match[0].slice(0, 30) + (match[0].length > 30 ? "..." : ""),
        position: match.index,
        message: "Quote may need attribution. Who said this?",
        suggestion: "Add 'said [Name]' or 'according to [Source]'",
        color: "bg-red-200 dark:bg-red-900/50"
      })
    }
  }
  
  // 7. AP Style: Full month names with dates
  const monthRegex = /\b(January|February|September|October|November|December)\s+\d{1,2}\b/gi
  while ((match = monthRegex.exec(text)) !== null) {
    addIssue({
      type: "ap_style",
      severity: "suggestion",
      text: match[0],
      position: match.index,
      message: `AP Style: Abbreviate "${match[0].split(" ")[0]}"`,
      suggestion: "Use: Jan., Feb., Sept., Oct., Nov., Dec. (March-July spelled out)",
      color: "bg-cyan-200 dark:bg-cyan-900/50"
    })
  }
  
  // 8. Check for "very" + adjective (weak construction)
  const veryRegex = /\bvery\s+\w+/gi
  while ((match = veryRegex.exec(text)) !== null) {
    addIssue({
      type: "weak_modifier",
      severity: "suggestion",
      text: match[0],
      position: match.index,
      message: `"${match[0]}" is weak. Use a stronger word.`,
      suggestion: "e.g., 'very big' → 'enormous', 'very small' → 'tiny'",
      color: "bg-blue-200 dark:bg-blue-900/50"
    })
  }
  
  // Calculate score based on issue severity
  const errorCount = issues.filter(i => i.severity === "error").length
  const warningCount = issues.filter(i => i.severity === "warning").length
  const suggestionCount = issues.filter(i => i.severity === "suggestion").length
  const score = Math.max(0, Math.min(100, 100 - (errorCount * 12) - (warningCount * 5) - (suggestionCount * 2)))
  
  // Sort by position in text for better UX
  const sortedIssues = issues.sort((a, b) => a.position - b.position)
  
  return {
    issues: sortedIssues,
    overallScore: score,
    overallNotes: issues.length === 0 
      ? "Excellent! No issues detected."
      : score >= 85 
        ? `Good work! ${issues.length} minor suggestions.`
        : score >= 70 
          ? `${issues.length} issues found. Review the feedback below.`
          : `${issues.length} issues need attention before submission.`
  }
}

// Helper to highlight text with issues for display
function highlightTextWithIssues(text, issues) {
  if (!text || !issues || issues.length === 0) return [{ text, issue: null }]
  
  const segments = []
  let lastEnd = 0
  
  // Sort issues by position
  const sortedIssues = [...issues].sort((a, b) => a.position - b.position)
  
  sortedIssues.forEach(issue => {
    // Add text before this issue
    if (issue.position > lastEnd) {
      segments.push({ text: text.slice(lastEnd, issue.position), issue: null })
    }
    // Add the highlighted issue text
    const issueEndPos = issue.position + issue.text.length
    if (issue.position >= lastEnd) {
      segments.push({ text: text.slice(issue.position, issueEndPos), issue })
      lastEnd = issueEndPos
    }
  })
  
  // Add remaining text
  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd), issue: null })
  }
  
  return segments
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
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <CardTitle className="text-base">Copy Editor</CardTitle>
                          <CardDescription className="text-sm">{aiReviewData?.copyEditor?.overallNotes || "Click 'Request AI Review' above to analyze your draft."}</CardDescription>
                        </div>
                        <Badge 
                          variant={aiReviewData?.copyEditor?.overallScore >= 80 ? "default" : aiReviewData?.copyEditor?.overallScore >= 60 ? "secondary" : "destructive"}
                          className="text-lg px-3"
                        >
                          {aiReviewData?.copyEditor?.overallScore ?? "--"}/100
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                      {/* Issue Summary */}
                      {aiReviewData?.copyEditor?.issues && aiReviewData.copyEditor.issues.length > 0 && (
                        <div className="flex gap-2 flex-wrap p-2 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                          <Badge variant="destructive">{aiReviewData.copyEditor.issues.filter(i => i.severity === "error").length} errors</Badge>
                          <Badge variant="secondary">{aiReviewData.copyEditor.issues.filter(i => i.severity === "warning").length} warnings</Badge>
                          <Badge variant="outline">{aiReviewData.copyEditor.issues.filter(i => i.severity === "suggestion").length} suggestions</Badge>
                        </div>
                      )}
                      
                      {/* Issue List - Compact */}
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
                            <div className="flex items-start gap-2 flex-wrap">
                              <Badge 
                                variant={issue.severity === "error" ? "destructive" : issue.severity === "warning" ? "secondary" : "outline"}
                                className="text-xs shrink-0"
                              >
                                {issue.type.replace(/_/g, " ")}
                              </Badge>
                              <code className={`px-1.5 py-0.5 rounded text-xs ${issue.color} break-all`}>
                                {issue.text}
                              </code>
                            </div>
                            <p className="text-sm text-muted-foreground mt-2">{issue.message}</p>
                            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                              <strong>→</strong> {issue.suggestion}
                            </p>
                          </div>
                        ))}
                        {(!aiReviewData?.copyEditor?.issues || aiReviewData.copyEditor.issues.length === 0) && (
                          <div className="text-center py-8 text-muted-foreground">
                            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                            <p className="font-medium">No issues found!</p>
                            <p className="text-sm">Your copy looks clean.</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Legend */}
                      {aiReviewData?.copyEditor?.issues?.length > 0 && (
                        <div className="flex flex-wrap gap-3 text-xs pt-2 border-t">
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200"></span> Error</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200"></span> Passive/Warning</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-200"></span> Wordy</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-200"></span> Cliché</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-200"></span> Repetition</span>
                          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-cyan-200"></span> AP Style</span>
                        </div>
                      )}
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

        <TabsContent value="revision" className="space-y-4">
          {/* Side-by-side layout: AI Feedback + Revision Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* LEFT: AI Feedback Panel (collapsible on mobile) */}
            <Card className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-120px)] overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Feedback
                  </CardTitle>
                  {aiReviewData?.copyEditor && (
                    <Badge 
                      variant={aiReviewData.copyEditor.overallScore >= 80 ? "default" : aiReviewData.copyEditor.overallScore >= 60 ? "secondary" : "destructive"}
                    >
                      {aiReviewData.copyEditor.overallScore}/100
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] lg:h-[calc(100vh-200px)]">
                  <div className="p-4 space-y-3">
                    {!aiReviewRequested ? (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                        <AlertTriangle className="inline h-4 w-4 mr-2" />
                        Complete AI Review first to see feedback here.
                      </div>
                    ) : aiReviewData?.copyEditor?.issues?.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="font-medium">No issues found!</p>
                        <p className="text-sm">Your copy looks clean.</p>
                      </div>
                    ) : (
                      <>
                        {/* Quick Stats */}
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="destructive" className="text-xs">
                            {aiReviewData?.copyEditor?.issues?.filter(i => i.severity === "error").length || 0} errors
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {aiReviewData?.copyEditor?.issues?.filter(i => i.severity === "warning").length || 0} warnings
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {aiReviewData?.copyEditor?.issues?.filter(i => i.severity === "suggestion").length || 0} tips
                          </Badge>
                        </div>
                        
                        {/* Issue List */}
                        <div className="space-y-2">
                          {aiReviewData?.copyEditor?.issues?.map((issue, idx) => (
                            <div 
                              key={idx} 
                              className={`rounded-lg border p-2.5 text-sm ${
                                issue.severity === "error" ? "border-red-200 bg-red-50 dark:bg-red-950/30" :
                                issue.severity === "warning" ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30" :
                                "border-zinc-200 bg-zinc-50 dark:bg-zinc-900"
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <span className={`shrink-0 px-1.5 py-0.5 rounded text-xs font-mono ${issue.color}`}>
                                  {issue.text.slice(0, 25)}{issue.text.length > 25 ? "..." : ""}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{issue.message}</p>
                              <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                                → {issue.suggestion}
                              </p>
                            </div>
                          ))}
                        </div>
                        
                        {/* Color Legend */}
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground mb-2">Legend:</p>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-200"></span> Error</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-yellow-200"></span> Warning</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-blue-200"></span> Wordy</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-purple-200"></span> Repetition</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            
            {/* RIGHT: Revision Editor */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Revised Draft
                    </CardTitle>
                    <CardDescription className="text-xs">Fix issues from the AI feedback panel</CardDescription>
                  </div>
                  <div className="text-right text-sm">
                    <span className={"font-mono font-medium " + (revisedContent.split(/\s+/).filter(w => w.length > 0).length >= (assignment.constraints.wordCountMin || 0) ? "text-green-600" : "text-muted-foreground")}>
                      {revisedContent.split(/\s+/).filter(w => w.length > 0).length}
                    </span>
                    <span className="text-muted-foreground text-xs"> / {assignment.constraints.wordCountMin || 200} words</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Original Draft Reference (collapsible) */}
                <details className="rounded-lg border bg-zinc-50 dark:bg-zinc-900">
                  <summary className="px-3 py-2 text-xs font-medium text-muted-foreground cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    📄 View Original Draft (click to expand)
                  </summary>
                  <div className="px-3 pb-3">
                    <div className="text-xs text-muted-foreground max-h-40 overflow-y-auto whitespace-pre-wrap border-t pt-2">
                      {draftContent || "No draft content yet"}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs mt-2"
                      onClick={() => setRevisedContent(draftContent)}
                    >
                      Copy original to revision →
                    </Button>
                  </div>
                </details>
                
                {/* Revision Textarea */}
                <div className="space-y-1">
                  <Textarea 
                    placeholder="Write your revised draft here...&#10;&#10;Tip: Keep this window open while reviewing AI feedback on the left. Fix each issue as you go."
                    className="min-h-[350px] lg:min-h-[450px] font-mono text-sm"
                    value={revisedContent}
                    onChange={(e) => setRevisedContent(e.target.value)}
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("ai-review")}>
                    ← Back to AI Review
                  </Button>
                  <div className="flex gap-2">
                    {revisedContent && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Re-run AI review on revised content
                          const newReview = generateCopyEditorReview(revisedContent)
                          setAiReviewData({ copyEditor: newReview })
                          toast.success(`Re-checked! Score: ${newReview.overallScore}/100`)
                        }}
                      >
                        <Brain className="h-3 w-3 mr-1" />
                        Re-check
                      </Button>
                    )}
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
                      className="gap-1"
                      disabled={revisedContent.length < 100}
                    >
                      Save & Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
                      onClick={() => {
                        // Save submission to localStorage for portfolio
                        const submission = {
                          id: `submission_${Date.now()}`,
                          title: headline || assignment.title,
                          storyType: assignment.storyType || "HARD_NEWS",
                          course: assignment.courseCode || "HCC 314",
                          date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
                          submittedAt: new Date().toISOString(),
                          draftContent: revisedContent || draftContent,
                          headline,
                          verifications: verifiedItems.length,
                          verificationTable: verifiedItems,
                          reflectionAnswers,
                          aiDisclosure,
                          score: undefined, // Will be graded later
                          selected: false,
                          assignmentId: assignment.id,
                          templateId: templateParam,
                        }
                        
                        // Get existing submissions
                        const existingSubmissions = JSON.parse(localStorage.getItem("newsroomlab_portfolio") || "[]")
                        
                        // Check if already submitted this assignment
                        const existingIndex = existingSubmissions.findIndex(s => s.assignmentId === assignment.id)
                        if (existingIndex >= 0) {
                          existingSubmissions[existingIndex] = submission
                        } else {
                          existingSubmissions.push(submission)
                        }
                        
                        localStorage.setItem("newsroomlab_portfolio", JSON.stringify(existingSubmissions))
                        
                        // Clear the draft from localStorage
                        const savedKey = `${STORAGE_KEY}_${templateParam || "default"}`
                        localStorage.removeItem(savedKey)
                        
                        toast.success("🎉 Submission received! Your work is now in your portfolio and sent to your lecturer.")
                      }}
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
