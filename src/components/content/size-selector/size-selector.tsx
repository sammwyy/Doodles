import { HeaderSection } from "@/components/layout/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import useTools from "@/hooks/use-tools";
import { PencilRulerIcon } from "lucide-react";

const safeInt = (value: number) => {
  if (isNaN(value)) return 0;
  return value;
};

export function SizeSelector() {
  const { brushSize, setBrushSize } = useTools();
  const displayBrushSize = safeInt(brushSize);

  return (
    <HeaderSection title="Brush Size">
      <DropdownMenu>
        <DropdownMenuTrigger style={{ height: "100%", width: "100%" }}>
          <div className="items-center text-center gap-3 mx-auto flex flex-col text-sm">
            <PencilRulerIcon size={"20px"} />
            {displayBrushSize}px
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <div className="p-2 flex flex-col gap-3">
            <Input
              value={brushSize}
              type="number"
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
            />

            <Slider
              min={1}
              max={20}
              step={1}
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              className="w-full"
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </HeaderSection>
  );
}
