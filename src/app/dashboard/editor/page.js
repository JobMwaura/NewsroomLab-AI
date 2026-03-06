"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { BookOpen, FileText, CheckCircle2, Brain, Sparkles, Eye, Shield, Lock, ChevronRight, GraduationCap, X, Layers, AlertTriangle } from "lucide-react"
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
import { demoAssignments, demoCopyEditorReview, demoFactCheckerReview, demoEthicsReview, demoFramingReview } from "@/lib/demo-data"
import { STORY_TYPE_LABELS } from "@/lib/types"
import { getMicroLesson } from "@/lib/templates/micro-lessons"
import { getReflectionPromptSet } from "@/lib/templates/reflection-prompts"
import { canFinalSubmit } from "@/lib/verification-gate"
import { getStoryTemplate } from "@/lib/templates/story-templates"

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
  const [planCompleted, setPlanCompleted] = useState(false)
  const [showLessonCoach, setShowLessonCoach] = useState(true)
  const [reflectionAnswers, setReflectionAnswers] = useState({})
  const [aiDisclosure, setAiDisclosure] = useState({ tools: "", usage: "" })
  const [verificationItems, setVerificationItems] = useState([
    { id: "1", claim: "", evidence: "", sourceType: "URL", sourceRef: "", confidence: "MEDIUM", riskLevel: "LOW" }
  ])
  
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
    "ai-review": false,
    revision: false,
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
        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Progress</div>
          <div className="flex items-center gap-2">
            <Progress value={overallProgress} className="w-32 h-2" />
            <span className="text-sm font-medium">{Math.round(overallProgress)}%</span>
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
                <Textarea id="angle" placeholder="What is the main angle or focus of your story?" className="min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label>Key Questions to Answer</Label>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Input key={i} placeholder={"Question " + i} className="mb-2" />
                ))}
              </div>
              <Button 
                onClick={() => { 
                  setPlanCompleted(true)
                  toast.success("Plan saved!")
                  setActiveTab("draft") 
                }} 
                className="gap-2"
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
          <div className="rounded-xl border bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 p-6 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-blue-950/30">
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-6 w-6 text-purple-600" />
              <h2 className="text-lg font-bold">AI Edit Desk Review</h2>
            </div>
            <p className="text-sm text-muted-foreground">Four AI editors have reviewed your draft.</p>
          </div>
          
          <Tabs defaultValue="copy" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="copy">Copy Editor</TabsTrigger>
              <TabsTrigger value="factcheck">Fact-checker</TabsTrigger>
              <TabsTrigger value="ethics">Ethics</TabsTrigger>
              <TabsTrigger value="framing">Framing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="copy">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Copy Editor</CardTitle>
                  <CardDescription>{demoCopyEditorReview.overallNotes}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-sm mb-2">Must-Fix Items</h3>
                  {demoCopyEditorReview.mustFix.map((item) => (
                    <div key={item.id} className="rounded-lg border p-3 mb-2">
                      <p className="text-sm"><strong>Issue:</strong> {item.issue}</p>
                      <p className="text-sm text-green-700"><strong>Fix:</strong> {item.fix}</p>
                    </div>
                  ))}
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
        </TabsContent>

        <TabsContent value="revision" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Draft v2 - Revision
              </CardTitle>
              <CardDescription>Address AI feedback and improve your draft.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Write your revised draft here..." className="min-h-[400px] font-mono text-sm" />
              <div className="mt-4 flex justify-end">
                <Button onClick={() => { toast.success("Revision saved!"); setActiveTab("reflection") }} className="gap-2">
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
              <div className={"rounded-lg border p-3 text-sm " + (gateResult.allowed ? "border-green-200 bg-green-50 text-green-700" : "border-amber-200 bg-amber-50 text-amber-700")}>
                {gateResult.allowed ? "All gates passed. Ready to submit!" : gateResult.failures.length + " gate(s) still need attention."}
              </div>
              
              {[
                { gate: "plan", label: "Reporting plan completed", passed: planCompleted },
                { gate: "draft", label: "Draft meets word count (" + wordCount + " / " + wordCountLabel + ")", passed: wordCount >= assignment.constraints.wordCountMin },
                { gate: "verification", label: "Verification table (" + verifiedItems.length + " / " + assignment.verificationRules.minItems + " items)", passed: verifiedItems.length >= assignment.verificationRules.minItems },
                { gate: "reflection", label: "Reflection completed", passed: Object.values(reflectionAnswers).join(" ").length >= 100 },
                { gate: "disclosure", label: "AI disclosure completed", passed: !!(aiDisclosure.tools || aiDisclosure.usage) },
              ].map(({ gate, label, passed }) => (
                <div key={gate} className={"flex items-center gap-3 rounded-lg border p-3 " + (passed ? "border-green-200 bg-green-50" : "border-zinc-200 bg-zinc-50")}>
                  {passed ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <Lock className="h-5 w-5 text-zinc-400" />}
                  <span className={"text-sm " + (passed ? "text-green-700" : "text-muted-foreground")}>{label}</span>
                </div>
              ))}
              
              <Separator />
              
              <Button 
                size="lg" 
                className="w-full gap-2" 
                disabled={!gateResult.allowed} 
                onClick={() => toast.success("Submission received! Your work is now with your lecturer.")}
              >
                {gateResult.allowed ? (
                  <><Shield className="h-4 w-4" />Submit Final Version</>
                ) : (
                  <><Lock className="h-4 w-4" />Submit (Locked)</>
                )}
              </Button>
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
