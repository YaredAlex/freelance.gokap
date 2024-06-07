import CircularAvatar from "../../../../components/circularAvatar/circular_avatar";
import { useAuthContext } from "../../../../context/auth/auth_context";
import useClientHome from "../../hooks/client/client_hook";

const DashBoardProfile = () => {
  const authContext = useAuthContext();
  const clientHome = useClientHome();
  return (
    <div
      className="d-none d-lg-flex flex-column align-items-center gap-2 text-black-variant-1 "
      style={{
        flexShrink: "50%",
      }}
    >
      {/* customer simple porfile */}
      <div
        className={`d-flex flex-column gap-2 align-items-center rounded bg-white-variant-4 pt-2 border-card`}
        style={{
          width: "100%",
          height: "200px",
        }}
      >
        <CircularAvatar
          size={130}
          text={authContext.user?.firstname.slice(0, 2)}
          fontSize={2.5}
          bgcolor="#802cff"
          className={""}
          fontcolor={"text-white"}
        />
        <span>{authContext.user?.email}</span>
      </div>

      <div
        className={`width-100 d-flex flex-column bg-white-variant-4 p-3 border-card`}
        style={{
          width: "100%",
          height: "200px",
        }}
      >
        <div className="col d-flex flex-column justify-content-center">
          <span>Max Budget</span>
          <h2 className={`text-center font-weight-400`}>
            {clientHome.budget.maxBudget}
            <span className="h5">rs</span>
          </h2>
        </div>
        <div className="col col d-flex flex-column justify-content-center">
          <span>Min Budget</span>
          <h2 className={`text-center font-weight-400`}>
            {clientHome.budget.minBudget}
            <span className="h5">rs</span>
          </h2>
        </div>
      </div>
      {/* Activity */}
      {/* <DashBoardActivity /> */}
    </div>
  );
};

export default DashBoardProfile;
