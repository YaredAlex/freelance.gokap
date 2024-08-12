import useManageUser from "../../hooks/use_manage_user";
import AgentBoardSkeleton from "../../../dashboard/components/agent/agent_board_skeleton";
import { ProjectPostedCard } from "../../components/project_posted_card";

const ManageUser = () => {
  const manageUser = useManageUser();

  return (
    <div className="text-black-variant-1 pt-4 max-w-1200 mx-auto">
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
