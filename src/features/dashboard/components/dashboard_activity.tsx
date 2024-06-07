import { Box2, Money2 } from "iconsax-react";
import ListTile from "../../../components/list_tile/list_tile";

export function DashBoardActivity() {
  return (
    <div
      className="
      text-black-variant-2
      dashboard-activity
      w-100
      p-2
      bg-white-variant-4
      border-card
      rounded
      "
    >
      <h5 className={`font-weight-400`}>Activity</h5>
      <div>
        <ListTile
          title={"Project Created "}
          subtitle={"You have created new porject"}
          time={"20-20-12"}
          icon={<Box2 color="white" />}
        />
        <hr className="m-0" />
        <ListTile
          title={"Payment"}
          subtitle={"Payment done for project completion"}
          time={"30-20-12"}
          icon={<Money2 color="white" />}
        />
      </div>
    </div>
  );
}
