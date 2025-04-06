import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { agentNavList, clientNavList } from "./nav_list";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useThemeContext } from "../../../../context/theme/theme_context";
import "./side_bar.css"; // Importing the new CSS file for styling

type SideBarType = {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = ({ showNav, setShowNav }: SideBarType) => {
  const [activeLink, setActiveLink] = useState("home");
  const [navList, setNavList] = useState(clientNavList);
  const authContext = useAuthContext();
  const iconColor = useThemeContext().isDark ? "white" : "#567";

  useEffect(() => {
    const type = authContext.user?.role ?? "none";
    if (type.toLocaleLowerCase() === "client") setNavList(clientNavList);
    else if (type.toLocaleLowerCase() === "freelancer") {
      setNavList(agentNavList);
    } else setNavList([]);
  }, [authContext.user?.role]);

  return (
    <div
      className={`side-bar-container
         dashboard-left
          text-black-variant-1
          bg-white-v-2
        ${showNav ? "translate-x" : ""}`}
      style={{ transition: "all 0.3s linear" }}
    >
      <div className="side-bar-wrapper">
        {navList.map((link, index) => (
          <div key={index} className="nav-group">
            <h4 className="nav-group-title">{link.title}</h4>
            <ul className="nav-list">
              {link.child.map((item, childIndex) => (
                <li key={childIndex}>
                  <Link
                    to={item.to}
                    onClick={() => {
                      setActiveLink(item.title);
                      setShowNav(false);
                    }}
                    className={`nav-item ${
                      activeLink === item.title ? "active" : ""
                    }`}
                  >
                    {item.icon(iconColor)}
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
