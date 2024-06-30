type ButtonType = {
  type: "submit" | "reset" | "button";
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  showBorder?: boolean;
  disabled?: boolean;
};
const ButtonPrimary = ({
  type,
  onClick,
  title,
  className,
  disabled = false,
}: ButtonType) => {
  return (
    <button
      className={`btn-custom 
      green-varient-2
      green-varient-2-hover
      height-xsm
      text-capitalize ${className}`}
      style={{ maxWidth: "100%", height: "fit-content" }}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
const ButtonPrimaryOutline = ({
  type,
  onClick,
  title,
  className,
  showBorder = true,
}: ButtonType) => {
  return (
    <button
      className={`btn-custom-outline ${showBorder ? "" : "border-none"}
      height-xsm
      text-capitalize ${className}`}
      style={{ maxWidth: "100%", height: "fit-content" }}
      type={type}
      onClick={onClick}
    >
      {title}
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
