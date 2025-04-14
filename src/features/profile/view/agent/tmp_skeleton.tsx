// AgentProfileSkeleton.jsx
import "./tmp_skeleton.css";
const AgentProfileSkeleton = () => {
  return (
    <div className="agent-profile-container">
      <div className="skeleton-header"></div>

      <div className="agent-profile-content">
        {/* Left Column Skeleton */}
        <div className="agent-profile-left-column skeleton-left-column">
          <div className="skeleton-avatar"></div>

          <div className="skeleton-text-center skeleton-name"></div>
          <div className="skeleton-text-center skeleton-title"></div>
          <div className="skeleton-badge"></div>

          <div className="skeleton-divider"></div>

          <div className="skeleton-stat"></div>
          <div className="skeleton-stat"></div>
          <div className="skeleton-stat"></div>

          <div className="skeleton-divider"></div>

          <div className="skeleton-subtitle"></div>
          <div className="skeleton-tags-container">
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
          </div>

          <div className="skeleton-subtitle"></div>
          <div className="skeleton-tags-container">
            <div className="skeleton-tag"></div>
            <div className="skeleton-tag"></div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="agent-profile-right-column">
          <div className="skeleton-section">
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>

          <div className="skeleton-section">
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-education">
              <div className="skeleton-education-left">
                <div className="skeleton-text-small"></div>
                <div className="skeleton-text-xsmall"></div>
              </div>
              <div className="skeleton-education-right"></div>
            </div>
            <div className="skeleton-education">
              <div className="skeleton-education-left">
                <div className="skeleton-text-small"></div>
                <div className="skeleton-text-xsmall"></div>
              </div>
              <div className="skeleton-education-right"></div>
            </div>
          </div>

          <div className="skeleton-section">
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-service">
              <div className="skeleton-service-left">
                <div className="skeleton-text-small"></div>
                <div className="skeleton-text-xsmall"></div>
              </div>
              <div className="skeleton-service-right">
                <div className="skeleton-price"></div>
                <div className="skeleton-duration"></div>
              </div>
            </div>
            <div className="skeleton-service">
              <div className="skeleton-service-left">
                <div className="skeleton-text-small"></div>
                <div className="skeleton-text-xsmall"></div>
              </div>
              <div className="skeleton-service-right">
                <div className="skeleton-price"></div>
                <div className="skeleton-duration"></div>
              </div>
            </div>
          </div>

          <div className="skeleton-section">
            <div className="skeleton-subtitle"></div>
            <div className="skeleton-setting">
              <div className="skeleton-setting-left">
                <div className="skeleton-text-small"></div>
                <div className="skeleton-text-xsmall"></div>
              </div>
              <div className="skeleton-button"></div>
            </div>
            <div className="skeleton-setting">
              <div className="skeleton-setting-left">
                <div className="skeleton-text-small"></div>
                <div className="skeleton-text-xsmall"></div>
              </div>
              <div className="skeleton-button"></div>
            </div>
            <div className="skeleton-setting">
              <div className="skeleton-setting-left">
                <div className="skeleton-text-small"></div>
                <div className="skeleton-text-xsmall"></div>
              </div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfileSkeleton;
