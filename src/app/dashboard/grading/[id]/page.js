"use client"

import { use, useState } from "react"
import Link from "next/link"
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
  ArrowLeft,
  User,
  Calendar,
  Clock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"
import { defaultHardNewsRubric, demoSubmissions } from "@/lib/demo-data"
import { SUBMISSION_STATUS_LABELS, SUBMISSION_STATUS_COLORS } from "@/lib/types"

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

export default function GradingDetailPage({ params }) {
  const { id } = use(params)
  
  // Find the submission by ID
  const submission = demoSubmissions.find((s) => s.id === id)
  
  const [scores, setScores] = useState(
    Object.fromEntries(defaultHardNewsRubric.map((cat) => [cat.key, submission?.overallScore ? Math.round(cat.maxPoints * (submission.overallScore / 100)) : 0]))
  )
  const [comments, setComments] = useState("")
  const [privateNotes, setPrivateNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Handle submission not found
  if (!submission) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Submission Not Found</h2>
        <p className="text-muted-foreground mb-6">This submission doesn&apos;t exist or you don&apos;t have access.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard/submissions">← Back to Submissions</Link>
        </Button>
      </div>
    )
  }

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const maxScore = defaultHardNewsRubric.reduce((a, b) => a + b.maxPoints, 0)
  const percentage = Math.round((totalScore / maxScore) * 100)

  const handleSubmitGrade = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      toast.success(`Grade submitted: ${percentage}%`)
      setIsSubmitting(false)
    }, 1000)
  }

  const handleRequestResubmit = () => {
    toast.info("Resubmission requested from student")
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2 text-muted-foreground">
        <Link href="/dashboard/submissions">
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Submissions
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge 
              variant="secondary" 
              className={`text-xs ${SUBMISSION_STATUS_COLORS[submission.status]}`}
            >
              {SUBMISSION_STATUS_LABELS[submission.status]}
            </Badge>
            <Badge variant="outline">v{submission.currentVersion}</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Grade Submission</h1>
          <p className="text-muted-foreground mt-1">
            {submission.assignmentTitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Current Score</p>
            <p className="text-3xl font-bold">{percentage}%</p>
          </div>
        </div>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">{submission.studentName}</p>
                <p className="text-sm text-muted-foreground">{submission.studentEmail || "student@university.ac.ke"}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {submission.wordCount} words
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                {submission.verificationItemCount} verifications
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : "Not submitted"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <ScrollArea className="h-[500px]">
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {submission.content ? (
                        <div dangerouslySetInnerHTML={{ __html: submission.content.replace(/\n/g, "<br/>") }} />
                      ) : (
                        <div className="space-y-4 text-sm">
                          <p className="font-semibold text-lg">
                            {submission.assignmentTitle}
                          </p>
                          <p>
                            This is a demo submission for the assignment. The actual story content would be displayed here,
                            including the headline, lead paragraph, body text, and any quotes from sources.
                          </p>
                          <p>
                            The student has submitted version {submission.currentVersion} with {submission.wordCount} words
                            and {submission.verificationItemCount} verified claims.
                          </p>
                          <p className="text-muted-foreground italic">
                            [Full story content would appear here in production]
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Verification Table
                  </CardTitle>
                  <CardDescription>
                    {submission.verificationItemCount} claims verified by the student
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: submission.verificationItemCount || 3 }).map((_, i) => (
                      <div key={i} className="p-3 rounded-lg border bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-sm font-medium">Claim {i + 1}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Demo verification item - actual claims and evidence would be shown here.
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            High
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-feedback">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Review Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">Copy Editor Feedback</p>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        The story demonstrates good journalistic structure with a strong lead. 
                        Minor suggestions for tightening prose in paragraphs 3-4.
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
                      <p className="text-sm font-medium text-purple-900 dark:text-purple-100 mb-2">Fact-Check Summary</p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        All {submission.verificationItemCount} claims have been verified with appropriate sources.
                        High confidence rating on primary facts.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reflection">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Student Reflection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="text-muted-foreground italic">
                      Student reflection on the writing process, challenges faced, and lessons learned 
                      would be displayed here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Grading Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="h-4 w-4" />
                Rubric Scoring
              </CardTitle>
              <CardDescription>
                Total: {totalScore} / {maxScore} points ({percentage}%)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {defaultHardNewsRubric.map((cat) => (
                <div key={cat.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{cat.label}</Label>
                    <span className="text-xs text-muted-foreground">{cat.maxPoints} pts max</span>
                  </div>
                  <SliderComponent
                    value={scores[cat.key]}
                    onChange={(v) => setScores((prev) => ({ ...prev, [cat.key]: v }))}
                    max={cat.maxPoints}
                  />
                  <p className="text-xs text-muted-foreground">{cat.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm">Comments to Student</Label>
                <Textarea
                  placeholder="Add feedback visible to the student..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="min-h-24"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Private Notes (not visible to student)</Label>
                <Textarea
                  placeholder="Add private notes..."
                  value={privateNotes}
                  onChange={(e) => setPrivateNotes(e.target.value)}
                  className="min-h-20"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={handleRequestResubmit}
            >
              <RotateCcw className="h-4 w-4" />
              Request Resubmit
            </Button>
            <Button 
              className="flex-1 gap-2"
              onClick={handleSubmitGrade}
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Grade"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
