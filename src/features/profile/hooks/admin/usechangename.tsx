import { useForm } from "react-hook-form";
import { useAuthContext } from "../../../../context/auth/auth_context";
import { useAxios } from "../../../../hooks/useAxios";
import customToast from "../../../../components/custom_toast/custom_toast";

export const useChangeName = () => {
  const authContext = useAuthContext();
  const { loading, sendRequest } = useAxios({
    url: `/api/user/update/`,
    method: "PATCH",
    headers: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstname: authContext.user?.firstname,
      lastname: authContext.user?.lastname,
    },
  });

  const changeUserName = (
    data: { firstname?: string; lastname?: string },
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    //validate userinput
    sendRequest(
      data,
      () => {
        customToast({ message: "Name change success", type: "success" });
        setShow(false);
      },
      (error) => {
        const message = error.response?.data as { errors: string };
        customToast({
          message: message.errors,
          type: "error",
        });
        console.log(error);
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    changeUserName,
    loading,
    reset,
  };
};
