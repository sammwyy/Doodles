import { ProjectContext } from "@/contexts/project-context";
import { useContext } from "react";

const useProject = () => useContext(ProjectContext);

export default useProject;
