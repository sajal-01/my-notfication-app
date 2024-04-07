"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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
    <main className="flex min-h-screen flex-col overflow-hidden items-center justify-between py-20 px-10">
      <header className="flex items-center justify-center flex-col w-full">
        <h1 className="text-3xl font-normal w-full text-center text-gray-900 dark:text-gray-100">
          Lorem Ipsum...
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400">
          Lorem ipsum dolor sit amet.
        </p>
      </header>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] ">
        <Image
          src="/Illustration.png"
          alt="Illustration"
          width={1080}
          height={720}
          quality={100}
          objectFit="contain"
          className="max-w-[100%] max-h-[100%] w-[100%] h-[100%] object-cover"
        />
      </div>

      <div className="mb-54 flex items-center justify-center text-center w-full lg:mb-0 ">
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
    </main>
  );
}
