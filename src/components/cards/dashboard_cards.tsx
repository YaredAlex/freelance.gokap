type DashboardCard = {
  title: string;
  number: number;
  icon: React.ReactNode;
  background?: string;
};

const DashboardCard = ({ title, number, icon, background }: DashboardCard) => {
  return (
    <div
      className={`d-flex flex-column justify-content-between p-3 pb-1 
      rounded col dashboard-card border-card
      `}
      style={{
        color: "white",
        width: "100%",
        height: "150px",
        background: `${
          background ? background : "linear-gradient(to right,#F46D6D,#BA3E3E)"
        }`,
      }}
    >
      {/* Title */}
      <h5 className={`font-weight-400 text-md `}>{title}</h5>
      {/* Number and Icon */}
      <div className={`d-flex justify-content-between align-items-center pe-3`}>
        {icon}
        <h2 className={`text-xxlg font-weight-300 `}>{number}</h2>{" "}
      </div>
    </div>
  );
};

export default DashboardCard;
