"use client";
import Spline from "@splinetool/react-spline";
import { Suspense, useCallback, useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  const checkPermission = () => {
    if (!("serviceWorker" in navigator)) {
      throw new Error("No support for service worker!");
    }
    if (!("Notification" in window)) {
      throw new Error("No support for notification API");
    }
    if (!("PushManager" in window)) {
      throw new Error("No support for Push API");
    }
  };

  const registerSW = async () => {
    const registration = await navigator.serviceWorker.register(
      "worker/index.js"
    );
    return registration;
  };

  const subscribeToNotifications = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (!existingSubscription) {
        const publicVapidKey =
          "BIfP7WrgmlA3u5pZlQP8K3mwjyCFtUB64TxLEkwjYF3dSaCCGzBYGSytAI6OjYjgJsn0TYiiNfTj7tASL3kWeOY";
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });
        setSubscription(subscription);
      } else {
        setSubscription(existingSubscription);
      }
    } catch (error) {
      console.error("Error subscribing to notifications:", error);
    }
  }, []);

  const showNotification = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscription }),
      });

      if (response.ok) {
        new Notification("New Notification", {
          body: "Hello from Next.js!",
          icon: "/images/nextjs.png",
        });
      } else {
        console.error("Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setLoading(false);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const requestNotificationPermission = useCallback(() => {
    if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    checkPermission();
    registerSW();
    subscribeToNotifications();
    requestNotificationPermission();
  }, [subscribeToNotifications, requestNotificationPermission]);

  return (
    <main className="flex min-h-screen bg-black flex-col items-center justify-between py-20 px-10">
      <header className="flex items-center justify-center flex-col w-full">
        <h1 className="text-3xl font-normal w-full text-center text-gray-100">
          Lorem Ipsum...
        </h1>
        <p className="text-lg text-center text-gray-500">
          Lorem ipsum dolor sit amet.
        </p>
      </header>
      <div className="md:mx-auto md:max-w-5xl mr-16 md:-mr-44 w-full min-h-[500px] items-center flex">
        <Suspense fallback={<div>Loading...</div>}>
          <Spline scene="https://prod.spline.design/diRa9ehG0YP2Hl6M/scene.splinecode" />
        </Suspense>
      </div>
      <div className="mb-54 flex items-center justify-center text-center w-full lg:mb-0">
        <button
          onClick={showNotification}
          disabled={loading}
          className="whitespace-nowrap rounded-[8px] p-[8px] border-[1.4px] bg-gradient-to-br from-[#9d0d3d] via-[#df522b] to-[#c77d2c] w-[327px] h-[42px] gap-[8px] border-[#df522b]"
        >
          {loading ? (
            <h2 className="text-center flex items-center justify-center space-x-2 text-gray-200 text-[16px] leading-[16px] font-bold">
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
            <h2 className="text-center text-white text-[16px] leading-[16px] font-bold">
              Send Notification
            </h2>
          )}
        </button>
      </div>
    </main>
  );
}
