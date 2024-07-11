import { useNavigate } from "react-router-dom";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../../components/button/button";
import CustomToastContainer from "../../../../components/custom_toast/toast_container";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import useClientProject, {
  UseClientProjectType,
} from "../../hooks/client/useclientproject_hook";
import { useProjectContext } from "../../../../context/projects/project_context";
// considering passing auth and project here *** important **
const ClientrProjectTable = () => {
  const clientProject = useClientProject();
  const navigate = useNavigate();
  return (
    <div className="table-responsive-container position-relative">
      <CustomToastContainer />
      {clientProject.showReload ? (
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
              title="Create Project"
              type="button"
              className="py-2 px-3 mb-2"
              onClick={() => navigate("create")}
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
                placeholder="Search by title or budget"
                value={clientProject.searchTerm}
                onChange={clientProject.handleSearch}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          {clientProject.loading ? (
            <>
              <div className="position-relative mt-100">
                <CustomLoadingSecondary title="Loading" />
              </div>
            </>
          ) : (
            <ProjectTable clientProject={clientProject} />
          )}
        </div>
      )}
    </div>
  );
};

export default ClientrProjectTable;

const ProjectTable = ({
  clientProject,
}: {
  clientProject: UseClientProjectType;
}) => {
  const navigate = useNavigate();
  const projectContext = useProjectContext();
  return (
    <>
      <div className="w-100" style={{ overflow: "auto" }}>
        <table className="project-table mb-2 border-card rounded bg-white-v-4">
          <thead className="table-header py-3 ">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Created</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Progress</th>
              <th className="p-3">Submission</th>
              <th className="p-3">Budget</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {clientProject.currentRows.map((project, index) => (
              <tr
                key={index}
                className="table-row my-2 p-1 py-2 "
                // onClick={() => {
                //   gotoProjectDetail(project, index);
                // }}
              >
                <td className="p-3">{project?.title}</td>
                <td className="p-3">{project?.created_at}</td>
                <td className="p-3">
                  <span
                    style={{
                      color: project.payment_status === 2 ? "green" : "red",
                    }}
                  >
                    {project.payment_status == 1 ? "Paid" : "Pending"}
                  </span>
                </td>
                <td className="p-3">
                  {project?.project_status === 1 ? "assigned" : "unassigned"}
                </td>
                <td className="p-3">
                  {new Date(project?.project_deadline).toLocaleDateString()}
                </td>
                <td className="p-3">{project?.project_price}</td>
                <td className="p-3">
                  <div style={{ maxWidth: "200px", height: "max-content" }}>
                    <ButtonPrimaryOutline
                      onClick={() => {
                        projectContext?.setCurrentProject(project);
                        navigate(`status/${project.id}`);
                      }}
                      type="button"
                      title="manage"
                      className="py-2"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {clientProject.currentRows.length < 1 && (
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
                clientProject.alldata.length / clientProject.rowsPerPage
              ),
            },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${
                  i + 1 === clientProject.currentPage ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => clientProject.paginate(i + 1)}
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
