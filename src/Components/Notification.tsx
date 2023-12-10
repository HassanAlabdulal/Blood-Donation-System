import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import notificationImage from "../Assets/notification.gif";
import { Link } from "react-router-dom";

interface NotificationType {
  id: number;
  type: string;
  from: string;
  date: string;
  isCompleted: boolean;
}

interface NotificationItemProps {
  notification: NotificationType;
  onAccept: (notification: NotificationType) => void;
  onPay: (notification: NotificationType) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onAccept,
  onPay,
}) => {
  // Use a base class for buttons to standardize their size
  const buttonBaseClass =
    "inline-flex items-center justify-center font-bold rounded text-white transition-colors duration-500";
  const buttonFixedSizeClass = "w-28 h-10"; // Adjust the width (w-28) and height (h-10) as needed to fit your design
  const acceptButtonClass = `${buttonBaseClass} ${buttonFixedSizeClass} bg-[#5f7fbf] hover:bg-[#3e60a3]`;
  const payButtonClass = `${buttonBaseClass} ${buttonFixedSizeClass} bg-[#292828] hover:bg-black`;
  return (
    <tr className="border-b">
      <td className="px-5 py-3 text-center">{notification.type}</td>
      <td className="px-5 py-3 text-center">{notification.from}</td>
      <td className="px-5 py-3 text-center">{notification.date}</td>
      <td className="px-5 py-3">
        <div className="flex items-center justify-center">
          {notification.isCompleted ? (
            <FontAwesomeIcon icon={faCheck} className="text-green-500" />
          ) : notification.type === "Request for Donate" ? (
            <Link
              className={payButtonClass}
              onClick={() => onPay(notification)}
              to="/Payment"
            >
              <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
              Pay
            </Link>
          ) : (
            <button
              className={acceptButtonClass}
              onClick={() => onAccept(notification)}
            >
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Accept
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
export default function Notification() {
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: 1,
      type: "Request for Recipient",
      from: "Hassan Alabdulal",
      date: "24/05/2023",
      isCompleted: false,
    },
    {
      id: 2,
      type: "Request for Donate",
      from: "Abdullah Al Matawah",
      date: "26/05/2023",
      isCompleted: false,
    },
  ]);

  const handleAccept = (notification: { id: number }) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notif) =>
        notif.id === notification.id ? { ...notif, isCompleted: true } : notif
      )
    );
  };

  const handlePay = (notification: { id: number }) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notif) =>
        notif.id === notification.id ? { ...notif, isCompleted: true } : notif
      )
    );
  };

  return (
    <div className="bg-[#f7f7f7] pt-16 flex flex-col items-center justify-center min-h-screen font-roboto">
      <div className="flex flex-col items-center w-full max-w-4xl p-8 space-y-8 overflow-hidden bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          Notification Center
        </h1>

        {/* Image */}
        <div className="flex justify-center w-full">
          <img
            src={notificationImage}
            alt="Notification Center"
            className="w-1/2 h-1/2 max-xl:w-80 max-xl:h-80 max-lg:mt-24"
          />
        </div>

        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-5 py-3 text-center">Type</th>
              <th className="px-5 py-3 text-center">From</th>
              <th className="px-5 py-3 text-center">Date</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onAccept={handleAccept}
                onPay={handlePay}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
