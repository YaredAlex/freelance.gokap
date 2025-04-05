import React from "react";
import {
  paymentStatusLabel,
  paymentStatusStyle,
  projectStatusLabel,
  projectStatusStyle,
} from "../../util/project_data_parser";
import "./status_bage.css";
type StatusBadgeProps = {
  type: "project" | "payment";
  code: number;
  className?: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  type,
  code,
  className = "",
}) => {
  const getLabel = () => {
    if (type === "project") {
      return projectStatusLabel(code);
    } else {
      return paymentStatusLabel(code);
    }
  };

  const getStyle = () => {
    if (type === "project") {
      return projectStatusStyle(code);
    } else {
      return paymentStatusStyle(code);
    }
  };

  return (
    <span className={`status-badge ${getStyle()} ${className}`}>
      {getLabel()}
    </span>
  );
};

export default StatusBadge;
