import AccountWrapper from "../../components/account_wrapper";
import ChangeAddress from "../../components/change_address";
import ChangeClientName from "../../components/change_name";
import ChangePassword from "../../components/change_password";
import ChangeClientPhone from "../../components/change_phone";
import { useClientProfile } from "../../hooks/client/use_client_profile";

// thing about passing auth here ** important
const ProfileClient = () => {
  const clientProfile = useClientProfile();
  return (
    <div
      className={`mt-sm-3 mt-2 p-sm-3 px-1 text-black-variant-1  mx-auto max-w-1100`}
    >
      <h5 className="mb-3">Account Information</h5>

      <div className="d-flex flex-column gap-4">
        {/* Profile */}
        <AccountWrapper title={"Profile"} lists={clientProfile.profileList} />

        <ChangeAddress profile={clientProfile} />
        <ChangeClientName userProfile={clientProfile} />
        {/* Account */}
        <AccountWrapper title={"Account"} lists={clientProfile.accountList} />
        <ChangePassword clientProfile={clientProfile} />
        <ChangeClientPhone clientProfile={clientProfile} />
        {/* Devices */}
        <AccountWrapper title={"Device"} lists={clientProfile.deviceList} />
        {/* Danger zone */}
        {/* <AccountWrapper title={"Danger zone"} lists={AccountList} /> */}
      </div>
    </div>
  );
};

export default ProfileClient;
