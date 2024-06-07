import "./list_tile.css";

type ListTileType = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  time: string;
};
const ListTile = ({ icon, title, subtitle, time }: ListTileType) => {
  return (
    <div className="list-tile-container">
      <div className="list-tile-icon">{icon}</div>
      <div className="list-tile-content">
        <div className="list-tile-title">{title}</div>
        <div className="list-tile-subtitle">{subtitle}</div>
        <div className="list-tile-time">{time}</div>
      </div>
    </div>
  );
};

export default ListTile;
