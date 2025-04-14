import useOnBoard from "../../hooks/onboard/use_onboard";
import { useAuthContext } from "../../../../context/auth/auth_context";
import useGetProfile from "../../../../hooks/use_getprofile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OnBoardingLayout from "./onboarding_layout";
import "./onboard.css";

const OnBoardPage = () => {
  const onBoard = useOnBoard();
  const authContext = useAuthContext();
  const getProfile = useGetProfile();
  const navigator = useNavigate();
  useEffect(() => {
    if (!authContext.isInitialized && !authContext.loading)
      authContext.initializeAuth(() => navigator("/signin?error=token"));
    if (authContext.isInitialized && authContext.user?.role !== "freelancer")
      navigator("/signin?error=unauthorized");
  }, [authContext.isInitialized]);

  return (
    <OnBoardingLayout
      loading={onBoard.loading || getProfile.loading}
      onNext={onBoard.onNextPage}
      onPrevious={
        onBoard.pageHistory.length > 0 ? onBoard.onPreviousPage : undefined
      }
    >
      <div
        className="bg-white-v-4
                  d-flex align-items-center 
                  justify-content-center
                  pb-1
                  "
        style={{ width: "100%" }}
      >
        <div
          className="
        wrapper
        p-4
        position-relative
        "
        >
          {/* Left svg onboard */}
          {/* <div
            className={`
        onboard_left_img
        position-absolute`}
          /> */}
          {/* Right svg onboard */}
          {/* <div
            className={`
        onboard_right_img
        position-absolute`}
          /> */}
          {/*  */}
          <div
            className="
      d-flex flex-column
        align-items-center
        position-relative
        mt-4
      "
          >
            <h1 className="text-black-variant-1">
              <span className={`font-weight-300`}>Hello,</span>
              <span className="text-green-secondary text-capitalize">
                {authContext.user?.firstname}
              </span>{" "}
            </h1>
            <h4
              className="text-md
        text-black-variant-2
        font-weight-400
        "
            >
              {onBoard.headerSubtitles[onBoard.currentPage]}
            </h4>

            {
              <div
                className={`
            w-100
            position-relative
            
            `}
                style={{ zIndex: 20 }}
              >
                {onBoard.pages[onBoard.currentPage].Page}
              </div>
            }
          </div>
        </div>
      </div>
    </OnBoardingLayout>
  );
};

export default OnBoardPage;
