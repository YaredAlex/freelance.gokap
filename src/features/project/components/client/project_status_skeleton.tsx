import "../../../../components/skeleton/skeleton.css";

export const ProjectStatusSkeleton = () => {
  return (
    <div className="d-flex flex-column gap-4">
      {/* title / discription */}
      <div className="w-100 d-flex flex-column gap-4 bg-white-v-4 rounded p-3 border-card">
        <div className="d-flex gap-3 justify-content-between">
          {/* title skeleton */}
          <div className="skeleton-title"></div>
          {/* link skeleton */}
          <div className="skeleton-link"></div>
        </div>
        <div className="skeleton-subtitle"></div>
        <div className="skeleton-subtitle "></div>
      </div>
      {/* skill and budget and status */}
      <div className="w-100 d-flex gap-4">
        <div className="d-flex flex-column gap-4">
          <div className="d-flex gap-4 col">
            {/* budget */}
            <div className="border-card bg-white-v-4 rounded p-3 col">
              <h6 className="mb-4">Budget</h6>
              <div className="skeleton-link"></div>
            </div>
            {/* posted date */}
            <div className="border-card bg-white-v-4 rounded p-3 col">
              <h6 className="mb-4">Posted date</h6>
              <div className="skeleton-link"></div>
            </div>
          </div>
          {/* skill */}
          <div className="border-card bg-white-v-4 rounded p-3 col">
            <h6 className="mb-4">Skill</h6>
            <div className="d-flex gap-4 flex-wrap">
              <div className="skeleton-title"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-title"></div>
            </div>
          </div>
        </div>
        {/* project status */}
        <div className="border-card bg-white-v-4 rounded p-3 col">
          <h6 className="mb-4">Status</h6>
          <div className="d-flex gap-4 flex-column w-50 ms-4">
            <div className="skeleton-title"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-title"></div>
          </div>
        </div>
      </div>
      {/* Progress of project */}
      <div className="w-100 d-flex flex-column gap-4 bg-white-v-4 rounded p-3 border-card">
        <h6 className="mb-2">Progress</h6>
        <div className="d-flex gap-3 justify-content-between">
          {/* title skeleton */}
          <div className="skeleton-title"></div>
        </div>
        <div className="skeleton-subtitle"></div>
        <div className="skeleton-subtitle "></div>
      </div>
    </div>
  );
};
