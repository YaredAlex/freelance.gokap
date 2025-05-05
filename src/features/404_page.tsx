import { ArrowLeft } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-height-100vh bg-white-v-3 d-flex align-items-center justify-content-center p-4">
      <div
        className="bg-white-v-1 border-card rounded shadow-lg p-4 max-w-md w-full text-center"
        style={{
          maxWidth: "900px",
        }}
      >
        <div className="mb-5">
          <div className="d-flex justify-content-center mb-4 w-100">
            <div
              className="bg-light-green rounded d-flex align-items-center justify-content-center p-2"
              style={{ minHeight: "24px" }}
            >
              <span className="font-weight-500 text-primary-green">404</span>
            </div>
          </div>

          <h1 className="text-lg font-weight-500 text-black-variant-1 mb-4">
            Page Not Found
          </h1>

          <p className="text-black-variant-3 mb-4 px-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="d-flex justify-content-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-white-v-1 border-primary-green text-primary-green py-3 px-4 rounded-md flex items-center justify-center gap-2 font-weight-400 transition-all hover:bg-light-green"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="bg-primary-green text-white-variant-1 py-3 px-4 rounded-md font-weight-400 transition-all hover:opacity-90"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
