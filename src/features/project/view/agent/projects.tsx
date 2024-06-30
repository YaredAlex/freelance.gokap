import { useNavigate } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../../components/button/button";
import CustomToastContainer from "../../../../components/custom_toast/toast_container";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import useAgentProject, {
  UseAppliedProjectType,
} from "../../hooks/agent/use_agent_project";
// considering passing auth and project here *** important **
const AgentProject = () => {
  const agentProject = useAgentProject();
  const navigate = useNavigate();
  return (
    <div className="table-responsive-container position-relative">
      <CustomToastContainer />
      {agentProject.showReload ? (
        <button
          className="btn-custom-secondary"
          onClick={() => {
            window.location.reload();
          }}
        >
          Reload
        </button>
      ) : (
        <div
          className="table-responsive text-black-variant-1 mx-auto max-w-1100"
          style={{
            minWidth: "300px",
          }}
        >
          <h5 className="pt-4 mb-2 mb-sm-0">Project</h5>
          <div className="ms-auto" style={{ maxWidth: "150px" }}>
            <ButtonPrimary
              title="Apply Project"
              type="button"
              className="py-2 px-3 mb-2"
              onClick={() => navigate("/agent/dashboard")}
            />
          </div>
          {/* SEARCH LABLE */}
          <div className="mb-4 bg-white-v-4 px-3 py-4 rounded border-card">
            <div
              className="d-flex flex-column flex-sm-row gap-2 justify-content-between search-bar col "
              style={{ width: "100%" }}
            >
              <input
                type="text"
                className="custom-input border-card rounded"
                placeholder="Search by title or proposal"
                value={agentProject.searchTerm}
                onChange={agentProject.handleSearch}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          {agentProject.loading ? (
            <>
              <div className="position-relative mt-100">
                <CustomLoadingSecondary title="Loading" />
              </div>
            </>
          ) : (
            <ProjectTable agentProject={agentProject} />
          )}
        </div>
      )}
    </div>
  );
};

export default AgentProject;

const ProjectTable = ({
  agentProject,
}: {
  agentProject: UseAppliedProjectType;
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-100" style={{ overflow: "auto" }}>
        <table className="project-table mb-2 border-card rounded bg-white-v-4">
          <thead className="table-header py-3 ">
            <tr className="border-light-bottom">
              <th className="p-3">Title</th>
              <th className="p-3">Poroposal</th>
              <th className="p-3">Status</th>
              <th className="p-3">Applied</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {agentProject.currentRows.map((project, index) => (
              <tr
                key={index}
                className="table-row my-2 p-1 py-2 "
                // onClick={() => {
                //   gotoProjectDetail(project, index);
                // }}
              >
                <td className="p-3">{project?.project_id.title}</td>
                <td className="p-3">{project?.proposal}</td>
                <td className="p-3">{project?.status}</td>

                <td className="p-3">
                  {new Date(project?.applied_at).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <div style={{ maxWidth: "200px", height: "max-content" }}>
                    <ButtonPrimaryOutline
                      onClick={() => {
                        // projectContext?.setCurrentProject(project);
                        // navigate(`status/${project.id}`);
                      }}
                      type="button"
                      title="manage"
                      className="py-2"
                      showBorder={false}
                     
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {agentProject.currentRows.length < 1 && (
        <div className="rounded border-card py-4 px-4 bg-white-v-4 d-flex align-items-center flex-column text-black-variant-1">
          <h6 className="my-3">No project exits</h6>
          <div className="px-3" style={{ maxWidth: "200px" }}>
            <ButtonPrimary
              title="Create Project"
              type="button"
              className="py-2 px-3 mb-2"
              onClick={() => navigate("create")}
            />
          </div>
        </div>
      )}
      <nav>
        <ul className="pagination">
          {Array.from(
            {
              length: Math.ceil(
                agentProject.alldata.length / agentProject.rowsPerPage
              ),
            },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${
                  i + 1 === agentProject.currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => agentProject.paginate(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </>
  );
};
