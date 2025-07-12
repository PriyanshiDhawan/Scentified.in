const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");

// Firebase Admin SDK Initialization
const serviceAccount = require(path.resolve(__dirname, "firebase-key.json"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

const app = express();

// Restrict CORS to only your frontend origin
app.use(cors({
  origin: "http://localhost:3000" // Change this when deploying frontend
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
    console.error("Error fetching products:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});