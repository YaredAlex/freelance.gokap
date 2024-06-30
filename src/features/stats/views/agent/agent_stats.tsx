import { Add, Edit2, Money, TickCircle, User, Wallet1 } from "iconsax-react";
import BudgetChart from "../../../../components/chart/budget_chart";
import { useProjectContext } from "../../../../context/projects/project_context";
import RecentProjectTable from "../../../../components/table/recent_project";
import { ButtonPrimaryOutline } from "../../../../components/button/button";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/auth/auth_context";
import DashBoardProjectCard from "../../../dashboard/components/dashboard_card";
import useAgentStats from "../../hooks/agent/useAgentStats";
import DashBoardHorizontalCard from "../../../dashboard/components/dashboard_horizontal_card";

const AgentStats = () => {
  const clientHome = useAgentStats();
  const projectContext = useProjectContext();
  const authContext = useAuthContext();
  const iconSize = 24;
  const navigate = useNavigate();
  const loading = false;
  return (
    <div className={` d-flex dashboard-content`} style={{}}>
      <div
        className="d-flex position-relative
      flex-column
     gap-4 mx-auto
     pb-3 pb-md-0
     left-side
     pt-4
    "
        style={{ maxWidth: "1100px" }}
      >
        {/* <div>
          <h5 className="">DashBoard</h5>
        </div> */}
        {loading && <CustomLoadingSecondary title="Loading" />}
        <div
          className="bg-white-v-4 border-card rounded px-4 py-4 d-flex flex-column gap-3
        text-black-variant-1
        "
        >
          <div className="d-flex justify-content-between ">
            <DashBoardProjectCard
              icon={<User size={iconSize} />}
              title={authContext.user.firstname}
              subtitle={authContext.user.email}
            />
            {/* create button */}
            <div className="" style={{ width: "150px" }}>
              <ButtonPrimaryOutline
                onClick={() => {
                  navigate("/agent/dashboard/projects");
                }}
                title="View projects"
                type="button"
                className="py-2"
              />
            </div>
          </div>
          <div className="border-light-bottom"></div>
          <div
            className="d-flex justify-content-between flex-sm-row flex-column gap-4"
            style={{ maxWidth: "900px" }}
          >
            <DashBoardProjectCard
              icon={<Edit2 size={iconSize} />}
              link="projects"
              subtitle={`${clientHome.cardState.projectCreated}`}
              title="Assigned project"
            />
            <DashBoardProjectCard
              icon={<TickCircle size={iconSize} />}
              link="projects"
              title="Completed"
              subtitle={`${clientHome.cardState.projectCompeleted}`}
            />
            <DashBoardProjectCard
              icon={<Money size={iconSize} />}
              link="porjects"
              title="Earning"
              subtitle={`${clientHome.cardState.investment}`}
            />
          </div>
        </div>

        {/* Budget Chart */}
        <div
          className={` d-flex
        gap-4  flex-md-row flex-column  `}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        >
          {/* <div className="col">
            <ProjectProgress />
          </div> */}
          <div className="d-flex flex-column col gap-4">
            <DashBoardHorizontalCard
              icon={<Add color="white" size={32} />}
              subtitle="add new project to your account"
              title="Find Project"
              onClick={() => {
                navigate("/agent/dashboard");
              }}
            />
            <DashBoardHorizontalCard
              icon={<Wallet1 color="white" size={32} />}
              subtitle="finish assigned project"
              title="Complete Project"
            />
          </div>
          <div
            className={`col
            bg-white-v-4 p-2 
            rounded border-card`}
            style={{ height: "250px" }}
          >
            <BudgetChart data={clientHome.budgetChar} />
          </div>
        </div>
        {/* Table */}
        <RecentProjectTable
          data={
            clientHome.projectDetailConvert(
              projectContext?.projectData.data || []
            ) || []
          }
        />
      </div>
    </div>
  );
};

export default AgentStats;
