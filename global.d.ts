/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  Razorpay?: new (options: any) => { open: () => void };
}
