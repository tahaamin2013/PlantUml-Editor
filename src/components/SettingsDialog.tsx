import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface EditorSettingsProps {
  onChangeEditorTheme: (theme: string) => void
  onChangeDiagramTheme: (theme: string) => void
  onChangeEditorFontSize: (size: string) => void
  editorTheme: string
  diagramTheme: string
  editorFontSize: string
}

export function EditorSettings({
  onChangeDiagramTheme,
  onChangeEditorFontSize,
  diagramTheme,
  editorFontSize,
}: EditorSettingsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="editor-theme" className="text-right">
          Editor Theme
        </Label>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="diagram-theme" className="text-right">
          Diagram Theme
        </Label>
        <Select onValueChange={onChangeDiagramTheme} value={diagramTheme}>
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_none_">Default</SelectItem>
            <SelectItem value="amiga">Amiga</SelectItem>
            <SelectItem value="aws-orange">AWS Orange</SelectItem>
            <SelectItem value="black-knight">Black Knight</SelectItem>
            <SelectItem value="bluegray">Blue Gray</SelectItem>
            <SelectItem value="blueprint">Blue Print</SelectItem>
            <SelectItem value="cerulean">Cerulean</SelectItem>
            <SelectItem value="cerulean-outline">Cerulean Outline</SelectItem>
            <SelectItem value="crt-amber">CRT Amber</SelectItem>
            <SelectItem value="crt-green">CRT Green</SelectItem>
            <SelectItem value="mars">Mars</SelectItem>
            <SelectItem value="minty">Minty</SelectItem>
            <SelectItem value="plain">Plain</SelectItem>
            <SelectItem value="sketchy">Sketchy</SelectItem>
            <SelectItem value="sketchy-outline">Sketchy Outline</SelectItem>
            <SelectItem value="toy">Toy</SelectItem>
            <SelectItem value="vibrant">Vibrant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="font-size" className="text-right">
          Font Size
        </Label>
        <Select onValueChange={onChangeEditorFontSize} value={editorFontSize}>
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 27 }, (_, i) => i + 6).map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size} px
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
