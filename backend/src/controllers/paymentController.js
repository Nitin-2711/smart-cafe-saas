const Razorpay = require("razorpay");
const crypto = require("crypto");
const admin = require("firebase-admin");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "your_key_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "your_key_secret",
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency,
      receipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Order Creation Failed:", error);
    res.status(500).json({ error: "Could not create Razorpay order" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      cafeId,
      items,
      totalAmount,
      tableId 
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "your_key_secret")
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment Verified! Now store in Firestore securely from the server
      const db = admin.firestore();
      const orderRef = await db.collection("orders").add({
        cafeId,
        items,
        totalAmount,
        tableId: tableId || "N/A",
        status: "pending",
        paymentStatus: "completed",
        paymentId: razorpay_payment_id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({ 
        success: true, 
        orderId: orderRef.id,
        message: "Payment verified and order placed successfully" 
      });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Verification Failed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
