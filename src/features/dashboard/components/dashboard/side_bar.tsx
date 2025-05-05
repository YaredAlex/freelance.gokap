import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useThemeContext } from "../../../../context/theme/theme_context";
import "./side_bar.css";
import { adminNavList } from "./nav_list";

type SideBarType = {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = ({ showNav, setShowNav }: SideBarType) => {
  const [activeLink, setActiveLink] = useState("projects");
  const [navList, setNavList] = useState(adminNavList);
  const authContext = useAuthContext();
  const iconColor = useThemeContext().isDark ? "white" : "#567";
  const navigate = useNavigate();
  useEffect(() => {
    const role = authContext.user?.role;
    if (role && role.toLocaleLowerCase() !== "superuser") {
      navigate("/signin");
    }
    setNavList(adminNavList);
  }, []);

  const location = useLocation();
  const routePatterns = [
    {
      pattern: /^\/admin\/dashboard\/?$/,
      link: "/admin/dashboard",
      title: "Projects",
    },
    {
      pattern: /^\/admin\/dashboard\/account\/?$/,
      link: "/admin/dashboard/account",
      title: "Account",
    },
    {
      pattern: /^\/admin\/dashboard\/invoice$/,
      link: "/admin/dashboard/invoice",
      title: "Invoice",
    },
    {
      pattern: /^\/admin\/dashboard\/clients\/[^/]+$/,
      link: "/admin/dashboard/clients/:id",
      title: "Manage Client",
    },
    {
      pattern: /^\/admin\/dashboard\/clients\/?$/,
      link: "/admin/dashboard/clients",
      title: "Users",
    },
    {
      pattern: /^\/admin\/dashboard\/freelancers\/[^/]+$/,
      link: "/admin/dashboard/freelancers/:id",
      title: "Manage Freelancer",
    },
    {
      pattern: /^\/admin\/dashboard\/freelancers\/?$/,
      link: "/admin/dashboard/freelancers",
      title: "Freelancers",
    },
    {
      pattern: /^\/admin\/dashboard\/assign\/[^/]+$/,
      link: "/admin/dashboard/assign/:id",
      title: "Assign Project",
    },
    {
      pattern: /^\/admin\/dashboard\/project\/status\/[^/]+$/,
      link: "/admin/dashboard/project/status/:id",
      title: "Project Status",
    },
  ];

  useEffect(() => {
    const currentPath = location.pathname;

    const matchedRoute = routePatterns.find(({ pattern }) =>
      pattern.test(currentPath)
    );
    if (matchedRoute) {
      setActiveLink(matchedRoute.title);
    } else {
      setActiveLink("");
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
