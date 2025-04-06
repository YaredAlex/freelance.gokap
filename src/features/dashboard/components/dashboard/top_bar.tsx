import { useEffect, useState } from "react";
import { SearchNormal1 } from "iconsax-react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../../../context/theme/theme_context";
import { UserAuthType } from "../../../../context/auth/auth_context";
import TopBarProfile from "./topbar_profile";
import TopBarMenu from "./topbar_menu";
import GITLogo from "../../../../components/logo/logo";
import SearchBar from "../../../../components/search_bar/search_bar";
import NotificationComponent from "../../../../components/notification/notification_bar";

type DBTopBar = {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  showNav: boolean;
  user: UserAuthType;
};
const DashBoardTopbar = ({ setShowNav, showNav, user }: DBTopBar) => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const { isDark } = useThemeContext();
  useEffect(() => {}, []);
  return (
    <div
      className="p-2 px-4
            d-flex align-items-start 
            position-fixed 
          dashboard-top-bar
          bg-white-v-2
          gap-2  flex-column border-light-bottom"
    >
      <div
        className={`d-flex align-items-center 
        gap-4 justify-content-between w-100`}
      >
        {/* Wrapping menu hamberger and name */}
        <div
          className={`d-flex gap-1 justify-content-between align-items-center`}
        >
          <div className="d-flex gap-4 align-items-center">
            <GITLogo />
            {/* Greeting */}
            <div className="text-blue-variant-1 mb-0 font-weight-400">
              <div className="d-flex gap-2">
                <h6 className="text-capitalize"> {user?.firstname}</h6>
                <h6 className="text-capitalize"> {user?.lastname}</h6>
              </div>
              <h6
                className="text-capitalize
  text-black-variant-2 mb-0"
              >
                {user.role}
              </h6>
            </div>
          </div>
        </div>
        {/* ICONS */}
        <div className={`d-flex gap-sm-3 gap-2 col`}>
          {/* Search */}
          <div
            className={`
              col
              d-flex
              justify-content-end
              align-items-center
              rounded
              gap-1

              `}
            style={{
              minWidth: "40px",
            }}
          >
            {showSearchbar && (
              <motion.div
                initial={{
                  x: "100px",
                }}
                animate={{
                  x: "0px",
                }}
                transition={{
                  duration: 0.2,
                }}
                className={`dashboard-top-search col  d-none
            d-md-flex`}
              >
                <SearchBar />
              </motion.div>
            )}
            <SearchNormal1
              size={18}
              color={isDark ? "white" : "#333"}
              className={`
      cursor-pointer
      `}
              onClick={() => setShowSearchbar(!showSearchbar)}
            />
          </div>
          {/* Notification */}
          <NotificationComponent notifications={[]} />
          {/* CIRCULAR AVATAR */}
          <TopBarProfile user={user} />
          <TopBarMenu setShowNav={setShowNav} showNav={showNav} />
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default DashBoardTopbar;
