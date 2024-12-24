const { chromium } = require("playwright");

async function automateFavorites(keyword, quantity, minDelay, maxDelay) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate to Redbubble
    await page.goto("https://www.redbubble.com/");
    await page.fill("input[placeholder='Search']", keyword);
    await page.press("input[placeholder='Search']", "Enter");
    await page.waitForTimeout(3000); // Wait for search results to load

    let count = 0;
    while (count < quantity) {
      const items = await page.$$(".styles__link--1p8WT"); // Adjust selector as per Redbubble UI
      for (const item of items) {
        if (count >= quantity) break;

        await item.click();
        await page.waitForTimeout(minDelay + Math.random() * (maxDelay - minDelay));
        count++;
      }
    }
  } catch (error) {
    console.error("Automation failed:", error);
  } finally {
    await browser.close();
  }
}

module.exports = { automateFavorites };
