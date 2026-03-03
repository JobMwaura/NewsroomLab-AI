"use client"

import {
  Briefcase,
  FileText,
  Download,
  CheckCircle2,
  Star,
  Eye,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"
import { STORY_TYPE_LABELS } from "@/lib/types"

const portfolioPieces = [
  {
    id: "1",
    title: "Nairobi Allocates Ksh 38.7B in New Budget",
    storyType: "HARD_NEWS",
    course: "HCC 314",
    date: "March 2026",
    score: 78,
    verifications: 10,
    selected: true,
  },
  {
    id: "2",
    title: "Silent Struggle: Student Mental Health Crisis",
    storyType: "FEATURE",
    course: "HCC 314",
    date: "March 2026",
    score: 82,
    verifications: 12,
    selected: true,
  },
  {
    id: "3",
    title: "The Corruption Trial: Day One",
    storyType: "COURTS",
    course: "HCC 314",
    date: "April 2026",
    score: undefined,
    verifications: 6,
    selected: false,
  },
]

export default function PortfolioPage() {
  const { user } = useAuth()

  const selectedCount = portfolioPieces.filter((p) => p.selected).length
  const averageScore = Math.round(
    portfolioPieces
      .filter((p) => p.selected && p.score)
      .reduce((a, b) => a + (b.score || 0), 0) /
      portfolioPieces.filter((p) => p.selected && p.score).length
  )

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            My Portfolio
          </h1>
          <p className="text-muted-foreground">
            Select your best pieces and export a professional portfolio PDF.
          </p>
        </div>
        <Button
          className="gap-2"
          onClick={() => toast.success("Portfolio PDF is being generated...")}
        >
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>

      {/* Portfolio Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Selected Pieces</p>
            <p className="text-2xl font-bold">{selectedCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Average Score</p>
            <p className="text-2xl font-bold">{averageScore}%</p>
            <Progress value={averageScore} className="h-1.5 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Story Types</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {[...new Set(portfolioPieces.filter((p) => p.selected).map((p) => p.storyType))].map(
                (type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {STORY_TYPE_LABELS[type]}
                  </Badge>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Portfolio Pieces */}
      <div className="space-y-4">
        <h2 className="font-semibold">Your Pieces</h2>
        {portfolioPieces.map((piece) => (
          <Card
            key={piece.id}
            className={`transition-all ${
              piece.selected ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-zinc-950" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="pt-1">
                  <Checkbox
                    checked={piece.selected}
                    className="h-5 w-5"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{piece.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {STORY_TYPE_LABELS[piece.storyType]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {piece.course} — {piece.date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {piece.score ? (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500" />
                          <span className="font-bold">{piece.score}%</span>
                        </div>
                      ) : (
                        <Badge variant="outline" className="text-xs">Pending</Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      {piece.verifications} verifications
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      Final version submitted
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      Reflection included
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Portfolio Contents Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Portfolio PDF Contents</CardTitle>
          <CardDescription>
            Your exported portfolio will include these sections for each selected piece.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              "Cover page (name, course, semester)",
              "Title, story type, and date for each piece",
              "Final story text",
              "Verification table summary",
              "Ethics memo (if applicable)",
              "Student reflection",
              "Evidence appendix (source links and attachments)",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
