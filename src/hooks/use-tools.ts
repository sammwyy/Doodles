import { ToolsContext, ToolsContextType } from "@/contexts/tools-context";
import { useContext } from "react";

const useTools = () => useContext(ToolsContext);

export type Tool = ToolsContextType["tool"];
export default useTools;
