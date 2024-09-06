import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../../components/button/button";
import DefaultModal from "../../../../components/popup/modal";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import { ClientProjectType } from "../../../../context/projects/project_context";
import { useInviteFreelancer } from "../../hook/use_invite";
import { useAssignProjectType } from "../../hook/use_assign_project";
import { Fragment } from "react/jsx-runtime";

export const InvitationModal = ({
  project,
  assignProject,
}: {
  assignProject: useAssignProjectType;
  project: ClientProjectType;
}) => {
  const invite = useInviteFreelancer();
  return (
    <DefaultModal
      loading={invite.loading}
      showModal={assignProject.showInviteModal}
      setShowModal={assignProject.setShowInviteModal}
      modalId="invitation_modal"
      maxWidth="800px"
    >
      <div className="text-black-variant-1">
        <h6 className="mb-2">Invitation</h6>
        <div>
          <form
            onSubmit={(e) => invite.handleSearch(e)}
            className="col d-flex gap-4"
          >
            <div className="d-flex w-100 flex-row flex-sm-row gap-2 justify-content-between ">
              <input
                type="text"
                className="custom-input border-card rounded"
                placeholder="Search freelancer"
                value={invite.searchTerm}
                onChange={(e) => invite.setSearchTerm(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div style={{ maxWidth: "150px" }}>
              <ButtonPrimary
                title="search"
                type="submit"
                className="py-2"
                disabled={invite.searchLoading}
              />
            </div>
          </form>
        </div>
        {/* List of freelancer with invitation button */}
        {/* Search button to search freelancer */}
        <div>
          <table className="w-100 " style={{ minWidth: "500px" }}>
            <thead>
              <tr className="border-light-bottom ">
                <th className="p-2 py-3 ps-4">ID</th>
                <th className="p-2 py-3">FristName</th>
                <th className="p-2 py-3">LastName</th>
                <th className="p-2 py-3">Email</th>
                <th className="p-2 py-3">Level</th>
                <th className="p-2 py-3">{"action"} </th>
              </tr>
            </thead>
            <tbody className="">
              {invite.agentList.length > 0 ? (
                invite.agentList?.map((freelancer, index) => (
                  <Fragment key={index}>
                    {freelancer.is_verified && (
                      <tr key={index} className="border-light-bottom">
                        <td className="p-2 ps-4" style={{ maxWidth: "100px" }}>
                          {freelancer.id}
                        </td>
                        <td className="p-2">{freelancer.firstname}</td>
                        <td className="p-2">{freelancer.lastname}</td>
                        <td className="p-2">{freelancer.email}</td>
                        <td
                          className={` p-2 ${
                            freelancer.is_verified ? "text-green" : "text-error"
                          }
                      `}
                        >
                          <RoundedText
                            text={
                              freelancer.is_verified
                                ? "verified"
                                : "not verified"
                            }
                          />
                        </td>
                        <td className="p-2">
                          <div
                            style={{ maxWidth: "200px", height: "max-content" }}
                          >
                            <ButtonPrimaryOutline
                              onClick={() => invite.invite(project, freelancer)}
                              type="button"
                              title="Invite"
                              className="py-2"
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
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
      </div>
    </DefaultModal>
  );
};
