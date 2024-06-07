import { Link } from "react-router-dom";
import { MdSupportAgent } from "react-icons/md";
import { Box, FolderAdd, Home, Money, User } from "iconsax-react";
import { useState } from "react";

type SideBarType = {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
};
const SideBar = ({ showNav, setShowNav }: SideBarType) => {
  //   const { sideNavState, navDispatch } = useContext(SideNavContext);
  const [activeLink, setActiveLink] = useState("home");
  const navList = [
    {
      title: "Dashboard",
      child: [
        {
          title: "Dashboard",
          to: ``,
          icon: (color: string) => <Home color={color} variant="Bold" />,
        },
      ],
    },
    {
      title: "Projects",
      child: [
        {
          title: "All Projects",
          to: `projects`,
          icon: (color: string) => <Box color={color} variant="Bold" />,
        },
        {
          title: "Create Project",
          to: `projects/create`,
          icon: (color: string) => <FolderAdd color={color} variant="Bold" />,
        },
      ],
    },
    {
      title: "Account",
      child: [
        {
          title: "Account",
          to: `account`,
          icon: (color: string) => <User color={color} variant="Bold" />,
        },
        {
          title: "Invoice",
          to: ``,
          icon: (color: string) => <Money color={color} variant="Bold" />,
        },
      ],
    },
    {
      title: "Help Line",
      child: [
        {
          title: "support",
          to: ``,
          icon: (color: string) => <MdSupportAgent color={color} size={22} />,
        },
      ],
    },
  ];
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
                    {item.icon("#567")}
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
