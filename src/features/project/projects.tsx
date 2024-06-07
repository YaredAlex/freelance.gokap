import { useEffect } from "react";
import "./projects.css";
import { useAuthContext } from "../../context/auth/auth_context";
import ClientrProjectTable from "./view/client/project";
const Projects = () => {
  const authContext = useAuthContext();
  useEffect(() => {}, []);
  if (authContext.user.type == "client")
    return (
      <div className={`text-black-variant-1 ps-2`}>
        <ClientrProjectTable />
      </div>
    );
  else
    return (
      <div className={`text-black-variant-1 ps-2`}>
        <h5 className={`font-weight-400`}>All Projects</h5>
        {/* <PostedProjects
          data={projectData.data}
          projectDispatch={projectDispatch}
        /> */}
      </div>
    );
};

export default Projects;
