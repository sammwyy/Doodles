import { ColorProvider } from "./contexts/color-context";
import { LayerProvider } from "./contexts/layer-context";
import { ProjectProvider } from "./contexts/project-context";
import { ToolsProvider } from "./contexts/tools-context";
import Draw from "./views/Draw";

import "@/styles/globals.css";

export default function App() {
  return (
    <ProjectProvider>
      <ColorProvider>
        <LayerProvider>
          <ToolsProvider>
            <Draw />
          </ToolsProvider>
        </LayerProvider>
      </ColorProvider>
    </ProjectProvider>
  );
}
