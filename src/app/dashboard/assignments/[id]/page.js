"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Users,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Target,
  Shield,
  Brain,
  Edit3,
  ChevronRight,
  Lock,
  Unlock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/providers/auth-provider"
import { demoAssignments, demoSubmissions } from "@/lib/demo-data"
import { STORY_TYPE_LABELS } from "@/lib/types"

export default function AssignmentDetailPage({ params }) {
  const { id } = use(params)
  const router = useRouter()
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"

  // Find the assignment
  const assignment = demoAssignments.find((a) => a.id === id)

  if (!assignment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <AlertCircle className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-semibold">Assignment Not Found</h2>
        <p className="text-muted-foreground">
          The assignment you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/dashboard/assignments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assignments
          </Link>
        </Button>
      </div>
    )
  }

  // Check if student has a submission for this assignment
  const studentSubmission = !isLecturer
    ? demoSubmissions.find(
        (s) => s.assignmentId === assignment.id && s.studentId === user?.id
      )
    : null

  // For lecturers, get all submissions for this assignment
  const assignmentSubmissions = isLecturer
    ? demoSubmissions.filter((s) => s.assignmentId === assignment.id)
    : []

  // Calculate due date info
  const dueDate = new Date(assignment.dueAt)
  const now = new Date()
  const isPastDue = now > dueDate
  const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24))
  const isUrgent = daysUntilDue <= 3 && daysUntilDue > 0

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = () => {
    if (studentSubmission?.finalSubmittedAt) {
      return <Badge className="bg-green-100 text-green-700">Submitted</Badge>
    }
    if (studentSubmission) {
      return <Badge variant="outline" className="text-orange-600 border-orange-300">In Progress</Badge>
    }
    if (isPastDue) {
      return <Badge variant="destructive">Past Due</Badge>
    }
    if (isUrgent) {
      return <Badge className="bg-amber-100 text-amber-700">Due Soon</Badge>
    }
    return <Badge variant="outline">Not Started</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild>
        <Link href="/dashboard/assignments">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assignments
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">
              {STORY_TYPE_LABELS[assignment.storyType] || assignment.storyType}
            </Badge>
            {getStatusBadge()}
            {isLecturer && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Lecturer View
              </Badge>
            )}
          </div>
          <h1 className="text-2xl font-bold md:text-3xl">{assignment.title}</h1>
          <p className="text-muted-foreground">{assignment.courseName}</p>
        </div>

        <div className="flex gap-2">
          {!isLecturer && !isPastDue && (
            <Button asChild>
              <Link href={`/dashboard/editor?assignment=${assignment.id}`}>
                <Edit3 className="mr-2 h-4 w-4" />
                {studentSubmission ? "Continue Writing" : "Start Assignment"}
              </Link>
            </Button>
          )}
          {isLecturer && (
            <Button variant="outline" asChild>
              <Link href={`/dashboard/submissions?assignment=${assignment.id}`}>
                <Users className="mr-2 h-4 w-4" />
                View Submissions ({assignment.submissionCount || 0})
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Due Date Banner */}
      <Card className={isPastDue ? "border-red-200 bg-red-50" : isUrgent ? "border-amber-200 bg-amber-50" : ""}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className={`h-5 w-5 ${isPastDue ? "text-red-600" : isUrgent ? "text-amber-600" : "text-muted-foreground"}`} />
              <div>
                <p className="font-medium">
                  {isPastDue ? "Past Due" : `Due ${formatDate(assignment.dueAt)}`}
                </p>
                {!isPastDue && (
                  <p className={`text-sm ${isUrgent ? "text-amber-600 font-medium" : "text-muted-foreground"}`}>
                    {daysUntilDue === 1 ? "Due tomorrow" : daysUntilDue === 0 ? "Due today" : `${daysUntilDue} days remaining`}
                  </p>
                )}
              </div>
            </div>
            {!isLecturer && studentSubmission?.finalSubmittedAt && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Submitted on {new Date(studentSubmission.finalSubmittedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="brief" className="space-y-4">
        <TabsList>
          <TabsTrigger value="brief">Brief</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
          {isLecturer && <TabsTrigger value="submissions">Submissions</TabsTrigger>}
        </TabsList>

        {/* Brief Tab */}
        <TabsContent value="brief" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Assignment Brief
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignment.scenario && (
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Scenario</p>
                  <p>{assignment.scenario}</p>
                </div>
              )}
              <div className="whitespace-pre-wrap">{assignment.brief}</div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Constraints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5" />
                  Constraints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {assignment.constraints?.wordCountMin && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Word Count</span>
                      <Badge variant="outline">
                        {assignment.constraints.wordCountMin}–{assignment.constraints.wordCountMax} words
                      </Badge>
                    </li>
                  )}
                  {assignment.constraints?.sourcesRequired && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Sources Required</span>
                      <Badge variant="outline">{assignment.constraints.sourcesRequired} minimum</Badge>
                    </li>
                  )}
                  {assignment.constraints?.minVoices && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Voices/Perspectives</span>
                      <Badge variant="outline">{assignment.constraints.minVoices} minimum</Badge>
                    </li>
                  )}
                  {assignment.constraints?.noAnonymousSources !== undefined && (
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Anonymous Sources</span>
                      <Badge variant={assignment.constraints.noAnonymousSources ? "destructive" : "secondary"}>
                        {assignment.constraints.noAnonymousSources ? "Not Allowed" : "Allowed"}
                      </Badge>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Required Components */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle2 className="h-5 w-5" />
                  Required Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span>Story Draft</span>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </li>
                  {assignment.requiredComponents?.reportingPlan && (
                    <li className="flex items-center justify-between">
                      <span>Reporting Plan</span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </li>
                  )}
                  {assignment.requiredComponents?.verificationTable && (
                    <li className="flex items-center justify-between">
                      <span>Verification Table</span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </li>
                  )}
                  {assignment.requiredComponents?.ethicsMemo && (
                    <li className="flex items-center justify-between">
                      <span>Ethics Memo</span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </li>
                  )}
                  {assignment.requiredComponents?.mediaReflection && (
                    <li className="flex items-center justify-between">
                      <span>AI Reflection</span>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Verification Rules */}
            {assignment.verificationRules && (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5" />
                    Verification Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">{assignment.verificationRules.minItems}</p>
                      <p className="text-sm text-muted-foreground">Min. Items</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">{assignment.verificationRules.minHighConfidence}</p>
                      <p className="text-sm text-muted-foreground">High Confidence Required</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">{assignment.verificationRules.requireSourceLinks ? "Yes" : "No"}</p>
                      <p className="text-sm text-muted-foreground">Source Links Required</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold">{Math.round((1 - assignment.verificationRules.blockIfLowOver) * 100)}%</p>
                      <p className="text-sm text-muted-foreground">Min. Confidence Threshold</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* AI Tools Tab */}
        <TabsContent value="ai-tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Available AI Modules
              </CardTitle>
              <CardDescription>
                These AI tools are enabled for this assignment to assist your writing process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {assignment.aiModules?.copyEditor && (
                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Edit3 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Copy Editor</p>
                      <p className="text-sm text-muted-foreground">
                        Grammar, style, and AP/Reuters compliance checking
                      </p>
                    </div>
                    <Unlock className="h-4 w-4 text-green-600 ml-auto" />
                  </div>
                )}
                {assignment.aiModules?.factChecker && (
                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Fact Checker</p>
                      <p className="text-sm text-muted-foreground">
                        Identifies claims that need verification
                      </p>
                    </div>
                    <Unlock className="h-4 w-4 text-green-600 ml-auto" />
                  </div>
                )}
                {assignment.aiModules?.ethicsLaw && (
                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Ethics & Law</p>
                      <p className="text-sm text-muted-foreground">
                        Defamation, privacy, and ethical flags
                      </p>
                    </div>
                    <Unlock className="h-4 w-4 text-green-600 ml-auto" />
                  </div>
                )}
                {assignment.aiModules?.framingAnalyst && (
                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Target className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Framing Analyst</p>
                      <p className="text-sm text-muted-foreground">
                        Bias detection and perspective analysis
                      </p>
                    </div>
                    <Unlock className="h-4 w-4 text-green-600 ml-auto" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Submissions Tab (Lecturer Only) */}
        {isLecturer && (
          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Submission Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-3xl font-bold">{assignment.submissionCount || 0}</p>
                    <p className="text-sm text-muted-foreground">Total Submissions</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-green-50">
                    <p className="text-3xl font-bold text-green-600">{assignment.gradedCount || 0}</p>
                    <p className="text-sm text-muted-foreground">Graded</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-amber-50">
                    <p className="text-3xl font-bold text-amber-600">
                      {(assignment.submissionCount || 0) - (assignment.gradedCount || 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                  </div>
                </div>

                <Separator />

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Grading Progress</span>
                    <span className="font-medium">
                      {assignment.submissionCount 
                        ? Math.round((assignment.gradedCount / assignment.submissionCount) * 100) 
                        : 0}%
                    </span>
                  </div>
                  <Progress 
                    value={assignment.submissionCount 
                      ? (assignment.gradedCount / assignment.submissionCount) * 100 
                      : 0} 
                  />
                </div>

                {/* Action Button */}
                <Button className="w-full" asChild>
                  <Link href={`/dashboard/submissions?assignment=${assignment.id}`}>
                    View All Submissions
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Student Progress Card */}
      {!isLecturer && studentSubmission && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">
                  {studentSubmission.wordCount || 0}
                </p>
                <p className="text-xs text-muted-foreground">Words Written</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">
                  {studentSubmission.verificationItems?.length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Items Verified</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">
                  {studentSubmission.currentStep || 1}/7
                </p>
                <p className="text-xs text-muted-foreground">Steps Complete</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <p className="text-lg font-bold">
                  {studentSubmission.lastSavedAt
                    ? new Date(studentSubmission.lastSavedAt).toLocaleDateString()
                    : "—"}
                </p>
                <p className="text-xs text-muted-foreground">Last Saved</p>
              </div>
            </div>

            <Button className="w-full" asChild>
              <Link href={`/dashboard/editor?assignment=${assignment.id}`}>
                {studentSubmission.finalSubmittedAt ? "View Submission" : "Continue Working"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
