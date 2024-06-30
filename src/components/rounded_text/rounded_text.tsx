import { FaCircle } from "react-icons/fa6";

const RoundedText = ({
  text,
  showIcon = true,
  className,
}: {
  text: string;
  showIcon?: boolean;
  className?: string;
}) => {
  return (
    <div
      className={`border-card px-3 py-1 d-flex gap-2 align-items-center ${className}`}
      style={{ borderRadius: "30px", maxWidth: "max-content" }}
    >
      {showIcon && <FaCircle color="green" size={12} />}
      {text}
    </div>
  );
};

export default RoundedText;
