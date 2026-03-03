"use client"

import { useState } from "react"
import {
  CheckCircle2,
  FileText,
  Brain,
  Eye,
  Shield,
  Star,
  MessageSquare,
  Send,
  RotateCcw,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { defaultHardNewsRubric, demoSubmissions } from "@/lib/demo-data"

function SliderComponent({ value, onChange, max }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700"
      />
      <span className="text-sm font-mono font-medium w-12 text-right">{value}/{max}</span>
    </div>
  )
}

export default function GradingPage() {
  const submission = demoSubmissions[1] // Brian Otieno's graded submission
  const [scores, setScores] = useState(
    Object.fromEntries(defaultHardNewsRubric.map((cat) => [cat.key, Math.round(cat.maxPoints * 0.75)]))
  )
  const [comments, setComments] = useState("")
  const [privateNotes, setPrivateNotes] = useState("")

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const maxScore = defaultHardNewsRubric.reduce((a, b) => a + b.maxPoints, 0)
  const percentage = Math.round((totalScore / maxScore) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Grade Submission</h1>
          <p className="text-muted-foreground">
            {submission.studentName} — {submission.assignmentTitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-lg px-4 py-1">
            {percentage}%
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left: Student work */}
        <div className="lg:col-span-3 space-y-6">
          <Tabs defaultValue="story">
            <TabsList>
              <TabsTrigger value="story" className="gap-1">
                <FileText className="h-3.5 w-3.5" />
                Story
              </TabsTrigger>
              <TabsTrigger value="verification" className="gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verification
              </TabsTrigger>
              <TabsTrigger value="ai-feedback" className="gap-1">
                <Brain className="h-3.5 w-3.5" />
                AI Feedback
              </TabsTrigger>
              <TabsTrigger value="reflection" className="gap-1">
                <Eye className="h-3.5 w-3.5" />
                Reflection
              </TabsTrigger>
            </TabsList>

            <TabsContent value="story">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Story — v{submission.currentVersion}</CardTitle>
                    <Badge variant="outline">{submission.wordCount} words</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <h2>Nairobi Allocates Ksh 38.7B in New Budget; Health Gets Biggest Boost</h2>
                    <p className="text-muted-foreground italic">By {submission.studentName}</p>
                    <p>
                      Nairobi County has unveiled a Ksh 38.7 billion budget for the 2026/27 financial year, 
                      with the health sector receiving the single largest allocation of Ksh 12.1 billion, 
                      according to the budget estimates tabled before the County Assembly on Monday.
                    </p>
                    <p>
                      The allocation represents a 15 per cent increase from the previous financial year&apos;s 
                      health budget of Ksh 10.5 billion, County Finance Executive Mary Ndung&apos;u said during 
                      the budget presentation at City Hall.
                    </p>
                    <p>
                      &quot;We have prioritised primary healthcare and invested in upgrading all Level 2 and 
                      Level 3 facilities across the county,&quot; Ms Ndung&apos;u told the assembly.
                    </p>
                    <p className="text-muted-foreground">[Demo: Full story content would appear here...]</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Verification Table</CardTitle>
                  <CardDescription>{submission.verificationItemCount} items verified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      claim: "Ksh 38.7 billion total budget",
                      evidence: "Budget Estimates FY 2026/27, Page 3",
                      source: "Official document",
                      confidence: "HIGH",
                    },
                    {
                      claim: "Health receives Ksh 12.1 billion",
                      evidence: "Budget Estimates FY 2026/27, Annex B",
                      source: "Official document",
                      confidence: "HIGH",
                    },
                    {
                      claim: "15% increase from previous year",
                      evidence: "Calculated: (12.1 - 10.5) / 10.5 = 15.2%",
                      source: "Reporter calculation + prior budget",
                      confidence: "HIGH",
                    },
                    {
                      claim: "Mary Ndung'u quote on healthcare priorities",
                      evidence: "Direct interview recording, 14 March 2026",
                      source: "Interview",
                      confidence: "HIGH",
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg border p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Item #{i + 1}</span>
                        <Badge
                          variant="secondary"
                          className={
                            item.confidence === "HIGH"
                              ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {item.confidence}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium">&ldquo;{item.claim}&rdquo;</p>
                      <p className="text-xs text-muted-foreground">Evidence: {item.evidence}</p>
                      <p className="text-xs text-muted-foreground">Source: {item.source}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-feedback">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Edit Desk Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { editor: "Copy Editor", score: "3/5", issues: 3, summary: "Structure score: 3/5. 3 must-fix items (lead, attribution, specificity)." },
                    { editor: "Fact-checker", score: "4.2/10 gap", issues: 2, summary: "2 unsupported claims, 3 questions for reporter." },
                    { editor: "Ethics & Law", score: "Low risk", issues: 1, summary: "Low risk. Minor attribution concern." },
                    { editor: "Framing Analyst", score: "—", issues: 3, summary: "Government-dominant frame. 3 missing voices identified." },
                  ].map((review, i) => (
                    <div key={i} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{review.editor}</span>
                        <Badge variant="outline" className="text-xs">{review.score}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{review.summary}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reflection">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Student Reflection & AI Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Reflection</h3>
                    <p className="text-sm text-muted-foreground">
                      This assignment taught me the importance of verifying budget figures against official documents 
                      rather than relying on press release language. My initial draft used vague attribution which 
                      the fact-checker flagged. I learned that specificity builds credibility — writing &quot;Ksh 12.1 billion&quot; 
                      is stronger than &quot;a significant allocation.&quot;
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="text-sm font-semibold mb-2">AI Disclosure</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong>Tools used:</strong> NewsroomLab AI (all 4 editors)</p>
                      <p><strong>Used for:</strong> Identifying weak leads, finding unsupported claims, checking ethical compliance</p>
                      <p><strong>Rejected suggestions:</strong> The framing analyst suggested my angle was too government-focused, but I maintained it because the budget is a government action and I included opposition voices in paragraphs 5-7.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Grading Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Score summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Star className="h-4 w-4" />
                Rubric Grading
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <div className="text-3xl font-bold">{totalScore}</div>
                <div className="text-lg text-muted-foreground">/ {maxScore}</div>
                <Badge variant="secondary" className="ml-2 text-base px-3">
                  {percentage}%
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Rubric Categories */}
          <Card>
            <CardContent className="p-4 space-y-5">
              {defaultHardNewsRubric.map((category) => (
                <div key={category.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{category.label}</Label>
                    <span className="text-xs text-muted-foreground">max {category.maxPoints}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                  <SliderComponent
                    value={scores[category.key]}
                    onChange={(v) => setScores({ ...scores, [category.key]: v })}
                    max={category.maxPoints}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="h-4 w-4" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Feedback to Student</Label>
                <Textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Write feedback the student will see..."
                  className="min-h-24"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Private Notes (lecturer only)</Label>
                <Textarea
                  value={privateNotes}
                  onChange={(e) => setPrivateNotes(e.target.value)}
                  placeholder="Notes for your records..."
                  className="min-h-16"
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 gap-2"
              onClick={() => toast.info("Resubmission requested")}
            >
              <RotateCcw className="h-4 w-4" />
              Request Resubmit
            </Button>
            <Button
              className="flex-1 gap-2"
              onClick={() => toast.success("Grade submitted!")}
            >
              <Send className="h-4 w-4" />
              Submit Grade
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
