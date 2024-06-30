const ProfileSkeleton = () => {
  return (
    <div className="border-card bg-white-v-4 rounded">
      <div className="skeleton-loader px-4 py-3">
        <div className="skeleton-line w-50 mb-3"></div>
      </div>
      <div className="skeleton-loader px-2 py-1 border-light-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div className="skeleton-circle"></div>
        </div>
      </div>
      <div className="skeleton-loader px-4 py-3 border-light-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div className="skeleton-line w-40"></div>
          <div className="skeleton-line w-25"></div>
          <div className="skeleton-circle"></div>
        </div>
      </div>
      <div className="skeleton-loader px-4 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="skeleton-line w-40"></div>
          <div className="skeleton-line w-25"></div>
          <div className="skeleton-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
