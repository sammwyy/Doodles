import { HeaderSection } from "@/components/layout/header";
import useColors from "@/hooks/use-colors";

export function ColorSelector() {
  const { color, setColor, systemColors, userColors } = useColors();
  const colors = [...systemColors, ...userColors];

  return (
    <HeaderSection title="Color">
      <div className="grid grid-cols-10 gap-2 justify-center">
        {colors.map((c, i) => (
          <button
            key={i}
            className={`w-4 h-4 rounded-full focus:outline-none ${
              c !== null && color === c
                ? "ring-2 ring-blue-500"
                : "ring-1 ring-gray-400 "
            }`}
            style={{ backgroundColor: c || "transparent" }}
            onClick={() => c != null && setColor(c)}
          />
        ))}
      </div>
    </HeaderSection>
  );
}
