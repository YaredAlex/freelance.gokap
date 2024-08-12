import AccountWrapper from "../../components/account_wrapper";
import ChangeAddress from "../../components/change_address";
import ChangeClientName from "../../components/change_name";
import ChangePassword from "../../components/change_password";
import ChangeClientPhone from "../../components/change_phone";
import ProfileSkeleton from "../../components/profile_wrapper_skeleton";
import { useAdminProfile } from "../../hooks/admin/use_admin_profile";

// thing about passing auth here ** important
const ProfileAdmin = () => {
  const adminProfile = useAdminProfile();
  return (
    <div
      className={`mt-sm-3 mt-2 p-sm-3 px-1 text-black-variant-1  mx-auto max-w-1100`}
    >
      <h5 className="mb-3">Account Information</h5>
      {adminProfile.addressLoading ? (
        <>
          <div className="d-flex flex-column gap-4 mb-4">
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
          </div>
        </>
      ) : (
        <span></span>
      )}
      <div className="d-flex flex-column gap-4">
        {/* Profile */}
        <AccountWrapper title={"Profile"} lists={adminProfile.profileList} />

        <ChangeAddress profile={adminProfile} />
        <ChangeClientName userProfile={adminProfile} />
        {/* Account */}
        <AccountWrapper title={"Account"} lists={adminProfile.accountList} />
        <ChangePassword clientProfile={adminProfile} />
        <ChangeClientPhone clientProfile={adminProfile} />
        {/* Devices */}
        <AccountWrapper title={"Device"} lists={adminProfile.deviceList} />
        {/* Danger zone */}
        {/* <AccountWrapper title={"Danger zone"} lists={AccountList} /> */}
      </div>
    </div>
  );
};

export default ProfileAdmin;
