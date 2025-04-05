import { ArrowLeft } from "iconsax-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-height-100vh bg-white-v-3 flex items-center justify-center p-4">
      <div className="bg-white-v-1 border-card rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-light-green h-24 w-24 rounded-full flex items-center justify-center">
              <span className="text-xxlg font-weight-500 text-primary-green">
                404
              </span>
            </div>
          </div>

          <h1 className="text-lg font-weight-500 text-black-variant-1 mb-4">
            Page Not Found
          </h1>

          <p className="text-black-variant-3 mb-6">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col gap-4">
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
