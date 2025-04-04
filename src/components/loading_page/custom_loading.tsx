import { useThemeContext } from "../../context/theme/theme_context";
import ReactLoading from "react-loading";
import "./custom_loading.css";
const CustomLoading = () => {
  const { isDark } = useThemeContext();
  const color = isDark ? "#ffffff" : "#333333";

  return (
    <div className="loader-container">
      <ReactLoading color={color} type="spin" height={50} width={50} />
    </div>
  );
};

export default CustomLoading;

export const CustomLoadingSecondary = ({ title }: { title: string }) => {
  return (
    <div className="loader-overlay">
      <div className="loader-modal">
        <h6 className="loader-title">{title}</h6>
        <div className="loader-animation">
          <CustomLoading />
        </div>
        <div className="loader-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};
