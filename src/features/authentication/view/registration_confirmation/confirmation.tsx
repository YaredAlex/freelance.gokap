import { useNavigate } from "react-router-dom";
import "./confirmation.css";
const RegistrationConfirmation = ({ username = "User" }) => {
  const navigator = useNavigate();
  const onLogin = () => {
    navigator("/signin");
  };
  return (
    <div className="registration-confirmation">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>Registration Complete!</h1>
        </div>

        <div className="confirmation-body">
          <p className="welcome-message">
            Congratulations, <span className="username">{username}</span>! Your
            account has been successfully created.
          </p>

          <div className="next-steps-container">
            <h2>Next Steps</h2>
            <ul className="steps-list">
              {/* <li>
                <div className="step-marker"></div>
                <p>Verify your email address using the link we sent you</p>
              </li> */}
              <li>
                <div className="step-marker"></div>
                <p>Complete your profile information</p>
              </li>
              <li>
                <div className="step-marker"></div>
                <p>Explore available features and services</p>
              </li>
            </ul>
          </div>

          <button className="login-button" onClick={onLogin}>
            Log In to Your Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
