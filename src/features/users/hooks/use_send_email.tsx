import { useForm } from "react-hook-form";
import { useAxios } from "../../../hooks/useAxios";
import customToast from "../../../components/custom_toast/custom_toast";
import { useState } from "react";

export const useSendEmail = () => {
  const { loading, sendRequest } = useAxios({
    url: `/api/user/send_email/`,
    method: "POST",
    headers: true,
  });
  const [userEmail, setUserEmail] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      subject: "",
      body: "",
    },
  });

  const sendEmail = (data: {
    subject: string;
    body: string;
    email?: string;
  }) => {
    //validate userinput
    data["email"] = userEmail;
    console.log(data);
    sendRequest(
      data,
      () => {
        customToast({ message: "Email sent", type: "success" });
        reset();
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
    sendEmail,
    loading,
    reset,
    setUserEmail,
  };
};
