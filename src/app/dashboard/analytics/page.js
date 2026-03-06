"use client"

import { BarChart3, TrendingUp, Users, FileText, Clock, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/providers/auth-provider"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"

  const stats = [
    { label: "Total Submissions", value: "247", change: "+12%", icon: FileText },
    { label: "Active Students", value: "89", change: "+5%", icon: Users },
    { label: "Avg. Completion Time", value: "4.2 days", change: "-8%", icon: Clock },
    { label: "Pass Rate", value: "87%", change: "+3%", icon: Target },
  ]

  const courseMetrics = [
    { course: "HCC 109", submissions: 45, avgScore: 72, completion: 85 },
    { course: "HCC 205", submissions: 38, avgScore: 78, completion: 92 },
    { course: "HCC 312", submissions: 52, avgScore: 68, completion: 78 },
    { course: "HCC 314", submissions: 41, avgScore: 75, completion: 88 },
    { course: "HCC 316", submissions: 35, avgScore: 81, completion: 95 },
    { course: "HCC 420", submissions: 36, avgScore: 74, completion: 82 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          {isLecturer ? "Track student progress and course performance" : "View your performance analytics"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {isLecturer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Course Performance
            </CardTitle>
            <CardDescription>Submission metrics across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courseMetrics.map((course) => (
                <div key={course.course} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{course.course}</span>
                    <span className="text-sm text-muted-foreground">
                      {course.submissions} submissions · Avg: {course.avgScore}%
                    </span>
                  </div>
                  <Progress value={course.completion} className="h-2" />
                  <p className="text-xs text-muted-foreground">{course.completion}% completion rate</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {!isLecturer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Your Progress
            </CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Assignments Completed</span>
                <span className="font-bold">12 / 15</span>
              </div>
              <Progress value={80} className="h-2" />
              <p className="text-sm text-muted-foreground">You're 80% through the semester!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
