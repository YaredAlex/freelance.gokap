import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { ProjectActionType, projectReducer } from "./project_reducer";

export type ClientProjectType = {
  id: string;
  project_category: string;
  title: string;
  description: string;
  project_price: string;
  project_deadline: string;
  skills_required: string[];
  client: string;
  created_at: string;
  updated_at: string;
  payment_status: number | string;
  project_status: number | string;
  project_assigned_status: boolean;
};

type ProjectContextType = {
  projectData: { data: ClientProjectType[] };
  projectDispatch: React.Dispatch<ProjectActionType>;
  projectLoading: boolean;
  //   setLoadProject: React.Dispatch<React.SetStateAction<boolean>>;
  currentProject: ClientProjectType;
  setCurrentProject: React.Dispatch<React.SetStateAction<ClientProjectType>>;
};

const defaultProject: ClientProjectType = {
  id: "",
  project_category: "",
  title: "",
  description: "",
  project_price: "",
  project_deadline: "",
  skills_required: [],
  client: "",
  created_at: "",
  updated_at: "",
  payment_status: "",
  project_status: "",
  project_assigned_status: false,
};

const defaultProjectContext: ProjectContextType = {
  projectData: { data: [] },
  projectDispatch: () => {},
  projectLoading: false,
  // setLoadProject:()=>{},
  currentProject: defaultProject,
  setCurrentProject: () => {},
};
export const ProjectContext = createContext<ProjectContextType>(
  defaultProjectContext
);

export const useProjectContext = () => {
  return useContext(ProjectContext);
};

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [projectData, projectDispatch] = useReducer(projectReducer, {
    data: [],
  });
  const [currentProject, setCurrentProject] =
    useState<ClientProjectType>(defaultProject);
  // const getProject = useGetClientProject();

  useEffect(() => {}, []);
  return (
    <ProjectContext.Provider
      value={{
        projectData,
        projectDispatch,
        projectLoading: false,
        currentProject,
        setCurrentProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;