import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Undo, Redo, Search, WrapText, Download, FileCode2, Loader2, Settings } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { EditorSettings } from "./EditorSettings"

interface EditorSidebarProps {
  onUndo: () => void
  onRedo: () => void
  onFind: () => void
  onToggleWrap: () => void
  onBackup: () => void
  onGetAIDiagram: () => void
  canUndo: boolean
  canRedo: boolean
  isWrapMode: boolean
  isSearchOpen: boolean
  isGeneratingDiagram?: boolean
  onChangeDiagramTheme: (theme: string) => void
  onChangeEditorFontSize: (size: string) => void
  diagramTheme: string
  editorFontSize: string
}

export function EditorSidebar({
  onUndo,
  onRedo,
  onFind,
  onToggleWrap,
  onBackup,
  onGetAIDiagram,
  canUndo,
  canRedo,
  isWrapMode,
  isSearchOpen,
  isGeneratingDiagram = false,
  onChangeDiagramTheme,
  onChangeEditorFontSize,
  diagramTheme,
  editorFontSize,
}: EditorSidebarProps) {
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="flex flex-col space-y-2 p-2 bg-secondary">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onUndo} disabled={!canUndo}>
              <Undo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Undo</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onRedo} disabled={!canRedo}>
              <Redo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Redo</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={isSearchOpen ? "default" : "ghost"} size="icon" onClick={onFind}>
              <Search className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Find</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant={isWrapMode ? "default" : "ghost"} size="icon" onClick={onToggleWrap}>
              <WrapText className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Wrap</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onBackup}>
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Backup</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={onGetAIDiagram} disabled={isGeneratingDiagram}>
              {isGeneratingDiagram ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileCode2 className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Generate AI Diagram</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {showSettings && (
        <EditorSettings
          onChangeDiagramTheme={onChangeDiagramTheme}
          onChangeEditorFontSize={onChangeEditorFontSize}
          diagramTheme={diagramTheme}
          editorFontSize={editorFontSize}
        />
      )}
    </div>
  )
}

