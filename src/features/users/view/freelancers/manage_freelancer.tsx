import { ArrowLeft } from "iconsax-react";
import { ButtonFlexOutline } from "../../../../components/button/button";
import AgentBoardSkeleton from "../../../dashboard/components/agent/agent_board_skeleton";
import { ProjectPostedCard } from "../../components/project_posted_card";
import useManageFreelance from "../../hooks/use_manage_freelancer";
import { useNavigate } from "react-router-dom";

const ManageFreelancer = () => {
  const manageFreelancer = useManageFreelance();
  const navigate = useNavigate();
  return (
    <div className="max-w-1200 mx-auto pt-3 text-black-variant-1">
      <div style={{ maxWidth: "40px" }}>
        <ButtonFlexOutline
          className="p-1 bg-white-v-4 text-black-variant-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </ButtonFlexOutline>
      </div>
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
