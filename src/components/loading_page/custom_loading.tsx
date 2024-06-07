import { useThemeContext } from "../../context/theme/theme_context";
import ReactLoading from "react-loading";
const CustomLoading = () => {
  const { isDark } = useThemeContext();
  if (isDark)
    return <ReactLoading color="white" type="spin" height={50} width={50} />;

  return <ReactLoading color="black" type="spin" height={50} width={50} />;
};

export default CustomLoading;

export const CustomLoadingSecondary = ({ title }: { title: string }) => {
  return (
    <div
      className="position-absolute d-flex bg-modal align-items-center justify-content-center w-100 h-100"
      style={{
        zIndex: "100",
        top: 0,
      }}
    >
      {" "}
      <div
        className="text-black-variant-2 d-flex align-items-center justify-content-center flex-column bg-white-v-4 p-4 border-card rounded gap-2"
        style={{ minWidth: "150px", height: "150px" }}
      >
        <h6>{title}</h6>
        <CustomLoading />
      </div>
    </div>
  );
};
