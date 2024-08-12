import React from "react";
import "./table_skeleton.css";

const TableSkeletonRow: React.FC = () => {
  return (
    <tr className="skeleton-row">
      <td>
        <div className="skeleton circular-skeleton"></div>
      </td>
      <td>
        <div className="skeleton text-skeleton"></div>
      </td>
      <td>
        <div className="skeleton text-skeleton"></div>
      </td>
      <td>
        <div className="skeleton text-skeleton"></div>
      </td>
      <td>
        <div className="skeleton text-skeleton"></div>
      </td>
      <td>
        <div className="skeleton text-skeleton"></div>
      </td>
      <td>
        <div className="skeleton text-skeleton"></div>
      </td>
      <td>
        <div className="skeleton button-skeleton"></div>
      </td>
    </tr>
  );
};

export default TableSkeletonRow;
