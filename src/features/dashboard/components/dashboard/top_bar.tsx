import { useEffect, useState } from "react";
import { Notification, SearchNormal1 } from "iconsax-react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../../../context/theme/theme_context";
import { UserAuthType } from "../../../../context/auth/auth_context";
import TopBarProfile from "./topbar_profile";
import TopBarMenu from "./topbar_menu";
import GITLogo from "../../../../components/logo/logo";

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
            <div className="text-blue-variant-1 mb-0 text-capitalize font-weight-400">
              <h6> {user?.firstname}'s</h6>
              <h6
                className="
  text-black-variant-2 mb-0"
              >
                DashBoard
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
              overflow: "hidden",
            }}
          >
            {showSearchbar && (
              <motion.div
                initial={{
                  x: "100px",
                }}
                animate={{
                  x: "0px",
                  scale: 1,
                }}
                transition={{
                  duration: 0.2,
                }}
                className={`dashboard-top-search col  d-none
            d-md-flex`}
              >
                <input
                  className={`bg-white-v-3 border-card rounded p-2
            text-black-variant-1
            w-100
            `}
                  type="text"
                  placeholder="search"
                />
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
          <div
            className={`
              icon-wrapper-primary
              bg-gray-secondary
              d-flex
              justify-content-center
              align-items-center
              rounded
              position-relative
              dash-board-top-notification
              ms-auto
              ms-md-0
              `}
            style={{
              minWidth: "40px",
            }}
          >
            <Notification
              size={18}
              className={`cursor-pointer`}
              onClick={() => {}}
              color={isDark ? "white" : "#333"}
            />

            <div
              className={`position-absolute
       rounded
        notification-wrapper
      `}
              style={{
                top: "100%",
                width: "200px",
                right: "-30px",
                zIndex: "30",
              }}
            >
              <div
                className={`
         bg-white
         border
         mt-3
         p-2
         `}
              >
                <p>Notification</p>
                <hr />
                <div
                  className={`
        d-flex justify-content-center
        `}
                >
                  <p className={`text-gray-secondary`}>No nofication yet</p>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          {/* CIRCULAR AVATAR */}
          <TopBarProfile user={user} />
          <TopBarMenu setShowNav={setShowNav} showNav={showNav} />
        </div>
        {/*  */}
      </div>
      {/* Search */}
      <div
        className={` dashboard-top-search-wrapper
position-absolute
 w-100
d-flex
justify-content-end
align-items-center
rounded
gap-1
px-2
d-flex
d-md-none
`}
      >
        {showSearchbar && (
          <motion.div
            initial={{
              x: "100px",
            }}
            animate={{
              x: "0px",
              scale: 1,
            }}
            transition={{
              duration: 0.2,
            }}
            className={`dashboard-top-search col`}
          >
            <input
              className={`bg-white-v-3 boarder rounded p-2
            text-black-variant-1 border-card
            w-100
            `}
              type="text"
              placeholder="search"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashBoardTopbar;
