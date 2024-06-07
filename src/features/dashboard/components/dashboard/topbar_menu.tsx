const TopBarMenu = ({
  setShowNav,
  showNav,
}: {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  showNav: boolean;
}) => {
  return (
    <div
      className={` cursor-pointer 
                    dashboard-menu-bar p-2 
                    gap-1 `}
      onClick={() => setShowNav(!showNav)}
    >
      <span
        style={{
          width: "20px",
          height: "2px",
          transform: showNav ? "rotate(45deg)" : "",
          transformOrigin: "left",
        }}
        className={`bg-black-v-1 rounded`}
      />
      <span
        style={{
          width: "20px",
          height: "2px",
          visibility: showNav ? "hidden" : "visible",
        }}
        className={`bg-black-v-1 rounded`}
      />
      <span
        style={{
          width: "20px",
          height: "2px",
          transform: showNav ? "rotate(-45deg)" : "",
          transformOrigin: "left",
        }}
        className={`bg-black-v-1 rounded`}
      />
    </div>
  );
};

export default TopBarMenu;
