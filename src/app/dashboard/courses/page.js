"use client"

import Link from "next/link"
import { BookOpen, Users, ClipboardList, ArrowRight, Plus, Archive } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { demoCourses } from "@/lib/demo-data"

export default function CoursesPage() {
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"

  const activeCourses = demoCourses.filter((c) => !c.isArchived)
  const archivedCourses = demoCourses.filter((c) => c.isArchived)

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
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Course
          </Button>
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
