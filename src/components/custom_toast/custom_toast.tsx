import { toast } from "react-toastify";

type ToastType = {
  message: string;
  type: "success" | "warning" | "error";
};
const customToast = ({ message, type }: ToastType) => {
  return toast(message, { type: type, hideProgressBar: true });
};

export default customToast;
