"use client"

import { useState } from "react"
import {
  BookOpen,
  FileText,
  CheckCircle2,
  Brain,
  Sparkles,
  Eye,
  Shield,
  Lock,
  ChevronRight,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import {
  demoAssignments,
  demoCopyEditorReview,
  demoFactCheckerReview,
  demoEthicsReview,
  demoFramingReview,
} from "@/lib/demo-data"
import { STORY_TYPE_LABELS } from "@/lib/types"

const workflowSteps = [
  { id: "plan", label: "Reporting Plan", icon: BookOpen, required: true },
  { id: "draft", label: "Draft", icon: FileText, required: true },
  { id: "verification", label: "Verification", icon: CheckCircle2, required: true },
  { id: "ai-review", label: "AI Review", icon: Brain, required: true },
  { id: "revision", label: "Revision", icon: Sparkles, required: false },
  { id: "reflection", label: "Reflection", icon: Eye, required: true },
  { id: "submit", label: "Submit", icon: Shield, required: true },
]

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("plan")
  const [draftContent, setDraftContent] = useState("")
  const [planCompleted, setPlanCompleted] = useState(false)
  const [verificationItems, setVerificationItems] = useState([
    { id: "1", claim: "", evidence: "", sourceType: "URL", sourceRef: "", confidence: "MEDIUM" },
  ])

  const assignment = demoAssignments[0] // Demo: County Budget assignment

  const wordCount = draftContent
    .split(/\s+/)
    .filter((w) => w.length > 0).length

  const addVerificationItem = () => {
    setVerificationItems([
      ...verificationItems,
      {
        id: String(verificationItems.length + 1),
        claim: "",
        evidence: "",
        sourceType: "URL",
        sourceRef: "",
        confidence: "MEDIUM",
      },
    ])
  }

  const completionStatus = {
    plan: planCompleted,
    draft: wordCount >= (assignment.constraints.wordCountMin || 0),
    verification: verificationItems.filter((v) => v.claim && v.evidence).length >= assignment.verificationRules.minItems,
    aiReview: false,
    revision: false,
    reflection: false,
    submit: false,
  }

  const overallProgress =
    Object.values(completionStatus).filter(Boolean).length /
    Object.values(completionStatus).length * 100

  return (
    <div className="space-y-6">
      {/* Assignment Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span>{assignment.courseName}</span>
            <ChevronRight className="h-3 w-3" />
            <Badge variant="secondary" className="text-xs">
              {STORY_TYPE_LABELS[assignment.storyType]}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{assignment.title}</h1>
          <p className="text-muted-foreground mt-1">
            Due {new Date(assignment.dueAt).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Progress</div>
          <div className="flex items-center gap-2">
            <Progress value={overallProgress} className="w-32 h-2" />
            <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </div>

      {/* Workflow Step Indicators */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {workflowSteps.map((step, index) => {
          const isCompleted = completionStatus[step.id]
          const isActive = activeTab === step.id
          return (
            <button
              key={step.id}
              onClick={() => setActiveTab(step.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap
                ${isActive
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : isCompleted
                  ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
            >
              {isCompleted && !isActive ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <step.icon className="h-3 w-3" />
              )}
              {step.label}
              {index < workflowSteps.length - 1 && (
                <ChevronRight className="h-3 w-3 ml-1 text-zinc-300 dark:text-zinc-600" />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="hidden">
          {workflowSteps.map((step) => (
            <TabsTrigger key={step.id} value={step.id}>
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ─── Reporting Plan ──────────────── */}
        <TabsContent value="plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Reporting Plan
              </CardTitle>
              <CardDescription>
                Plan your reporting approach before you start writing. What&apos;s your angle? Who will you talk to?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="angle">Story Angle</Label>
                <Textarea
                  id="angle"
                  placeholder="What is the main angle of your story? What makes it newsworthy?"
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>Key Questions to Answer</Label>
                <p className="text-xs text-muted-foreground">
                  What questions must your story answer for the reader?
                </p>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Input
                    key={i}
                    placeholder={`Question ${i}`}
                    className="mb-2"
                  />
                ))}
              </div>

              <div className="space-y-2">
                <Label>Sources to Seek</Label>
                <p className="text-xs text-muted-foreground">
                  Who do you need to interview or contact?
                </p>
                {[1, 2, 3].map((i) => (
                  <Input
                    key={i}
                    placeholder={`Source ${i} — name/title/role`}
                    className="mb-2"
                  />
                ))}
              </div>

              <div className="space-y-2">
                <Label>Documents to Consult</Label>
                <Textarea
                  placeholder="List documents, reports, datasets you'll use..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>Risks & Unknowns</Label>
                <Textarea
                  placeholder="What might go wrong? What don't you know yet?"
                  className="min-h-20"
                />
              </div>

              <Button
                onClick={() => {
                  setPlanCompleted(true)
                  toast.success("Reporting plan saved!")
                  setActiveTab("draft")
                }}
                className="gap-2"
              >
                Save Plan & Continue <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Draft Editor ──────────────── */}
        <TabsContent value="draft" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Draft Editor
                  </CardTitle>
                  <CardDescription>
                    Write your {STORY_TYPE_LABELS[assignment.storyType].toLowerCase()} story.
                  </CardDescription>
                </div>
                <div className="text-right text-sm">
                  <span
                    className={`font-mono font-medium ${
                      wordCount < (assignment.constraints.wordCountMin || 0)
                        ? "text-red-600"
                        : wordCount > (assignment.constraints.wordCountMax || 9999)
                        ? "text-amber-600"
                        : "text-green-600"
                    }`}
                  >
                    {wordCount}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}/ {assignment.constraints.wordCountMin}–{assignment.constraints.wordCountMax} words
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Assignment Brief Collapsible */}
              <details className="mb-6 rounded-lg border bg-zinc-50 dark:bg-zinc-900">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                  📋 View Assignment Brief
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground whitespace-pre-line">
                  {assignment.brief}
                </div>
              </details>

              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  placeholder="Write your headline..."
                  className="text-lg font-semibold"
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="draft">Story Body</Label>
                <Textarea
                  id="draft"
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  placeholder="Start writing your story here...

Remember:
• Lead with the most newsworthy element
• Attribute all claims to named sources
• Use specific figures, not vague language
• Follow the inverted pyramid structure"
                  className="min-h-[400px] font-mono text-sm leading-relaxed"
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button variant="outline" size="sm">
                  Save Draft
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Draft saved! Now complete your verification table.")
                    setActiveTab("verification")
                  }}
                  className="gap-2"
                  disabled={wordCount < (assignment.constraints.wordCountMin || 0)}
                >
                  Continue to Verification <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Verification Table ──────────────── */}
        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Verification Table
              </CardTitle>
              <CardDescription>
                Map every factual claim in your story to evidence and sources.
                You need at least <strong>{assignment.verificationRules.minItems}</strong> items
                with at least <strong>{assignment.verificationRules.minHighConfidence}</strong> high-confidence items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Progress indicator */}
              <div className="mb-6 rounded-lg border bg-zinc-50 p-4 dark:bg-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Verification Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {verificationItems.filter((v) => v.claim && v.evidence).length} / {assignment.verificationRules.minItems} required
                  </span>
                </div>
                <Progress
                  value={
                    (verificationItems.filter((v) => v.claim && v.evidence).length /
                      assignment.verificationRules.minItems) *
                    100
                  }
                  className="h-2"
                />
              </div>

              {/* Verification items */}
              <div className="space-y-4">
                {verificationItems.map((item, index) => (
                  <div key={item.id} className="rounded-xl border p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Item #{index + 1}
                      </span>
                      <Select defaultValue={item.confidence}>
                        <SelectTrigger className="w-32 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HIGH">🟢 High</SelectItem>
                          <SelectItem value="MEDIUM">🟡 Medium</SelectItem>
                          <SelectItem value="LOW">🔴 Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Claim (from your story)</Label>
                        <Textarea
                          placeholder="Quote the factual claim from your draft..."
                          className="min-h-16 text-sm"
                          value={item.claim}
                          onChange={(e) => {
                            const updated = [...verificationItems]
                            updated[index].claim = e.target.value
                            setVerificationItems(updated)
                          }}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Evidence</Label>
                        <Textarea
                          placeholder="What evidence supports this claim?"
                          className="min-h-16 text-sm"
                          value={item.evidence}
                          onChange={(e) => {
                            const updated = [...verificationItems]
                            updated[index].evidence = e.target.value
                            setVerificationItems(updated)
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Source Type</Label>
                        <Select defaultValue={item.sourceType}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="URL">🔗 URL/Link</SelectItem>
                            <SelectItem value="INTERVIEW">🎙️ Interview</SelectItem>
                            <SelectItem value="DOCUMENT">📄 Document</SelectItem>
                            <SelectItem value="OBSERVATION">👁️ Observation</SelectItem>
                            <SelectItem value="DATASET">📊 Dataset</SelectItem>
                            <SelectItem value="OTHER">📌 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Source Reference</Label>
                        <Input
                          placeholder="URL, document name, or interviewee"
                          className="h-8 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={addVerificationItem}>
                  + Add Verification Item
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Verification table saved! Requesting AI review...")
                    setActiveTab("ai-review")
                  }}
                  className="gap-2"
                >
                  Save & Request AI Review <Brain className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── AI Review ──────────────── */}
        <TabsContent value="ai-review" className="space-y-6">
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-6 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-blue-950/30 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <h2 className="text-lg font-bold">AI Edit Desk Review</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Four AI editors have reviewed your draft. Address the must-fix items before submitting your revision.
            </p>
          </div>

          {/* AI Editor Tabs */}
          <Tabs defaultValue="copy" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="copy" className="gap-1 text-xs">
                ✍️ Copy Editor
              </TabsTrigger>
              <TabsTrigger value="factcheck" className="gap-1 text-xs">
                🔍 Fact-checker
              </TabsTrigger>
              <TabsTrigger value="ethics" className="gap-1 text-xs">
                ⚖️ Ethics
              </TabsTrigger>
              <TabsTrigger value="framing" className="gap-1 text-xs">
                🔎 Framing
              </TabsTrigger>
            </TabsList>

            {/* Copy Editor */}
            <TabsContent value="copy">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Copy Editor Review</CardTitle>
                    <Badge variant="outline">Structure Score: {demoCopyEditorReview.structureScore}/5</Badge>
                  </div>
                  <CardDescription>{demoCopyEditorReview.overallNotes}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    Must-Fix Items
                    <Badge variant="destructive" className="text-xs">
                      {demoCopyEditorReview.mustFix.length}
                    </Badge>
                  </h3>
                  {demoCopyEditorReview.mustFix.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-lg border p-4 space-y-2 ${
                        item.severity === "critical"
                          ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
                          : item.severity === "important"
                          ? "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950"
                          : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={item.severity === "critical" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {item.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.category}</span>
                      </div>
                      <blockquote className="border-l-2 border-zinc-300 pl-3 text-sm italic text-muted-foreground dark:border-zinc-700">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                      <p className="text-sm"><strong>Issue:</strong> {item.issue}</p>
                      <p className="text-sm text-green-700 dark:text-green-400"><strong>Fix:</strong> {item.fix}</p>
                    </div>
                  ))}

                  <Separator />

                  <h3 className="font-semibold text-sm">Rewrite Examples</h3>
                  {demoCopyEditorReview.rewriteExamples.map((ex, i) => (
                    <div key={i} className="rounded-lg border p-4 space-y-2">
                      <p className="text-sm text-red-600 line-through dark:text-red-400">{ex.original}</p>
                      <p className="text-sm text-green-700 dark:text-green-400">{ex.rewritten}</p>
                      <p className="text-xs text-muted-foreground">{ex.explanation}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fact-checker */}
            <TabsContent value="factcheck">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Fact-checker Review</CardTitle>
                    <Badge variant="outline">
                      Verification Gap: {demoFactCheckerReview.verificationGapScore}/10
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    Unsupported Claims
                    <Badge variant="destructive" className="text-xs">
                      {demoFactCheckerReview.unsupportedClaims.length}
                    </Badge>
                  </h3>
                  {demoFactCheckerReview.unsupportedClaims.map((claim, i) => (
                    <div key={i} className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2 dark:border-red-900 dark:bg-red-950">
                      <blockquote className="border-l-2 border-red-300 pl-3 text-sm italic dark:border-red-700">
                        &ldquo;{claim.quote}&rdquo;
                      </blockquote>
                      <p className="text-sm"><strong>Why unsupported:</strong> {claim.reason}</p>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        <strong>Evidence needed:</strong> {claim.evidenceNeeded}
                      </p>
                    </div>
                  ))}

                  <Separator />

                  <h3 className="font-semibold text-sm">Questions for You</h3>
                  <ul className="space-y-2">
                    {demoFactCheckerReview.questionsForReporter.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-600 font-medium">Q{i + 1}.</span>
                        {q}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ethics */}
            <TabsContent value="ethics">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Ethics & Law Review</CardTitle>
                    <Badge
                      variant={demoEthicsReview.riskLevel === "HIGH" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      Risk: {demoEthicsReview.riskLevel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {demoEthicsReview.riskIssues.length > 0 ? (
                    demoEthicsReview.riskIssues.map((issue, i) => (
                      <div key={i} className="rounded-lg border p-4 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{issue.category}</Badge>
                          <Badge
                            variant={issue.severity === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {issue.severity}
                          </Badge>
                        </div>
                        <p className="text-sm">{issue.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-green-600">No significant ethical or legal risks identified.</p>
                  )}

                  <Separator />

                  <h3 className="font-semibold text-sm">Harm Mitigation Steps</h3>
                  <ul className="space-y-2">
                    {demoEthicsReview.harmMitigationSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Framing Analyst */}
            <TabsContent value="framing">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Framing Analysis</CardTitle>
                  <CardDescription>
                    Dominant Frame: <strong>{demoFramingReview.dominantFrame}</strong>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border bg-purple-50 p-4 dark:bg-purple-950 dark:border-purple-800">
                    <h3 className="font-semibold text-sm mb-2">Ideology & Power Notes</h3>
                    <p className="text-sm">{demoFramingReview.ideologyPowerNotes}</p>
                  </div>

                  <h3 className="font-semibold text-sm">Missing Voices</h3>
                  <ul className="space-y-1">
                    {demoFramingReview.missingVoices.map((voice, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <span className="text-amber-600">⚠</span> {voice}
                      </li>
                    ))}
                  </ul>

                  <h3 className="font-semibold text-sm">Loaded Language</h3>
                  {demoFramingReview.loadedLanguageFlags.map((flag, i) => (
                    <div key={i} className="rounded-lg border p-3 space-y-1">
                      <p className="text-sm">
                        <strong className="text-red-600 dark:text-red-400">&ldquo;{flag.phrase}&rdquo;</strong> — {flag.issue}
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        Alternative: {flag.alternative}
                      </p>
                    </div>
                  ))}

                  <h3 className="font-semibold text-sm">Alternative Headlines</h3>
                  {demoFramingReview.alternativeHeadlines.map((ah, i) => (
                    <div key={i} className="rounded-lg border p-3">
                      <p className="text-sm font-medium">&ldquo;{ah.headline}&rdquo;</p>
                      <p className="text-xs text-muted-foreground mt-1">{ah.framingImpact}</p>
                    </div>
                  ))}

                  <Separator />

                  <h3 className="font-semibold text-sm">Reflection Prompts for You</h3>
                  <ul className="space-y-2">
                    {demoFramingReview.reflectionPrompts.map((prompt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Eye className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        {prompt}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button
              onClick={() => setActiveTab("revision")}
              className="gap-2"
            >
              Start Revision <Sparkles className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* ─── Revision ──────────────── */}
        <TabsContent value="revision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Draft v2 — Revision
              </CardTitle>
              <CardDescription>
                Address the AI feedback and improve your story. Your v1 and v2 will be compared side-by-side during grading.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write your revised draft here. Address the must-fix items from the AI review..."
                className="min-h-[400px] font-mono text-sm leading-relaxed"
              />
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={() => {
                    toast.success("Revision saved!")
                    setActiveTab("reflection")
                  }}
                  className="gap-2"
                >
                  Save & Continue <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Reflection & Disclosure ──────────────── */}
        <TabsContent value="reflection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Reflection & AI Disclosure
              </CardTitle>
              <CardDescription>
                Reflect on your reporting process and disclose your AI usage honestly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Reflection</Label>
                <p className="text-xs text-muted-foreground">
                  Reflect on your reporting and writing process. What did you learn? What would you do differently?
                </p>
                <Textarea
                  placeholder="Write your reflection here..."
                  className="min-h-32"
                />
              </div>

              <Separator />

              <h3 className="font-semibold">AI Usage Disclosure</h3>
              <p className="text-xs text-muted-foreground">
                Honest disclosure is part of your grade. This builds professional integrity.
              </p>

              <div className="space-y-2">
                <Label>AI Tools Used</Label>
                <Input placeholder="e.g., NewsroomLab AI editors, ChatGPT for research..." />
              </div>

              <div className="space-y-2">
                <Label>What Did You Use AI For?</Label>
                <Textarea
                  placeholder="e.g., I used the copy editor to identify weak leads, the fact-checker to find gaps..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>What AI Suggestions Did You Reject, and Why?</Label>
                <Textarea
                  placeholder="e.g., The framing analyst suggested I was editorialising, but I disagree because..."
                  className="min-h-20"
                />
              </div>

              <div className="space-y-2">
                <Label>Verification Statement</Label>
                <Textarea
                  placeholder="I confirm that all facts in this story have been independently verified to the best of my ability..."
                  className="min-h-16"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    toast.success("Reflection saved!")
                    setActiveTab("submit")
                  }}
                  className="gap-2"
                >
                  Save & Continue to Submit <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── Final Submit ──────────────── */}
        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Final Submission
              </CardTitle>
              <CardDescription>
                Review your submission checklist. All gates must be passed before you can submit.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Checklist */}
              {[
                { label: "Reporting plan completed", passed: completionStatus.plan },
                {
                  label: `Draft meets word count (${wordCount}/${assignment.constraints.wordCountMin}–${assignment.constraints.wordCountMax})`,
                  passed: completionStatus.draft,
                },
                {
                  label: `Verification table (${verificationItems.filter((v) => v.claim && v.evidence).length}/${assignment.verificationRules.minItems} items)`,
                  passed: completionStatus.verification,
                },
                { label: "AI review completed", passed: false },
                { label: "Revision submitted (v2)", passed: false },
                { label: "Reflection & AI disclosure completed", passed: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 rounded-lg border p-3 ${
                    item.passed
                      ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950"
                      : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  {item.passed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  ) : (
                    <Lock className="h-5 w-5 text-zinc-400 shrink-0" />
                  )}
                  <span className={`text-sm ${item.passed ? "text-green-700 dark:text-green-400" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                </div>
              ))}

              <Separator />

              <Button
                size="lg"
                className="w-full gap-2"
                disabled={true}
              >
                <Lock className="h-4 w-4" />
                Submit Final Version
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Complete all requirements above to unlock submission.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
