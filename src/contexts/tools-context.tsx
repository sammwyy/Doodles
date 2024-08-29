import { createContext, useMemo, useState } from "react";

type Tool =
  // Tools
  | "pencil"
  | "eraser"
  | "bucket"
  | "picker"
  | "text"

  // Shapes
  | "square"
  | "circle"
  | "triangle";

export interface ToolsContextType {
  tool: Tool;
  setTool: (tool: Tool) => void;

  brushSize: number;
  setBrushSize: (size: number) => void;

  moving: boolean;
  setMoving: (moving: boolean) => void;
}

export const ToolsContext = createContext<ToolsContextType>({
  tool: "pencil",
  setTool: () => {},

  brushSize: 5,
  setBrushSize: () => {},

  moving: false,
  setMoving: () => {},
});

export const ToolsProvider = ({ children }: { children: React.ReactNode }) => {
  const sizes = useMemo(() => new Map<Tool, number>(), []);
  const [tool, setTool] = useState<Tool>("pencil");
  const [brushSize, setBrushSize] = useState(5);
  const [moving, setMoving] = useState(false);

  // Called as a proxy to setBrushSize to also update the size in the sizes map.
  const handleSetBrushSize = (size: number) => {
    sizes.set(tool, size);
    setBrushSize(size);
  };

  // Called to set the tool and brush size based on the tool.
  const handleSetTool = (tool: Tool) => {
    setTool(tool);

    if (sizes.has(tool)) {
      setBrushSize(sizes.get(tool)!);
    } else {
      setBrushSize(5);
    }
  };

  return (
    <ToolsContext.Provider
      value={{
        tool,
        setTool: handleSetTool,
        brushSize,
        setBrushSize: handleSetBrushSize,
        moving,
        setMoving,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};
