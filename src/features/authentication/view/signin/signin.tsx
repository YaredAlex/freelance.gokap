import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from "react-icons/fa6";
import ic_google from "../../../../assets/icon/google.png";
import { Link } from "react-router-dom";
import useSignIn from "../../hooks/signin/signin_hook";
import TextField from "../../../../components/inputField/text_field";
import AuthLayout from "../../auth_layout";
import { GTexts, emailRegex } from "../../../../util/string_constants";
import {
  ButtonFlexOutline,
  ButtonPrimary,
} from "../../../../components/button/button";

const Signin = () => {
  const path_to_signup: string = "/signup";
  const icon_color = "#87A781";
  const {
    showPassword,
    setShowPassword,
    register,
    errors,
    onSubmit,
    handleSubmit,
    loading,
  } = useSignIn();

  return (
    <AuthLayout loading={loading}>
      <div
        className="signup-right-side col p-4 d-none d-md-flex flex-column justify-content-center
            align-items-center"
      >
        <h1>{GTexts.signIn_greeting_title}</h1>
        <p className="text-center max-w-250 font-weight-400">
          {GTexts.signIn_greeting_subtitle}
        </p>

        <Link
          className="link
               btn-custom
               height-xsm
               text-md
               bg-transparent
               border
               cursor-pointer
               mt-4
               green-varient-2-hover
               mb-2
              "
          to={path_to_signup}
        >
          {GTexts.txt_sign_up}
        </Link>
      </div>

      {/* SIGN IN Right SIDE */}
      <form action="" onSubmit={handleSubmit(onSubmit)} className="col p-4">
        <div className="signin-left-side ">
          <h2
            style={{
              color: "var(--primary-green)",
              textAlign: "center",
              fontWeight: "bolder",
            }}
            className="mb-3 text-uppercase"
          >
            {" "}
            {GTexts.txt_sign_in}
          </h2>
          <h2 className="d-block d-md-none text-start text-black-variant-1 mb-3 text-center">
            Welcome to GIT
          </h2>
          <div
            className="input-wrapper
              d-flex flex-column gap-3
              "
          >
            <TextField
              type={"email"}
              surfix_icon={""}
              prefix_icon={<FaEnvelope color={icon_color} />}
              placeholder={"Your Email"}
              name="Email"
              register={register("email", {
                required: {
                  value: true,
                  message: "email is required",
                },
                pattern: {
                  value: emailRegex,
                  message: "invalid Email address",
                },
              })}
              error={errors.email?.message}
            />
            <TextField
              type={showPassword ? "text" : "password"}
              surfix_icon={
                showPassword ? (
                  <FaEye
                    color={icon_color}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    color={icon_color}
                  />
                )
              }
              placeholder={"Your Password"}
              prefix_icon={<FaKey color={icon_color} />}
              name={"password"}
              register={register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "minimun password is 6",
                },
              })}
              error={errors.password?.message}
            />
          </div>
          <span className="d-block mt-2 text-end text-black-variant-1 mb-2">
            <Link to={`/reset-password`} className="text-link">
              {GTexts.txt_forget_pwd}
            </Link>
          </span>
          <div className="mt-4 text-black-variant-1">
            <ButtonPrimary
              title={GTexts.txt_sign_in}
              type="submit"
              className="py-3 mb-2"
            />
            <div
              className="d-flex
              justify-content-center
              "
              style={{
                color: "var(--text-black-variant-1)",
              }}
            >
              <hr className="col" />
              <span className="px-2">OR</span>
              <hr className="col" />
            </div>
            <ButtonFlexOutline className="m-0 p-1">
              <div style={{ height: "42px" }}>
                <img
                  src={ic_google}
                  alt=""
                  style={{ objectFit: "contain", width: "min-content" }}
                />
              </div>
              <p className="mb-0 p-0 text-capitalize">
                {GTexts.txt_sign_in_with_google}
              </p>
            </ButtonFlexOutline>
          </div>
          <span className="d-block d-md-none mt-1 text-start text-black-variant-1 mb-3 text-center">
            {GTexts.txt_new_account}
            <Link to={path_to_signup}>sign up here</Link>
          </span>
        </div>
      </form>

      {/* END OF LEFT SIDE */}
    </AuthLayout>
  );
};

export default Signin;
