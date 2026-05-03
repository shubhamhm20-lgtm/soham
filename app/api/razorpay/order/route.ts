import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { amount } = (await request.json()) as { amount: number };
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({
      id: `order_demo_${Date.now()}`,
      amount: Math.round(amount * 100),
      currency: "INR",
      demo: true
    });
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to create Razorpay order" }, { status: 502 });
  }

  return NextResponse.json(await response.json());
}
