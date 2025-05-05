import { ToastContainer } from "react-toastify";
import { useThemeContext } from "../../context/theme/theme_context";
const CustomToastContainer = () => {
	const { isDark } = useThemeContext();
	if (isDark) return <ToastContainer theme="dark" />;

	return (
		<ToastContainer
			theme="light"
			style={{ minHeight: "auto" }}
		/>
	);
};

export default CustomToastContainer;
