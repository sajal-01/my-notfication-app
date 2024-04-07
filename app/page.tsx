"use client";
import Spline from "@splinetool/react-spline";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [messageData, setMessageData] = useState("");
  const showNotification = async () => {
    try {
      setLoading(true);
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        const response = await fetch("/api/send-notification", {
          method: "POST",
        });

        if (response.ok) {
          const data = await response.json();
          const message = data.message;
          setMessageData(message);
          new Notification("New Notification", {
            body: messageData,
            icon: "/images/nextjs.png",
          });
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
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Permission granted");
        }
      });
    } else if ("Notification" in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          console.log("Permission granted");
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
    <main className="flex min-h-screen bg-black flex-col  items-center justify-between py-20 px-10">
      <header className="flex items-center justify-center flex-col w-full">
        <h1 className="text-3xl font-normal w-full text-center text-gray-100">
          Lorem Ipsum...
        </h1>
        <p className="text-lg text-center text-gray-500 ">
          Lorem ipsum dolor sit amet.
        </p>
      </header>

      <div className=" md:mx-auto md:max-w-5xl mr-16 md:-mr-44    w-full  min-h-[500px] items-center flex ">
        <Suspense fallback={<div>Loading...</div>}>
          <Spline scene="https://prod.spline.design/diRa9ehG0YP2Hl6M/scene.splinecode" />
        </Suspense>
      </div>

      <div className="mb-54 flex items-center justify-center text-center w-full lg:mb-0 ">
        <button
          onClick={showNotification}
          disabled={loading}
          className=" whitespace-nowrap rounded-[8px] p-[8px] border-[1.4px] bg-gradient-to-br from-[#9d0d3d] via-[#df522b] to-[#c77d2c]  w-[327px] h-[42px] gap-[8px] border-[#df522b]"
        >
          {loading ? (
            <h2
              className={`text-center flex items-center justify-center space-x-2 text-gray-200 text-[16px] leading-[16px] font-bold `}
            >
              <span>Please Wait</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon animate-spin icon-tabler icons-tabler-outline icon-tabler-loader-2"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
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
    </main>
  );
}
