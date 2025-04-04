import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import TextField from "../../../../components/inputField/text_field.tsx";
import useSignUp from "../../hooks/signup/signup_hook.tsx";
import { GTexts, emailRegex } from "../../../../util/string_constants.ts";
import AuthLayout from "../../auth_layout.tsx";
import {
  ButtonFlexOutline,
  ButtonPrimary,
} from "../../../../components/button/button.tsx";
import ic_google from "../../../../assets/icon/google.png";
import { useEffect } from "react";
import RegistrationConfirmation from "../registration_confirmation/confirmation.tsx";

const Signup = () => {
  const icon_color = "#87A781";
  const path_to_signin = "/signin";
  const GoogleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const {
    showConfirm,
    setShowConfirm,
    setCheckedbox,
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    signUpWithGoogle,
    onSubmit,
    loading,
    errors,
    showRegistrationConfirmation,
  } = useSignUp();

  // On component mount, check if OAuth returned an access token/id token in URL hash.
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      // Use id_token to get user info; adjust parameter if needed.
      const idToken = params.get("id_token") || params.get("access_token");
      if (idToken) {
        try {
          // Clear the hash from the URL if needed.
          signUpWithGoogle(idToken);
          window.history.replaceState(null, "", window.location.pathname);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    }
  }, []);

  // Function to trigger Google OAuth2.0 signup.
  const handleGoogleSignUp = () => {
    const callbackUrl = window.location.origin + "/signup";
    const googleClientId = GoogleClientID;
    // Using response_type with both token and id_token to retrieve user info.
    const targetUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };

  if (showRegistrationConfirmation)
    return <RegistrationConfirmation username="show user name" />;

  return (
    <AuthLayout loading={loading}>
      <div
        className="signup-right-side col p-4 d-none d-md-flex flex-column justify-content-center
          align-items-center text-sm"
      >
        <h1 className="text-center">{GTexts.signup_greeting_title}</h1>
        <p
          style={{
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          {GTexts.signup_greeting_subtitle}
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
               mb-2 text-uppercase
              "
          to={path_to_signin}
        >
          {GTexts.txt_sign_in}
        </Link>
      </div>

      {/* SIGN UP Right SIDE */}
      <form action="" onSubmit={handleSubmit(onSubmit)} className="col p-4">
        <div
          className="signup-left-side 
          
          "
        >
          <h2
            style={{
              color: "var(--primary-green)",
              textAlign: "center",
              fontWeight: "bolder",
            }}
            className="mb-4"
          >
            {GTexts.txt_sign_up}
          </h2>
          <div
            className="input-wrapper
            d-flex flex-column gap-3
            "
          >
            {/* First and Last Name */}
            <div className="d-flex gap-2">
              <TextField
                type={"text"}
                surfix_icon={""}
                prefix_icon={<FaUser color={icon_color} />}
                placeholder={"First Name"}
                name={"First Name"}
                register={register("firstname", {
                  required: "First name is required",
                  minLength: {
                    value: 3,
                    message: "minimum length should be 3",
                  },
                })}
                error={errors.firstname?.message}
              />
              {/* Last Name */}
              <TextField
                type={"text"}
                surfix_icon={""}
                prefix_icon={<FaUser color={icon_color} />}
                placeholder={"Last name"}
                name={"Last Name"}
                register={register("lastname", {
                  required: "Last name is required",
                  minLength: {
                    value: 3,
                    message: "minimum length should be 3",
                  },
                })}
                error={errors.lastname?.message}
              />
            </div>
            {/* End of first and last name */}
            <TextField
              type={"email"}
              surfix_icon={""}
              prefix_icon={<FaEnvelope color={icon_color} />}
              placeholder={"Your Email"}
              name={"Email"}
              register={register("email", {
                required: "email is required",
                pattern: {
                  value: emailRegex,
                  message: "",
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
              placeholder={"Your password"}
              prefix_icon={<FaKey color={icon_color} />}
              name={"Password"}
              register={register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "minimun length should be 6",
                },
              })}
              error={errors.password?.message}
            />
            <TextField
              type={showConfirm ? "text" : "password"}
              surfix_icon={
                showConfirm ? (
                  <FaEye
                    color={icon_color}
                    onClick={() => setShowConfirm(!showConfirm)}
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setShowConfirm(!showConfirm)}
                    color={icon_color}
                  />
                )
              }
              placeholder={"Confirm Password"}
              prefix_icon={<FaKey color={icon_color} />}
              name={"confirmPassword"}
              register={register("cnfpassword", {
                required: "please confirm your password",
                minLength: {
                  value: 6,
                  message: "minimun length should be 6",
                },
              })}
              error={errors.cnfpassword?.message}
            />
            {/* User role option */}
            {/* <h5 className="text-black-variant-2 text-center font-weight-400">
              {GTexts.txt_choose_perference}
            </h5> */}

            {/* <div className="text-black-variant-1 d-flex justify-content-around">
              <div>
                <input
                  type="radio"
                  value="client"
                  name="type"
                  id="client"
                  onChange={(e) => setUserType(e.target.value)}
                />{" "}
                <label htmlFor="client">Client</label>
              </div>
              or
              <div>
                <input
                  type="radio"
                  value="freelancer"
                  name="type"
                  id="freelancer"
                  onChange={(e) => setUserType(e.target.value)}
                />{" "}
                <label htmlFor="freelancer">Freelancer</label>
              </div>
            </div> */}
            {/* checkbox */}
            <div
              className="d-flex align-items-center
              gap-2"
            >
              <input
                type="checkbox"
                id="terms-and-condition"
                onChange={(e) => {
                  setCheckedbox(e.target.checked);
                }}
              />
              <label
                htmlFor="terms-and-condition"
                style={{
                  color: "var(--text-black-variant-1)",
                }}
              >
                {" "}
                i agree <a>term & condition</a>
              </label>
            </div>
          </div>

          <ButtonPrimary title="Sign up" type="submit" className="mt-3" />
          <div
            className="d-flex
            justify-content-center
            px-4
            "
            style={{
              color: "var(--text-black-variant-1)",
            }}
          >
            <hr className="col" />
            <span className="px-2">OR</span>
            <hr className="col" />
          </div>
          <ButtonFlexOutline className="m-0 p-1" onClick={handleGoogleSignUp}>
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
        <span className="d-block d-md-none text-end text-black-variant-1 text-center">
          Already created account? <Link to={path_to_signin}>Sign in here</Link>{" "}
        </span>
      </form>
    </AuthLayout>
  );
};

export default Signup;
