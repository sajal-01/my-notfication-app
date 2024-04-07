import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";

const vapidKeys = {
  publicKey:
    "BIfP7WrgmlA3u5pZlQP8K3mwjyCFtUB64TxLEkwjYF3dSaCCGzBYGSytAI6OjYjgJsn0TYiiNfTj7tASL3kWeOY",
  privateKey: "PfaxIikNi4uEZfYhVSp92HqVAQXjCAfm8QgrR-dtZLM",
};

webpush.setVapidDetails(
  "mailto:sajalsharma4399@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
export const POST = async (req: NextRequest, res: NextResponse) => {
  console.log("Subscription request:", req.body);
  const subscription = await req.json();
  try {
    await webpush.sendNotification(subscription, "Hello from Next.js!");

    return NextResponse.json({
      message: "Subscription successful",
      status: 200,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
};
