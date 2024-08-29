import Onboarding from "@/views/Onboarding";
import { createContext, useState } from "react";

interface Project {
  width: number;
  height: number;
  fill: "white" | "black" | "green" | "transparent";
}

export interface ProjectContextType {
  project: Project | null;
  initProject: (project: Project) => void;
}

export const ProjectContext = createContext<ProjectContextType>({
  project: {
    width: 0,
    height: 0,
    fill: "white",
  },
  initProject: () => {},
});

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project, setProject] = useState<Project | null>(null);

  const initProject = (projectData: Project) => {
    if (project) throw new Error("Project already initialized");
    setProject(projectData);
  };

  return (
    <ProjectContext.Provider value={{ project, initProject }}>
      {project && children}
      {!project && <Onboarding />}
    </ProjectContext.Provider>
  );
};
