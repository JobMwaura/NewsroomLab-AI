"use client"

import { useRouter } from "next/navigation"
import { Bell, LogOut, Moon, Sun, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"

export function DashboardHeader() {
  const { user, logout, switchRole } = useAuth()
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/")
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />

      {/* Breadcrumb placeholder */}
      <div className="flex-1">
        <span className="text-sm text-muted-foreground">
          {user?.role === "LECTURER" && "Lecturer Dashboard"}
          {user?.role === "STUDENT" && "Student Dashboard"}
          {user?.role === "ADMIN" && "Admin Dashboard"}
        </span>
      </div>

      {/* Role Switcher (demo only) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            Switch Role <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-xs">Demo Role Switch</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => switchRole("STUDENT")}>
            <span className="mr-2">🎓</span> Student View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchRole("LECTURER")}>
            <span className="mr-2">👨‍🏫</span> Lecturer View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchRole("ADMIN")}>
            <span className="mr-2">⚙️</span> Admin View
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="h-8 w-8 relative">
        <Bell className="h-4 w-4" />
        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500">
          3
        </Badge>
      </Button>

      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 px-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-xs bg-zinc-200 dark:bg-zinc-800">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "?"}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium md:inline-block">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
