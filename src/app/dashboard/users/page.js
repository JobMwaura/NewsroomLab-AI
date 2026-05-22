"use client"

import { useState, useEffect } from "react"
import { Users, Search, Filter, MoreHorizontal, Shield, GraduationCap, BookOpen, UserPlus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { demoUsers } from "@/lib/demo-data"

const ROLE_COLORS = {
  ADMIN: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  LECTURER: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  STUDENT: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
}

const ROLE_ICONS = {
  ADMIN: Shield,
  LECTURER: BookOpen,
  STUDENT: GraduationCap,
}

// Extended demo user list
const allUsers = [
  ...demoUsers,
  { id: "user-student-5", name: "Esther Njeri", email: "esther.n@student.ac.ke", role: "STUDENT", yearOfStudy: 2 },
  { id: "user-student-6", name: "Felix Odhiambo", email: "felix.o@student.ac.ke", role: "STUDENT", yearOfStudy: 1 },
  { id: "user-student-7", name: "Grace Achieng", email: "grace.a@student.ac.ke", role: "STUDENT", yearOfStudy: 3 },
  { id: "user-student-8", name: "Hassan Mwangi", email: "hassan.m@student.ac.ke", role: "STUDENT", yearOfStudy: 4 },
  { id: "user-lecturer-2", name: "Dr. Faith Kariuki", email: "fkariuki@university.ac.ke", role: "LECTURER" },
  { id: "user-lecturer-3", name: "Mr. John Ouma", email: "jouma@university.ac.ke", role: "LECTURER" },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  const filtered = allUsers.filter((u) => {
    const matchesRole = filterRole === "all" || u.role === filterRole
    const matchesSearch =
      !searchQuery ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRole && matchesSearch
  })

  const counts = {
    total: allUsers.length,
    admins: allUsers.filter(u => u.role === "ADMIN").length,
    lecturers: allUsers.filter(u => u.role === "LECTURER").length,
    students: allUsers.filter(u => u.role === "STUDENT").length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage all platform users across roles.</p>
        </div>
        <Button className="gap-2" onClick={() => toast.info("User creation coming soon")}>
          <UserPlus className="h-4 w-4" />
          Invite User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[
          { label: "Total Users", count: counts.total, icon: Users, color: "" },
          { label: "Admins", count: counts.admins, icon: Shield, color: "text-red-600" },
          { label: "Lecturers", count: counts.lecturers, icon: BookOpen, color: "text-blue-600" },
          { label: "Students", count: counts.students, icon: GraduationCap, color: "text-green-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
              </div>
              <stat.icon className={`h-8 w-8 opacity-20 ${stat.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-44">
            <Filter className="h-3.5 w-3.5 mr-2" />
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="LECTURER">Lecturer</SelectItem>
            <SelectItem value="STUDENT">Student</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="w-14"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => {
                const Icon = ROLE_ICONS[user.role]
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        {user.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs ${ROLE_COLORS[user.role]}`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.yearOfStudy ? `Year ${user.yearOfStudy}` : "—"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toast.info(`Editing ${user.name}`)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info("Role change coming soon")}>Change Role</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => toast.error("User removal coming soon")}
                          >
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No users match your search.
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
