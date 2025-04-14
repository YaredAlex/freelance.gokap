import { useAgentProfile } from "../../hooks/agent/use_agent_profile";
import "./tmp_profile.css";
import AgentProfileSkeleton from "./tmp_skeleton";
import { AgentProfileProp } from "../../hooks/agent/use_agent_profile";
import CircularAvatar from "../../../../components/circularAvatar/circular_avatar";
import { MdEdit } from "react-icons/md";
import ChangeAddress from "../../components/change_address";
import ChangePassword from "../../components/change_password";
import ChangeAbout from "../../components/change_about";
import ChangeLanguage from "../../components/change_language";
import ChangePhoneNumber from "../../components/change_phone";
import ChangeUserName from "../../components/change_name";
const AgentProfile = () => {
  const agentProfile = useAgentProfile();

  if (agentProfile.loading) {
    return <AgentProfileSkeleton />;
  }

  return (
    <div className="agent-profile-container">
      <div className="agent-profile-content">
        <div className="d-flex flex-column gap-4">
          {/* Profile */}

          <ChangeAddress profile={agentProfile} />
          <ChangeUserName userProfile={agentProfile} />
          {/* detail */}
          <ChangeAbout profile={agentProfile} />
          <ChangeLanguage profile={agentProfile} />
          {/* <ChangeAgentDetail agentDetail={agentDetail} /> */}

          <ChangePassword clientProfile={agentProfile} />
          <ChangePhoneNumber clientProfile={agentProfile} />
        </div>
        {/* Left Column - Image, Specialties, Languages */}
        <LeftProfile agentProfile={agentProfile} />

        {/* Right Column - About, Education, Services */}
        <RightProfile agentProfile={agentProfile} />
      </div>
    </div>
  );
};

export default AgentProfile;

const LeftProfile = ({ agentProfile }: { agentProfile: AgentProfileProp }) => {
  return (
    <div className="agent-profile-left-column">
      <div className="agent-avatar-container">
        {agentProfile?.avatar ? (
          <img
            src={agentProfile?.avatar || "/default-avatar.jpg"}
            alt="Professional Avatar"
            className="agent-avatar"
          />
        ) : (
          <CircularAvatar
            size={"200px"}
            text={agentProfile.name?.substring(0, 2) || ""}
            fontSize={3}
            fontcolor="green"
            bgcolor="white"
            className="border-card agent-avatar"
          />
        )}
      </div>

      <div className="agent-name-container">
        <h2 className="agent-name text-capitalize">
          {agentProfile?.name || ""}
        </h2>
        <p className="agent-title">{agentProfile?.title || ""}</p>
        <div className="verified-badge">
          <span className="verified-icon">✓</span> Verified Professional
        </div>
      </div>

      <div className="agent-location">
        <span className="location-icon">📍</span> {"Location "}
        {agentProfile?.location || "Not set"}
      </div>

      <div className="agent-stats">
        <div className="agent-stat-item">
          <span className="rating-icon">⭐</span> {agentProfile?.rating || "0"}{" "}
          reviews
        </div>
        <div className="agent-stat-item">
          <span className="experience-icon">🕒</span>{" "}
          {agentProfile?.experience || "Beginner"} experience
        </div>
        <div className="agent-stat-item">
          <span className="calendar-icon">📅</span> Available{" "}
          {agentProfile?.availability || "next week"}
        </div>
      </div>

      <div className="left-section">
        <div className="d-flex gap-4 justify-content-center align-items-center">
          <h3 className="section-title mb-0">Specialties</h3>
          <div
            className="icon-wrapper cursor-pointer"
            onClick={() => agentProfile.setShowEditSpeciality(true)}
          >
            <MdEdit />
          </div>
        </div>
        <div className="specialties-container">
          {agentProfile?.specialties?.map((specialty, index) => (
            <span key={index} className="specialty-tag">
              {specialty}
            </span>
          )) || (
            <>
              <span className="specialty-tag">Not set</span>
            </>
          )}
        </div>
      </div>

      <div className="left-section">
        <div className="d-flex gap-4 justify-content-center align-items-center">
          <h3 className="section-title mb-0">Language</h3>
          <div
            className="icon-wrapper cursor-pointer"
            onClick={() => agentProfile.setShowEditLanguage(true)}
          >
            <MdEdit />
          </div>
        </div>
        <div className="languages-container">
          {agentProfile?.languages?.map((language, index) => (
            <span key={index} className="language-tag">
              {language}
            </span>
          )) || (
            <>
              <span className="language-tag">Not set</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const RightProfile = ({ agentProfile }: { agentProfile: AgentProfileProp }) => {
  return (
    <div className="agent-profile-right-column">
      <div className="right-section about-section">
        <div className="d-flex gap-4 justify-content-center align-items-center">
          <h3 className="section-title mb-0">About</h3>
          <div
            className="icon-wrapper cursor-pointer"
            onClick={() => agentProfile.setShowEditAbout(true)}
          >
            <MdEdit />
          </div>
        </div>
        <p className="about-text">{agentProfile?.about || ""}</p>
      </div>

      <div className="right-section">
        <h3 className="section-title">Education</h3>
        <div className="education-container">
          {agentProfile?.education?.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-details">
                <h4>{edu?.degree}</h4>
                <p>{edu?.institution}</p>
              </div>
              <span className="education-year">{edu?.year}</span>
            </div>
          )) || (
            <>
              <div className="education-item">
                <div className="education-details">
                  <h4>B.S. Biology</h4>
                  <p>Stanford University</p>
                </div>
                <span className="education-year">2006</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="right-section">
        <h3 className="section-title">Services</h3>
        <div className="services-container">
          {agentProfile?.services?.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-details">
                <h4>{service.name}</h4>
                <p>{service.description}</p>
              </div>
              <div className="service-pricing">
                <span className="service-price">${service.price}</span>
                <span className="service-duration">{service.duration} min</span>
              </div>
            </div>
          )) || (
            <div className="service-item">
              <div className="service-details">
                <h4>General Consultation</h4>
                <p>
                  Comprehensive health assessment and personalized care plan.
                </p>
              </div>
              <div className="service-pricing">
                <span className="service-price">$150</span>
                <span className="service-duration">60 min</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="right-section">
        <h3 className="section-title">Account Settings</h3>
        <div className="account-settings-container">
          {agentProfile?.accountSettings?.map((setting, index) => (
            <div key={index} className="account-setting-item">
              <div className="setting-details">
                <h4>{setting.title}</h4>
                <p>{setting.info}</p>
              </div>
              {setting.action && (
                <button className="setting-action-btn">{setting.action}</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
