import AgentBoardSkeleton from "../../../dashboard/components/agent/agent_board_skeleton";
import { ProjectPostedCard } from "../../components/project_posted_card";
import useManageFreelance from "../../hooks/use_manage_freelancer";

const ManageFreelancer = () => {
  const manageFreelancer = useManageFreelance();
  return (
    <div className="max-w-1200 mx-auto pt-4">
      <p className="mb-3">Freelancer</p>

      <div>
        <p className="mb-3">Assigned Projects</p>

        <div className="">
          {manageFreelancer.loading ? (
            <>
              <AgentBoardSkeleton />
              <AgentBoardSkeleton />
            </>
          ) : (
            <div className="d-flex gap-4 flex-column">
              {manageFreelancer.assignedProjects.map((project, index) => (
                <ProjectPostedCard
                  key={index}
                  project={project}
                  isAssigned={false}
                />
              ))}
              {manageFreelancer.assignedProjects.length === 0 && (
                <div
                  className="border-light-bottom project-card-wrapper bg-white-v-4  px-3 py-3 cursor-pointer"
                  style={{
                    maxWidth: "900px",
                    width: "100%",
                  }}
                  // onClick={() => adminBoard.checkOutProject(project)}
                >
                  <p>No assigned projects</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageFreelancer;
