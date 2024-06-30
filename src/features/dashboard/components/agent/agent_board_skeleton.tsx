import "./agent_board_skeleton.css";
const AgentBoardSkeleton = () => {
  return (
    <div
      className="project-card-wrapper bg-white-v-4 px-3 py-3 mb-4 cursor-pointer"
      style={{
        maxWidth: "900px",
        width: "100%",
      }}
    >
      <div className="bg-white-v-4">
        <div className="skeleton-line w-25 mb-2"></div>
        <div className="skeleton-line w-50 mb-3"></div>
        <div className="skeleton-line w-75 mb-4"></div>
        <div className="skeleton-line w-100 mb-3"></div>
        <div className="d-flex gap-3 flex-wrap mb-3">
          <div className="skeleton-line w-25"></div>
          <div className="skeleton-line w-25"></div>
          <div className="skeleton-line w-25"></div>
        </div>
        <div className="card-bottom d-flex justify-content-between">
          <div className="skeleton-line w-50"></div>
          <div className="skeleton-line w-25"></div>
        </div>
      </div>
    </div>
  );
};

export default AgentBoardSkeleton;
