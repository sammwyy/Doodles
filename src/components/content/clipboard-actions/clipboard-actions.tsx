import { HeaderSection } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ClipboardPasteIcon, CopyIcon, ScissorsIcon } from "lucide-react";

export function ClipboardActions() {
  return (
    <HeaderSection title="Clipboard" first={true}>
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          size="icon"
          className="w-16 h-16"
          disabled={true}
        >
          <ClipboardPasteIcon className="h-6 w-6" />
        </Button>

        <div className="grid grid-cols-1 gap-2 justify-center">
          <Button
            variant={"outline"}
            size="icon"
            className="w-8 h-8"
            disabled={true}
          >
            <ScissorsIcon className="h-4 w-4" />
          </Button>

          <Button
            variant={"outline"}
            size="icon"
            className="w-8 h-8"
            disabled={true}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </HeaderSection>
  );
}
