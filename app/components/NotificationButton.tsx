"use client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const NotificationButton = () => {
  const [loading, setLoading] = useState(false);
  const showNotification = async () => {
    try {
      setLoading(true);
      if ("Notification" in window && Notification.permission === "granted") {
        const response = await fetch("/api/send-notification", {
          method: "POST",
        });

        if (response.ok) {
          const data = await response.json();
          const message = data.message;

          toast.success(message, {
            icon: "🚀",
            position: "top-center",
            style: {
              borderRadius: "10px",
              background: "#0141ff",
              color: "#fff",
            },
          });
          console.log("Notification sent successfully");
        } else {
          console.error("Failed to send notification");
        }
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setLoading(false);
    }
  };

  const requestNotificationPermission = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }
  }, []);

  useEffect(() => {
    if ("Notification" in window) {
      requestNotificationPermission();
    }
  }, [requestNotificationPermission]);

  return (
    <div className="mt-20">
      <button
        onClick={showNotification}
        disabled={loading}
        className=" whitespace-nowrap rounded-[8px] p-[8px] border-[1.4px] bg-gradient-to-br from-[#9d0d3d] via-[#df522b] to-[#c77d2c]  w-[327px] h-[42px] gap-[8px] border-[#df522b]"
      >
        {loading ? (
          <h2
            className={`text-center text-white text-[16px] leading-[16px] font-bold `}
          >
            Sending Notification...
          </h2>
        ) : (
          <h2
            className={`text-center text-white text-[16px] leading-[16px] font-bold `}
          >
            Send Notification
          </h2>
        )}
      </button>
    </div>
  );
};

export default NotificationButton;
