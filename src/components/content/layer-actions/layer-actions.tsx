import { HeaderSection } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import useTools from "@/hooks/use-tools";
import { MoveIcon } from "lucide-react";

export function LayerActions() {
  const { moving, setMoving } = useTools();

  const toggleMoving = () => {
    setMoving(!moving);
  };

  return (
    <HeaderSection title="Layer">
      <div className="grid grid-cols-1 gap-2 justify-center">
        <Button
          variant={moving ? "default" : "outline"}
          size="icon"
          className="w-8 h-8"
          onClick={toggleMoving}
        >
          <MoveIcon className="h-4 w-4" />
        </Button>
      </div>
    </HeaderSection>
  );
}
