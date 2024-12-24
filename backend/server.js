const express = require("express");
const bodyParser = require("body-parser");
const playwright = require("playwright");
const { automateFavorites } = require("./automation");

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define a GET route for the root URL ("/")
app.get("/", (req, res) => {
  res.send("Welcome to Crotonn Favourite Automator Backend!");
});

// Define a POST route for starting the automation
app.post("/start", async (req, res) => {
  const { keyword, quantity, minDelay, maxDelay } = req.body;

  if (!keyword || !quantity || !minDelay || !maxDelay) {
    return res.status(400).send({
      error: "Please provide 'keyword', 'quantity', 'minDelay', and 'maxDelay' in the request body.",
    });
  }

  try {
    // Launch Playwright browser
    const browser = await playwright.chromium.launch({
      headless: true, // Run browser in headless mode
    });

    const page = await browser.newPage();

    // Go to Redbubble
    await page.goto("https://www.redbubble.com/");

    // Perform a search based on the keyword
    await page.fill("input[placeholder='Search designs and products']", keyword);
    await page.press("input[placeholder='Search designs and products']", "Enter");

    await page.waitForTimeout(2000); // Wait for results to load

    let favoritedCount = 0;

    // Loop to favorite designs
    while (favoritedCount < quantity) {
      // Select design items (example selector - adjust as needed)
      const designs = await page.$$("a[data-testid='search-result-grid-item']");

      for (let i = 0; i < designs.length && favoritedCount < quantity; i++) {
        const design = designs[i];

        // Click the favorite button (example selector - adjust as needed)
        const favoriteButton = await design.$("button[aria-label='Favorite']");
        if (favoriteButton) {
          await favoriteButton.click();
          favoritedCount++;

          // Wait for a random delay between actions
          const delay = Math.floor(
            Math.random() * (maxDelay - minDelay + 1) + minDelay
          );
          await page.waitForTimeout(delay);
        }
      }

      // Go to the next page of search results (if available)
      const nextButton = await page.$("a[aria-label='Next']");
      if (nextButton) {
        await nextButton.click();
        await page.waitForTimeout(2000); // Wait for the next page to load
      } else {
        break; // No more pages, exit the loop
      }
    }

    await browser.close();

    // Respond with success message
    res.send({
      message: "Automation completed successfully!",
      favoritedCount,
    });
  } catch (error) {
    console.error("Error during automation:", error);
    res.status(500).send({
      error: "An error occurred during automation. Please try again.",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
