import { Add, Edit2, Money, TickCircle, User, Wallet1 } from "iconsax-react";
import useClientHome from "../../hooks/client/client_hook";
import BudgetChart from "../../../../components/chart/budget_chart";
import { useProjectContext } from "../../../../context/projects/project_context";
import RecentProjectTable from "../../../../components/table/recent_project";
import { ButtonPrimaryOutline } from "../../../../components/button/button";
import DashBoardProjectCard from "../../components/dashboard_card";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/auth/auth_context";

const ClientDashBoard = () => {
  const clientHome = useClientHome();
  const projectContext = useProjectContext();
  const authContext = useAuthContext();
  const iconSize = 24;
  const navigate = useNavigate();
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
        {clientHome.loading && <CustomLoadingSecondary title="Loading" />}
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
                  navigate("projects");
                }}
                title="View all projects"
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
              title="Posted Project"
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
              title="Investment"
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
              title="Create new Project"
              onClick={() => {
                navigate("projects/create");
              }}
            />
            <DashBoardHorizontalCard
              icon={<Wallet1 color="white" size={32} />}
              subtitle="make transaction to account"
              title="Make Transaction"
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

export default ClientDashBoard;

const DashBoardHorizontalCard = ({
  title,
  subtitle,
  icon,
  onClick,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className="bg-white-v-4 h-100 border-card p-3 rounded d-flex align-items-center gap-4
    text-black-variant-1 cursor-pointer
    "
      onClick={onClick}
    >
      <div
        style={{ height: "60px", width: "60px", borderRadius: "100%" }}
        className="bg-green-primary d-flex align-items-center justify-content-center"
      >
        {icon}
      </div>
      <div className="d-flex flex-column gap-2">
        <h6 className="m-0">{title}</h6>
        <p className="text-black-variant-2 m-0">{subtitle}</p>
      </div>
    </div>
  );
};
// function ColorFullCard() {
//   return {
//     // /* <div
//     //       className={`d-flex
//     //       justify-content-center align-items-center
//     //       justify-content-sm-between flex-wrap gap-4 flex-sm-row flex-column `}
//     //       style={{}}
//     //     >
//     //       <DashboardCard
//     //         title={"Posted Project"}
//     //         number={clientHome.cardState.projectCreated || 0}
//     //         icon={<Edit2 size={25} color="blue" />}
//     //       />
//     //       <DashboardCard
//     //         title={"Compeleted Project"}
//     //         number={clientHome.cardState.projectCompeleted || 0}
//     //         icon={<TickCircle size={25} />}
//     //         background={"linear-gradient(to right,#09CA62,#24995A)"}
//     //       />
//     //       <DashboardCard
//     //         title={"Investment"}
//     //         number={clientHome.cardState.investment}
//     //         icon={<Money size={25} color="green" />}
//     //         background={"linear-gradient(to right,#793FF5,#56349D)"}
//     //       />

//     //     </div> */
//   };
// }
