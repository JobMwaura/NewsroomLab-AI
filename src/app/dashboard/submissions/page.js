"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ArrowUpDown, Eye, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { demoSubmissions } from "@/lib/demo-data"
import { SUBMISSION_STATUS_LABELS, SUBMISSION_STATUS_COLORS } from "@/lib/types"

export default function SubmissionsPage() {
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredSubmissions = demoSubmissions.filter((sub) => {
    const matchesStatus = filterStatus === "all" || sub.status === filterStatus
    const matchesSearch =
      !searchQuery ||
      sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.assignmentTitle.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Submissions</h1>
        <p className="text-muted-foreground">
          Review and grade student submissions across all your assignments.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student name or assignment..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="SUBMITTED_V1">V1 Submitted</SelectItem>
            <SelectItem value="AI_REVIEWED">AI Reviewed</SelectItem>
            <SelectItem value="SUBMITTED_FINAL">Final Submitted</SelectItem>
            <SelectItem value="GRADED">Graded</SelectItem>
            <SelectItem value="RESUBMIT_REQUESTED">Resubmit Requested</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Total", count: demoSubmissions.length, color: "" },
          { label: "Needs Grading", count: demoSubmissions.filter((s) => s.status === "SUBMITTED_FINAL").length, color: "text-amber-600" },
          { label: "AI Reviewed", count: demoSubmissions.filter((s) => s.status === "AI_REVIEWED").length, color: "text-purple-600" },
          { label: "Graded", count: demoSubmissions.filter((s) => s.status === "GRADED").length, color: "text-green-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submissions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm" className="gap-1 -ml-3 h-8 text-xs">
                    Status <ArrowUpDown className="h-3 w-3" />
                  </Button>
                </TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Words</TableHead>
                <TableHead>Verifications</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="w-20"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((sub) => (
                <TableRow key={sub.id} className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900">
                  <TableCell className="font-medium">{sub.studentName}</TableCell>
                  <TableCell className="max-w-48 truncate text-sm text-muted-foreground">
                    {sub.assignmentTitle}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${SUBMISSION_STATUS_COLORS[sub.status]}`}
                    >
                      {SUBMISSION_STATUS_LABELS[sub.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">v{sub.currentVersion}</TableCell>
                  <TableCell className="text-sm">{sub.wordCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      {sub.verificationItemCount}
                    </div>
                  </TableCell>
                  <TableCell>
                    {sub.overallScore ? (
                      <span className="font-medium">{sub.overallScore}%</span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/grading/${sub.id}`}>
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
