"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, Users, ClipboardList, ArrowRight, Plus, Archive, GraduationCap, CheckCircle2, ChevronRight, Eye, EyeOff, Pencil, Settings, MoreVertical, Globe, Lock, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/providers/auth-provider"
import { courseTemplates, courseTemplateCodes, getCourseTemplate } from "@/lib/templates"
import { toast } from "sonner"

export default function CoursesPage() {
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [step, setStep] = useState(1) // 1 = pick template, 2 = configure
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch courses from database
  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses")
        if (res.ok) {
          const data = await res.json()
          setCourses(data.courses || [])
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error)
        toast.error("Failed to load courses")
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  // Filter based on role
  // Lecturers see all courses, students only see published courses
  const visibleCourses = isLecturer 
    ? courses 
    : courses.filter((c) => c.isPublished)
  
  const activeCourses = visibleCourses.filter((c) => !c.isArchived)
  const archivedCourses = visibleCourses.filter((c) => c.isArchived)
  
  // Count published/draft for lecturers
  const publishedCount = courses.filter(c => c.isPublished && !c.isArchived).length
  const draftCount = courses.filter(c => !c.isPublished && !c.isArchived).length

  const handleSelectTemplate = (code) => {
    setSelectedTemplate(getCourseTemplate(code))
    setStep(2)
  }

  const handleTogglePublish = async (courseId) => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return

    const newStatus = !course.isPublished
    
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: newStatus }),
      })

      if (res.ok) {
        setCourses(prev => prev.map(c => 
          c.id === courseId ? { ...c, isPublished: newStatus } : c
        ))
        toast.success(newStatus 
          ? `"${course.title}" is now visible to students` 
          : `"${course.title}" is now hidden from students`)
      } else {
        toast.error("Failed to update course")
      }
    } catch (error) {
      console.error("Failed to toggle publish:", error)
      toast.error("Failed to update course")
    }
  }

  const handleArchiveCourse = async (courseId) => {
    const course = courses.find(c => c.id === courseId)
    if (!course) return

    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isArchived: true, isPublished: false }),
      })

      if (res.ok) {
        setCourses(prev => prev.map(c => 
          c.id === courseId ? { ...c, isArchived: true, isPublished: false } : c
        ))
        toast.success(`"${course.title}" has been archived`)
      } else {
        toast.error("Failed to archive course")
      }
    } catch (error) {
      console.error("Failed to archive course:", error)
      toast.error("Failed to archive course")
    }
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

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    )
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
                                  {t.outcomes.slice(0, 3).map((o, i) => {
                                    const text = typeof o === "string" ? o : o.label
                                    return (
                                      <span key={i} className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                        {text.length > 40 ? text.slice(0, 40) + "…" : text}
                                      </span>
                                    )
                                  })}
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
                        {selectedTemplate.outcomes.map((o, i) => {
                          const text = typeof o === "string" ? o : o.label
                          return (
                            <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                              <span>{text}</span>
                            </div>
                          )
                        })}
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {isLecturer ? "All Courses" : "Available Courses"}
          </h2>
          {isLecturer && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="default" className="gap-1">
                <Globe className="h-3 w-3" />
                {publishedCount} Published
              </Badge>
              {draftCount > 0 && (
                <Badge variant="secondary" className="gap-1">
                  <Lock className="h-3 w-3" />
                  {draftCount} Draft
                </Badge>
              )}
            </div>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeCourses.map((course) => (
            <Card key={course.id} className={`h-full transition-all hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 ${!course.isPublished ? 'border-dashed opacity-80' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs font-mono">
                      {course.code}
                    </Badge>
                    {course.series && (
                      <Badge variant="outline" className="text-xs">
                        {course.series} Level
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    {isLecturer && (
                      <>
                        {course.isPublished ? (
                          <Badge variant="default" className="text-xs gap-1">
                            <Globe className="h-3 w-3" />
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs gap-1">
                            <Lock className="h-3 w-3" />
                            Draft
                          </Badge>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleTogglePublish(course.id)}>
                              {course.isPublished ? (
                                <>
                                  <EyeOff className="h-4 w-4 mr-2" />
                                  Unpublish (Hide from students)
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Publish (Make visible to students)
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleArchiveCourse(course.id)} className="text-destructive">
                              <Archive className="h-4 w-4 mr-2" />
                              Archive Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    )}
                    {!isLecturer && (
                      <Badge variant="outline" className="text-xs">
                        {course.semester}
                      </Badge>
                    )}
                  </div>
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
                    {course.assignmentCount || course.assignments?.length || 0} assignments
                  </div>
                </div>
                {/* Show outcomes preview */}
                {course.outcomes && course.outcomes.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Learning Outcomes:</p>
                    <div className="space-y-1">
                      {course.outcomes.slice(0, 2).map((outcome, i) => (
                        <div key={i} className="flex items-start gap-1 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{outcome}</span>
                        </div>
                      ))}
                      {course.outcomes.length > 2 && (
                        <p className="text-xs text-muted-foreground pl-4">+{course.outcomes.length - 2} more outcomes</p>
                      )}
                    </div>
                  </div>
                )}
                <Link href={`/dashboard/courses/${course.id}`}>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                    {isLecturer ? "Manage course" : "View course"} <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </CardContent>
            </Card>
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
