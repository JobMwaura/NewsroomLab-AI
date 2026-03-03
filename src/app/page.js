"use client"

import Link from "next/link"
import {
  Newspaper,
  Shield,
  Brain,
  CheckCircle2,
  Users,
  FileText,
  BarChart3,
  ArrowRight,
  Sparkles,
  BookOpen,
  Scale,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* ─── Navigation ──────────────────────────────── */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
              <Newspaper className="h-5 w-5 text-white dark:text-zinc-900" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              NewsroomLab <span className="text-blue-600">AI</span>
            </span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#workflow" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#editors" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
              AI Edit Desk
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-b from-blue-100/60 via-purple-50/40 to-transparent blur-3xl dark:from-blue-900/20 dark:via-purple-900/10" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 gap-1.5 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Journalism Education
            </Badge>

            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-7xl">
              Where Students Learn to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Report, Verify & Reflect
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              A newsroom studio where AI coaches — never writes for — your students. 
              Enforce verification discipline, media analysis, and ethical reporting 
              with evidence-based assessment.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button size="lg" className="gap-2 px-8 text-base">
                  Launch Demo <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#workflow">
                <Button size="lg" variant="outline" className="gap-2 px-8 text-base">
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-zinc-500 dark:text-zinc-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                AI never fabricates quotes or facts
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                Evidence-gated submissions
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-600" />
                Full audit trail
              </div>
            </div>
          </div>

          {/* Hero Preview Card */}
          <div className="mt-16 mx-auto max-w-5xl">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-2 shadow-2xl shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:shadow-none">
              <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
                {/* Mock browser chrome */}
                <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-3 dark:border-zinc-800">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-4 flex-1 rounded-md bg-zinc-100 px-3 py-1 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
                    newsroomlab.ai/dashboard
                  </div>
                </div>

                {/* Preview content */}
                <div className="grid grid-cols-12 gap-0 min-h-[400px]">
                  {/* Sidebar preview */}
                  <div className="col-span-3 border-r border-zinc-100 p-4 dark:border-zinc-800">
                    <div className="mb-6 flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-zinc-900 flex items-center justify-center dark:bg-white">
                        <Newspaper className="h-4 w-4 text-white dark:text-zinc-900" />
                      </div>
                      <span className="text-sm font-semibold">NewsroomLab</span>
                    </div>
                    <div className="space-y-1">
                      {[
                        { icon: "📊", label: "Dashboard", active: true },
                        { icon: "📚", label: "Courses", active: false },
                        { icon: "📝", label: "Assignments", active: false },
                        { icon: "✍️", label: "Editor", active: false },
                        { icon: "📋", label: "Portfolio", active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                            item.active
                              ? "bg-zinc-100 font-medium dark:bg-zinc-800"
                              : "text-zinc-500"
                          }`}
                        >
                          <span>{item.icon}</span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main content preview */}
                  <div className="col-span-9 p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold">Student Dashboard</h3>
                      <p className="text-sm text-zinc-500">Welcome back, Amina</p>
                    </div>

                    {/* Stats cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: "Active Assignments", value: "3", color: "text-blue-600" },
                        { label: "Pending Reviews", value: "1", color: "text-amber-600" },
                        { label: "Average Score", value: "74%", color: "text-green-600" },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-xl border border-zinc-100 p-4 dark:border-zinc-800">
                          <p className="text-xs text-zinc-500">{stat.label}</p>
                          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Assignment preview */}
                    <div className="rounded-xl border border-zinc-100 p-4 dark:border-zinc-800">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium">Breaking News: County Budget</p>
                          <p className="text-xs text-zinc-500">HCC 314 — Due Mar 15</p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-700 border-0">AI Reviewed</Badge>
                      </div>
                      <div className="flex gap-2">
                        {["Copy Editor", "Fact-checker", "Ethics", "Framing"].map((editor) => (
                          <div key={editor} className="rounded-md bg-zinc-50 px-2 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                            {editor}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ────────────────────────────────── */}
      <section id="features" className="py-24 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Core Principles</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              AI That Coaches, Never Writes For You
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Every feature enforces three pillars: writing craft, verification discipline, and critical media analysis.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Verification Gates",
                description:
                  "Students cannot submit final work without completing their verification table with minimum evidence items and confidence levels.",
                color: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
              },
              {
                icon: <Brain className="h-6 w-6" />,
                title: "4-Editor AI Desk",
                description:
                  "Copy Editor, Fact-checker, Ethics & Law Editor, and Framing Analyst provide structured feedback — not finished work.",
                color: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
              },
              {
                icon: <FileText className="h-6 w-6" />,
                title: "Gated Workflow",
                description:
                  "Reporting plan → Draft v1 → Verification table → AI review → Revision → Reflection → Final submit. Each step is a gate.",
                color: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Portfolio Assessment",
                description:
                  "Grade on portfolio + evidence + defense, not just final text. Export beautiful PDFs with verification appendices.",
                color: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Skills Analytics",
                description:
                  "Track verification gaps, common errors, framing complexity, and revision improvement across cohorts.",
                color: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
              },
              {
                icon: <Scale className="h-6 w-6" />,
                title: "Kenya-Aware Ethics",
                description:
                  "Ethics & Law Editor understands Kenyan media law — defamation, sub judice, privacy, and court reporting restrictions.",
                color: "bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:shadow-lg hover:shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-none dark:hover:border-zinc-700"
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Workflow ────────────────────────────────── */}
      <section id="workflow" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Student Workflow</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Seven Steps to Published-Quality Journalism
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            {[
              {
                step: "A",
                title: "Reporting Plan",
                description: "Define your angle, key questions, sources to seek, and risks.",
                icon: <BookOpen className="h-5 w-5" />,
              },
              {
                step: "B",
                title: "Draft v1",
                description: "Write your first draft in the rich text editor.",
                icon: <FileText className="h-5 w-5" />,
              },
              {
                step: "C",
                title: "Verification Table",
                description: "Map every claim to evidence and sources. This is the gate.",
                icon: <CheckCircle2 className="h-5 w-5" />,
              },
              {
                step: "D",
                title: "AI Review",
                description: "Four AI editors analyse your work and return structured feedback.",
                icon: <Brain className="h-5 w-5" />,
              },
              {
                step: "E",
                title: "Revise to v2",
                description: "Address must-fix items, strengthen verification, improve framing.",
                icon: <Sparkles className="h-5 w-5" />,
              },
              {
                step: "F",
                title: "Reflection & Disclosure",
                description: "Reflect on your framing choices and disclose AI usage honestly.",
                icon: <Eye className="h-5 w-5" />,
              },
              {
                step: "G",
                title: "Final Submission",
                description: "All gates passed. Your work is submitted with full evidence trail.",
                icon: <Shield className="h-5 w-5" />,
              },
            ].map((item, index) => (
              <div key={item.step} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Timeline line */}
                {index < 6 && (
                  <div className="absolute left-[22px] top-12 h-full w-px bg-zinc-200 dark:bg-zinc-800" />
                )}
                {/* Step circle */}
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-zinc-900 bg-white font-bold text-zinc-900 dark:border-white dark:bg-zinc-950 dark:text-white">
                  {item.step}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    {item.icon}
                    <h3 className="font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI Edit Desk ────────────────────────────── */}
      <section id="editors" className="py-24 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">AI Edit Desk</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Four Expert Editors, Structured Feedback
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Each editor returns structured JSON — must-fix checklists, not vague suggestions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "📝 Copy Editor",
                outputs: ["Must-fix list with severity", "Line edits with quotes", "Structure score (0–5)", "Rewrite examples (excerpts only)"],
                color: "border-l-blue-500",
              },
              {
                title: "🔍 Fact-checker",
                outputs: ["Unsupported claims list", "Attribution flags", "Questions for reporter", "Verification gap score"],
                color: "border-l-amber-500",
              },
              {
                title: "⚖️ Ethics & Law Editor",
                outputs: ["Risk level (low/med/high)", "Legal risk issues (Kenya law)", "Safe rewrite suggestions", "Harm mitigation steps"],
                color: "border-l-red-500",
              },
              {
                title: "🔎 Framing Analyst",
                outputs: ["Dominant frame identified", "Missing voices flagged", "Loaded language detection", "Alternative headlines + reflection prompts"],
                color: "border-l-purple-500",
              },
            ].map((editor) => (
              <div
                key={editor.title}
                className={`rounded-xl border-l-4 ${editor.color} border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900`}
              >
                <h3 className="mb-4 text-lg font-semibold">{editor.title}</h3>
                <ul className="space-y-2">
                  {editor.outputs.map((output) => (
                    <li key={output} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      {output}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Journalism Education?
          </h2>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Try the demo with sample assignments, AI feedback, and the full gated workflow.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button size="lg" className="gap-2 px-8 text-base">
                Launch Demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────── */}
      <footer className="border-t border-zinc-200 py-12 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white">
                <Newspaper className="h-4 w-4 text-white dark:text-zinc-900" />
              </div>
              <span className="font-semibold">
                NewsroomLab <span className="text-blue-600">AI</span>
              </span>
            </div>
            <p className="text-sm text-zinc-500">
              Built for journalism educators. AI coaches, never writes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
