"use client"

import { use, useState, useMemo, useEffect } from "react"
import Link from "next/link"
import {
  BookOpen, ClipboardList, Users, Calendar, ChevronRight, ArrowLeft,
  CheckCircle2, Clock, FileText, Shield, Brain, Eye, GraduationCap,
  AlertTriangle, Lock, Unlock, BadgeCheck, BarChart2, Layers,
  Download, Settings, Table2, Play, ScrollText, Pencil, Video,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { demoCourses, demoAssignments, demoUsers, getCourseModules, getCurrentWeek } from "@/lib/demo-data"
import { getCourseTemplate } from "@/lib/templates/course-templates"
import { getStoryTemplate } from "@/lib/templates/story-templates"
import { getRubricPreset } from "@/lib/templates/rubric-presets"
import { getReflectionPromptSet } from "@/lib/templates/reflection-prompts"
import { getGatePresetRules } from "@/lib/verification-gate"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"

// ─── Category colour map ─────────────────────────────────
const CATEGORY_COLORS = {
  NEWSROOM: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  BROADCAST: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  PR: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  MAGAZINE: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  EDITORIAL: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
}

const CATEGORY_ICONS = {
  NEWSROOM: "📰",
  BROADCAST: "📺",
  PR: "📣",
  MAGAZINE: "📖",
  EDITORIAL: "✍️",
}

function GateRuleBadge({ label, active }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs rounded-md px-2 py-1 ${active ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"}`}>
      {active ? <CheckCircle2 className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-zinc-300 dark:border-zinc-600" />}
      {label}
    </div>
  )
}

function AssignmentCard({ assignment, template, index, onOpen }) {
  const rc = template?.requiredComponents || {}
  const gates = template?.verificationDefaults || {}

  return (
    <div className="rounded-xl border bg-card hover:border-zinc-300 dark:hover:border-zinc-600 transition-all">
      <div className="flex items-start gap-4 p-4">
        {/* Number */}
        <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[template?.category] || "bg-zinc-100 text-zinc-600"}`}>
                  {CATEGORY_ICONS[template?.category]} {template?.category}
                </span>
                {template?.wordCountRange && (
                  <span className="text-xs text-muted-foreground">
                    {template.wordCountRange.min}–{template.wordCountRange.max} words
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-sm">{assignment.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{assignment.description}</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1 text-xs shrink-0" onClick={() => onOpen(assignment.id)}>
              View Details <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          {/* Required components */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {rc.reportingPlan && <Badge variant="outline" className="text-xs gap-1"><BookOpen className="h-2.5 w-2.5" />Reporting Plan</Badge>}
            {rc.verificationTable && <Badge variant="outline" className="text-xs gap-1"><CheckCircle2 className="h-2.5 w-2.5" />Verification</Badge>}
            {rc.ethicsMemo && <Badge variant="outline" className="text-xs gap-1"><Shield className="h-2.5 w-2.5" />Ethics Memo</Badge>}
            {rc.mediaReflection && <Badge variant="outline" className="text-xs gap-1"><Eye className="h-2.5 w-2.5" />Reflection</Badge>}
          </div>

          {/* Gate summary */}
          {gates.minItems > 0 && (
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                ≥{gates.minItems} verified claims
              </span>
              {gates.requireTwoSourcesHighRisk && (
                <span className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                  2-source rule for high-risk
                </span>
              )}
              {template?.constraints?.sourcesRequired > 0 && (
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  ≥{template.constraints.sourcesRequired} sources
                </span>
              )}
            </div>
          )}

          {/* Micro-lessons */}
          {template?.microLessonIds?.length > 0 && (
            <div className="mt-2 flex items-center gap-1 flex-wrap">
              <GraduationCap className="h-3 w-3 text-blue-500 shrink-0" />
              <span className="text-xs text-muted-foreground mr-1">Lesson Coach:</span>
              {template.microLessonIds.slice(0, 4).map((id) => (
                <span key={id} className="text-xs bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">
                  {id.replace(/_/g, " ")}
                </span>
              ))}
              {template.microLessonIds.length > 4 && (
                <span className="text-xs text-muted-foreground">+{template.microLessonIds.length - 4} more</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AssignmentDetailSheet({ templateId, onClose }) {
  const template = getStoryTemplate(templateId)
  if (!template) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end" onClick={onClose}>
      <div
        className="h-full w-full max-w-xl bg-background shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium mb-1 ${CATEGORY_COLORS[template.category] || ""}`}>
              {CATEGORY_ICONS[template.category]} {template.category}
            </div>
            <h2 className="font-bold text-lg">{template.name}</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6">
            {/* Description */}
            <p className="text-sm text-muted-foreground">{template.description}</p>

            {/* Word count & sources */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <div className="text-lg font-bold">{template.wordCountRange.min}–{template.wordCountRange.max}</div>
                <div className="text-xs text-muted-foreground">words</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-lg font-bold">{template.constraints?.sourcesRequired ?? 0}</div>
                <div className="text-xs text-muted-foreground">sources</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-lg font-bold">{template.verificationDefaults?.minItems ?? 0}</div>
                <div className="text-xs text-muted-foreground">verified claims</div>
              </div>
            </div>

            {/* Required Sections */}
            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Layers className="h-4 w-4" /> Required Sections
              </h3>
              <div className="space-y-1.5">
                {template.requiredSections.map((s) => (
                  <div key={s.id} className="flex items-start gap-2 text-sm">
                    <div className={`mt-0.5 h-4 w-4 rounded-full border-2 shrink-0 ${s.required ? "border-zinc-700 dark:border-zinc-300" : "border-zinc-300 dark:border-zinc-600"}`} />
                    <span className={s.required ? "font-medium" : "text-muted-foreground"}>{s.label}</span>
                    {!s.required && <Badge variant="outline" className="text-xs ml-auto shrink-0">optional</Badge>}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Verification Gate */}
            <div>
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" /> Verification Gate
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <GateRuleBadge label={`≥${template.verificationDefaults.minItems} claims`} active={true} />
                <GateRuleBadge label={`≥${template.verificationDefaults.minHighConfidence} high-confidence`} active={true} />
                <GateRuleBadge label="Source links" active={template.verificationDefaults.requireSourceLinks} />
                <GateRuleBadge label="2-source for high-risk" active={template.verificationDefaults.requireTwoSourcesHighRisk} />
              </div>
            </div>

            <Separator />

            {/* Micro-Lessons */}
            {template.microLessonIds?.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-500" /> Lesson Coach Cards
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {template.microLessonIds.map((id) => (
                    <span key={id} className="text-xs bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md border border-blue-200 dark:border-blue-900">
                      {id.replace(/_/g, " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Required Components */}
            <div>
              <h3 className="font-semibold text-sm mb-2">Required Components</h3>
              <div className="flex flex-wrap gap-1.5">
                {template.requiredComponents.reportingPlan && <Badge className="gap-1"><BookOpen className="h-3 w-3" />Reporting Plan</Badge>}
                {template.requiredComponents.verificationTable && <Badge className="gap-1"><CheckCircle2 className="h-3 w-3" />Verification Table</Badge>}
                {template.requiredComponents.ethicsMemo && <Badge className="gap-1"><Shield className="h-3 w-3" />Ethics Memo</Badge>}
                {template.requiredComponents.mediaReflection && <Badge className="gap-1"><Eye className="h-3 w-3" />Reflection</Badge>}
                <Badge className="gap-1"><Brain className="h-3 w-3" />AI Disclosure</Badge>
              </div>
            </div>

            {/* AI Modules */}
            {template.aiModules && (
              <div>
                <h3 className="font-semibold text-sm mb-2">AI Editor Modules</h3>
                <div className="flex flex-wrap gap-1.5">
                  {template.aiModules.copyEditor && <Badge variant="outline" className="text-xs">✏️ Copy Editor</Badge>}
                  {template.aiModules.factChecker && <Badge variant="outline" className="text-xs">🔍 Fact Checker</Badge>}
                  {template.aiModules.ethicsLaw && <Badge variant="outline" className="text-xs">⚖️ Ethics & Law</Badge>}
                  {template.aiModules.framingAnalyst && <Badge variant="outline" className="text-xs">🔭 Framing Analyst</Badge>}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t">
          <Button asChild className="w-full gap-2">
            <Link href={`/dashboard/editor?template=${templateId}`}>
              <FileText className="h-4 w-4" /> Open in Writing Studio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────

export default function CourseDetailPage({ params }) {
  const { id } = use(params)
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"
  const [activeTab, setActiveTab] = useState("modules")
  const [openTemplateId, setOpenTemplateId] = useState(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Fetch course from API
  useEffect(() => {
    async function fetchCourse() {
      try {
        // First try fetching from the API (database)
        const res = await fetch(`/api/courses/${id}`)
        if (res.ok) {
          const data = await res.json()
          setCourse(data.course)
        } else {
          // Fall back to demo data
          const demoCourse = demoCourses.find((c) => c.id === id)
          setCourse(demoCourse || null)
        }
      } catch (error) {
        console.error("Failed to fetch course:", error)
        // Fall back to demo data on error
        const demoCourse = demoCourses.find((c) => c.id === id)
        setCourse(demoCourse || null)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])
  
  // Grading config state
  const [gradingConfig, setGradingConfig] = useState({
    caWeight: 30,
    examWeight: 70,
    gradeScale: [
      { grade: "A", min: 75, max: 100 },
      { grade: "B", min: 65, max: 74 },
      { grade: "C", min: 50, max: 64 },
      { grade: "D", min: 40, max: 49 },
      { grade: "E", min: 0, max: 39 },
    ],
  })

  // Derive template from course code or from the ID itself (when created from template)
  const templateCode = course?.templateId || course?.code?.replace(/\s/g, "") || id.toUpperCase()
  const template = getCourseTemplate(templateCode)

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
        <p className="text-muted-foreground">Loading course...</p>
      </div>
    )
  }

  // If we have neither — show not found
  if (!course && !template) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Course Not Found</h2>
        <p className="text-muted-foreground mb-6">This course doesn&apos;t exist or you don&apos;t have access.</p>
        <Button asChild variant="outline"><Link href="/dashboard/courses">← Back to Courses</Link></Button>
      </div>
    )
  }

  // Resolve assignment templates from course template
  const assignmentTemplateIds = template?.assignmentTemplateIds || []
  const assignmentTemplates = assignmentTemplateIds.map((tid) => getStoryTemplate(tid)).filter(Boolean)

  // Rubric
  const rubricId = template?.defaultRubricId
  const rubric = rubricId ? getRubricPreset(rubricId) : null

  // 10-Week Modules with drip release
  const courseStartDate = course?.startDate || null
  const courseModules = useMemo(() => getCourseModules(templateCode, courseStartDate), [templateCode, courseStartDate])
  const currentWeek = useMemo(() => getCurrentWeek(courseStartDate), [courseStartDate])

  // Gate preset
  const gateRules = template?.gatePreset ? getGatePresetRules(template.gatePreset) : {}

  // Reflection prompts
  const reflectionSet = template?.reflectionPromptSetId ? getReflectionPromptSet(template.reflectionPromptSetId) : null

  const displayTitle = course?.title || template?.title || "Untitled Course"
  const displayCode = course?.code || template?.code || ""
  const displaySemester = course?.semester || "2026"
  const displayDescription = course?.description || template?.description || ""

  return (
    <>
      {openTemplateId && (
        <AssignmentDetailSheet
          templateId={openTemplateId}
          onClose={() => setOpenTemplateId(null)}
        />
      )}

      <div className="space-y-6">
        {/* Back link */}
        <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2 text-muted-foreground">
          <Link href="/dashboard/courses"><ArrowLeft className="h-3.5 w-3.5" />All Courses</Link>
        </Button>

        {/* Course header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant="secondary" className="font-mono">{displayCode}</Badge>
              <Badge variant="outline">{displaySemester}</Badge>
              {template?.gatePreset && (
                <Badge variant="outline" className="gap-1 text-xs">
                  <Shield className="h-3 w-3" />
                  Gate: {template.gatePreset}
                </Badge>
              )}
              {isLecturer && (
                <Badge className="gap-1 text-xs bg-blue-600">
                  <GraduationCap className="h-3 w-3" />
                  Lecturer View
                </Badge>
              )}
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{displayTitle}</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">{displayDescription}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {isLecturer && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={async () => {
                  setIsDownloading(true)
                  try {
                    const response = await fetch(`/api/courses/${id}/marksheet`)
                    if (!response.ok) throw new Error("Failed to download")
                    const blob = await response.blob()
                    const url = window.URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = `${displayCode || "Course"}_Marksheet_${new Date().toISOString().split("T")[0]}.xlsx`
                    document.body.appendChild(a)
                    a.click()
                    window.URL.revokeObjectURL(url)
                    document.body.removeChild(a)
                    toast.success("Marksheet downloaded!")
                  } catch (error) {
                    toast.error("Failed to download marksheet")
                  } finally {
                    setIsDownloading(false)
                  }
                }}
                disabled={isDownloading}
              >
                <Download className="h-3.5 w-3.5" />
                {isDownloading ? "Downloading..." : "Marksheet"}
              </Button>
            )}
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link href="/dashboard/assignments">
                <ClipboardList className="h-3.5 w-3.5" />Assignments
              </Link>
            </Button>
            <Button asChild size="sm" className="gap-2">
              <Link href={`/dashboard/editor?course=${id}`}>
                <FileText className="h-3.5 w-3.5" />Open Studio
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Modules", value: courseModules.length || 10, icon: BookOpen },
            { label: "Assignments", value: courseModules.length || 10, icon: ClipboardList },
            { label: "Learning Outcomes", value: template?.outcomes?.length || 0, icon: BadgeCheck },
            { label: "Rubric Categories", value: rubric?.categories?.length || 0, icon: BarChart2 },
          ].map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                    <Icon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex-wrap">
            <TabsTrigger value="modules">� Modules (10 Weeks)</TabsTrigger>
            <TabsTrigger value="assignments">� Assignments</TabsTrigger>
            <TabsTrigger value="outcomes">🎯 Outcomes</TabsTrigger>
            <TabsTrigger value="rubric">📊 Rubric</TabsTrigger>
            <TabsTrigger value="gates">🔒 Gates</TabsTrigger>
            {isLecturer && <TabsTrigger value="grading">📝 Grading & Marksheet</TabsTrigger>}
          </TabsList>

          {/* ── Assignments Tab ───────────────────────── */}
          <TabsContent value="assignments" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Assignment Pack</h2>
                <p className="text-sm text-muted-foreground">
                  {assignmentTemplates.length} pre-configured assignments auto-generated from the {displayCode} template.
                </p>
              </div>
            </div>

            {assignmentTemplates.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ClipboardList className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p>No assignment templates linked to this course.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {assignmentTemplates.map((t, i) => (
                  <AssignmentCard
                    key={t.id}
                    assignment={t}
                    template={t}
                    index={i}
                    onOpen={setOpenTemplateId}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── Modules Tab (10-Week Drip Release) ────────── */}
          <TabsContent value="modules" className="space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Modules
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  10 weekly modules with video lectures, notes, and assignments.
                  {!isLecturer && currentWeek <= 10 && (
                    <span className="ml-2 text-blue-600 dark:text-blue-400 font-medium">
                      Currently in Week {currentWeek}
                    </span>
                  )}
                </p>
              </div>
              {isLecturer && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Drip release: New module unlocks each Monday
                </div>
              )}
            </div>

            {/* Progress indicator */}
            {!isLecturer && (
              <div className="rounded-xl border p-4 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Your Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.min(currentWeek, 10)} of 10 weeks available
                  </span>
                </div>
                <Progress value={(Math.min(currentWeek, 10) / 10) * 100} className="h-2" />
              </div>
            )}

            {/* Modules list */}
            <div className="space-y-4">
              {courseModules.length === 0 ? (
                <div className="text-center py-12 border rounded-xl bg-zinc-50 dark:bg-zinc-900">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Modules Available</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    {isLecturer 
                      ? "This course template doesn't have weekly modules configured yet. Make sure the course has a valid template ID (HCC109, HCC205, HCC312, HCC314, HCC316, or HCC420)."
                      : "Course modules are not yet available. Please check back later or contact your lecturer."}
                  </p>
                </div>
              ) : courseModules.map((module) => {
                const isLocked = !module.isUnlocked && !isLecturer
                const isCurrent = module.week === currentWeek && !isLecturer
                
                return (
                  <div 
                    key={module.week} 
                    className={`rounded-xl border transition-all ${
                      isLocked 
                        ? "opacity-60 bg-zinc-50 dark:bg-zinc-900" 
                        : isCurrent
                          ? "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 shadow-sm"
                          : "hover:border-zinc-300 dark:hover:border-zinc-600"
                    }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Week number badge */}
                        <div className={`shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center ${
                          isLocked 
                            ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-500" 
                            : isCurrent
                              ? "bg-blue-600 text-white"
                              : module.isUnlocked
                                ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400"
                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"
                        }`}>
                          <span className="text-xs uppercase tracking-wide font-medium">Week</span>
                          <span className="text-xl font-bold leading-none">{module.week}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div>
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                {isLocked ? (
                                  <Badge variant="outline" className="text-xs gap-1 border-zinc-300 dark:border-zinc-600 text-zinc-500">
                                    <Lock className="h-3 w-3" />
                                    Locked
                                  </Badge>
                                ) : isCurrent ? (
                                  <Badge className="text-xs gap-1 bg-blue-600">
                                    <Play className="h-3 w-3" />
                                    Current Week
                                  </Badge>
                                ) : module.isUnlocked ? (
                                  <Badge variant="outline" className="text-xs gap-1 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400">
                                    <Unlock className="h-3 w-3" />
                                    Available
                                  </Badge>
                                ) : null}
                                {isLecturer && !module.isUnlocked && (
                                  <Badge variant="outline" className="text-xs gap-1">
                                    <Clock className="h-3 w-3" />
                                    Unlocks {new Date(module.unlockAt).toLocaleDateString("en-GB", { 
                                      month: "short", 
                                      day: "numeric" 
                                    })}
                                  </Badge>
                                )}
                              </div>
                              <h3 className={`font-semibold ${isLocked ? "text-zinc-500" : ""}`}>
                                {module.title}
                              </h3>
                              <p className={`text-sm mt-0.5 line-clamp-2 ${
                                isLocked ? "text-zinc-400 dark:text-zinc-500" : "text-muted-foreground"
                              }`}>
                                {module.overview}
                              </p>
                            </div>
                            
                            {/* Action button */}
                            {!isLocked && (
                              <Button 
                                variant={isCurrent ? "default" : "outline"} 
                                size="sm" 
                                className="shrink-0 gap-1"
                                asChild
                              >
                                <Link href={`/dashboard/courses/${id}/week/${module.week}`}>
                                  {isCurrent ? "Continue" : "View"} <ChevronRight className="h-3 w-3" />
                                </Link>
                              </Button>
                            )}
                          </div>

                          {/* Module contents preview */}
                          {!isLocked && (
                            <div className="flex items-center gap-4 mt-3 flex-wrap">
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Video className="h-3.5 w-3.5" />
                                <span>Video lecture</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <ScrollText className="h-3.5 w-3.5" />
                                <span>Notes</span>
                              </div>
                              {module.assignment && (
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Pencil className="h-3.5 w-3.5" />
                                  <span>{module.assignment.title}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Locked state - shows unlock date for students */}
                          {isLocked && (
                            <div className="flex items-center gap-2 mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                              <Clock className="h-3.5 w-3.5" />
                              <span>
                                Unlocks on {new Date(module.unlockAt).toLocaleDateString("en-GB", { 
                                  weekday: "long",
                                  month: "long", 
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </TabsContent>

          {/* ── Learning Outcomes Tab ─────────────────── */}
          <TabsContent value="outcomes" className="space-y-4">
            <h2 className="text-lg font-semibold">Learning Outcomes</h2>
            {(course?.outcomes?.length > 0 || template?.outcomes?.length > 0) ? (
              <div className="space-y-2">
                {(course?.outcomes || template?.outcomes || []).map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-sm">{typeof outcome === "string" ? outcome : outcome.label}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No outcomes defined.</p>
            )}

            {/* Reflection prompts */}
            {reflectionSet?.prompts?.length > 0 && (
              <>
                <Separator />
                <h3 className="font-semibold">Reflection Prompts ({reflectionSet.prompts.length})</h3>
                <div className="space-y-2">
                  {reflectionSet.prompts.map((prompt) => (
                    <div key={prompt.id} className="rounded-lg border p-3">
                      <p className="text-sm font-medium">{prompt.question}</p>
                      {prompt.hint && (
                        <p className="text-xs text-muted-foreground mt-1">💡 {prompt.hint}</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* ── Rubric Tab ────────────────────────────── */}
          <TabsContent value="rubric" className="space-y-4">
            <h2 className="text-lg font-semibold">
              Default Rubric: {rubric?.name || "Not set"}
            </h2>
            {rubric ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BarChart2 className="h-4 w-4" />
                  Total: {rubric.totalPoints} points across {rubric.categories.length} categories
                </div>
                {rubric.categories.map((cat) => (
                  <div key={cat.key} className="rounded-xl border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm">{cat.label}</h3>
                        <p className="text-xs text-muted-foreground">{cat.description}</p>
                      </div>
                      <Badge variant="outline">{cat.maxPoints} pts</Badge>
                    </div>
                    <div className="space-y-1">
                      {cat.levels?.map((level) => (
                        <div key={level.score} className="flex items-center gap-2 text-xs">
                          <span className="w-16 font-medium">{level.label}</span>
                          <span className="w-8 text-muted-foreground font-mono">{level.score}</span>
                          <span className="text-muted-foreground">{level.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No rubric assigned to this course.</p>
            )}
          </TabsContent>

          {/* ── Gates Tab ─────────────────────────────── */}
          <TabsContent value="gates" className="space-y-4">
            <h2 className="text-lg font-semibold">
              Verification Gate Preset: <code className="text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{template?.gatePreset || "standard"}</code>
            </h2>
            <p className="text-sm text-muted-foreground">
              These rules run server-side when a student clicks "Submit Final". The submission is blocked unless all gates pass.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { key: "planRequired", label: "Story plan required" },
                { key: "requireAllSections", label: "All required sections present" },
                { key: "requireSourceLinks", label: "Source links required" },
                { key: "requireNamedSources", label: "Named sources required" },
                { key: "requireEthicsMitigation", label: "Ethics mitigation required" },
                { key: "requireRightOfReply", label: "Right of reply documented" },
                { key: "requireAIDisclosure", label: "AI disclosure required" },
                { key: "requireReflection", label: "Reflection required" },
                { key: "requireProofPack", label: "Proof pack required (PR)" },
                { key: "requireAudiencePanel", label: "Audience panel required (PR)" },
                { key: "requirePhotoPermissions", label: "Photo permissions required" },
                { key: "requireSourcePermissions", label: "Source permissions required" },
                { key: "requireOpinionFactLabels", label: "Opinion/fact labels required" },
              ].map(({ key, label }) => (
                <GateRuleBadge key={key} label={label} active={!!gateRules[key]} />
              ))}
            </div>

            <div className="rounded-xl border p-4 bg-zinc-50 dark:bg-zinc-900 space-y-2">
              <h3 className="font-semibold text-sm">Thresholds</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">Min verification rows</span>
                <span className="font-medium">{gateRules.verificationMinRows ?? 2}</span>
                <span className="text-muted-foreground">High-risk min sources</span>
                <span className="font-medium">{gateRules.highRiskMinSources ?? 2}</span>
                <span className="text-muted-foreground">Min reflection chars</span>
                <span className="font-medium">{gateRules.reflectionMinLength ?? 100}</span>
                <span className="text-muted-foreground">Block if low-confidence &gt;</span>
                <span className="font-medium">{gateRules.blockIfLowConfidenceRatio ? `${(gateRules.blockIfLowConfidenceRatio * 100).toFixed(0)}%` : "not set"}</span>
              </div>
            </div>
          </TabsContent>

          {/* ── Grading & Marksheet Tab (Lecturers Only) ── */}
          {isLecturer && (
            <TabsContent value="grading" className="space-y-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Table2 className="h-5 w-5" />
                    Grading Configuration & Marksheet
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure grading weights and download the Excel marksheet for this course.
                  </p>
                </div>
                <Button 
                  onClick={async () => {
                    setIsDownloading(true)
                    try {
                      const response = await fetch(`/api/courses/${id}/marksheet`)
                      if (!response.ok) throw new Error("Failed to download")
                      const blob = await response.blob()
                      const url = window.URL.createObjectURL(blob)
                      const a = document.createElement("a")
                      a.href = url
                      a.download = `${displayCode || "Course"}_Marksheet_${new Date().toISOString().split("T")[0]}.xlsx`
                      document.body.appendChild(a)
                      a.click()
                      window.URL.revokeObjectURL(url)
                      document.body.removeChild(a)
                      toast.success("Marksheet downloaded successfully!")
                    } catch (error) {
                      console.error("Download error:", error)
                      toast.error("Failed to download marksheet")
                    } finally {
                      setIsDownloading(false)
                    }
                  }}
                  disabled={isDownloading}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  {isDownloading ? "Generating..." : "Download Marksheet (Excel)"}
                </Button>
              </div>

              {/* Grading Weight Config */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Assessment Weighting
                  </CardTitle>
                  <CardDescription>
                    Configure how continuous assessment (CA) and exams contribute to the final grade.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="caWeight">CA Weight (%)</Label>
                      <Input 
                        id="caWeight" 
                        type="number" 
                        min="0" 
                        max="100"
                        value={gradingConfig.caWeight}
                        onChange={(e) => {
                          const ca = parseInt(e.target.value) || 0
                          setGradingConfig(prev => ({
                            ...prev,
                            caWeight: ca,
                            examWeight: 100 - ca,
                          }))
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="examWeight">Exam Weight (%)</Label>
                      <Input 
                        id="examWeight" 
                        type="number" 
                        min="0" 
                        max="100"
                        value={gradingConfig.examWeight}
                        onChange={(e) => {
                          const exam = parseInt(e.target.value) || 0
                          setGradingConfig(prev => ({
                            ...prev,
                            examWeight: exam,
                            caWeight: 100 - exam,
                          }))
                        }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    CA ({gradingConfig.caWeight}%) + Exam ({gradingConfig.examWeight}%) = 100%
                  </p>
                </CardContent>
              </Card>

              {/* Assignment CA Contribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <ClipboardList className="h-4 w-4" />
                    Assignment CA Contribution
                  </CardTitle>
                  <CardDescription>
                    Select which assignments count toward Continuous Assessment. 
                    Assignment marks are scaled to {gradingConfig.caWeight}% automatically.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assignmentTemplates.length > 0 ? (
                      assignmentTemplates.map((t, idx) => (
                        <div key={t.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-semibold">
                              {idx + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{t.name || t.label}</p>
                              <p className="text-xs text-muted-foreground">
                                Max: 10 marks • {t.wordCountRange?.min || 300}–{t.wordCountRange?.max || 800} words
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs">Counts toward CA</Badge>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No assignments configured for this course.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Grade Scale */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    Grade Scale
                  </CardTitle>
                  <CardDescription>
                    Define the grade boundaries. Grades are calculated based on the final agreed mark.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {gradingConfig.gradeScale.map((gs, idx) => (
                      <div key={gs.grade} className="text-center p-3 rounded-lg border">
                        <div className="text-2xl font-bold">{gs.grade}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {gs.min}–{gs.max}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Marksheet Info */}
              <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    About the Marksheet Export
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    <li>• <strong>Assignment columns</strong>: Raw marks per assignment (e.g., 0–10)</li>
                    <li>• <strong>CA Total ({gradingConfig.caWeight})</strong>: Auto-calculated from assignments</li>
                    <li>• <strong>Exam ({gradingConfig.examWeight})</strong>: Blank, for manual entry (0–{gradingConfig.examWeight})</li>
                    <li>• <strong>IE Total (100)</strong>: CA + Exam, auto-calculated</li>
                    <li>• <strong>EE Mark (100)</strong>: External examiner mark, blank for manual entry</li>
                    <li>• <strong>Agreed Mark (100)</strong>: Average of IE and EE (can be overridden)</li>
                    <li>• <strong>Grade</strong>: Auto-calculated from agreed mark (or IE if EE not entered)</li>
                  </ul>
                  <Separator className="my-4" />
                  <p className="text-xs text-muted-foreground">
                    The Excel file includes data validation, formulas, and signature blocks for lecturer and external examiner.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </>
  )
}
