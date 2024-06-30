import { useEffect } from "react";
import "./projects.css";
import { useAuthContext } from "../../context/auth/auth_context";
import ClientrProjectTable from "./view/client/project";
import AgentProject from "./view/agent/projects";
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
        <AgentProject />
      </div>
    );
};

export default Projects;
