import { LayerContext } from "@/contexts/layer-context";
import { useContext } from "react";

const useLayer = () => useContext(LayerContext);

export default useLayer;
