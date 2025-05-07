import { Edit2, Money, TickCircle } from "iconsax-react";
import useManageFreelance from "../../hooks/use_manage_freelancer";
import { UserDashboardLoading } from "../../components/dash_board_skeleton";
import DashBoardProjectCard from "../../components/dashboard_card";
import CircularAvatar from "../../../../components/circularAvatar/circular_avatar";
import RecentProjectTable from "../../components/recent_project_table";
import { ClientProjectType } from "../../../../context/projects/project_context";
import ActionDropDown from "../../components/action_dropdown";
import { useEffect } from "react";

const ManageFreelancer = ({
  handleActionClick,
}: {
  handleActionClick: (action: string) => void;
}) => {
  const manageFreelancer = useManageFreelance();
  const iconSize = 24;
  useEffect(() => {
    document.getElementById("dashboard-main-container")?.scrollTo(0, 0);
  }, []);
  return (
    <div className="d-flex flex-column gap-4">
      {manageFreelancer.loading ? (
        <UserDashboardLoading />
      ) : (
        <>
          <div
            className="bg-white-v-4 border-card rounded px-4 py-4 d-flex flex-column gap-3
      text-black-variant-1
      "
          >
            <div className="d-flex justify-content-between  gap-4">
              <DashBoardProjectCard
                icon={
                  <div
                    className=" d-flex gap-5 align-items-center"
                    style={{ bottom: "0px", left: "30px" }}
                  >
                    <CircularAvatar
                      size={"50px"}
                      text={
                        manageFreelancer.user.firstname?.substring(0, 2) || "UK"
                      }
                      bgcolor="bg-white-v-4"
                    />
                  </div>
                }
                title={`${manageFreelancer.user.firstname} | ${manageFreelancer.user.user_type}`}
                subtitle={manageFreelancer.user.email || ""}
                verified={
                  manageFreelancer.user.is_verified
                    ? "verified"
                    : "not verified"
                }
              />
              {/* action */}
              <ActionDropDown handleActionClick={handleActionClick} />
            </div>
            <div className="border-light-bottom"></div>
            <div
              className="d-flex justify-content-between flex-sm-row flex-column gap-4"
              style={{ maxWidth: "900px" }}
            >
              <DashBoardProjectCard
                icon={<Edit2 size={iconSize} />}
                link=""
                subtitle={`${manageFreelancer.summary.projectCreated}`}
                title="Assigned Project"
              />
              <DashBoardProjectCard
                icon={<TickCircle size={iconSize} />}
                link=""
                title="Completed"
                subtitle={`${manageFreelancer.summary.projectCompeleted}`}
              />
              <DashBoardProjectCard
                icon={<Money size={iconSize} />}
                link=""
                title="Earned"
                subtitle={`${manageFreelancer.summary.investment}`}
              />
            </div>
          </div>

          {/* Table */}
          <div>
            <h5 className="mb-3 ms-0">Projects</h5>
            <RecentProjectTable
              data={
                (manageFreelancer.assignedProjects as ClientProjectType[]) || []
              }
            />
          </div>
        </>
      )}

      {/* user Detail */}
      <div>
        <h5 className="mb-3 ms-0">Profile</h5>
        <div className="d-flex flex-column gap-4 bg-white-v-4 rounded border-card p-3">
          <div className="col">
            <h6>Full Name</h6>
            <div className="d-flex gap-4 flex-wrap justify-content-between">
              <div className="d-flex flex-column gap-2 col">
                <label htmlFor="">First name</label>
                <p className="p-2 border-card rounded">
                  {manageFreelancer.user.firstname}
                </p>
              </div>

              <div className="d-flex flex-column gap-2 col ">
                <label htmlFor="">Last name</label>
                <p className="p-2 border-card rounded">
                  {manageFreelancer.user.lastname}
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <h6>Contact</h6>
            <div className="d-flex gap-4 flex-wrap justify-content-between">
              <div className="d-flex flex-column gap-2 col">
                <label htmlFor="">Email </label>
                <p className="p-2 border-card rounded">
                  {manageFreelancer.user.email}
                </p>
              </div>

              <div className="d-flex flex-column gap-2 col ">
                <label htmlFor="">Phone</label>
                <p className="p-2 border-card rounded">
                  {manageFreelancer.user.phone || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* end of parent */}
    </div>
  );
};

export default ManageFreelancer;
