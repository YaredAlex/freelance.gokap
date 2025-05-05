import { useForm } from "react-hook-form";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";

export const useChangePhone = () => {
  const { loading, sendRequest } = useAxios({
    url: `/api/user/phone/`,
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
      phone: "",
    },
  });

  const changeUserPhone = (data: { phone: string }) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({ message: "phone change success", type: "success" });
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
    changeUserPhone,
    loading,
    reset,
  };
};
