import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";

export const useChangePassword = () => {
  const { loading, sendRequest } = useAxios({
    url: "/api/user/change_password/",
    method: "POST",
    headers: true,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      cnfpassword: "",
      currentPassword: "",
    },
  });

  //Change password
  const changePassword = (data: { password: string; cnfpassword: string }) => {
    sendRequest(
      data,
      () => {
        customToast({ message: "Password Changed", type: "success" });
        reset();
      },
      (error) => {
        console.log(error);
        customToast({ message: error.message, type: "error" });
      }
    );
  };

  return {
    loading,
    changePassword,
    register,
    handleSubmit,
    errors,
    reset,
  };
};
