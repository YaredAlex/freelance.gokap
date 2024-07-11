import "./footer.css";
import GITLogo from "../logo/logo";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  const iconSize = 24;
  const iconColor = "white";
  return (
    <div className="section-footer pb-4 pt-4">
      <div className="max-w-1200 mx-auto  d-flex flex-column px-2">
        {/* GIT logo */}
        <div className="d-flex justify-content-between align-items-center py-2 mb-2">
          <GITLogo />
          <div className="d-flex gap-3">
            <Link to={""}>About GIT</Link>
            <Link to={""}>Privacy</Link>
          </div>
        </div>
        {/*  */}
        <div className="footer-social  d-flex justify-content-end gap-3">
          <Link to={""}>
            <FaFacebook size={iconSize} color={iconColor} />
          </Link>
          <Link to={""}>
            <FaInstagram size={iconSize} color={iconColor} />
          </Link>
          <Link to={""}>
            <FaLinkedin size={iconSize} color={iconColor} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
