import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import CircularAvatar from "../../../../components/circularAvatar/circular_avatar";
import { UserAuthType } from "../../../../context/auth/auth_context";
import { useThemeContext } from "../../../../context/theme/theme_context";

const TopBarProfile = ({ user }: { user: UserAuthType }) => {
  const { setIsDark, isDark } = useThemeContext();

  return (
    <div
      className={`position-relative
      dash-board-top-profile
      `}
      style={{ zIndex: "30" }}
    >
      <CircularAvatar
        size={40}
        text={user.firstname.slice(0, 2)}
        bgcolor={"bg-gray-secondary"}
        className={"cursor-pointer"}
      />
      <div
        className={`position-absolute
           rounded
          profile-wrapper
        `}
        style={{
          top: "100%",
          width: "200px",
          right: "-30px",
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
          <p className="mb-0">{user.firstname}</p>
          <p>{user?.email}</p>
          <hr />
          <div
            className={`
          d-flex 
          flex-column
          `}
          >
            <div>
              Theme
              <ul className="theme ul">
                <li
                  onClick={() => {
                    setIsDark(false);
                  }}
                  className={`${isDark ? "" : "active"} cursor-pointer`}
                >
                  Light
                </li>
                <li
                  onClick={() => {
                    setIsDark(true);
                  }}
                  className={`${isDark ? "active" : ""} cursor-pointer`}
                >
                  Dark
                </li>
              </ul>
            </div>
            <Link className={`text-gray-secondary p-1`} to={`account`}>
              Profile
            </Link>
            <hr />
            <Link to={"/signin"} className={`text-gray-secondary p-1`}>
              {" "}
              <MdLogout />
              Logout
            </Link>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopBarProfile;
