import { ArrowRight2 } from "iconsax-react";

const AccountWrapper = ({
  title,
  lists,
}: {
  title: string;
  lists: {
    title: string;
    value: string;
    onClick: () => void;
  }[];
}) => {
  return (
    <div className="border-card  bg-white-v-4 rounded">
      <h6 className="border-light-bottom px-4 py-3 m-0">{title}</h6>
      {/*  */}
      {lists.map((list, index) => (
        <div
          key={index}
          className={`d-flex justify-content-between px-4 py-3 cursor-pointer ${
            index != lists.length - 1 ? "border-light-bottom" : ""
          }`}
          onClick={list.onClick}
        >
          <p className="m-0 text-black-variant-2">{list.title}</p>
          <p className="m-0">{list.value}</p>
          <ArrowRight2 size={20} />
        </div>
      ))}
    </div>
  );
};

export default AccountWrapper;
