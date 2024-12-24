const express = require("express");
const app = express();
const port = 3000;

// Define a route for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Welcome to Crotonn Favourite Automator Backend!");
});

// Define your POST route for automation (already in your code)
app.post("/start", async (req, res) => {
  try {
    // Replace this with your automation logic
    res.send("Automation started!");
  } catch (error) {
    res.status(500).send({ error: "An error occurred while starting automation" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
