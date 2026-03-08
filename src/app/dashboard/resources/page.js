"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft, Library, Search, BookOpen, Filter,
  ChevronRight, ExternalLink, Eye, Copy, Check,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useAuth } from "@/components/providers/auth-provider"
import { resourceCategories, resourceItems, getResourceById } from "@/lib/templates/resource-centre"

// Color mapping for categories
const CATEGORY_COLORS = {
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  red: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
  slate: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
}

function ResourceDetailDialog({ resource, category, onClose }) {
  const [copied, setCopied] = useState(false)
  
  if (!resource) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(resource.content || "")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={!!resource} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span>{category?.icon}</span>
            <Badge variant="outline" className="text-xs">{category?.title}</Badge>
            <Badge className={`text-xs ${
              resource.quality === 'excellent' ? 'bg-green-600' :
              resource.quality === 'good' ? 'bg-blue-600' :
              resource.quality === 'poor' ? 'bg-red-600' :
              'bg-zinc-600'
            }`}>
              {resource.quality === 'excellent' && '✓ Excellent Example'}
              {resource.quality === 'good' && '◐ Good Example'}
              {resource.quality === 'poor' && '✕ Poor Example (For Teaching)'}
              {resource.quality === 'reference' && '📋 Reference Material'}
            </Badge>
          </div>
          <DialogTitle>{resource.title}</DialogTitle>
          <DialogDescription>
            {resource.source} • {resource.year}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <div className="space-y-6">
            {/* Description */}
            <p className="text-sm text-muted-foreground">{resource.description}</p>

            {/* Teaching Points */}
            {resource.teachingPoints && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Teaching Points</h3>
                <ul className="space-y-1">
                  {resource.teachingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Annotations */}
            {resource.annotations && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Annotations</h3>
                <div className="space-y-2">
                  {resource.annotations.map((ann, i) => (
                    <div key={i} className={`p-2 rounded text-sm ${
                      ann.type === 'error' ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400' :
                      ann.type === 'structure' ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400' :
                      ann.type === 'quote' ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400' :
                      'bg-zinc-50 dark:bg-zinc-900'
                    }`}>
                      <span className="font-medium capitalize">{ann.type}:</span> {ann.note}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            {resource.content && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm">Full Content</h3>
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <ScrollArea className="h-[400px] rounded-lg border bg-muted/30">
                  <pre className="p-4 text-sm whitespace-pre-wrap font-mono">
                    {resource.content}
                  </pre>
                </ScrollArea>
              </div>
            )}

            {/* Courses where used */}
            {category?.courses && (
              <div>
                <h3 className="font-semibold text-sm mb-2">Relevant Courses</h3>
                <div className="flex flex-wrap gap-2">
                  {category.courses.map((code) => (
                    <Badge key={code} variant="outline" className="text-xs">
                      {code.replace(/(\d+)/, ' $1')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ResourcesPage() {
  const { user } = useAuth()
  const isLecturer = user?.role === "LECTURER" || user?.role === "ADMIN"
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedResource, setSelectedResource] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Filter resources based on search and category
  const filteredCategories = activeCategory === "all" 
    ? resourceCategories 
    : resourceCategories.filter(c => c.id === activeCategory)

  const getFilteredItems = (categoryId) => {
    const items = resourceItems[categoryId] || []
    if (!searchQuery) return items
    const query = searchQuery.toLowerCase()
    return items.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query)
    )
  }

  const handleOpenResource = (categoryId, resourceId) => {
    const resource = getResourceById(categoryId, resourceId)
    const category = resourceCategories.find(c => c.id === categoryId)
    setSelectedResource(resource)
    setSelectedCategory(category)
  }

  // Restrict to lecturers only
  if (!isLecturer) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Library className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
        <p className="text-muted-foreground mb-6">The Resource Centre is available to lecturers only.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard">← Back to Dashboard</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <ResourceDetailDialog 
        resource={selectedResource} 
        category={selectedCategory}
        onClose={() => {
          setSelectedResource(null)
          setSelectedCategory(null)
        }}
      />

      <div className="space-y-6">
        {/* Back link */}
        <Button asChild variant="ghost" size="sm" className="gap-2 -ml-2 text-muted-foreground">
          <Link href="/dashboard"><ArrowLeft className="h-3.5 w-3.5" />Dashboard</Link>
        </Button>

        {/* Page header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Library className="h-6 w-6" />
              Resource Centre
            </h1>
            <p className="text-muted-foreground mt-1">
              Teaching resources, professional examples, and reference materials for journalism courses.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search resources..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="flex-wrap h-auto">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            {resourceCategories.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id} className="gap-1">
                {cat.icon} {cat.title}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6 space-y-8">
            {filteredCategories.map((category) => {
              const items = getFilteredItems(category.id)
              if (items.length === 0 && searchQuery) return null

              return (
                <div key={category.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h2 className="font-semibold">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {items.length} {items.length === 1 ? 'resource' : 'resources'}
                    </Badge>
                  </div>

                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground py-4">No resources in this category yet.</p>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {items.map((item) => (
                        <Card 
                          key={item.id} 
                          className="cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={() => handleOpenResource(category.id, item.id)}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                              <Badge className={`text-xs shrink-0 ${
                                item.quality === 'excellent' ? 'bg-green-600' :
                                item.quality === 'good' ? 'bg-blue-600' :
                                item.quality === 'poor' ? 'bg-red-600' :
                                'bg-zinc-600'
                              }`}>
                                {item.quality === 'excellent' && '✓ Excellent'}
                                {item.quality === 'good' && '◐ Good'}
                                {item.quality === 'poor' && '✕ Poor Example'}
                                {item.quality === 'reference' && '📋 Reference'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{item.year}</span>
                            </div>
                            <CardTitle className="text-base mt-2">{item.title}</CardTitle>
                            <CardDescription className="text-xs">{item.source}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                              {item.description}
                            </p>
                            {item.teachingPoints && (
                              <div className="flex flex-wrap gap-1">
                                {item.teachingPoints.slice(0, 2).map((point, i) => (
                                  <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">
                                    {point.length > 30 ? point.slice(0, 30) + '...' : point}
                                  </span>
                                ))}
                                {item.teachingPoints.length > 2 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{item.teachingPoints.length - 2} more
                                  </span>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p>No resources found matching &ldquo;{searchQuery}&rdquo;</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
