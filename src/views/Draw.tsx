"use client";

import useProject from "@/hooks/use-project";
import { drawShape, floodFill } from "@/lib/draw-utils";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";
import Titlebar from "../components/layout/titlebar";
import useColors from "../hooks/use-colors";
import useLayer from "../hooks/use-layer";
import useTools from "../hooks/use-tools";

export default function Draw() {
  const { project } = useProject();
  const { color } = useColors();
  const { brushSize, tool, moving } = useTools();
  const { layers, activeLayerIndex, updateCurrentLayer } = useLayer();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [canvasOffsets, setCanvasOffsets] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  useEffect(() => {
    layers.forEach((layer) => {
      const canvas = document.getElementById(
        `canvas-${layer.id}`
      ) as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(layer.canvas, 0, 0);
        }
      }
    });
  }, [layers]);

  const startDrawing = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const activeLayer = layers[activeLayerIndex];
    if (!activeLayer) return;

    const offsetX = (canvasOffsets[activeLayer.id]?.x || 0) + panOffset.x;
    const offsetY = (canvasOffsets[activeLayer.id]?.y || 0) + panOffset.y;
    const x = (e.clientX - rect.left) / zoom - offsetX / zoom;
    const y = (e.clientY - rect.top) / zoom - offsetY / zoom;

    if (e.button === 1) {
      setIsPanning(true);
      setStartPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (moving) {
      setStartPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    setIsDrawing(true);
    setStartPoint({ x, y });

    const ctx = activeLayer.canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = tool === "eraser" ? "rgba(0,0,0,0)" : color;
    ctx.fillStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tool === "bucket") {
      floodFill(activeLayer.canvas, Math.floor(x), Math.floor(y), color);
      updateCurrentLayer();
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !startPoint) return;
    const rect = containerRef.current.getBoundingClientRect();

    const activeLayer = layers[activeLayerIndex];
    if (!activeLayer) return;

    const offsetX = (canvasOffsets[activeLayer.id]?.x || 0) + panOffset.x;
    const offsetY = (canvasOffsets[activeLayer.id]?.y || 0) + panOffset.y;
    const x = (e.clientX - rect.left) / zoom - offsetX / zoom;
    const y = (e.clientY - rect.top) / zoom - offsetY / zoom;

    if (isPanning) {
      const dx = e.clientX - startPoint.x;
      const dy = e.clientY - startPoint.y;
      setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setStartPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (moving) {
      const dx = (e.clientX - startPoint.x) / zoom;
      const dy = (e.clientY - startPoint.y) / zoom;
      setCanvasOffsets((prev) => {
        const newOffset = {
          x: (prev[activeLayer.id]?.x || 0) + dx,
          y: (prev[activeLayer.id]?.y || 0) + dy,
        };
        return {
          ...prev,
          [activeLayer.id]: newOffset,
        };
      });
      setStartPoint({ x: e.clientX, y: e.clientY });
      return;
    }

    if (!isDrawing) return;

    const ctx = activeLayer.canvas.getContext("2d");
    if (!ctx) return;

    if (tool === "pencil" || tool === "eraser") {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === "square" || tool === "circle" || tool === "triangle") {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = activeLayer.canvas.width;
      tempCanvas.height = activeLayer.canvas.height;
      const tempCtx = tempCanvas.getContext("2d");
      if (tempCtx) {
        tempCtx.drawImage(activeLayer.canvas, 0, 0);
        drawShape(tempCtx, tool, startPoint.x, startPoint.y, x, y);
        ctx.clearRect(
          0,
          0,
          activeLayer.canvas.width,
          activeLayer.canvas.height
        );
        ctx.drawImage(tempCanvas, 0, 0);
      }
    }

    updateCurrentLayer();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setIsPanning(false);
    setStartPoint(null);

    if (tool === "square" || tool === "circle" || tool === "triangle") {
      updateCurrentLayer();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.min(Math.max(prevZoom * zoomFactor, 0.1), 5));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Titlebar />
      <Header />

      <div className="flex flex-grow">
        <div
          ref={containerRef}
          className="relative flex-grow overflow-hidden bg-gray-300"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onWheel={handleWheel}
        >
          <div
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
              transformOrigin: "0 0",
              background: `url(/canvas_bg.jpg)`,
              backgroundRepeat: "repeat",
              width: `${project?.width}px`,
              height: `${project?.height}px`,
              overflowClipBox: "content-box",
              overflow: "clip",
            }}
          >
            {layers.map(
              (layer, index) =>
                layer.visible && (
                  <canvas
                    key={layer.id}
                    id={`canvas-${layer.id}`}
                    width={layer.canvas.width}
                    height={layer.canvas.height}
                    className="absolute top-0 left-0"
                    style={{
                      zIndex: index,
                      pointerEvents:
                        index === activeLayerIndex ? "auto" : "none",
                      background: "transparent",
                      transform: `translate(${
                        canvasOffsets[layer.id]?.x || 0
                      }px, ${canvasOffsets[layer.id]?.y || 0}px)`,
                      outline: moving ? "1px solid black" : "none",
                      cursor: moving ? "grab" : "crosshair",
                    }}
                  />
                )
            )}
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  );
}
