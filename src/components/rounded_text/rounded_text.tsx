import { FaCircle } from "react-icons/fa6";

const RoundedText = ({
  text,
  showIcon = true,
}: {
  text: string;
  showIcon?: boolean;
}) => {
  return (
    <div
      className="border-card px-3 py-1 d-flex gap-2 align-items-center"
      style={{ borderRadius: "30px" }}
    >
      {showIcon && <FaCircle color="green" size={12} />}
      {text}
    </div>
  );
};

export default RoundedText;
