import { toast } from "react-toastify";

type ToastType = {
  message: string;
  type: "success" | "warning" | "error";
};
const customToast = ({ message, type }: ToastType) => {
  return toast(message, { type: type });
};

export default customToast;
