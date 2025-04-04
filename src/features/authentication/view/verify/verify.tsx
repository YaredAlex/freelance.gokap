import { Link } from "react-router-dom";
import verifyImg from "../../../../assets/img/verify_user.png";
import verifiedImg from "../../../../assets/img/verified_user.png";
import useVerify from "../../hooks/verify/verify_hook";
import { ButtonPrimary } from "../../../../components/button/button";
import AuthLayout from "../../auth_layout";
import "./verify.css";
const VerifyUser = () => {
  const verify = useVerify();

  return (
    <AuthLayout loading={verify.loading} signlayout={false}>
      <div className="verify-container">
        <div className="verify-card">
          {verify.verified ? (
            <div className="verify-content">
              <div className="verify-image-container">
                <img
                  src={verifyImg}
                  alt="Email sent"
                  className="verify-image pulse-animation"
                />
              </div>
              <div className="verify-text-container">
                <h2 className="verify-title">Verify Your Email</h2>
                <div className="envelope-icon">
                  <span className="mail-icon"></span>
                </div>
                <p className="verify-message">
                  Please check your mailbox! We've sent a verification link to{" "}
                  <strong className="verify-email">{verify.email}</strong>
                </p>
                <Link to="/signin" className="signin-button">
                  Continue to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <div className="verify-content">
              <div className="verify-image-container">
                <img
                  src={verifiedImg}
                  alt="Verification needed"
                  className="verify-image bounce-animation"
                />
              </div>
              <div className="verify-text-container">
                <h2 className="verify-title">You're Almost There!</h2>
                <p className="verify-message">
                  One quick step to get started. Please enter your email address
                  below to receive a verification link.
                </p>
                <form
                  onSubmit={verify.sendVerification}
                  className="verify-form"
                >
                  <div className="input-container">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="email-input"
                      value={verify.email ?? ""}
                      onChange={(e) => verify.setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <ButtonPrimary
                    type="submit"
                    title="Send Verification Link"
                    className="verify-button"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};
export default VerifyUser;
