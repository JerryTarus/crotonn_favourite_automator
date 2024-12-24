const express = require("express");
const { automateFavorites } = require("./automation");

const app = express();
app.use(express.json());

app.post("/start", async (req, res) => {
  const { keyword, quantity, minDelay, maxDelay } = req.body;

  try {
    await automateFavorites(keyword, quantity, minDelay, maxDelay);
    res.status(200).json({ message: "Automation completed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Automation failed", details: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
