import express from "express";
import cors from 'cors'
const app = express();
app.use(express.json());
const corsOptions = {
  origin: ['https://jainam-portfolio-27hy.vercel.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
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