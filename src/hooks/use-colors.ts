import { ColorContext } from "@/contexts/color-context";
import { useContext } from "react";

const useColors = () => useContext(ColorContext);

export default useColors;
