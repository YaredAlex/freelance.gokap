import React from "react";
import CustomLoading from "../../components/loading_page/custom_loading";
import CustomToastContainer from "../../components/custom_toast/toast_container";
import "../../components/button/button.css";
import Footer from "../../components/footer/footer";
import GITLogo from "../../components/logo/logo";
import "./auth.css";
type AuthLayoutType = {
  loading: boolean;
  children: React.ReactNode;
  signlayout?: boolean;
};

const AuthLayout = ({
  loading,
  children,
  signlayout = true,
}: AuthLayoutType) => {
  return (
    <>
      <div>
        {loading && (
          <div className="text-black-variant-2 position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
            <CustomLoading />
          </div>
        )}
        <header
          className="px-2 bg-white-v-2 text-black-variant-1 py-2"
          style={{ height: "70px" }}
        >
          <div className="max-w-1200 mx-auto d-flex align-items-center d-flex align-items-center justify-content-between">
            <GITLogo />
            <div>{/* <User /> */}</div>
          </div>
        </header>
        <div
          style={{
            minHeight: "calc(100dvh - 60px)",
          }}
          className="d-flex 
      align-items-center justify-content-center bg-light-green
      "
        >
          <CustomToastContainer />
          {signlayout ? (
            <div
              className="bg-white-v-2
        d-flex 
        rounded 
        sign-wrapper
        my-3
        "
            >
              {" "}
              {children}
            </div>
          ) : (
            <div>{children}</div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AuthLayout;
