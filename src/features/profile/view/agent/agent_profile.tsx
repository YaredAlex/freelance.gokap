import AccountWrapper from "../../components/account_wrapper";
import ChangeAddress from "../../components/change_address";
import ChangeClientName from "../../components/change_name";
import ChangePassword from "../../components/change_password";
import ChangeClientPhone from "../../components/change_phone";
import useAgentDetail, {
  UseAgentDetailType,
} from "../../hooks/agent/use_agent_detail";
import { useAgentProfile } from "../../hooks/agent/use_agent_profile";
import ProfileSkeleton from "../../components/profile_wrapper_skeleton";
import RoundedText from "../../../../components/rounded_text/rounded_text";
import { Edit } from "iconsax-react";
import { ButtonFlexOutline } from "../../../../components/button/button";
import ChangeAgentDetail from "../../components/edit_detail";

// thing about passing auth here ** important
const ProfileAgent = () => {
  const agentProfile = useAgentProfile();
  const agentDetail = useAgentDetail();
  return (
    <div
      className={`mt-sm-3 mt-2 p-sm-3 px-1 text-black-variant-1  mx-auto max-w-1100`}
    >
      {agentDetail.loading ? (
        <>
          {" "}
          <ProfileSkeleton />
          <div className="my-4"></div>
          <ProfileSkeleton />
        </>
      ) : (
        <>
          <h5 className="mb-3">Account Information</h5>

          <div className="d-flex flex-column gap-4">
            {/* Profile */}
            <AccountWrapper
              title={"Profile"}
              lists={agentProfile.profileList}
            />

            <ChangeAddress profile={agentProfile} />
            <ChangeClientName userProfile={agentProfile} />
            {/* detail */}
            <Detail agentDetail={agentDetail} />
            <ChangeAgentDetail agentDetail={agentDetail} />
            {/* Account */}
            <AccountWrapper
              title={"Account"}
              lists={agentProfile.accountList}
            />
            <ChangePassword clientProfile={agentProfile} />
            <ChangeClientPhone clientProfile={agentProfile} />
            {/* Devices */}
            <AccountWrapper title={"Device"} lists={agentProfile.deviceList} />
            {/* Danger zone */}
            {/* <AccountWrapper title={"Danger zone"} lists={AccountList} /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileAgent;

const Detail = ({ agentDetail }: { agentDetail: UseAgentDetailType }) => {
  const lists = agentDetail.detailList;
  return (
    <div className="border-card  bg-white-v-4 rounded py-2 pb-3">
      {/* <h6 className="border-light-bottom px-4 py-3 m-0">{}</h6> */}
      {/*  */}
      {lists.map((list, index) => (
        <div
          key={index}
          className={`d-flex justify-content-between px-4 py-3 flex-column  gap-3 cursor-pointer ${
            index != lists.length - 1 ? "border-light-bottomm" : ""
          }`}
          onClick={list.onClick}
        >
          <h6 className="m-0 text-black-variant-1 text-capitalize">
            {list.title}
          </h6>
          {typeof list.value === "string" ? (
            <p className="m-0 text-black-variant-2">{list.value}</p>
          ) : (
            <div className="d-flex gap-4 flex-wrap">
              {list.value.map((val, index) => (
                <RoundedText text={val} key={index} />
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="px-2 d-block ms-auto" style={{ width: "max-content" }}>
        <ButtonFlexOutline
          className="m-0 py-2 px-4"
          onClick={() => {
            agentDetail.setShowEdit(true);
          }}
        >
          <div>
            <span className="text-sm">Edit</span> <Edit size={20} />
          </div>
        </ButtonFlexOutline>
      </div>
    </div>
  );
};
