"use client"

import Link from "next/link"
import {
  FileText,
  Calendar,
  CheckCircle2,
  Users,
  ArrowRight,
  Plus,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { demoAssignments } from "@/lib/demo-data"
import { STORY_TYPE_LABELS } from "@/lib/types"

export default function AssignmentsPage() {
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"

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
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Assignment
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {demoAssignments.map((assignment) => {
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
