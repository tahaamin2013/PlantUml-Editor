"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  Moon,
  Sun,
  Maximize2,
  LayoutGridIcon as LayoutHorizontal,
  LayoutGridIcon as LayoutVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import plantumlEncoder from "plantuml-encoder"
import { EditorSidebar } from "./EditorSidebar"

const PLANTUML_SERVER = "https://www.plantuml.com/plantuml"

export default function PlantUMLEditor() {
  const [content, setContent] = useState(`@startuml\nskin rose\nBob -> Alice: Hello!\n@enduml`)
  const [setImageUrl] = useState("")
  const [layout, setLayout] = useState("horizontal")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isWrapMode, setIsWrapMode] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [diagramTheme, setDiagramTheme] = useState("_none_")
  const [editorFontSize, setEditorFontSize] = useState("12")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setLayout("vertical")
      } else {
        setLayout("horizontal")
      }
    }

    handleResize() // Run on mount
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const updateUndoRedoState = () => {
      setCanUndo(document.queryCommandEnabled("undo"))
      setCanRedo(document.queryCommandEnabled("redo"))
    }

    updateUndoRedoState()
    document.addEventListener("selectionchange", updateUndoRedoState)
    return () => {
      document.removeEventListener("selectionchange", updateUndoRedoState)
    }
  }, [])

  const processContent = (rawContent: string) => {
    let processedContent = rawContent.replace(/!theme\s+\w+/, "")
    processedContent = processedContent.replace(/<&box>/g, "[box]")
    return processedContent
  }

  useEffect(() => {
    const processedContent = processContent(content)
    const encodedContent = encodeURIComponent(processedContent)
    const url = `${PLANTUML_SERVER}/png/${encodedContent}`
    setImageUrl(url)
  }, [content])

  const handleExport = async (format: string) => {
    const processedContent = processContent(content)
    const encodedContent = plantumlEncoder.encode(processedContent)
    let url = ""

    switch (format) {
      case "png":
        url = `${PLANTUML_SERVER}/png/${encodedContent}?dpi=300`
        break
      case "svg":
        url = `${PLANTUML_SERVER}/svg/${encodedContent}`
        break
      case "txt":
        url = `${PLANTUML_SERVER}/txt/${encodedContent}`
        break
      case "jpg":
        url = `${PLANTUML_SERVER}/png/${encodedContent}?scale=2`
        break
      default:
        return
    }

    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = blobUrl
      link.download = `diagram.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error("Download failed", error)
    }
  }

  const handleExtractWindow = () => {
    const newWindow = window.open("", "_blank", "width=800,height=600")
    if (newWindow) {
      const processedContent = processContent(content)
      const encodedContent = plantumlEncoder.encode(processedContent)
      const imageUrl = `${PLANTUML_SERVER}/svg/${encodedContent}`

      newWindow.document.write(`
        <html>
          <head>
            <title>PlantUML Diagram</title>
            <style>
              body {
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: ${theme === "dark" ? "#1a1a1a" : "#ffffff"};
              }
              img {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="${imageUrl}" alt="PlantUML Diagram" />
          </body>
        </html>
      `)
      newWindow.document.close()
    }
  }

  const handleUndo = () => {
    document.execCommand("undo")
  }

  const handleRedo = () => {
    document.execCommand("redo")
  }

  const handleFind = () => {
    if (isSearchOpen) {
      window.find("") // Close the find dialog
    } else {
      const searchTerm = prompt("Enter search term:")
      if (searchTerm) {
        window.find(searchTerm)
      }
    }
    setIsSearchOpen(!isSearchOpen)
  }

  const handleWrapMode = () => {
    setIsWrapMode(!isWrapMode)
  }

  const handleBackupCode = () => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "plantuml_backup.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleGetDiagramFromAI = () => {
    // Implement AI diagram generation logic here
    console.log("Getting diagram from AI...")
  }

  const handleChangeDiagramTheme = (theme: string) => {
    setDiagramTheme(theme)
    // Update the content to include the new theme
    setContent((prevContent) => {
      const themeRegex = /!theme\s+[\w-]+/
      const newTheme = theme === "_none_" ? "" : `!theme ${theme}`
      const newContent = themeRegex.test(prevContent)
        ? prevContent.replace(themeRegex, newTheme)
        : `${newTheme}\n${prevContent}`
      return newTheme ? newContent.trim() : newContent.replace(/^\s*[\r\n]/gm, "")
    })
  }

  const handleChangeEditorFontSize = (size: string) => {
    setEditorFontSize(size)
  }

  if (!mounted) return null

  const encoded = plantumlEncoder.encode(content)
  const url = `http://www.plantuml.com/plantuml/svg/${encoded}`

  return (
    <div className="flex flex-col space-y-4 p-4 min-h-screen bg-background text-foreground">
      <nav className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <h1 className="text-2xl font-bold">PlantUML Editor</h1>
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setLayout(layout === "vertical" ? "horizontal" : "vertical")}
                >
                  {layout === "vertical" ? (
                    <LayoutHorizontal className="h-4 w-4" />
                  ) : (
                    <LayoutVertical className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle layout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Select onValueChange={setSelectedFormat}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Export Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="txt">TXT</SelectItem>
              <SelectItem value="jpg">JPG (via PNG)</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={() => selectedFormat && handleExport(selectedFormat)} disabled={!selectedFormat}>
            Export
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleExtractWindow}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Extract Window</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>

      <div
        className={`flex ${layout === "vertical" ? "flex-col" : "flex-row"} space-y-4 sm:space-y-0 sm:space-x-4 h-[calc(100vh-100px)] w-full`}
      >
        <div className="flex">
          <EditorSidebar
            onUndo={handleUndo}
            onRedo={handleRedo}
            onFind={handleFind}
            onToggleWrap={handleWrapMode}
            onBackup={handleBackupCode}
            onGetAIDiagram={handleGetDiagramFromAI}
            canUndo={canUndo}
            canRedo={canRedo}
            isWrapMode={isWrapMode}
            isSearchOpen={isSearchOpen}
            onChangeDiagramTheme={handleChangeDiagramTheme}
            onChangeEditorFontSize={handleChangeEditorFontSize}
              diagramTheme={diagramTheme}
            editorFontSize={editorFontSize}
          />
          <textarea
            value={content}
            onInput={(e) => setContent(e.currentTarget.value)}
            className={`flex-1 p-2 border rounded-md font-mono resize-none bg-background text-foreground ${
              isWrapMode ? "whitespace-normal" : "whitespace-nowrap"
            }`}
            style={{
              fontSize: `${editorFontSize}px`,
            }}
            placeholder="Enter PlantUML code here..."
            wrap={isWrapMode ? "soft" : "off"}
          />
        </div>
        <div className="flex-[2] border rounded-md overflow-auto h-full bg-white dark:bg-black">
          <img src={url || "/placeholder.svg"} alt="PlantUML Diagram" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  )
}

