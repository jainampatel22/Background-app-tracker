import express from "express";

const app = express();
app.use(express.json());

let currentApp = null;

app.post("/update", (req, res) => {
  currentApp = req.body.activeApp;
  res.json({ success: true, activeApp: currentApp });
});

app.get("/track", (req, res) => {
  res.json({ activeApp: currentApp });
});

app.listen(8000, () => console.log("Server running on port 8000"));
