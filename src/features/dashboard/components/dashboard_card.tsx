import { Link } from "react-router-dom";

function DashBoardProjectCard({
  title,
  icon,
  link,
  subtitle,
}: {
  title: string;
  icon: React.ReactNode;
  link?: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className="d-flex gap-3">
      {/* icon */}
      <div>{icon}</div>
      <div className="d-flex flex-column gap-2">
        <h6 className="m-0 text-capitalize">{title}</h6>
        <p className="m-0 text-black-variant-2">{subtitle}</p>
        {link && (
          <Link to={link} className="text-black-variant-2">
            See detail
          </Link>
        )}
      </div>
    </div>
  );
}

export default DashBoardProjectCard;
