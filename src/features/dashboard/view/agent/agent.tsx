import useAgentBoard, {
  UseAgentBoardType,
} from "../../hooks/agent/agent_board";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import { ButtonPrimary } from "../../../../components/button/button";
import AgentBoardSkeleton from "../../components/agent/agent_board_skeleton";
import { Filter, TickCircle } from "iconsax-react";
import useAgentProject from "../../../project/hooks/agent/use_agent_project";
import FilterProject from "../../components/agent/filter_project";
import { ClientProjectType } from "../../../../context/projects/project_context";

const PostedProjects = () => {
  const agentBoard = useAgentBoard();
  const appliedProject = useAgentProject();
  return (
    <>
      <div className="position-relative">
        <div className="text-black-variant-1 mx-auto mt-4 max-w-1100 mx-auto">
          {/* SEARCH LABLE */}
          <div className="mb-4 bg-white-v-4 px-3 py-4 rounded border-card d-flex gap-4">
            <div className="d-flex w-100 flex-row flex-sm-row gap-2 justify-content-between search-bar col ">
              <input
                type="text"
                className="custom-input border-card rounded"
                placeholder="Search by title or budget"
                value={agentBoard.searchTerm}
                onChange={(e) => agentBoard.setSearchTerm(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ maxWidth: "150px" }}>
              <ButtonPrimary
                title="search"
                type="button"
                className="py-2"
                onClick={() => agentBoard.handleSearch()}
                disabled={agentBoard.searchLoading}
              />
            </div>
            <div
              className="border-card d-flex align-items-center px-3 rounded"
              style={{ position: "relative" }}
            >
              <Filter
                onClick={() => agentBoard.setShowFilter(!agentBoard.showFilter)}
              />
              <FilterProject agentBoard={agentBoard} />
            </div>
          </div>
          {/* Project cards */}
          <div className="mb-4"></div>{" "}
          <div
            className={`mb-3 bg-white-v-4 rounded border-card overflow-hidden`}
          >
            <div className="col">
              {agentBoard.loading ||
              appliedProject.loading ||
              agentBoard.searchLoading ? (
                <>
                  <AgentBoardSkeleton />
                  <AgentBoardSkeleton />
                </>
              ) : (
                agentBoard.currentRows.map((project, index) => {
                  const applied = appliedProject.alldata.find(
                    (p) => p.project_id.title === project.title
                  );
                  if (applied)
                    return (
                      <ProjectPostedCard
                        key={index}
                        agentBoard={agentBoard}
                        project={project}
                        isApplied={true}
                      />
                    );
                  return (
                    <ProjectPostedCard
                      key={index}
                      agentBoard={agentBoard}
                      project={project}
                      isApplied={false}
                    />
                  );
                })
              )}
            </div>
          </div>
          <nav>
            <ul className="pagination">
              {Array.from(
                {
                  length: Math.ceil(
                    agentBoard.projectHolder.length / agentBoard.rowsPerPage
                  ),
                },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      i + 1 === agentBoard.currentPage ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => agentBoard.paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default PostedProjects;

const ProjectPostedCard = ({
  agentBoard,
  project,
  isApplied,
}: {
  agentBoard: UseAgentBoardType;
  project: ClientProjectType;
  isApplied: boolean;
}) => {
  return (
    <div
      className="border-light-bottom project-card-wrapper bg-white-v-4  px-3 py-3 cursor-pointer"
      style={{
        maxWidth: "900px",
        width: "100%",
      }}
      onClick={() =>
        isApplied ? () => {} : agentBoard.checkOutProject(project)
      }
    >
      <div className="d-flex justify-content-between">
        <p className="m-0 text-black-variant-3" style={{ fontSize: "14px" }}>
          {agentBoard.timeAgo.format(new Date(project.created_at))}
        </p>
        {isApplied && (
          <div className="d-flex gap-1">
            <TickCircle variant="Bold" color="green" size={20} />
            <p className="text-sm">Applied</p>
          </div>
        )}
      </div>
      {/* title */}
      <h6 className="project-title my-2 text-capitalize">{project.title}</h6>
      {/* Description */}
      <p className="project-description my-3 text-sm text-black-variant-3">
        {project.description}
      </p>
      <div className="d-flex gap-3 flex-wrap my-3 text-sm">
        {project.skills_required.map((skill, index) => (
          <RoundedText text={skill} key={index} />
        ))}
      </div>
      <div className="card-bottom d-flex justify-content-between">
        <div className="d-flex gap-4">
          <p
            className="d-flex gap-1 flex-sm-row flex-column"
            style={{ fontSize: "14px" }}
          >
            <span className="text-black-variant-2">Est Submission </span>
            <span className="text-black-variant-3">
              {new Date(project.project_deadline).toDateString()}
            </span>
          </p>
          <p className="text-black-variant-3 font-weight-300">
            Proposals:{" "}
            {project.applied_count <= 5
              ? "0 to 5"
              : project.applied_count <= 10
              ? "5 to 10"
              : "10 to 20"}
          </p>
        </div>
        <p>
          Budget <br />
          {project.project_price}rs
        </p>
      </div>
    </div>
  );
};
