const admin = require("firebase-admin");
const { google } = require("googleapis");

// 1. Initialize Firebase Admin with your service account JSON
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// 2. Initialize Google Sheets API Auth
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const SHEET_ID = "1ifnAL4bUJ4kH6Q83ozPopXjgAnbJZX8eS0wynjh87hM";
const SHEET_NAME = "Products"; // Your tab name
const START_ROW = 3; // Start after header row (row 2)

async function fetchAndSyncSheet() {
  try {
    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: authClient });

    const range = `${SHEET_NAME}!A${START_ROW}:F`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      console.log("No data found in sheet.");
      return;
    }

    for (const row of rows) {
      // Destructure row values with fallback to empty string to avoid undefined
      const [
        id = "",
        name = "",
        price5 = "0",
        price10 = "0",
        price30 = "0",
        shortDesc = "",
      ] = row;

      if (!id.trim() || !name.trim()) {
        console.log("Skipping row due to missing ID or name:", row);
        continue;
      }

      // Parse prices safely (floats to allow decimals)
      const price_5ml = parseFloat(price5) || 0;
      const price_10ml = parseFloat(price10) || 0;
      const price_30ml = parseFloat(price30) || 0;

      const data = {
        id: id.trim(),
        name: name.trim(),
        price_5ml,
        price_10ml,
        price_30ml,
        description: shortDesc.trim(),
      };

      try {
        await db.collection("products").doc(id.trim()).set(data);
        console.log(`✅ Synced ${name}`);
      } catch (err) {
        console.error(`❌ Failed to sync ${name}:`, err.message);
      }
    }
  } catch (err) {
    console.error("Failed to fetch data from Google Sheets:", err.message);
  }
}

fetchAndSyncSheet();
