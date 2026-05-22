"use client"

import { useState } from "react"
import { Brain, Sliders, Shield, Zap, Save, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const defaultSettings = {
  aiReviewEnabled: true,
  copyEditorEnabled: true,
  factCheckerEnabled: true,
  ethicsReviewEnabled: true,
  framingAnalysisEnabled: false,
  aiProvider: "openai",
  aiModel: "gpt-4o-mini",
  maxTokensPerReview: 2000,
  reviewCooldownMinutes: 5,
  allowStudentAIDisclosure: true,
  requireAIDisclosure: true,
  systemPromptOverride: "",
}

export default function AISettingsPage() {
  const [settings, setSettings] = useState(defaultSettings)
  const [saving, setSaving] = useState(false)

  const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  const set = (key, value) => setSettings(prev => ({ ...prev, [key]: value }))

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      toast.success("AI settings saved")
      setSaving(false)
    }, 800)
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    toast.info("Settings reset to defaults")
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Settings</h1>
          <p className="text-muted-foreground">Configure AI review features and model behaviour.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
          <Button size="sm" className="gap-2" onClick={handleSave} disabled={saving}>
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4" />
            AI Review Features
          </CardTitle>
          <CardDescription>Enable or disable individual AI review modules platform-wide.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { key: "aiReviewEnabled", label: "AI Review (Master Switch)", description: "Disabling this turns off all AI review features." },
            { key: "copyEditorEnabled", label: "Copy Editor", description: "Passive voice, wordiness, and style checks." },
            { key: "factCheckerEnabled", label: "Fact Checker", description: "Source and claim confidence analysis." },
            { key: "ethicsReviewEnabled", label: "Ethics Review", description: "Bias, framing, and sensitivity checks." },
            { key: "framingAnalysisEnabled", label: "Framing Analysis (Beta)", description: "Deep narrative framing analysis. May increase latency." },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between py-1">
              <div>
                <Label htmlFor={key} className="text-sm font-medium cursor-pointer">{label}</Label>
                <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
              </div>
              <Switch
                id={key}
                checked={settings[key]}
                onCheckedChange={() => toggle(key)}
                disabled={key !== "aiReviewEnabled" && !settings.aiReviewEnabled}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Disclosure Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4" />
            AI Disclosure Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <div>
              <Label htmlFor="requireAIDisclosure" className="text-sm font-medium cursor-pointer">Require AI Disclosure</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Students must declare any AI tools used before submitting.</p>
            </div>
            <Switch
              id="requireAIDisclosure"
              checked={settings.requireAIDisclosure}
              onCheckedChange={() => toggle("requireAIDisclosure")}
            />
          </div>
          <div className="flex items-center justify-between py-1">
            <div>
              <Label htmlFor="allowStudentAIDisclosure" className="text-sm font-medium cursor-pointer">Allow &quot;No AI Used&quot; Declaration</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Students can declare they did not use any AI tools.</p>
            </div>
            <Switch
              id="allowStudentAIDisclosure"
              checked={settings.allowStudentAIDisclosure}
              onCheckedChange={() => toggle("allowStudentAIDisclosure")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Model Config */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            Model Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm">AI Provider</Label>
              <Select value={settings.aiProvider} onValueChange={(v) => set("aiProvider", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="anthropic">Anthropic</SelectItem>
                  <SelectItem value="gemini">Google Gemini</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Model</Label>
              <Select value={settings.aiModel} onValueChange={(v) => set("aiModel", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast)</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o (Quality)</SelectItem>
                  <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                  <SelectItem value="claude-3-5-sonnet">Claude 3.5 Sonnet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Max Tokens per Review</Label>
              <Input
                type="number"
                value={settings.maxTokensPerReview}
                onChange={(e) => set("maxTokensPerReview", Number(e.target.value))}
                min={500}
                max={8000}
                step={500}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Review Cooldown (minutes)</Label>
              <Input
                type="number"
                value={settings.reviewCooldownMinutes}
                onChange={(e) => set("reviewCooldownMinutes", Number(e.target.value))}
                min={0}
                max={60}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="text-sm">System Prompt Override</Label>
            <p className="text-xs text-muted-foreground">Leave blank to use default prompts. Applies to all AI review calls.</p>
            <Textarea
              placeholder="e.g. Always respond in formal English. Focus on factual accuracy..."
              value={settings.systemPromptOverride}
              onChange={(e) => set("systemPromptOverride", e.target.value)}
              className="min-h-24 font-mono text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Usage This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "AI Reviews Run", value: "247" },
              { label: "Tokens Used", value: "~94k" },
              { label: "Est. Cost", value: "$0.28" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
