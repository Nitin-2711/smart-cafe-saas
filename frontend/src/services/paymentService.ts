import { loadRazorpayScript } from "@/lib/razorpay";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export const processPayment = async ({
  cafeId,
  tableId,
  items,
  totalAmount,
}: {
  cafeId: string;
  tableId?: string;
  items: any[];
  totalAmount: number;
}) => {
  const res = await loadRazorpayScript();

  if (!res) {
    toast.error("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // 1. Create order on backend
  try {
    const orderResponse = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount, receipt: `receipt_${Date.now()}` }),
    });

    const orderData = await orderResponse.json();

    // 2. Open Razorpay Checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "your_key_id",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "SmartCafé",
      description: "Fast & Secure Payment",
      order_id: orderData.id,
      handler: async function (response: any) {
        // 3. Verify on backend
        const verifyRes = await fetch(`${API_BASE_URL}/payments/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            cafeId,
            items,
            totalAmount,
            tableId,
          }),
        });

        const verifyData = await verifyRes.json();
        
        if (verifyData.success) {
          toast.success("Order Placed Successfully!");
          useCartStore.getState().clearCart();
          // Redirect to success page or order status
          window.location.href = `/orders?id=${verifyData.orderId}`;
        } else {
          toast.error("Payment verification failed.");
        }
      },
      prefill: {
        name: "Valued Customer",
      },
      theme: {
        color: "#f97316", // Orange-500
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Payment failed:", error);
    toast.error("Internal server error during checkout.");
  }
};
