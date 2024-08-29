import ClipboardActions from "@/components/content/clipboard-actions";
import ColorSelector from "@/components/content/color-selector";
import ImageActions from "@/components/content/image-actions";
import LayerActions from "@/components/content/layer-actions";
import SizeSelector from "@/components/content/size-selector";
import ToolSelector from "@/components/content/tool-selector";

export const Header = () => {
  return (
    <div className="bg-[#fff] border-gray-100 border-y-2 p-2 py-1 flex items-center">
      <ClipboardActions />
      <ImageActions />
      <LayerActions />
      <ToolSelector />
      <SizeSelector />
      <ColorSelector />
    </div>
  );
};
