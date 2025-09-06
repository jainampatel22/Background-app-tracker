import express from "express";

const app = express();
app.use(express.json());

let currentApp = null;
let currentIcon = null; 

app.post("/update", (req, res) => {
 
  const { activeApp, icon } = req.body;


  currentApp = activeApp;
  currentIcon = icon;

  res.json({ success: true, activeApp: currentApp, icon: currentIcon });
});

app.get("/track", (req, res) => {

  res.json({ activeApp: currentApp, icon: currentIcon });
});

app.listen(8000, () => console.log("Server running on port 8000"));