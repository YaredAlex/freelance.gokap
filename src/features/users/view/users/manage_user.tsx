import useManageUser from "../../hooks/use_manage_user";
import AgentBoardSkeleton from "../../../dashboard/components/agent/agent_board_skeleton";
import { ProjectPostedCard } from "../../components/project_posted_card";
import { ButtonFlexOutline } from "../../../../components/button/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "iconsax-react";

const ManageUser = () => {
  const manageUser = useManageUser();
  const navigate = useNavigate();
  return (
    <div className="text-black-variant-1 pt-3 max-w-1200 mx-auto">
      <div style={{ maxWidth: "40px" }}>
        <ButtonFlexOutline
          className="p-1 bg-white-v-4 text-black-variant-1"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft />
        </ButtonFlexOutline>
      </div>
      <p className="mb-4">Client</p>

      <div>
        <p className="mb-3">Posted Project</p>
        <div className="">
          {manageUser.loading ? (
            <>
              <AgentBoardSkeleton />
              <AgentBoardSkeleton />
            </>
          ) : (
            <div className="d-flex gap-4 flex-column">
              {manageUser.postedProject.map((project, index) => (
                <ProjectPostedCard
                  key={index}
                  project={project}
                  isAssigned={false}
                />
              ))}
              {manageUser.postedProject.length === 0 && (
                <div
                  className="border-light-bottom project-card-wrapper bg-white-v-4  px-3 py-3 cursor-pointer"
                  style={{
                    maxWidth: "900px",
                    width: "100%",
                  }}
                  // onClick={() => adminBoard.checkOutProject(project)}
                >
                  <p>No posted projects</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
