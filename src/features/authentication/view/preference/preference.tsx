import customToast from "../../../../components/custom_toast/custom_toast";
import { useAxios } from "../../../../hooks/useAxios";
import AuthLayout from "../../auth_layout";
import { FaUserTie, FaLaptopCode } from "react-icons/fa";
import "./preference.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../context/auth/auth_context";

const usePreference = () => {
  const { loading, sendRequest } = useAxios({
    url: "/api/user/role/",
    method: "PUT",
    headers: true,
  });
  const [selectedPreference, setSelectedPreference] = useState<string | null>(
    null
  );
  const navigator = useNavigate();
  const authContext = useAuthContext();
  const handlePreferenceClick = (preference: string) => {
    setSelectedPreference(preference);
  };
  const onContinue = (selectedPreference: string) => {
    sendRequest(
      { role: selectedPreference },
      (res) => {
        customToast({
          message: `${JSON.stringify(res.data.msg)}`,
          type: "success",
        });
        authContext.dispatchUser({
          type: "update_profile",
          payload: {
            ...authContext.user,
            role: res.data.user_type,
          },
        });
        if (selectedPreference.toLowerCase() == "client")
          navigator("/client/dashboard");
        else navigator("/freelancer/dashboard");
      },
      (error) => {
        const message = JSON.parse(error?.request?.response);
        customToast({
          message: `${JSON.stringify(message.errors)}`,
          type: "error",
        });
      }
    );
  };
  const handleContinueClick = () => {
    if (selectedPreference) {
      onContinue(selectedPreference);
    } else {
      customToast({
        message: "Please select a preference to continue",
        type: "error",
      });
    }
  };
  return {
    loading,
    onContinue,
    handleContinueClick,
    handlePreferenceClick,
    selectedPreference,
  };
};

const UserPreference = () => {
  const preferenceController = usePreference();

  return (
    <AuthLayout loading={preferenceController.loading} signlayout={false}>
      <div className="preference-container">
        <h2 className="preference-heading">Select Your Preference</h2>
        <p className="preference-subheading">
          Please select your preference to continue.
        </p>
        <div className="preference-options">
          <button
            className={`preference-button ${
              preferenceController.selectedPreference === "client"
                ? "active"
                : ""
            }`}
            onClick={() => preferenceController.handlePreferenceClick("client")}
          >
            <div className="preference-icon">
              <FaUserTie size={24} />
            </div>
            <p className="preference-label">Client</p>
          </button>
          <button
            className={`preference-button ${
              preferenceController.selectedPreference === "freelancer"
                ? "active"
                : ""
            }`}
            onClick={() =>
              preferenceController.handlePreferenceClick("freelancer")
            }
          >
            <div className="preference-icon">
              <FaLaptopCode size={24} />
            </div>
            <p className="preference-label">Freelancer</p>
          </button>
        </div>
        <button
          className="continue-button"
          type="button"
          onClick={preferenceController.handleContinueClick}
        >
          Continue
        </button>
      </div>
    </AuthLayout>
  );
};

export default UserPreference;
