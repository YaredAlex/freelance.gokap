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
const Signup = () => {
  const icon_color = "#87A781";
  const path_to_signin = "/signin";

  const {
    showConfirm,
    setShowConfirm,
    setCheckedbox,
    showPassword,
    setShowPassword,
    setUserType,
    register,
    handleSubmit,
    onSubmit,
    loading,
    errors,
  } = useSignUp();
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
            <h5 className="text-black-variant-2 text-center font-weight-400">
              {GTexts.txt_choose_perference}
            </h5>
            <div className="text-black-variant-1 d-flex justify-content-around">
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
            </div>

            <div
              className="d-flex align-items-center
              gap-2"
            >
              <input
                type="checkbox"
                onChange={(e) => {
                  setCheckedbox(e.target.checked);
                }}
              />
              <label
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
        <span className="d-block d-md-none text-end text-black-variant-1 text-center">
          Already created account? <Link to={path_to_signin}>Sign in here</Link>{" "}
        </span>
      </form>
    </AuthLayout>
  );
};

export default Signup;
