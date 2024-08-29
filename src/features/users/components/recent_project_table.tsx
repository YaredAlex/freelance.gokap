import { useNavigate } from "react-router-dom";
import {
  ClientProjectType,
  useProjectContext,
} from "../../../context/projects/project_context";
import { ButtonPrimaryOutline } from "../../../components/button/button";

const RecentProjectTable = ({ data }: { data: ClientProjectType[] }) => {
  const navigate = useNavigate();
  const projectContext = useProjectContext();

  const handleRowClick = (project: ClientProjectType) => {
    projectContext?.setCurrentProject(project);
    if (project.project_assigned_status)
      navigate(`/admin/dashboard/project/status/${project.id}`);
    else navigate(`/admin/dashboard/assign/${project.id}`);
  };

  return (
    <div
      className="text-black-variant-1 bg-white-v-4 rounded w-100 border-card"
      style={{ overflow: "auto" }}
    >
      {/* Wrapper for responsiveness */}
      <table className="w-100 " style={{ minWidth: "500px" }}>
        <thead>
          <tr className="border-light-bottom ">
            <th className="p-2 py-3 ps-4">Title</th>
            <th className="p-2 py-3">Date</th>
            <th className="p-2 py-3">Status</th>
            <th className="p-2 py-3">Assigned</th>
            <th className="p-2 py-3">Applied</th>
            <th className="p-2 py-3">Budget</th>
            <th className="p-2 py-3">{"action"} </th>
          </tr>
        </thead>
        <tbody className="">
          {data.length > 0 ? (
            data?.map((project, index) => (
              <tr key={index} className="border-light-bottom">
                <td className="p-2 ps-4" style={{ maxWidth: "100px" }}>
                  {project.title}
                </td>
                <td className="p-2">
                  {new Date(project.created_at).toDateString()}
                </td>
                <td className="p-2">{project.project_status}</td>
                <td
                  className={` p-2 ${
                    project.project_assigned_status
                      ? "text-green"
                      : "text-error"
                  }
                    `}
                >
                  {project.project_assigned_status ? "assinged" : "unassigned"}
                </td>
                <td className="p-2">{project.applied_count}</td>
                <td className="p-2">{project.project_price}</td>
                <td className="p-2">
                  <div style={{ maxWidth: "200px", height: "max-content" }}>
                    <ButtonPrimaryOutline
                      onClick={() => handleRowClick(project)}
                      type="button"
                      title="check"
                      className="py-2"
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="border-light-bottom">
              <td className="p-2 py-3"></td>
              <td className="p-2 py-3">No recored found</td>
              <td className="p-2 py-3"> </td>
              <td className="p-2 py-3"> </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentProjectTable;
