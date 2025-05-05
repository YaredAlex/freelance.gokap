import ChangeAddress from "../../components/change_address";
import ChangePassword from "../../components/change_password";
import {
  useClientProfile,
  UseClientProfileType,
} from "../../hooks/client/use_client_profile";
import CircularAvatar from "../../../../components/circularAvatar/circular_avatar";
import { MdEdit } from "react-icons/md";
import ChangePhoneNumber from "../../components/change_phone";
import ChangeUserName from "../../components/change_name";
import ProfileSkeleton from "../agent/tmp_skeleton";

const ClientProfile = () => {
  const clientProfile = useClientProfile();

  if (clientProfile.loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="agent-profile-container">
      <div className="agent-profile-content">
        <div className="d-flex flex-column gap-4">
          {/* Profile */}

          <ChangeAddress profile={clientProfile} />
          <ChangeUserName userProfile={clientProfile} />
          {/* detail */}
          <ChangePassword clientProfile={clientProfile} />
          <ChangePhoneNumber clientProfile={clientProfile} />
        </div>
        {/* Left Column - Image, Specialties, Languages */}
        <LeftProfile clientProfile={clientProfile} />

        {/* Right Column - About, Education, Services */}
        <RightProfile clientProfile={clientProfile} />
      </div>
    </div>
  );
};

export default ClientProfile;

const LeftProfile = ({
  clientProfile,
}: {
  clientProfile: UseClientProfileType;
}) => {
  return (
    <div className="agent-profile-left-column">
      <div className="agent-avatar-container">
        {clientProfile?.avatar ? (
          <img
            src={clientProfile?.avatar || "/default-avatar.jpg"}
            alt="Professional Avatar"
            className="agent-avatar"
          />
        ) : (
          <CircularAvatar
            size={"200px"}
            text={clientProfile.name?.substring(0, 2) || ""}
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
            {clientProfile?.name || ""}
          </h2>
          <div
            className="icon-wrapper cursor-pointer position-absolute"
            style={{ right: "0", top: "0" }}
            onClick={() => clientProfile.setShowEditName(true)}
          >
            <MdEdit />
          </div>
        </div>
        <p className="agent-title">{clientProfile?.title || ""}</p>
        <div className="verified-badge">
          <span className="verified-icon">✓</span> Verified Client
        </div>
      </div>

      <div className="agent-location position-relative pt-4">
        <span className="location-icon">📍</span>
        <span>{clientProfile?.location || "Not set"}</span>
        <div
          className="icon-wrapper cursor-pointer position-absolute"
          style={{ right: "0", top: "0" }}
          onClick={() => clientProfile.setShowEditAddress(true)}
        >
          <MdEdit />
        </div>
      </div>

      <div className="agent-stats">
        <div className="agent-stat-item">
          <span className="rating-icon">⭐</span> {clientProfile?.rating || "0"}{" "}
          reviews
        </div>
      </div>
    </div>
  );
};

const RightProfile = ({
  clientProfile,
}: {
  clientProfile: UseClientProfileType;
}) => {
  return (
    <div className="agent-profile-right-column">
      <div className="right-section">
        <h3 className="section-title">Account Settings</h3>
        <div className="account-settings-container">
          {clientProfile?.accountSettings?.map((setting, index) => (
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
