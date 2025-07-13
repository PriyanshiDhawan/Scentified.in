const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
const path = require("path");

// Load environment variables
require("dotenv").config();

// Firebase Admin SDK Initialization
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const COLLECTION_NAME = process.env.COLLECTION_NAME || "products";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY; // 🔐 Optional admin protection

const app = express();

// ✅ Proper CORS setup
app.use(cors({
  origin: "https://scentified-in-frontend.onrender.com"
}));
app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ Backend server is running");
});

// ✅ Products fetch route
app.get("/api/products", async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const products = snapshot.docs.map(doc => doc.data());
    res.json(products);
  } catch (err) {
    console.error("🔥 Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Admin-only sync route (optional future use)
app.post("/api/admin/sync-products", (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== ADMIN_API_KEY) {
    return res.status(403).json({ error: "Forbidden: Invalid admin key" });
  }

  console.log("📥 Sync trigger received");
  res.json({ message: "Sync request accepted" });
});

// ✅ Upload products from Google Sheet with detailed logging
app.post("/api/uploadProducts", async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      console.error("❌ Invalid data format received:", typeof data);
      return res.status(400).json({ error: "Invalid data format" });
    }

    console.log(`📦 Received ${data.length} products from Sheet`);
    console.log("🧪 Sample product:", JSON.stringify(data[0], null, 2));

    const batch = db.batch();
    let added = 0;

    data.forEach((item) => {
      if (!item.ID) {
        console.warn("⚠️ Skipped item due to missing ID:", item);
        return;
      }

      const docRef = db.collection(COLLECTION_NAME).doc(item.ID.toString());
      batch.set(docRef, item, { merge: true });
      added++;
    });

    await batch.commit();
    console.log(`✅ Uploaded ${added} products to Firestore`);
    res.status(200).json({ message: `Uploaded ${added} products successfully` });

  } catch (err) {
    console.error("🔥 Error uploading products:", err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});