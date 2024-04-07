import { NextRequest, NextResponse } from "next/server";
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const message = "Hello World! from Notification.";

    // Send the notification to the client

    return NextResponse.json({ message, status: 200 });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
};
