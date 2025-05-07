import { useEffect, useRef, useState } from "react";
import { ButtonPrimaryOutline } from "../../../components/button/button";
import "./action_dropdown.css";

export enum UserActionType {
  SEND_EMAIL = "send_email",
  UPDATE_STATUS = "update_status",
  DELETE_USER = "delete_user",
  SEND_NOTIFICATION = "send_notification",
  SUSPEND = "suspend",
}
const ActionDropDown = ({
  handleActionClick,
}: {
  handleActionClick: (action: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="action-dropdown" ref={dropDownRef}>
      <div style={{ width: "150px" }}>
        <ButtonPrimaryOutline
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          title="Actions"
          type="button"
          className={`action-button py-2 ${isOpen ? "active" : ""}`}
        >
          Actions
          <span className={`action-button-arrow ${isOpen ? "open" : ""}`}>
            ▼
          </span>
        </ButtonPrimaryOutline>
      </div>

      {isOpen && (
        <div className="c_dropdown-menu">
          <div
            className="dropdown-item"
            onClick={() => {
              handleActionClick(UserActionType.SUSPEND);
              setIsOpen(false);
            }}
          >
            <span className="dropdown-item-icon">🔒</span>
            Suspend User
          </div>
          <div
            className="dropdown-item"
            onClick={() => {
              handleActionClick(UserActionType.SEND_EMAIL);
              setIsOpen(false);
            }}
          >
            <span className="dropdown-item-icon">✉️</span>
            Send Email
          </div>
          {/* <div
            className="dropdown-item"
            onClick={() => {
              handleActionClick(UserActionType.UPDATE_STATUS);
              setIsOpen(false);
            }}
          >
            <span className="dropdown-item-icon">🔄</span>
            Update Status
          </div> */}
          <div className="dropdown-separator"></div>
          <div
            className="dropdown-item delete"
            onClick={() => {
              handleActionClick(UserActionType.DELETE_USER);
              setIsOpen(false);
            }}
          >
            <span className="dropdown-item-icon">🗑️</span>
            Delete User
          </div>
          {/* <div
            className="dropdown-item"
            onClick={() => {
              handleActionClick(UserActionType.SEND_NOTIFICATION);
              setIsOpen(false);
            }}
          >
            <span className="dropdown-item-icon">🔔</span>
            Send Notification
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ActionDropDown;
