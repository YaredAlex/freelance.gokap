import "../../../components/skeleton/skeleton.css";

export const DashboardCardSkeleton = () => {
  return (
    <div className="w-100 d-flex gap-4 justify-content-between">
      <div className="d-flex gap-3 skeleton-loader">
        {/* icon skeleton */}
        <div className="skeleton-icon"></div>
        <div className="d-flex flex-column gap-2">
          {/* title skeleton */}
          <div className="skeleton-title "></div>
          {/* subtitle skeleton */}

          <div className="skeleton-subtitle w-100"></div>
          {/* link skeleton */}
          <div className="skeleton-link"></div>
        </div>
      </div>

      <div className="skeleton-subtitle " style={{ maxWidth: "100px" }}></div>
    </div>
  );
};
export const DashboardHorizontalSkeleton = ({
  isBorder = false,
  iconSize = 32,
}: {
  isBorder?: boolean;
  iconSize?: number;
}) => {
  return (
    <div
      className={`d-flex gap-3 bg-white-v-4  h-100 ${
        isBorder ? "border-card" : ""
      } p-3 rounded d-flex align-items-center gap-4
      text-black-variant-1 cursor-pointer`}
      style={{ maxWidth: "900px" }}
    >
      {/* icon skeleton */}
      <div
        className="skeleton-icon"
        style={{ width: iconSize, height: iconSize }}
      ></div>
      <div className="d-flex flex-column gap-2 col">
        {/* title skeleton */}
        <div className="skeleton-title skeleton-link"></div>
        <div className="skeleton-subtitle skeleton-link"></div>
        <div className="skeleton-subtitle w-100"></div>
      </div>
    </div>
  );
};

export const BudgetSekelton = () => {
  return (
    <div
      className="bg-white-v-4 px-3 py-3 mb-4 cursor-pointer"
      style={{
        width: "100%",
      }}
    >
      <div className=" d-flex flex-column alight-items-center justify-content-center">
        <div className="skeleton-line w-75 mb-4"></div>
        <div className="skeleton-line w-100 mb-3"></div>
        <div className="d-flex gap-3 flex-wrap mb-3">
          <div className="skeleton-line w-25"></div>
          <div className="skeleton-line w-25"></div>
          <div className="skeleton-line w-25"></div>
        </div>
        <div className="card-bottom d-flex justify-content-between">
          <div className="skeleton-line w-50"></div>
          <div className="skeleton-line w-25"></div>
        </div>
      </div>
    </div>
  );
};
