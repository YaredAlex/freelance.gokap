import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { agentNavList, clientNavList } from "./nav_list";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useThemeContext } from "../../../../context/theme/theme_context";

type SideBarType = {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = ({ showNav, setShowNav }: SideBarType) => {
  //   const { sideNavState, navDispatch } = useContext(SideNavContext);
  const [activeLink, setActiveLink] = useState("home");
  const [navList, setNavList] = useState(clientNavList);
  const authContext = useAuthContext();
  const iconColor = useThemeContext().isDark ? "white" : "#567";
  useEffect(() => {
    const type = authContext.user.type;
    if (type === "client") setNavList(clientNavList);
    else if (type === "freelancer") {
      setNavList(agentNavList);
    }
  }, []);

  return (
    <div
      className={`
          dashboard-left
          text-black-variant-1
          bg-white-v-2
          pt-4
          ${showNav ? "translate-x" : ""}
        `}
      style={{ transition: "all 0.3s linear" }}
    >
      <div
        className={`
    d-flex
  flex-column
  align-items-start
  h-100
  `}
      >
        <ul className="nav-list">
          {navList.map((link, index) => (
            <li key={index} className="mb-3">
              <div className="" style={{ paddingLeft: "32px" }}>
                {/* <p
                  className="text-gray-secondary font-weight-400 
                text-start mb-0 pb-1"
                >
                  {link.title}
                </p> */}
                {link.child.map((item, index) => (
                  <div
                    key={index}
                    className={`d-flex align-items-center ps-1 mb-3`}
                    style={{
                      borderLeft:
                        activeLink === item.title
                          ? "5px solid #43AB7B"
                          : "none",
                    }}
                  >
                    {item.icon(iconColor)}
                    <Link
                      key={index}
                      className={`text-start text-black-variant-1 
                font-weight-500
                `}
                      to={`${item.to}`}
                      onClick={() => {
                        setActiveLink(item.title);
                        setShowNav(false);
                        // navDispatch({
                        //   type: ACTION_TYPE.CHANGE_SIDE_NAV,
                        //   payload: item.title,
                        // });
                      }}
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
        <div
          className={`
      hover-nav
      mt-3
      pb-3
      text-start
      text-gray-secondary
      w-100
      cursor-pointer
      `}
        ></div>
      </div>
    </div>
  );
};

export default SideBar;
