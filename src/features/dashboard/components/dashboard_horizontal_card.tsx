const DashBoardHorizontalCard = ({
  title,
  subtitle,
  icon,
  onClick,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div
      className="bg-white-v-4 h-100 border-card p-3 rounded d-flex align-items-center gap-4
      text-black-variant-1 cursor-pointer
      "
      onClick={onClick}
    >
      <div
        style={{ height: "60px", width: "60px", borderRadius: "100%" }}
        className="bg-green-primary d-flex align-items-center justify-content-center"
      >
        {icon}
      </div>
      <div className="d-flex flex-column gap-2">
        <h6 className="m-0">{title}</h6>
        <p className="text-black-variant-2 m-0">{subtitle}</p>
      </div>
    </div>
  );
};
export default DashBoardHorizontalCard;
