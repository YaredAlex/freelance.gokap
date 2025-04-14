import { ReactNode } from "react";

type ButtonType = {
  type: "submit" | "reset" | "button";
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  showBorder?: boolean;
  disabled?: boolean;
  children?: ReactNode;
};
const ButtonPrimary = ({
  type,
  onClick,
  title,
  className,
  disabled = false,
  children,
}: ButtonType) => {
  return (
    <button
      className={`btn-custom 
      green-varient-2
      green-varient-2-hover
      text-capitalize ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children ? children : title}
    </button>
  );
};
const ButtonPrimaryOutline = ({
  type,
  onClick,
  title,
  className,
  showBorder = true,
  children,
}: ButtonType) => {
  return (
    <button
      className={`btn-custom outline ${showBorder ? "" : "border-none"}
      text-capitalize ${className}`}
      type={type}
      onClick={onClick}
    >
      {children ? children : title}
    </button>
  );
};
type ButtonFlexType = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
};
const ButtonFlexOutline = ({
  onClick,
  children,
  className,
}: ButtonFlexType) => {
  return (
    <div
      className={`${className} btn-custom-secondary cursor-pointer 
                dark-green-hover
              height-xsm
             d-flex
               align-items-center
               justify-content-center
               gap-2 `}
      style={{ maxWidth: "100%", height: "max-content" }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { ButtonPrimary, ButtonFlexOutline, ButtonPrimaryOutline };
