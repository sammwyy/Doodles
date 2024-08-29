import { Button } from "@/components/ui/button";
import useLayer from "@/hooks/use-layer";
import useProject from "@/hooks/use-project";
import { Eye, EyeOff, Layers, Minus, Plus } from "lucide-react";

export function Sidebar() {
  const {
    layers,
    addLayer,
    removeLayer,
    toggleLayerVisibility,
    activeLayerIndex,
    setActiveLayerIndex,
  } = useLayer();
  const { project } = useProject();

  const onAddLayer = () => {
    if (!project) return;
    addLayer(project.width, project.height);
  };

  return (
    <div className="w-48 bg-white border-gray-100 border-l-2 px-3 py-6 flex flex-col">
      <h3 className="font-bold mb-2 flex items-center">
        <Layers className="mr-2" /> Layers
      </h3>
      {layers.map((layer, index) => (
        <div key={layer.id} className="flex items-center mb-2">
          <Button
            variant={index === activeLayerIndex ? "default" : "outline"}
            size="sm"
            className="w-full justify-start"
            onClick={() => setActiveLayerIndex(index)}
          >
            Layer {layer.id + 1}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleLayerVisibility(index)}
          >
            {layer.visible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeLayer(layer.id)}
            disabled={layers.length === 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" className="mt-2" onClick={onAddLayer}>
        <Plus className="h-4 w-4 mr-2" /> Add Layer
      </Button>
    </div>
  );
}
