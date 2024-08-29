import useProject from "@/hooks/use-project";
import { mirrorCanvas, rotateCanvas } from "@/lib/draw-utils";
import { createContext, useCallback, useEffect, useState } from "react";

interface Layer {
  id: number;
  canvas: HTMLCanvasElement;
  visible: boolean;
}

interface LayerContextType {
  layers: Layer[];
  addLayer: (width: number, height: number) => void;
  removeLayer: (id: number) => void;
  activeLayerIndex: number;
  setActiveLayerIndex: (index: number) => void;
  toggleLayerVisibility: (index: number) => void;

  updateLayerCanvas: (index: number) => void;
  updateCurrentLayer: () => void;

  mirrorCurrentLayer: (horizontal: boolean) => void;
  rotateCurrentLayer: (clockwise: boolean) => void;
}

export const LayerContext = createContext<LayerContextType>({
  layers: [],
  addLayer: () => {},
  removeLayer: () => {},
  activeLayerIndex: 0,
  setActiveLayerIndex: () => {},
  toggleLayerVisibility: () => {},
  updateLayerCanvas: () => {},
  updateCurrentLayer: () => {},
  mirrorCurrentLayer: () => {},
  rotateCurrentLayer: () => {},
});

export const LayerProvider = ({ children }: { children: React.ReactNode }) => {
  const { project } = useProject();
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [nextLayerId, setNextLayerId] = useState(0);

  const addLayer = useCallback(
    (width: number, height: number, fill?: string) => {
      const getNextLayerID = () => {
        setNextLayerId((prev) => prev + 1);
        return nextLayerId;
      };

      const newCanvas = document.createElement("canvas");
      newCanvas.width = width;
      newCanvas.height = height;
      newCanvas.setAttribute("id", `canvas-${nextLayerId}`);

      const ctx = newCanvas.getContext("2d");
      if (ctx) {
        if (fill && fill != "transparent") {
          ctx.fillStyle = fill;
          ctx.fillRect(0, 0, width, height);
        } else {
          ctx.clearRect(0, 0, width, height);
        }
        ctx.getContextAttributes().willReadFrequently = true;
      }
      const id = getNextLayerID();
      const newLayer: Layer = {
        id: id,
        canvas: newCanvas,
        visible: true,
      };
      setLayers((prevLayers) => [...prevLayers, newLayer]);
      setActiveLayerIndex(layers.length);
    },
    [layers.length, nextLayerId]
  );

  const removeLayer = (id: number) => {
    setLayers((prevLayers) => prevLayers.filter((layer) => layer.id !== id));
  };

  const toggleLayerVisibility = (index: number) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer, i) =>
        i === index ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  const updateLayerCanvas = (index: number) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer, i) =>
        i === index ? { ...layer, canvas: layer.canvas } : layer
      )
    );
  };

  const updateCurrentLayer = () => {
    updateLayerCanvas(activeLayerIndex);
  };

  const mirrorCurrentLayer = (horizontal: boolean) => {
    const canvas = layers[activeLayerIndex].canvas;
    mirrorCanvas(canvas, horizontal);
  };

  const rotateCurrentLayer = (clockwise: boolean) => {
    const canvas = layers[activeLayerIndex].canvas;
    rotateCanvas(canvas, clockwise);
  };

  useEffect(() => {
    if (layers.length === 0 && project) {
      addLayer(project.width, project.height, project.fill);
    }
  }, [addLayer, layers.length, project]);

  return (
    <LayerContext.Provider
      value={{
        layers,
        addLayer,
        removeLayer,
        activeLayerIndex,
        setActiveLayerIndex,
        toggleLayerVisibility,
        updateLayerCanvas,
        mirrorCurrentLayer,
        rotateCurrentLayer,
        updateCurrentLayer,
      }}
    >
      {children}
    </LayerContext.Provider>
  );
};
