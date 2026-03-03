"use client"

import Link from "next/link"
import {
  BookOpen,
  Clock,
  FileText,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Brain,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/providers/auth-provider"
import { studentDashboardStats } from "@/lib/demo-data"
import { SUBMISSION_STATUS_LABELS, SUBMISSION_STATUS_COLORS } from "@/lib/types"

export function StudentDashboard() {
  const { user } = useAuth()
  const stats = studentDashboardStats

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your journalism coursework.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Assignments
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{stats.pendingAssignments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completedAssignments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.averageScore}%</div>
            <Progress value={stats.averageScore} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      {/* Two column layout */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>Your active assignments and their status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.upcomingDeadlines.map((deadline) => {
              const daysLeft = Math.ceil(
                (new Date(deadline.dueAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              )
              const isUrgent = daysLeft <= 3

              return (
                <div
                  key={deadline.title}
                  className="flex items-center justify-between rounded-xl border p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        isUrgent
                          ? "bg-red-100 dark:bg-red-950"
                          : "bg-blue-100 dark:bg-blue-950"
                      }`}
                    >
                      <FileText
                        className={`h-5 w-5 ${
                          isUrgent
                            ? "text-red-600 dark:text-red-400"
                            : "text-blue-600 dark:text-blue-400"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{deadline.title}</p>
                      <p className="text-sm text-muted-foreground">{deadline.course}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className={SUBMISSION_STATUS_COLORS[deadline.status]}
                        >
                          {SUBMISSION_STATUS_LABELS[deadline.status]}
                        </Badge>
                        {isUrgent && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {daysLeft <= 0 ? "Overdue" : `${daysLeft}d left`}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link href="/dashboard/editor">
                    <Button variant="ghost" size="sm" className="gap-1">
                      Open <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent AI Feedback */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Feedback
            </CardTitle>
            <CardDescription>Latest reviews from the AI Edit Desk</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.recentFeedback.map((feedback, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {feedback.editor}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{feedback.time}</span>
                </div>
                <p className="text-sm font-medium">{feedback.assignment}</p>
                <p className="text-xs text-muted-foreground">{feedback.summary}</p>
              </div>
            ))}
            <Link href="/dashboard/editor">
              <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
                View All Feedback <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
