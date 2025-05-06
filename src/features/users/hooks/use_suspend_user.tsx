import { useNavigate } from "react-router-dom";
import customToast from "../../../components/custom_toast/custom_toast";
import { useAxios } from "../../../hooks/useAxios";

export const useSuspendUser = () => {
  const { loading, sendRequest } = useAxios({
    url: `/api/user/suspend/`,
    method: "DELETE",
    headers: true,
  });
  const navigator = useNavigate();
  const suspendUser = (id: string | number | undefined) => {
    sendRequest(
      {},
      () => {
        customToast({ message: "User supended success", type: "success" });
        navigator(-1);
      },
      (error) => {
        const message =
          (error.response?.data as { errors?: string; error?: string })
            ?.errors ||
          (error.response?.data as { errors?: string; error?: string })
            ?.error ||
          error.message;
        customToast({ message: message, type: "error" });
        console.log(error);
      },
      true,
      `/api/user/suspend/${id}`
    );
  };

  return {
    suspendUser,
    loading,
  };
};
