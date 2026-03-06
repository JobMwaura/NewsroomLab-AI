"use client"

import { Users, Search, UserPlus, Mail, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/components/providers/auth-provider"

const demoStudents = [
  { id: 1, name: "Jane Wanjiku", email: "jane.wanjiku@student.edu", course: "HCC 109", submissions: 5, status: "active" },
  { id: 2, name: "Peter Omondi", email: "peter.omondi@student.edu", course: "HCC 205", submissions: 7, status: "active" },
  { id: 3, name: "Grace Muthoni", email: "grace.muthoni@student.edu", course: "HCC 312", submissions: 4, status: "active" },
  { id: 4, name: "James Kiprotich", email: "james.kiprotich@student.edu", course: "HCC 314", submissions: 6, status: "inactive" },
  { id: 5, name: "Mary Achieng", email: "mary.achieng@student.edu", course: "HCC 316", submissions: 3, status: "active" },
]

export default function StudentsPage() {
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"

  if (!isLecturer) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-muted-foreground">Student management is only available for lecturers.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage enrolled students across your courses</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Students
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search students..." className="pl-9" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Enrolled Students
          </CardTitle>
          <CardDescription>{demoStudents.length} students across all courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {demoStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{student.course}</Badge>
                  <span className="text-sm text-muted-foreground">{student.submissions} submissions</span>
                  <Badge variant={student.status === "active" ? "default" : "secondary"}>
                    {student.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
