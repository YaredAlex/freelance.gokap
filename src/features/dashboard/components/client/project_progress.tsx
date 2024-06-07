import HalfCircleProgress from "../../../../components/chart/half_circle";
import useClientHome from "../../hooks/client/client_hook";

const ProjectProgress = () => {
  const clientHome = useClientHome();
  return (
    <div
      className={`
      bg-white-v-4 
      rounded d-flex align-items-start 
      flex-column p-2 gap-4
       text-black-variant-1 border-card`}
    >
      <HalfCircleProgress
        percentage={
          (clientHome.cardState.projectCompeleted || 0) /
          (clientHome.cardState.projectCreated || 1)
        }
      />
      <div className="d-flex align-items-center gap-3">
        {" "}
        <span
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#4caf50",
            display: "inline-block",
          }}
        />{" "}
        Finished
      </div>
      <div className="d-flex align-items-center gap-3">
        {" "}
        <span
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#e0e0e0",
            display: "inline-block",
          }}
        />{" "}
        Pending
      </div>
    </div>
  );
};

export default ProjectProgress;
