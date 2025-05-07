import { AxiosResponse } from "axios"
import customToast from "../../../components/custom_toast/custom_toast"
import { useAxios } from "../../../hooks/useAxios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClientProjectType, PostedProjectType, useProjectContext } from "../../../context/projects/project_context"
import { useGetProjectById } from "../../../hooks/use_get_project_id"
import { AgentDetailType } from "../../../context/agent/agent_context"
export type AssignedAgentType = {
     details:{
        proposal: string;
        applied_at: string;
        status: string;
        freelancer: AgentDetailType;
        id: number;
        project_id: number;
     }
 
  };
const useProjectStatus = ()=>{

  //Get freelancer who is responsible for this project
  //Get progress status from the progress table
  //allow messaging to freelancer
  //
  const { id } = useParams();
  const { currentProject, setCurrentProject } = useProjectContext();
  const [agentList,setAgentList] = useState<AssignedAgentType[]>([]);
  const getProjectFreelancer = useGetProjectFreelancer()
  const getProject = useGetProjectById()
  const navigate = useNavigate()
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: "instant" });
    if (id != null || id != undefined) {
      getProject.getProject(id, (res) => {
        setCurrentProject(res.data.serialized_data);
      });
      //call get freelancers
      getProjectFreelancer.getFreelancer((res)=>{
        // console.log(res)
        const data = res.data.serialized_data
        console.log(data)
        setAgentList(data)
 })
    } else navigate("/admin/dashboard/");
 
  },[])
  const getFreelancer = ()=>{
    getProjectFreelancer.getFreelancer((res)=>{
        console.log(res)
 })
  }
   return {
    loading: getProjectFreelancer.loading,
    getFreelancer,
    currentProject,
    agentList,
   }
}
export default useProjectStatus
export type useProjectStatusType = {
    loading: boolean,
    getFreelancer: () => void,
    currentProject: ClientProjectType | PostedProjectType
}
const useGetProjectFreelancer = ()=>{
    const {id} = useParams();
    const{sendRequest,loading} = useAxios({
        headers: true,
        method:"GET",
        url:`/api/manager/assigned/freelancer/${id}/`
    })

    const getFreelancer = (cb:(res:AxiosResponse)=>void)=>{
        sendRequest({},(res)=>{
             cb(res)

        },(error)=>{
            const message = JSON.stringify(error.request.response)
            customToast({message:message,type:"error"})
            console.log(error)
        })
    }

    return {
       
        loading,
        getFreelancer,
    }
}