import React, { useEffect, useRef, useState } from "react";
import "./notification_bar.css";
import { Notification } from "iconsax-react";
import { useThemeContext } from "../../context/theme/theme_context";

type NotificationItem = {
  time: string;
  message: string;
};

type NotificationComponentProps = {
  notifications: NotificationItem[];
};

const NotificationComponent: React.FC<NotificationComponentProps> = ({
  notifications = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const themeContext = useThemeContext();
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-icon-wrapper" ref={notificationRef}>
      <div
        className="notification-icon-container"
        onClick={toggleNotifications}
      >
        <Notification
          size={18}
          className="notification-icon"
          color={themeContext.isDark ? "white" : "#333"}
        />
      </div>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-content">
            <div className="notification-header">
              <h6 className="notification-title">Notifications</h6>
            </div>

            <hr className="notification-divider" />

            {notifications.length > 0 ? (
              <ul className="notification-list">
                {notifications.map((notification, index) => (
                  <li key={index} className="notification-item">
                    <div className="notification-item-content">
                      <p className="notification-message">
                        {notification.message}
                      </p>
                      {notification.time && (
                        <span className="notification-time">
                          {notification.time}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="notification-empty">
                <p>No notifications yet</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
