import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: [
    "https://jainam-portfolio-27hy.vercel.app",
    "http://localhost:3000",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

let currentApp = null;
let currentIcon = null;
let startingTime = null;


app.post("/update", (req, res) => {
  const { activeApp, icon, startTime } = req.body;

  currentApp = activeApp;
  currentIcon = icon;
  startingTime = startTime;

  console.log(
    `Updated: ${currentApp} at ${new Date(startingTime).toLocaleTimeString()}`
  );

  res.json({ success: true, activeApp: currentApp, icon: currentIcon, startTime: startingTime });
});


app.get("/track", (req, res) => {
  res.json({ activeApp: currentApp, icon: currentIcon, startTime: startingTime });
});

app.listen(8000, () => console.log("Server running on port 8000"));
