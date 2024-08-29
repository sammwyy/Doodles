import { HeaderSection } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import useLayer from "@/hooks/use-layer";
import {
  BoxSelectIcon,
  FlipHorizontal2Icon,
  FlipVertical2,
  LassoSelectIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-react";

export function ImageActions() {
  const { rotateCurrentLayer, mirrorCurrentLayer, updateCurrentLayer } =
    useLayer();

  const handleMirrorVertical = () => {
    mirrorCurrentLayer(false);
    updateCurrentLayer();
  };

  const handleMirrorHorizontal = () => {
    mirrorCurrentLayer(true);
    updateCurrentLayer();
  };

  const handleRotateRight = () => {
    rotateCurrentLayer(true);
    updateCurrentLayer();
  };

  const handleRotateLeft = () => {
    rotateCurrentLayer(false);
    updateCurrentLayer();
  };

  return (
    <HeaderSection title="Image">
      <div className="grid grid-cols-3 gap-2 justify-center">
        <Button
          variant={"outline"}
          size="icon"
          className="w-8 h-8"
          disabled={true}
        >
          <BoxSelectIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={"outline"}
          size="icon"
          className="w-8 h-8"
          onClick={handleRotateLeft}
        >
          <RotateCcwIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={"outline"}
          size="icon"
          className="w-8 h-8"
          onClick={handleRotateRight}
        >
          <RotateCwIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={"outline"}
          size="icon"
          className="w-8 h-8"
          disabled={true}
        >
          <LassoSelectIcon className="h-4 w-4" />
        </Button>

        <Button
          variant={"outline"}
          size="icon"
          className="w-8 h-8"
          onClick={handleMirrorHorizontal}
        >
          <FlipHorizontal2Icon className="h-4 w-4" />
        </Button>

        <Button
          variant={"outline"}
          size="icon"
          className="w-8 h-8"
          onClick={handleMirrorVertical}
        >
          <FlipVertical2 className="h-4 w-4" />
        </Button>
      </div>
    </HeaderSection>
  );
}
