import { useForm } from "react-hook-form";
import { useAxios } from "../../../hooks/useAxios";
import customToast from "../../../components/custom_toast/custom_toast";

export const useChangeEducation = () => {
  const { loading, sendRequest } = useAxios({
    url: `/api/user/education/`,
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
      level: "",
      college: "",
      year: "",
    },
  });

  const changeUserEducation = (data: {
    level: string;
    college: string;
    year: string;
  }) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({
          message: "Education detail added success",
          type: "success",
        });
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
    changeUserEducation,
    loading,
    reset,
  };
};
