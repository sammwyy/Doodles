import { HeaderSection } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import useTools, { Tool } from "@/hooks/use-tools";
import {
  Circle,
  Eraser,
  LetterTextIcon,
  PaintBucket,
  Pencil,
  Pipette,
  Square,
  Triangle,
} from "lucide-react";

const TOOLS = [
  { name: "pencil", icon: Pencil },
  { name: "bucket", icon: PaintBucket },
  { name: "text", icon: LetterTextIcon, disabled: true },
  { name: "eraser", icon: Eraser },
  { name: "picker", icon: Pipette, disabled: true },
  { name: "triangle", icon: Triangle },
  { name: "circle", icon: Circle },
  { name: "square", icon: Square },
];

export function ToolSelector() {
  const { tool, setTool } = useTools();

  return (
    <HeaderSection title="Tools">
      <div className="grid grid-cols-4 gap-2 justify-center">
        {TOOLS.map((t) => (
          <Button
            key={t.name}
            variant={tool === t.name ? "default" : "outline"}
            size="icon"
            onClick={() => setTool(t.name as Tool)}
            className="w-8 h-8"
            disabled={t.disabled}
          >
            <t.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>
    </HeaderSection>
  );
}
