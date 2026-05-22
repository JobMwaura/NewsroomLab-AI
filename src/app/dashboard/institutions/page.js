"use client"

import { useState } from "react"
import { Building2, BookOpen, Users, Globe, MoreHorizontal, Plus, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const demoInstitutions = [
  {
    id: "inst-1",
    name: "University of Nairobi",
    shortName: "UoN",
    country: "Kenya",
    city: "Nairobi",
    status: "ACTIVE",
    students: 89,
    lecturers: 5,
    courses: 6,
    joinedAt: "2024-01-15",
    plan: "Professional",
  },
  {
    id: "inst-2",
    name: "Kenyatta University",
    shortName: "KU",
    country: "Kenya",
    city: "Nairobi",
    status: "ACTIVE",
    students: 27,
    lecturers: 3,
    courses: 3,
    joinedAt: "2024-03-20",
    plan: "Starter",
  },
  {
    id: "inst-3",
    name: "Strathmore University",
    shortName: "SU",
    country: "Kenya",
    city: "Nairobi",
    status: "PENDING",
    students: 0,
    lecturers: 0,
    courses: 0,
    joinedAt: "2024-05-01",
    plan: "Trial",
  },
]

const STATUS_COLORS = {
  ACTIVE: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  PENDING: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  SUSPENDED: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
}

const PLAN_COLORS = {
  Trial: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  Starter: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Professional: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
}

export default function InstitutionsPage() {
  const [institutions] = useState(demoInstitutions)

  const totals = {
    institutions: institutions.length,
    active: institutions.filter(i => i.status === "ACTIVE").length,
    students: institutions.reduce((a, i) => a + i.students, 0),
    courses: institutions.reduce((a, i) => a + i.courses, 0),
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Institutions</h1>
          <p className="text-muted-foreground">Manage all partner institutions on the platform.</p>
        </div>
        <Button className="gap-2" onClick={() => toast.info("Institution onboarding coming soon")}>
          <Plus className="h-4 w-4" />
          Add Institution
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Total", count: totals.institutions, icon: Building2 },
          { label: "Active", count: totals.active, icon: Globe },
          { label: "Students", count: totals.students, icon: Users },
          { label: "Courses", count: totals.courses, icon: BookOpen },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
              <stat.icon className="h-8 w-8 opacity-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Institutions table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-14"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {institutions.map((inst) => (
                <TableRow key={inst.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-muted-foreground">
                        {inst.shortName}
                      </div>
                      <span className="font-medium">{inst.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {inst.city}, {inst.country}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs ${STATUS_COLORS[inst.status]}`}>
                      {inst.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs ${PLAN_COLORS[inst.plan]}`}>
                      {inst.plan}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{inst.students}</TableCell>
                  <TableCell className="text-sm">{inst.courses}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(inst.joinedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast.info(`Viewing ${inst.name}`)}>View Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.info("Edit coming soon")}>Edit</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.error("Suspension coming soon")}
                        >
                          Suspend
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
