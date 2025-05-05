import {
  MdLogout,
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { Link } from "react-router-dom";
import CircularAvatar from "../../../../components/circularAvatar/circular_avatar";
import {
  useAuthContext,
  UserAuthType,
} from "../../../../context/auth/auth_context";
import { useThemeContext } from "../../../../context/theme/theme_context";
import { useEffect, useRef, useState } from "react";
import "./topbar_profile.css";
const TopBarProfile = ({ user }: { user: UserAuthType }) => {
  const { setIsDark, isDark } = useThemeContext();
  const authContext = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const role = authContext.user?.role === "client" ? "client" : "agent";
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="topbar-profile" ref={menuRef}>
      <div className="topbar-avatar" onClick={() => setIsOpen(!isOpen)}>
        <CircularAvatar
          size={"40px"}
          text={user.firstname?.slice(0, 2) ?? ""}
          bgcolor={"bg-gray-secondary"}
          className={"cursor-pointer"}
        />
      </div>

      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="user-info">
              <p className="user-name">{user.firstname}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>

          <div className="menu-section">
            <div className="menu-item theme-selector">
              <MdSettings className="menu-icon" />
              <span>Theme</span>
              <div className="theme-options">
                <div
                  onClick={() => setIsDark(false)}
                  className={`theme-option ${!isDark ? "active" : ""}`}
                >
                  <MdOutlineLightMode />
                  <span>Light</span>
                </div>
                <div
                  onClick={() => setIsDark(true)}
                  className={`theme-option ${isDark ? "active" : ""}`}
                >
                  <MdOutlineDarkMode />
                  <span>Dark</span>
                </div>
              </div>
            </div>

            <Link to={`/${role}/dashboard/account`} className="menu-item">
              <MdPerson className="menu-icon" />
              <span>Profile</span>
            </Link>
          </div>

          <div className="menu-section">
            <button
              className="menu-item logout-button"
              onClick={authContext.logout}
            >
              <MdLogout className="menu-icon" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TopBarProfile;
