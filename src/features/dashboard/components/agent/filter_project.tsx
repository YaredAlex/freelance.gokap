import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { UseAgentBoardType } from "../../hooks/agent/agent_board";
import { ButtonPrimary } from "../../../../components/button/button";
import { useAdminBoardType } from "../../hooks/admin/use_admin_project";

const FilterProject = ({
  agentBoard,
}: {
  agentBoard: UseAgentBoardType | useAdminBoardType;
}) => {
  return (
    <div
      className={`project-filter text-black-variant-3 col p-4 rounded bg-white-v-4 border-card ${
        agentBoard.showFilter ? "d-block" : "d-none"
      }`}
      style={{
        maxWidth: "300px",
        width: "300px",
        position: "absolute",
        right: "0px",
        top: "70px",
        zIndex: 100,
      }}
    >
      <h6 className="text-black-variant-1">Category</h6>
      <select
        className="p-2
          rounded
          text-black-variant-1
          bg-white-smoke
          w-100 mb-2"
      >
        <option>All</option>
      </select>
      <h6 className="text-black-variant-1">Price</h6>
      <div className="">
        {agentBoard.priceFilterList.map((price, index) => (
          <div
            key={index}
            className="cursor-pointer px-1 py-1"
            onClick={() => agentBoard.setPriceFilter(price)}
          >
            {agentBoard.priceFilter == price ? (
              <MdOutlineCheckBox color="green" size={25} />
            ) : (
              <MdCheckBoxOutlineBlank size={25} />
            )}

            <input
              type="radio"
              value={price}
              id={price}
              name="price-filter"
              hidden
            />
            <label htmlFor={price} className="cursor-pointer ps-2">
              {price}
            </label>
          </div>
        ))}
      </div>
      <h6 className="mt-2 text-black-variant-1">Applicants</h6>
      {agentBoard.applicatFilterList.map((applicat, index) => (
        <div
          key={index}
          className="cursor-pointer px-1 py-1"
          onClick={() => agentBoard.setApplicantFilter(applicat)}
        >
          {agentBoard.applicatFilter == applicat ? (
            <MdOutlineCheckBox color="green" size={25} />
          ) : (
            <MdCheckBoxOutlineBlank size={25} />
          )}

          <input
            type="radio"
            value={applicat}
            id={applicat}
            name="price-filter"
            hidden
          />
          <label htmlFor={applicat} className="cursor-pointer ps-2">
            {applicat}
          </label>
        </div>
      ))}
      <ButtonPrimary
        title="Filter"
        type="button"
        className="py-2 mt-3"
        onClick={() => agentBoard.setShowFilter(false)}
      />
    </div>
  );
};

export default FilterProject;
