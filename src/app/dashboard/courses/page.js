"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, Users, ClipboardList, ArrowRight, Plus, Archive, GraduationCap, CheckCircle2, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/components/providers/auth-provider"
import { demoCourses } from "@/lib/demo-data"
import { courseTemplates, courseTemplateCodes, getCourseTemplate } from "@/lib/templates"
import { toast } from "sonner"

export default function CoursesPage() {
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [step, setStep] = useState(1) // 1 = pick template, 2 = configure
  const [courses, setCourses] = useState(demoCourses)

  const activeCourses = courses.filter((c) => !c.isArchived)
  const archivedCourses = courses.filter((c) => c.isArchived)

  const handleSelectTemplate = (code) => {
    setSelectedTemplate(getCourseTemplate(code))
    setStep(2)
  }

  const handleCreateCourse = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newCourse = {
      id: `course_${Date.now()}`,
      code: selectedTemplate.code,
      title: formData.get("title") || selectedTemplate.title,
      description: selectedTemplate.description,
      semester: formData.get("semester") || "Sept 2025",
      studentCount: 0,
      assignmentCount: selectedTemplate.assignmentTemplateIds.length,
      isArchived: false,
      templateId: selectedTemplate.code,
      outcomes: selectedTemplate.outcomes,
      weeklyPlan: selectedTemplate.weeklyPlan,
    }
    setCourses((prev) => [newCourse, ...prev])
    setDialogOpen(false)
    setSelectedTemplate(null)
    setStep(1)
    toast.success(`Course "${newCourse.title}" created from template with ${newCourse.assignmentCount} assignments!`)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isLecturer ? "My Courses" : "Enrolled Courses"}
          </h1>
          <p className="text-muted-foreground">
            {isLecturer
              ? "Manage your courses, assignments, and students."
              : "Your enrolled courses and assignments."}
          </p>
        </div>
        {isLecturer && (
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setStep(1); setSelectedTemplate(null) } }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl max-h-[85vh]">
              {step === 1 ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Create Course from Template
                    </DialogTitle>
                    <DialogDescription>
                      Select a syllabus template. Each template includes learning outcomes, a 14-week plan, pre-configured assignments, and rubrics.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[55vh] pr-4">
                    <div className="grid gap-3">
                      {courseTemplateCodes.map((code) => {
                        const t = courseTemplates[code]
                        return (
                          <button
                            key={code}
                            onClick={() => handleSelectTemplate(code)}
                            className="w-full text-left rounded-xl border p-4 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-all group"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary" className="text-xs font-mono">{t.code}</Badge>
                                  <Badge variant="outline" className="text-xs">{t.assignmentTemplateIds.length} assignments</Badge>
                                </div>
                                <h3 className="font-semibold text-sm">{t.title}</h3>
                                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {t.outcomes.slice(0, 3).map((o, i) => (
                                    <span key={i} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                      <CheckCircle2 className="h-3 w-3 text-green-500" />
                                      {o.label.length > 40 ? o.label.slice(0, 40) + "…" : o.label}
                                    </span>
                                  ))}
                                  {t.outcomes.length > 3 && (
                                    <span className="text-xs text-muted-foreground">+{t.outcomes.length - 3} more</span>
                                  )}
                                </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 mt-1 shrink-0" />
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Configure: {selectedTemplate.code}
                    </DialogTitle>
                    <DialogDescription>
                      Customise the course details. Assignments and rubrics will be auto-generated from the template.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseTitle">Course Title</Label>
                      <Input id="courseTitle" name="title" defaultValue={selectedTemplate.title} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semester</Label>
                        <Select name="semester" defaultValue="Sept 2025">
                          <SelectTrigger id="semester"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sept 2025">September 2025</SelectItem>
                            <SelectItem value="Jan 2026">January 2026</SelectItem>
                            <SelectItem value="May 2026">May 2026</SelectItem>
                            <SelectItem value="Sept 2026">September 2026</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Template</Label>
                        <Input value={selectedTemplate.code} disabled className="text-muted-foreground" />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Learning Outcomes (from template)</h4>
                      <div className="space-y-1">
                        {selectedTemplate.outcomes.map((o) => (
                          <div key={o.id} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                            <span>{o.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">Auto-generated Assignments ({selectedTemplate.assignmentTemplateIds.length})</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedTemplate.assignmentTemplateIds.map((id) => (
                          <Badge key={id} variant="outline" className="text-xs">{id.replace(/_/g, " ")}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button type="button" variant="outline" onClick={() => { setStep(1); setSelectedTemplate(null) }}>
                        ← Back
                      </Button>
                      <Button type="submit" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Course
                      </Button>
                    </div>
                  </form>
                </>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Active Courses */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Active Courses</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map((course) => (
            <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
              <Card className="h-full transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {course.code}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {course.semester}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.studentCount} students
                    </div>
                    <div className="flex items-center gap-1">
                      <ClipboardList className="h-3.5 w-3.5" />
                      {course.assignmentCount} assignments
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600">
                    Open course <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Archived Courses */}
      {archivedCourses.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-muted-foreground">
            <Archive className="h-4 w-4" />
            Archived Courses
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {archivedCourses.map((course) => (
              <Card key={course.id} className="opacity-60">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {course.code}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-zinc-100 dark:bg-zinc-900">
                      Archived
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.semester}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {course.studentCount} students
                    </div>
                    <div className="flex items-center gap-1">
                      <ClipboardList className="h-3.5 w-3.5" />
                      {course.assignmentCount} assignments
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
