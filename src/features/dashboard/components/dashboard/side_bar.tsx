import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();
  // const [activeLink, setActiveLink] = useState('');

  // Define route patterns, some static and some with dynamic params
  const routePatterns = [
    {
      pattern: /^\/client\/dashboard$/,
      link: "/client/dashboard",
      title: "Dashboard",
    },
    {
      pattern: /^\/client\/dashboard\/profile$/,
      link: "/client/dashboard/profile",
      title: "Profile",
    },
    {
      pattern: /^\/client\/dashboard\/projects\/create$/,
      link: "/client/dashboard/projects/create",
      title: "Create Project",
    },
    {
      pattern: /^\/client\/dashboard\/projects$/,
      link: "/client/dashboard/projects",
      title: "All Projects",
    },
    {
      pattern: /^\/client\/dashboard\/account$/,
      link: "/client/dashboard/account",
      title: "Account",
    },
    {
      pattern: /^\/client\/dashboard\/invoice$/,
      link: "/client/dashboard/invoice",
      title: "Invoice",
    },
    {
      pattern: /^\/client\/dashboard\/support$/,
      link: "/client/dashboard/support",
      title: "Support",
    },
    {
      pattern: /^\/client\/dashboard\/projects\/status\/[^/]+$/,
      link: "/client/dashboard/projects/status/:id",
      title: "Project",
    }, // dynamic route
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    // Check if URL starts with /client or /freelancer
    const isClientOrFreelancer = /^\/(client|freelancer)\b/.test(currentPath);

    if (isClientOrFreelancer) {
      const matched = routePatterns.find((route) =>
        route.pattern.test(currentPath)
      );
      if (matched) {
        setActiveLink(matched.title);
        console.log("Active Link:", matched.link);
      } else {
        setActiveLink("Dashboard");
        console.log("No strict match found.");
      }
    } else {
      setActiveLink("");
      console.log("Route doesn't start with /client or /freelancer");
    }
  }, [location]);

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
            <h4 className="nav-group-title text-black-variant-2 font-weight-500">
              {link.title}
            </h4>
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
