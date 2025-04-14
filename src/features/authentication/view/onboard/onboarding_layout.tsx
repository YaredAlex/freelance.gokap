import { ArrowLeft, ArrowRight } from "iconsax-react";
import {
  ButtonPrimary,
  ButtonPrimaryOutline,
} from "../../../../components/button/button";
import CustomToastContainer from "../../../../components/custom_toast/toast_container";
import { CustomLoadingSecondary } from "../../../../components/loading_page/custom_loading";
import GITLogo from "../../../../components/logo/logo";
import { useAuthContext } from "../../../../context/auth/auth_context";

type OnBoardingLayoutProp = {
  loading: boolean;
  children: React.ReactNode;
  onNext: () => void;
  onPrevious?: () => void;
};

const OnBoardingLayout = ({
  loading,
  children,
  onNext,
  onPrevious,
}: OnBoardingLayoutProp) => {
  const authContext = useAuthContext();
  return (
    <div>
      {loading && (
        <div className="text-black-variant-2 position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
          <CustomLoadingSecondary title="Processing" />
        </div>
      )}
      <CustomToastContainer />
      <header
        className="px-2 bg-white-v-5 text-black-variant-1 py-2 border-light-bottom"
        style={{ height: "70px" }}
      >
        <div className="max-w-1200 mx-auto d-flex align-items-center d-flex align-items-center justify-content-between">
          <GITLogo />
          {authContext.user?.id && (
            <button onClick={authContext.logout}>Logout</button>
          )}
        </div>
      </header>
      <div className="d-flex">
        <>{children}</>
      </div>
      {/* Next and previous button */}
      <div className="border-card-t pt-3">
        <div
          className="mx-auto d-flex max-w-1200 px-4 py-2 justify-content-between gap-4 flex-wrap "
          style={{
            maxHeight: "200px",
            height: "100%",
          }}
        >
          <ButtonPrimaryOutline
            title="Previous"
            type={"button"}
            className="btn-w-sm"
            children={
              <>
                <ArrowLeft />
                <span>Previous</span>
              </>
            }
            onClick={onPrevious}
          />
          <ButtonPrimary
            title="Next"
            type="button"
            className="btn-w-sm"
            children={
              <>
                <span>Next</span>
                <ArrowRight />
              </>
            }
            onClick={onNext}
          />
        </div>
      </div>
    </div>
  );
};

export default OnBoardingLayout;
