type CircularAvatarType = {
  size: number;
  text: string;
  img?: string;
  bgcolor?: string;
  fontSize?: number;
  className?: string;
  fontcolor?: string;
};

const CircularAvatar = ({
  size,
  text = "AA",
  img,
  fontSize,
  bgcolor,
  className,
  fontcolor,
}: CircularAvatarType) => {
  return (
    <div>
      <div
        className={` d-flex align-items-center justify-content-center text-md font-weight-400
              icon-wrapper-primary ${className} ${bgcolor}
              `}
        style={{
          width: `${size || 20}px`,
          height: `${size || 20}px`,
          borderRadius: "50%",
          fontSize: `${fontSize || 1}rem`,
          backgroundColor: bgcolor ? bgcolor : "gray",
        }}
      >
        {img ? (
          <img alt="user" src={img} />
        ) : (
          <span
            className={`text-uppercase cursor-pointer ${
              fontcolor ? fontcolor : "text-black-variant-1"
            } `}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
};

export default CircularAvatar;
