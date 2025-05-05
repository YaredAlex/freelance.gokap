import { useForm } from "react-hook-form";
import { useAxios } from "../../../hooks/useAxios";
import customToast from "../../../components/custom_toast/custom_toast";

export const useChangeAddress = () => {
  const addressAPI = `/api/user/address/`;
  const { loading, sendRequest } = useAxios({
    url: addressAPI,
    method: "PUT",
    headers: true,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      country: "",
      state: "",
      city: "",
      zipcode: "",
    },
  });

  const changeAddress = (data: {
    country: string;
    state: string;
    city: string;
    zipcode: string;
  }) => {
    //validate userinput
    sendRequest(
      {
        ...data,
        zip_code: data.zipcode,
      },
      () => {
        customToast({ message: "Address change success", type: "success" });
      },
      (error) => {
        const message: { error: string } = error.response?.data as {
          error: string;
        };
        console.log(error.response?.data);

        if (message?.error === "The user has no address")
          sendRequest(
            {
              ...data,
              zip_code: data.zipcode,
            },
            () => {
              customToast({
                message: "Address change success",
                type: "success",
              });
            },
            (error) => {
              customToast({ message: error.message, type: "error" });
            },
            true,
            addressAPI,
            "POST"
          );
        else {
          customToast({ message: error.message, type: "error" });
          console.log(error);
        }
      }
    );
  };

  return {
    register,
    handleSubmit,
    errors,
    changeAddress,
    loading,
    reset,
  };
};
