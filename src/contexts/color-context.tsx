import { createContext, useState } from "react";

const SYSTEM_COLORS: string[] = [
  // First line
  "#000000", // Black
  "#666666", // Dark Gray
  "#A52A2A", // Dark Brown
  "#FF0000", // Red
  "#FF4500", // Dark Orange
  "#FFD700", // Yellow
  "#006400", // Dark Green
  "#00008B", // Dark Blue
  "#20B2AA", // Light Blue
  "#4B0082", // Indigo

  // Second line
  "#FFFFFF", // White
  "#CCCCCC", // Light Gray
  "#CD7F32", // Bronze
  "#FF77FF", // Pink
  "#FFA07A", // Light Salmon
  "#FFFFE0", // Light Yellow
  "#55A055", // Light Green
  "#0000FF", // Blue
  "#00CED1", // Dark Turquoise
  "#800080", // Purple
];

type NullableArr<T> = (T | null)[];

export interface ColorContextType {
  color: string;
  setColor: (color: string) => void;

  userColors: NullableArr<string>;
  addUserColor: (color: string) => void;

  systemColors: string[];
}

export const ColorContext = createContext<ColorContextType>({
  color: "black",
  setColor: () => {},

  userColors: [],
  addUserColor: () => {},

  systemColors: [],
});

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [color, setColor] = useState("#000000");
  const [userColors, setUserColors] = useState<NullableArr<string>>(
    new Array(10).fill(null)
  );

  const addUserColor = (color: string) => {
    setUserColors((prev) => [...prev, color]);
  };

  return (
    <ColorContext.Provider
      value={{
        color,
        setColor,
        userColors,
        addUserColor,
        systemColors: SYSTEM_COLORS,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};
