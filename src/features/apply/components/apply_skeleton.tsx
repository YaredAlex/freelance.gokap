export const ApplyProjectSkeleton = ({
  showSkill = true,
}: {
  showSkill?: boolean;
}) => {
  return (
    <div className="text-black-variant-1 bg-white-v-4 rounded p-4 skeleton-loader">
      <div className="">
        <div
          className="ms-4 d-flex gap-4 flex-column"
          style={{ maxWidth: "900px", width: "100%" }}
        >
          {/* title */}
          <div className="skeleton-title"></div>

          {/* Description */}
          <div className="skeleton-description  d-flex gap-3 flex-column">
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line"></div>
            <div className="skeleton-line" style={{ width: "60%" }}></div>
          </div>

          {/* Budget */}
          <div className="skeleton-subtitle "></div>

          {/* skills */}
          {showSkill ? (
            <>
              <div className="skeleton-subtitle"></div>
              <div className="d-flex gap-3 flex-wrap ">
                <div className="skeleton-pill"></div>
                <div className="skeleton-pill"></div>
                <div className="skeleton-pill"></div>
                <div className="skeleton-pill"></div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
