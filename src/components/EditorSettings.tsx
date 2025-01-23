import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface EditorSettingsProps {
  onChangeDiagramTheme: (theme: string) => void
  onChangeEditorFontSize: (size: string) => void
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
    <div className="space-y-4">
      <Select onValueChange={onChangeDiagramTheme} value={diagramTheme}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Diagram Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_none_">Default</SelectItem>
          <SelectItem value="amiga">Amiga</SelectItem>
          <SelectItem value="aws-orange">AWS Orange</SelectItem>
          <SelectItem value="black-knight">Black Knight</SelectItem>
          <SelectItem value="bluegray">Blue Gray</SelectItem>
          <SelectItem value="blueprint">Blue Print</SelectItem>
          <SelectItem value="carbon-gray">Carbon Gray</SelectItem>
          <SelectItem value="cerulean">Cerulean</SelectItem>
          <SelectItem value="cerulean-outline">Cerulean Outline</SelectItem>
          <SelectItem value="cloudscape-design">Cloudscape Design</SelectItem>
          <SelectItem value="crt-amber">CRT Amber</SelectItem>
          <SelectItem value="crt-green">CRT Green</SelectItem>
          <SelectItem value="cyborg">Cyborg</SelectItem>
          <SelectItem value="cyborg-outline">Cyborg Outline</SelectItem>
          <SelectItem value="hacker">Hacker</SelectItem>
          <SelectItem value="lightgray">Lightgray</SelectItem>
          <SelectItem value="mars">Mars</SelectItem>
          <SelectItem value="materia">Materia</SelectItem>
          <SelectItem value="materia-outline">Materia Outline</SelectItem>
          <SelectItem value="metal">Metal</SelectItem>
          <SelectItem value="mimeograph">Mimeograph</SelectItem>
          <SelectItem value="minty">Minty</SelectItem>
          <SelectItem value="plain">Plain</SelectItem>
          <SelectItem value="reddress-darkblue">Reddress Darkblue</SelectItem>
          <SelectItem value="reddress-darkgreen">Reddress Darkgreen</SelectItem>
          <SelectItem value="reddress-darkorange">Reddress Darkorange</SelectItem>
          <SelectItem value="reddress-darkred">Reddress Darkred</SelectItem>
          <SelectItem value="reddress-lightblue">Reddress Lightblue</SelectItem>
          <SelectItem value="reddress-lightgreen">Reddress Lightgreen</SelectItem>
          <SelectItem value="reddress-lightorange">Reddress Lightorange</SelectItem>
          <SelectItem value="reddress-lightred">Reddress Lightred</SelectItem>
          <SelectItem value="sandstone">Sandstone</SelectItem>
          <SelectItem value="silver">Silver</SelectItem>
          <SelectItem value="sketchy">Sketchy</SelectItem>
          <SelectItem value="sketchy-outline">Sketchy Outline</SelectItem>
          <SelectItem value="spacelab">Spacelab</SelectItem>
          <SelectItem value="spacelab-white">Spacelab White</SelectItem>
          <SelectItem value="superhero">Superhero</SelectItem>
          <SelectItem value="superhero-outline">Superhero Outline</SelectItem>
          <SelectItem value="toy">Toy</SelectItem>
          <SelectItem value="united">United</SelectItem>
          <SelectItem value="vibrant">Vibrant</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onChangeEditorFontSize} value={editorFontSize}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Font Size" />
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
  )
}
