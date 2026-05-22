"use client"

import { useState } from "react"
import { ClipboardList, Search, Filter, Shield, User, BookOpen, Brain, Settings, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

const demoAuditLogs = [
  { id: "log-001", timestamp: "2026-05-22T09:14:32Z", actor: "Dr. Sarah Ochieng", role: "ADMIN", action: "USER_ROLE_CHANGED", resource: "brian.o@student.ac.ke", details: "Role changed from STUDENT to STUDENT (no-op test)", category: "user" },
  { id: "log-002", timestamp: "2026-05-22T08:55:10Z", actor: "Prof. James Kamau", role: "LECTURER", action: "SUBMISSION_GRADED", resource: "Assignment: Breaking News Story", details: "Grade: 84%", category: "grading" },
  { id: "log-003", timestamp: "2026-05-22T08:30:00Z", actor: "Amina Wanjiku", role: "STUDENT", action: "SUBMISSION_FINAL", resource: "Assignment: Breaking News Story", details: "Final submission v1 — 643 words", category: "submission" },
  { id: "log-004", timestamp: "2026-05-22T08:15:44Z", actor: "Amina Wanjiku", role: "STUDENT", action: "AI_REVIEW_REQUESTED", resource: "Editor Workspace", details: "Tokens used: ~420", category: "ai" },
  { id: "log-005", timestamp: "2026-05-21T17:02:12Z", actor: "Dr. Sarah Ochieng", role: "ADMIN", action: "COURSE_CREATED", resource: "HCC 314 — Broadcast Journalism", details: "Created from template: broadcast_journalism", category: "course" },
  { id: "log-006", timestamp: "2026-05-21T15:45:00Z", actor: "Prof. James Kamau", role: "LECTURER", action: "ASSIGNMENT_PUBLISHED", resource: "Assignment: Feature Story", details: "Published to HCC 205", category: "course" },
  { id: "log-007", timestamp: "2026-05-21T14:20:33Z", actor: "Brian Otieno", role: "STUDENT", action: "LOGIN", resource: "Web", details: "Successful login", category: "auth" },
  { id: "log-008", timestamp: "2026-05-21T11:10:00Z", actor: "Dr. Sarah Ochieng", role: "ADMIN", action: "AI_SETTINGS_UPDATED", resource: "AI Configuration", details: "Model changed to gpt-4o-mini", category: "ai" },
  { id: "log-009", timestamp: "2026-05-20T16:30:00Z", actor: "Cynthia Muthoni", role: "STUDENT", action: "SUBMISSION_FINAL", resource: "Assignment: Investigative Piece", details: "Final submission v2 — 1,240 words", category: "submission" },
  { id: "log-010", timestamp: "2026-05-20T10:05:55Z", actor: "Dr. Sarah Ochieng", role: "ADMIN", action: "USER_INVITED", resource: "fkariuki@university.ac.ke", details: "Invited as LECTURER", category: "user" },
  { id: "log-011", timestamp: "2026-05-19T09:00:00Z", actor: "Prof. James Kamau", role: "LECTURER", action: "RESUBMIT_REQUESTED", resource: "Brian Otieno — Assignment: News Analysis", details: "Feedback: Needs stronger sources", category: "grading" },
  { id: "log-012", timestamp: "2026-05-18T14:15:00Z", actor: "System", role: "SYSTEM", action: "SCHEDULED_BACKUP", resource: "Database", details: "Daily backup completed successfully", category: "system" },
]

const CATEGORY_COLORS = {
  user: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  grading: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  submission: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  ai: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  course: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  auth: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  system: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
}

const ROLE_ICONS = {
  ADMIN: Shield,
  LECTURER: BookOpen,
  STUDENT: User,
  SYSTEM: Settings,
}

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const filtered = demoAuditLogs.filter((log) => {
    const matchesCat = filterCategory === "all" || log.category === filterCategory
    const matchesSearch =
      !searchQuery ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">Platform activity trail for all users and system events.</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Export coming soon")}>
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search actor, action, or resource..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Filter category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="auth">Auth</SelectItem>
            <SelectItem value="user">User Management</SelectItem>
            <SelectItem value="course">Courses</SelectItem>
            <SelectItem value="submission">Submissions</SelectItem>
            <SelectItem value="grading">Grading</SelectItem>
            <SelectItem value="ai">AI</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-40">Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((log) => {
                const Icon = ROLE_ICONS[log.role] || User
                return (
                  <TableRow key={log.id} className="text-sm">
                    <TableCell className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString("en-GB", {
                        day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="font-medium truncate max-w-32">{log.actor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                        {log.action}
                      </code>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-40 truncate">{log.resource}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs ${CATEGORY_COLORS[log.category]}`}>
                        {log.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs max-w-48 truncate">{log.details}</TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No logs match your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
