type ButtonType = {
  type: "submit" | "reset" | "button";
  title: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};
const ButtonPrimary = ({ type, onClick, title, className }: ButtonType) => {
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
}: ButtonType) => {
  return (
    <button
      className={`btn-custom-outline 
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
};
const ButtonFlexOutline = ({ onClick, children }: ButtonFlexType) => {
  return (
    <div
      className="btn-custom-secondary cursor-pointer 
                dark-green-hover
              height-xsm
              mt-2
              mb-4
             d-flex
               align-items-center
               justify-content-center
               gap-2
              "
      style={{ maxWidth: "100%" }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export { ButtonPrimary, ButtonFlexOutline, ButtonPrimaryOutline };
