"use client"

import { useState } from "react"
import Link from "next/link"
import {
  FileText,
  Calendar,
  CheckCircle2,
  Users,
  ArrowRight,
  Plus,
  Filter,
  ChevronRight,
  BookOpen,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/providers/auth-provider"
import { demoAssignments, demoCourses } from "@/lib/demo-data"
import { STORY_TYPE_LABELS } from "@/lib/types"
import { storyTemplates, storyTemplateCategories, getTemplatesByCategory, getRubricPreset } from "@/lib/templates"
import { toast } from "sonner"

export default function AssignmentsPage() {
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [step, setStep] = useState(1)
  const [assignments, setAssignments] = useState(demoAssignments)

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)
    setStep(2)
  }

  const handleCreateAssignment = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newAssignment = {
      id: `assign_${Date.now()}`,
      title: formData.get("title") || selectedTemplate.label,
      courseName: formData.get("course") || "Unassigned",
      storyType: selectedTemplate.id.toUpperCase(),
      brief: formData.get("brief") || selectedTemplate.description || `Write a ${selectedTemplate.label}.`,
      dueAt: formData.get("dueDate") || new Date(Date.now() + 14 * 86400000).toISOString(),
      isPublished: true,
      constraints: {
        wordCountMin: selectedTemplate.wordCountRange[0],
        wordCountMax: selectedTemplate.wordCountRange[1],
      },
      requiredComponents: {
        verificationTable: (selectedTemplate.requiredComponents || []).includes("verification_table"),
        ethicsMemo: (selectedTemplate.requiredComponents || []).includes("ethics_memo"),
        reportingPlan: (selectedTemplate.requiredComponents || []).includes("reporting_plan"),
        aiDisclosure: (selectedTemplate.requiredComponents || []).includes("ai_disclosure"),
        reflection: (selectedTemplate.requiredComponents || []).includes("reflection"),
      },
      verificationRules: selectedTemplate.verificationDefaults || { minItems: 3, minHighConfidence: 1 },
      submissionCount: 0,
      gradedCount: 0,
      templateId: selectedTemplate.id,
    }
    setAssignments((prev) => [newAssignment, ...prev])
    setDialogOpen(false)
    setSelectedTemplate(null)
    setStep(1)
    toast.success(`Assignment "${newAssignment.title}" created from template!`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
          <p className="text-muted-foreground">
            {isLecturer
              ? "Create and manage assignments for your courses."
              : "Your current and upcoming assignments."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
          {isLecturer && (
            <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setStep(1); setSelectedTemplate(null) } }}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Assignment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl max-h-[85vh]">
                {step === 1 ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        New Assignment from Template
                      </DialogTitle>
                      <DialogDescription>
                        Select a story template. Each template includes word count rules, required sections, verification defaults, and a rubric.
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue={storyTemplateCategories[0]} className="space-y-4">
                      <TabsList className="w-full flex-wrap h-auto gap-1 p-1">
                        {storyTemplateCategories.map((cat) => (
                          <TabsTrigger key={cat} value={cat} className="text-xs capitalize">
                            {cat.toLowerCase()}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {storyTemplateCategories.map((cat) => (
                        <TabsContent key={cat} value={cat}>
                          <ScrollArea className="max-h-[45vh] pr-4">
                            <div className="grid gap-2">
                              {getTemplatesByCategory(cat).map((t) => (
                                <button
                                  key={t.id}
                                  onClick={() => handleSelectTemplate(t)}
                                  className="w-full text-left rounded-lg border p-3 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all group"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="text-sm font-medium">{t.label}</h4>
                                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                                        <Badge variant="outline" className="text-xs">{t.wordCountRange[0]}–{t.wordCountRange[1]} words</Badge>
                                        {t.requiredSections && (
                                          <Badge variant="secondary" className="text-xs">{t.requiredSections.length} sections</Badge>
                                        )}
                                        {t.constraints && t.constraints.length > 0 && (
                                          <Badge variant="secondary" className="text-xs">{t.constraints.length} constraints</Badge>
                                        )}
                                      </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-500 mt-1 shrink-0" />
                                  </div>
                                </button>
                              ))}
                            </div>
                          </ScrollArea>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </>
                ) : (
                  <>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Configure: {selectedTemplate.label}
                      </DialogTitle>
                      <DialogDescription>
                        Customise the assignment details. Rubric, sections, and verification rules come from the template.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="max-h-[55vh] pr-4">
                      <form id="createAssignmentForm" onSubmit={handleCreateAssignment} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="assignTitle">Assignment Title</Label>
                          <Input id="assignTitle" name="title" defaultValue={selectedTemplate.label} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="assignCourse">Assign to Course</Label>
                            <Select name="course" defaultValue={demoCourses[0]?.title}>
                              <SelectTrigger id="assignCourse"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {demoCourses.filter(c => !c.isArchived).map(c => (
                                  <SelectItem key={c.id} value={c.title}>{c.code} — {c.title}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input id="dueDate" name="dueDate" type="date" defaultValue={new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0]} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brief">Assignment Brief</Label>
                          <textarea id="brief" name="brief" rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder={`Write a ${selectedTemplate.label}...`} />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">Template Details</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <div>📏 Word count: {selectedTemplate.wordCountRange[0]}–{selectedTemplate.wordCountRange[1]}</div>
                            <div>📝 Rubric: {selectedTemplate.rubricId || "default"}</div>
                            <div>✅ Min verification items: {selectedTemplate.verificationDefaults?.minItems || 3}</div>
                            <div>📚 Micro-lessons: {(selectedTemplate.microLessonIds || []).length}</div>
                          </div>
                        </div>

                        {selectedTemplate.requiredSections && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Required Sections</h4>
                            <div className="flex flex-wrap gap-1">
                              {selectedTemplate.requiredSections.map((s) => (
                                <Badge key={s} variant="outline" className="text-xs">{s.replace(/_/g, " ")}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedTemplate.constraints && selectedTemplate.constraints.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">Constraints</h4>
                            <ul className="space-y-1">
                              {selectedTemplate.constraints.map((c, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                  <span>•</span>{c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </form>
                    </ScrollArea>
                    <div className="flex justify-between pt-2">
                      <Button type="button" variant="outline" onClick={() => { setStep(1); setSelectedTemplate(null) }}>
                        ← Back
                      </Button>
                      <Button type="submit" form="createAssignmentForm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Assignment
                      </Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => {
          const daysUntilDue = Math.ceil(
            (new Date(assignment.dueAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          )
          const isOverdue = daysUntilDue < 0
          const isUrgent = daysUntilDue >= 0 && daysUntilDue <= 3

          return (
            <Link key={assignment.id} href={`/dashboard/assignments/${assignment.id}`}>
              <Card className="transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 className="font-semibold">{assignment.title}</h3>
                          {!assignment.isPublished && (
                            <Badge variant="outline" className="text-xs text-amber-600 border-amber-300">
                              Draft
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {assignment.courseName}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {STORY_TYPE_LABELS[assignment.storyType]}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {assignment.constraints.wordCountMin}–{assignment.constraints.wordCountMax} words
                          </Badge>
                          {assignment.requiredComponents.verificationTable && (
                            <Badge variant="outline" className="text-xs gap-1 text-green-700 border-green-200 bg-green-50 dark:text-green-400 dark:border-green-900 dark:bg-green-950">
                              <CheckCircle2 className="h-3 w-3" />
                              Verification Required
                            </Badge>
                          )}
                          {assignment.requiredComponents.ethicsMemo && (
                            <Badge variant="outline" className="text-xs gap-1 text-amber-700 border-amber-200 bg-amber-50 dark:text-amber-400 dark:border-amber-900 dark:bg-amber-950">
                              Ethics Memo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side info */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                        <span
                          className={
                            isOverdue
                              ? "text-red-600 font-medium"
                              : isUrgent
                              ? "text-amber-600 font-medium"
                              : "text-muted-foreground"
                          }
                        >
                          {isOverdue
                            ? "Overdue"
                            : isUrgent
                            ? `${daysUntilDue}d left`
                            : new Date(assignment.dueAt).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                              })}
                        </span>
                      </div>

                      {isLecturer && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          {assignment.gradedCount}/{assignment.submissionCount} graded
                        </div>
                      )}

                      <div className="flex items-center gap-1 text-sm font-medium text-blue-600 mt-1">
                        {isLecturer ? "Manage" : "Open"} <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
