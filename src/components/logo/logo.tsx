import logo from "../../assets/logo_1.jpeg";
const GITLogo = () => {
  return (
    <div
      className=""
      style={{
        height: "55px",
        width: "55px",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      <img src={logo} alt="logo" style={{ objectFit: "cover" }} />
    </div>
  );
};

export default GITLogo;
