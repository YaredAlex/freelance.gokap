const ProjectTableSkeleton = () => {
  return (
    <>
      <div className="w-100" style={{ overflow: "auto" }}>
        <table className="project-table mb-2 border-card rounded bg-white-v-4">
          <thead className="table-header py-3">
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
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="table-row my-2 p-1 py-2">
                <td className="p-3">
                  <div className="skeleton-line w-75"></div>
                </td>
                <td className="p-3">
                  <div className="skeleton-line w-75"></div>
                </td>
                <td className="p-3">
                  <div className="skeleton-pill"></div>
                </td>
                <td className="p-3">
                  <div className="skeleton-pill"></div>
                </td>
                <td className="p-3">
                  <div className="skeleton-line w-75"></div>
                </td>
                <td className="p-3">
                  <div className="skeleton-line w-50"></div>
                </td>
                <td className="p-3">
                  <div style={{ maxWidth: "200px", height: "38px" }}>
                    <div className="skeleton-line h-100"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination">
          {[...Array(2)].map((_, i) => (
            <li key={i} className="page-item">
              <div
                className="page-link skeleton-line"
                style={{
                  width: "20px",
                  height: "32px",
                  margin: "0 2px",
                  borderRadius: "4px",
                }}
              ></div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ProjectTableSkeleton;
