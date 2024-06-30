import "./onboard.css";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import useOnBoard from "../../hooks/onboard/use_onboard";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ProgressIndicator from "./progress_indicator";
import CustomToastContainer from "../../../../components/custom_toast/toast_container";
import useGetProfile from "../../../../hooks/use_getprofile";
import { useEffect } from "react";

const LetsStart = () => {
  const onBoard = useOnBoard();
  const authContext = useAuthContext();
  const getProfile = useGetProfile();
  useEffect(() => {
    getProfile.getProfile();
  }, []);
  return (
    <>
      <CustomToastContainer />
      <div
        className="bg-white-v-3
  min-height-100vh 
  d-flex align-items-center 
  justify-content-center
  pb-1
  "
        style={{ overflow: "hidden" }}
      >
        {onBoard.loading ||
          (getProfile.loading && (
            <>
              <CustomLoadingSecondary title="loading" />
            </>
          ))}
        <div
          className="
        wrapper
        bg-white-v-4
        border-card rounded
        p-4
        rounded
        position-relative
        "
        >
          {/* Left svg onboard */}
          <div
            className={`
        onboard_left_img
        position-absolute`}
          />
          {/* Right svg onboard */}
          <div
            className={`
        onboard_right_img
        position-absolute`}
          />
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

            <ProgressIndicator
              numberOfProgress={onBoard.progresState.length}
              progress={onBoard.progresState}
            />

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
          <div
            className={`
        previous-next-btn-wrapper
        
        `}
          >
            {/* previous button */}
            {onBoard.currentPage > 0 && (
              <button
                className="
          text-black-variant-1
          p-1
          mt-4
          btn-custom-circular
          d-flex
          align-items-center
          justify-content-center
          text-white
          position-relative
          "
                style={{ zIndex: "10" }}
                onClick={onBoard.onPreviousPage}
              >
                <FaArrowLeft />
              </button>
            )}
            {/* Next Button */}

            <button
              className={`
          text-black-variant-1
          d-block
          p-1
          mt-4
          ms-auto
          btn-custom-circular
          d-flex
          align-items-center
          justify-content-center
          position-relative
          ${onBoard.gotoNext ? "text-white" : "text-gray"}
          cursor-not-allowed`}
              style={{ zIndex: 10 }}
              onClick={onBoard.onNextPage}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LetsStart;
