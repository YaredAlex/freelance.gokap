import ChangeAddress from "../../components/change_address";
import ChangePassword from "../../components/change_password";

import CircularAvatar from "../../../../components/circularAvatar/circular_avatar";
import { MdEdit } from "react-icons/md";
import ChangePhoneNumber from "../../components/change_phone";
import ChangeUserName from "../../components/change_name";
import {
  useAdminProfile,
  useAdminProfileType,
} from "../../hooks/admin/use_admin_profile";
import ProfileSkeleton from "../../components/profile_skeleton";

const AdminProfile = () => {
  const adminProfile = useAdminProfile();

  if (adminProfile.loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="agent-profile-container">
      <div className="agent-profile-content">
        <div className="d-flex flex-column gap-4">
          {/* Profile */}
          <ChangeAddress profile={adminProfile} />
          <ChangeUserName userProfile={adminProfile} />
          {/* detail */}
          <ChangePassword adminProfile={adminProfile} />
          <ChangePhoneNumber adminProfile={adminProfile} />
        </div>
        {/* Left Column - Image, name */}
        <LeftProfile adminProfile={adminProfile} />

        {/* Right Column - settings */}
        <RightProfile adminProfile={adminProfile} />
      </div>
    </div>
  );
};

export default AdminProfile;

const LeftProfile = ({
  adminProfile,
}: {
  adminProfile: useAdminProfileType;
}) => {
  return (
    <div className="agent-profile-left-column">
      <div className="agent-avatar-container">
        {adminProfile?.avatar ? (
          <img
            src={adminProfile?.avatar || "/default-avatar.jpg"}
            alt="Professional Avatar"
            className="agent-avatar"
          />
        ) : (
          <CircularAvatar
            size={"200px"}
            text={adminProfile.name?.substring(0, 2) || ""}
            fontSize={3}
            fontcolor="green"
            bgcolor="white"
            className="border-card agent-avatar"
          />
        )}
      </div>

      <div className="agent-name-container">
        <div className="position-relative">
          <h2 className="agent-name text-capitalize">
            {adminProfile?.name || ""}
          </h2>
          <div
            className="icon-wrapper cursor-pointer position-absolute"
            style={{ right: "0", top: "0" }}
            onClick={() => adminProfile.setShowEditName(true)}
          >
            <MdEdit />
          </div>
        </div>
        <p className="agent-title">{adminProfile?.title || ""}</p>
        <div className="verified-badge">
          <span className="verified-icon">✓</span> Verified Admin
        </div>
      </div>

      <div className="agent-location position-relative pt-4">
        <span className="location-icon">📍</span>
        <span>{adminProfile?.location || "Not set"}</span>
        <div
          className="icon-wrapper cursor-pointer position-absolute"
          style={{ right: "0", top: "0" }}
          onClick={() => adminProfile.setShowEditAddress(true)}
        >
          <MdEdit />
        </div>
      </div>
    </div>
  );
};

const RightProfile = ({
  adminProfile,
}: {
  adminProfile: useAdminProfileType;
}) => {
  return (
    <div className="agent-profile-right-column">
      <div className="right-section">
        <h3 className="section-title">Account Settings</h3>
        <div className="account-settings-container">
          {adminProfile?.accountSettings?.map((setting, index) => (
            <div key={index} className="account-setting-item">
              <div className="setting-details">
                <h4>{setting.title}</h4>
                <p>{setting.info}</p>
              </div>
              {setting.action && (
                <button
                  className="setting-action-btn"
                  onClick={setting.onClick}
                >
                  {setting.action}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
