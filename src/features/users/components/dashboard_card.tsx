import { Link } from "react-router-dom";

function DashBoardProjectCard({
  title,
  icon,
  link,
  subtitle,
  verified,
}: {
  title: string;
  icon: React.ReactNode;
  link?: string;
  subtitle: string;
  className?: string;
  verified?: string;
}) {
  return (
    <div className="d-flex gap-3">
      {/* icon */}
      <div>{icon}</div>
      <div className="d-flex flex-column gap-2">
        <div className="d-flex gap-3 align-items-center">
          <h6 className="m-0 text-capitalize">{title}</h6>
          {verified ? (
            <p
              className={`border px-2 rounded ${
                verified === "verified" ? "text-green" : "red-border text-error"
              }`}
            >
              {verified}
            </p>
          ) : (
            ""
          )}
        </div>
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
