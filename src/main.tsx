import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemecontextProvider from "./context/theme/theme_context.tsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemecontextProvider>
    <App />
  </ThemecontextProvider>
);
