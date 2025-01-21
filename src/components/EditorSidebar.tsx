import React from "react"
import { Button } from "@/components/ui/button"
import { Undo, Redo, Search, WrapText, Download, FileCode2, Loader2 } from "lucide-react"

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
  isGeneratingDiagram: boolean
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
  isGeneratingDiagram,
}: EditorSidebarProps) {
  return (
    <div className="flex flex-col space-y-2 p-2 bg-secondary">
      <Button variant="ghost" size="icon" onClick={onUndo} disabled={!canUndo}>
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onRedo} disabled={!canRedo}>
        <Redo className="h-4 w-4" />
      </Button>
      <Button variant={isSearchOpen ? "default" : "ghost"} size="icon" onClick={onFind}>
        <Search className="h-4 w-4" />
      </Button>
      <Button variant={isWrapMode ? "default" : "ghost"} size="icon" onClick={onToggleWrap}>
        <WrapText className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onBackup}>
        <Download className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onGetAIDiagram} disabled={isGeneratingDiagram}>
        {isGeneratingDiagram ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileCode2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}

