import "../../../components/skeleton/skeleton.css";

export const ProfileSkeleton = () => {
  return (
    <div className="border-card bg-white-v-4 rounded">
      <h6 className="border-light-bottom px-4 py-3 m-0">
        <div className="skeleton-text" style={{ width: "60%" }}></div>
      </h6>

      <div className="d-flex justify-content-between px-4 py-3 cursor-pointer border-light-bottom">
        <p className="m-0 text-black-variant-2">
          <div className="skeleton-text" style={{ width: "40%" }}></div>
        </p>
        <p className="m-0 px-4">
          <div className="skeleton-text" style={{ width: "20%" }}></div>
        </p>
        <div
          className="skeleton-icon"
          style={{ width: "20px", height: "20px" }}
        ></div>
      </div>
    </div>
  );
};
