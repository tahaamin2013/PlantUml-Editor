"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import plantumlEncoder from 'plantuml-encoder';

const PLANTUML_SERVER = "https://www.plantuml.com/plantuml"

export default function PlantUMLEditor() {
  const [content, setContent] = useState(`@startuml\nskin rose\nBob -> Alice: Hello!\n@enduml`)
  const [imageUrl, setImageUrl] = useState("")
  const [layout, setLayout] = useState("vertical") // Set default layout to vertical
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
    const processedContent = processContent(content);
    const encodedContent = plantumlEncoder.encode(processedContent);
    let url = "";
  
    switch (format) {
      case "png":
        url = `${PLANTUML_SERVER}/png/${encodedContent}?scale=9`; // Increase scale
        break;
      case "svg":
        url = `${PLANTUML_SERVER}/svg/${encodedContent}`;
        break;
      case "txt":
        url = `${PLANTUML_SERVER}/txt/${encodedContent}`;
        break;
      case "jpg":
        url = `${PLANTUML_SERVER}/png/${encodedContent}?scale=2`; // Increase scale
        break;
      default:
        return;
    }
  
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `diagram.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed", error);
    }
  };
  
  

  const handleExtractWindow = () => {
    const newWindow = window.open("", "_blank", "width=800,height=600")
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>PlantUML Diagram</title>
          </head>
          <body style="margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
            <img src="${imageUrl}" alt="PlantUML Diagram" style="max-width: 100%; max-height: 100%;" />
          </body>
        </html>
      `)
    }
  }

  if (!mounted) return null

  const encoded = plantumlEncoder.encode(content)
  const url = `http://www.plantuml.com/plantuml/svg/${encoded}`

  return (
    <div className="flex h-[900px] flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">PlantUML Editor</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Select value={layout} onValueChange={setLayout}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change Layout" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="horizontal">Horizontal</SelectItem>
              <SelectItem value="vertical">Vertical</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleExport}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Export" />
      </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="txt">TXT</SelectItem>
              <SelectItem value="jpg">JPG (via PNG)</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExtractWindow}>
            <Maximize2 className="h-4 w-4 mr-2" />
            Extract Window
          </Button>
        </div>
      </div>
      <div className={`flex ${layout === "vertical" ? "flex-col" : "flex-row"} space-x-4 h-[calc(200vh-100px)]`}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-2 border rounded-md font-mono"
          placeholder="Enter PlantUML code here..."
        />
        <div className="flex-1 border rounded-md overflow-auto">
          <img src={url} alt="PlantUML Diagram" />
        </div>
      </div>
    </div>
  )
}
