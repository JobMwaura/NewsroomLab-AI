"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Newspaper, ArrowRight, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        toast.success("Welcome to NewsroomLab AI!")
        router.push("/dashboard")
      }
    } catch {
      toast.error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = async (role) => {
    const emails = {
      ADMIN: "admin@newsroomlab.ai",
      LECTURER: "jkamau@university.ac.ke",
      STUDENT: "amina.w@student.ac.ke",
    }
    setIsLoading(true)
    try {
      const success = await login(emails[role], "demo")
      if (success) {
        toast.success(`Logged in as ${role.toLowerCase()}`)
        router.push("/dashboard")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 text-white flex-col justify-between p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-zinc-900" />
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
              <Newspaper className="h-5 w-5 text-zinc-900" />
            </div>
            <span className="text-xl font-bold">
              NewsroomLab <span className="text-blue-400">AI</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Where journalism students learn to{" "}
            <span className="text-blue-400">verify, not just write.</span>
          </h2>
          <p className="text-lg text-zinc-300 max-w-lg">
            AI coaches your reporting craft, enforces verification discipline, and develops 
            critical media analysis skills — without writing the story for you.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/10 text-white border-0">
              ✍️ Copy Editor
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-0">
              🔍 Fact-checker
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-0">
              ⚖️ Ethics Editor
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-0">
              🔎 Framing Analyst
            </Badge>
          </div>
        </div>

        <div className="relative z-10 text-sm text-zinc-500">
          Built for journalism educators who demand evidence-based assessment.
        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white">
              <Newspaper className="h-5 w-5 text-white dark:text-zinc-900" />
            </div>
            <span className="text-xl font-bold">
              NewsroomLab <span className="text-blue-600">AI</span>
            </span>
          </div>

          <Card className="border-0 shadow-xl shadow-zinc-200/50 dark:shadow-none">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@university.ac.ke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Demo Quick Login</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin("STUDENT")}
                  disabled={isLoading}
                  className="flex flex-col h-auto py-3 gap-1"
                >
                  <span className="text-lg">🎓</span>
                  <span className="text-xs">Student</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin("LECTURER")}
                  disabled={isLoading}
                  className="flex flex-col h-auto py-3 gap-1"
                >
                  <span className="text-lg">👨‍🏫</span>
                  <span className="text-xs">Lecturer</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin("ADMIN")}
                  disabled={isLoading}
                  className="flex flex-col h-auto py-3 gap-1"
                >
                  <span className="text-lg">⚙️</span>
                  <span className="text-xs">Admin</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-zinc-500">
            Demo mode — no real authentication required. Click any role to explore.
          </p>
        </div>
      </div>
    </div>
  )
}
