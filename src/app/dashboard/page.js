"use client"

import { useAuth } from "@/components/providers/auth-provider"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"
import { LecturerDashboard } from "@/components/dashboard/lecturer-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  if (user?.role === "LECTURER") return <LecturerDashboard />
  if (user?.role === "ADMIN") return <AdminDashboard />
  return <StudentDashboard />
}
