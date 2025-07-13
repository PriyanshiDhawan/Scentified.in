const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");

// Firebase Admin SDK Initialization
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const app = express();

// ✅ Correct CORS setup (no trailing slash)
app.use(cors({
  origin: "https://scentified-in-frontend.onrender.com"
}));
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Backend server is running");
});

// ✅ Products route
app.get("/api/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => doc.data());
    res.json(products);
  } catch (err) {
    console.error("🔥 Error fetching products:", err); // Logs full error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});