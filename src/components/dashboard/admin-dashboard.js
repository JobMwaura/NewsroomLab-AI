"use client"

import { Users, BookOpen, Shield, BarChart3, AlertTriangle, Server } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"

export function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          System overview and management — {user?.name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127</div>
            <p className="text-xs text-muted-foreground mt-1">3 admins, 8 lecturers, 116 students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">Across 2 institutions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Reviews Today</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">34</div>
            <p className="text-xs text-muted-foreground mt-1">~12,400 tokens used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-lg font-bold text-green-600">Healthy</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin panels */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4" />
              AI Usage This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { editor: "Copy Editor", calls: 45, tokens: "18.2k" },
                { editor: "Fact-checker", calls: 42, tokens: "22.1k" },
                { editor: "Ethics & Law", calls: 38, tokens: "15.8k" },
                { editor: "Framing Analyst", calls: 36, tokens: "19.5k" },
              ].map((item) => (
                <div key={item.editor} className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm font-medium">{item.editor}</span>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{item.calls} calls</span>
                    <Badge variant="outline">{item.tokens} tokens</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4" />
              Safety Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-900 dark:bg-amber-950">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  1 high-risk ethics flag
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  Submission in HCC 314 flagged for potential defamation risk. Lecturer notified.
                </p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-sm text-muted-foreground">No other alerts at this time.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
