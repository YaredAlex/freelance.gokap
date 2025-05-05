import { useForm } from "react-hook-form";
import { useAxios } from "../../../hooks/useAxios";
import customToast from "../../../components/custom_toast/custom_toast";

export const useChangeService = () => {
  const { loading, sendRequest } = useAxios({
    url: `/api/user/services/`,
    method: "POST",
    headers: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      service: "",
      hourly_rate: "",
    },
  });

  const changeService = (data: { service: string; hourly_rate: string }) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({ message: "Service added success", type: "success" });
      },
      (error) => {
        customToast({ message: error.message, type: "error" });
        console.log(error);
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    changeService,
    loading,
    reset,
  };
};
