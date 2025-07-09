"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface DataManagerProps {
  data: any
  onDataChange: (newData: any) => void
}

export default function DataManager({ data, onDataChange }: DataManagerProps) {
  const [editingItem, setEditingItem] = useState<any>(null)
  const [editingSection, setEditingSection] = useState<string>("")

  const handleEdit = (section: string, item: any) => {
    setEditingSection(section)
    setEditingItem({ ...item })
  }

  const handleSave = () => {
    if (!editingItem || !editingSection) return

    const newData = { ...data }

    if (editingSection === "hero") {
      newData.hero = editingItem
    } else {
      const sectionData = newData[editingSection as keyof typeof newData] as any[]
      const index = sectionData.findIndex((item) => item.id === editingItem.id)
      if (index !== -1) {
        sectionData[index] = editingItem
      } else {
        sectionData.push({ ...editingItem, id: Date.now().toString() })
      }
    }

    onDataChange(newData)
    setEditingItem(null)
    setEditingSection("")
  }

  const handleDelete = (section: string, id: string) => {
    const newData = { ...data }
    const sectionData = newData[section as keyof typeof newData] as any[]
    newData[section as keyof typeof newData] = sectionData.filter((item) => item.id !== id)
    onDataChange(newData)
  }

  const handleAdd = (section: string) => {
    const templates = {
      services: {
        id: "",
        title: { en: "", es: "" },
        description: { en: "", es: "" },
        icon: "code",
      },
      projects: {
        id: "",
        title: "",
        description: { en: "", es: "" },
        technologies: [],
        image: "/placeholder.svg?height=300&width=400",
        caseStudyLink: "#",
      },
      whyChooseUs: {
        id: "",
        title: { en: "", es: "" },
        description: { en: "", es: "" },
        icon: "users",
      },
      testimonials: {
        id: "",
        name: "",
        position: { en: "", es: "" },
        company: "",
        content: { en: "", es: "" },
        avatar: "/placeholder.svg?height=100&width=100",
      },
    }

    setEditingSection(section)
    setEditingItem(templates[section as keyof typeof templates])
  }

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "construye-data.json"
    link.click()
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string)
          onDataChange(importedData)
        } catch (error) {
          alert("Error importing data. Please check the file format.")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-auto">
      <div className="container mx-auto p-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Data Manager
              <div className="flex gap-2">
                <Button onClick={exportData} variant="outline">
                  Export JSON
                </Button>
                <label>
                  <Button variant="outline" asChild>
                    <span>Import JSON</span>
                  </Button>
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
                <Button onClick={() => setEditingItem(null)} variant="ghost">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hero">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="hero">Hero</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="whyChooseUs">Why Choose Us</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              </TabsList>

              <TabsContent value="hero" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Hero Section</h3>
                  <Button onClick={() => handleEdit("hero", data.hero)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <Card>
                  <CardContent className="p-4">
                    <p>
                      <strong>Title (EN):</strong> {data.hero.title.en}
                    </p>
                    <p>
                      <strong>Title (ES):</strong> {data.hero.title.es}
                    </p>
                    <p>
                      <strong>Subtitle (EN):</strong> {data.hero.subtitle.en}
                    </p>
                    <p>
                      <strong>Subtitle (ES):</strong> {data.hero.subtitle.es}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {["services", "projects", "whyChooseUs", "testimonials"].map((section) => (
                <TabsContent key={section} value={section} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold capitalize">{section}</h3>
                    <Button onClick={() => handleAdd(section)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </div>
                  <div className="grid gap-4">
                    {(data[section as keyof typeof data] as any[]).map((item: any) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold">
                                {item.title?.en || item.name || item.title || "Untitled"}
                              </h4>
                              {item.description?.en && (
                                <p className="text-sm text-muted-foreground mt-1">{item.description.en}</p>
                              )}
                              {item.technologies && (
                                <div className="flex gap-1 mt-2">
                                  {item.technologies.map((tech: string) => (
                                    <Badge key={tech} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleEdit(section, item)}>
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleDelete(section, item.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* Edit Modal */}
            {editingItem && (
              <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      Edit {editingSection}
                      <Button onClick={() => setEditingItem(null)} variant="ghost">
                        <X className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Dynamic form based on item structure */}
                    {Object.entries(editingItem).map(([key, value]) => {
                      if (key === "id") return null

                      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
                        return (
                          <div key={key} className="space-y-2">
                            <label className="text-sm font-medium capitalize">{key}</label>
                            {Object.entries(value as any).map(([lang, text]) => (
                              <div key={lang}>
                                <label className="text-xs text-muted-foreground uppercase">{lang}</label>
                                <Textarea
                                  value={text as string}
                                  onChange={(e) =>
                                    setEditingItem({
                                      ...editingItem,
                                      [key]: { ...editingItem[key], [lang]: e.target.value },
                                    })
                                  }
                                  className="mt-1"
                                />
                              </div>
                            ))}
                          </div>
                        )
                      }

                      if (Array.isArray(value)) {
                        return (
                          <div key={key} className="space-y-2">
                            <label className="text-sm font-medium capitalize">{key}</label>
                            <Input
                              value={(value as string[]).join(", ")}
                              onChange={(e) =>
                                setEditingItem({
                                  ...editingItem,
                                  [key]: e.target.value.split(", ").filter(Boolean),
                                })
                              }
                              placeholder="Comma separated values"
                            />
                          </div>
                        )
                      }

                      return (
                        <div key={key} className="space-y-2">
                          <label className="text-sm font-medium capitalize">{key}</label>
                          <Input
                            value={value as string}
                            onChange={(e) =>
                              setEditingItem({
                                ...editingItem,
                                [key]: e.target.value,
                              })
                            }
                          />
                        </div>
                      )
                    })}

                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline" onClick={() => setEditingItem(null)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
