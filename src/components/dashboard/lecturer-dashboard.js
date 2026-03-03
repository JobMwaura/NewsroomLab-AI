"use client"

import Link from "next/link"
import {
  BookOpen,
  Users,
  ClipboardList,
  TrendingUp,
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/providers/auth-provider"
import { lecturerDashboardStats, demoSubmissions } from "@/lib/demo-data"
import { SUBMISSION_STATUS_LABELS, SUBMISSION_STATUS_COLORS } from "@/lib/types"

export function LecturerDashboard() {
  const { user } = useAuth()
  const stats = lecturerDashboardStats

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Good morning, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground">
            You have <span className="font-medium text-amber-600">{stats.submissionsToGrade}</span> submissions to grade.
          </p>
        </div>
        <Link href="/dashboard/assignments">
          <Button className="gap-2">
            <ClipboardList className="h-4 w-4" />
            New Assignment
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalCourses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Assignments</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.activeAssignments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">To Grade</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600">{stats.submissionsToGrade}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.averageScore}%</div>
            <Progress value={stats.averageScore} className="mt-2 h-1.5" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.upcomingDeadlines.map((deadline) => (
              <div key={deadline.title} className="rounded-lg border p-3 space-y-1">
                <p className="text-sm font-medium">{deadline.title}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{deadline.course}</span>
                  <span>Due {new Date(deadline.dueAt).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {deadline.submissions} submissions
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Submissions */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Recent Submissions</CardTitle>
            <CardDescription>Latest student submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoSubmissions.slice(0, 4).map((sub) => (
              <div key={sub.id} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <p className="text-sm font-medium">{sub.studentName}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {sub.assignmentTitle}
                  </p>
                </div>
                <Badge variant="secondary" className={`text-xs ${SUBMISSION_STATUS_COLORS[sub.status]}`}>
                  {SUBMISSION_STATUS_LABELS[sub.status]}
                </Badge>
              </div>
            ))}
            <Link href="/dashboard/submissions">
              <Button variant="outline" size="sm" className="w-full gap-1 mt-1">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Common Issues */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4" />
              Common Issues
            </CardTitle>
            <CardDescription>Most frequent problems across submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.commonIssues.map((issue) => (
              <div key={issue.issue} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                    <span>{issue.issue}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">{issue.percentage}%</span>
                </div>
                <Progress value={issue.percentage} className="h-1.5" />
              </div>
            ))}
            <Link href="/dashboard/analytics">
              <Button variant="outline" size="sm" className="w-full gap-1 mt-2">
                Full Analytics <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.assignment}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
