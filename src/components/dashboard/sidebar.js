"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Newspaper,
  LayoutDashboard,
  BookOpen,
  FileEdit,
  ClipboardList,
  Briefcase,
  BarChart3,
  Settings,
  Users,
  Shield,
  GraduationCap,
  FolderOpen,
  CheckSquare,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/providers/auth-provider"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const studentNav = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { title: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { title: "Editor Workspace", href: "/dashboard/editor", icon: FileEdit },
  { title: "Portfolio", href: "/dashboard/portfolio", icon: Briefcase },
]

const lecturerNav = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { title: "Assignments", href: "/dashboard/assignments", icon: ClipboardList },
  { title: "Submissions", href: "/dashboard/submissions", icon: FolderOpen },
  { title: "Grading", href: "/dashboard/grading", icon: CheckSquare },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Students", href: "/dashboard/students", icon: GraduationCap },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

const adminNav = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Users", href: "/dashboard/users", icon: Users },
  { title: "Institutions", href: "/dashboard/institutions", icon: BookOpen },
  { title: "AI Settings", href: "/dashboard/ai-settings", icon: Shield },
  { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { title: "Audit Logs", href: "/dashboard/audit-logs", icon: ClipboardList },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()

  const navItems =
    user?.role === "ADMIN"
      ? adminNav
      : user?.role === "LECTURER"
      ? lecturerNav
      : studentNav

  const roleLabel =
    user?.role === "ADMIN"
      ? "Administrator"
      : user?.role === "LECTURER"
      ? "Lecturer"
      : "Student"

  const roleColor =
    user?.role === "ADMIN"
      ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400"
      : user?.role === "LECTURER"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400"
      : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
            <Newspaper className="h-5 w-5 text-white dark:text-zinc-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight">
              NewsroomLab <span className="text-blue-600">AI</span>
            </span>
            <span className="text-[10px] text-muted-foreground">Journalism Studio</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-zinc-200 text-zinc-700 text-xs dark:bg-zinc-800 dark:text-zinc-300">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium truncate">{user?.name}</span>
            <Badge
              variant="secondary"
              className={`w-fit text-[10px] px-1.5 py-0 ${roleColor}`}
            >
              {roleLabel}
            </Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
