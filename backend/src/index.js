const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
require("dotenv").config();

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.applicationDefault(), // Production uses GOOGLE_APPLICATION_CREDENTIALS
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`SmartCafé API running on port ${PORT}`);
});
