chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "startAutomation") {
      const { keyword, quantity, minDelay, maxDelay } = request;

      const automateFavoriting = async () => {
        let favoritedCount = 0;

        // Search for the keyword
        const searchInput = document.querySelector("input[placeholder='Search designs and products']");
        if (searchInput) {
          searchInput.value = keyword;
          searchInput.dispatchEvent(new Event("input"));
          searchInput.form.submit();

          await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait for search results to load

          while (favoritedCount < quantity) {
            const designs = document.querySelectorAll("a[data-testid='search-result-grid-item']");

            for (let i = 0; i < designs.length && favoritedCount < quantity; i++) {
              const design = designs[i];
              const favoriteButton = design.querySelector("button[aria-label='Favorite']");

              if (favoriteButton) {
                favoriteButton.click();
                favoritedCount++;

                const delay = Math.random() * (maxDelay - minDelay) + minDelay;
                await new Promise((resolve) => setTimeout(resolve, delay));
              }
            }

            // Move to the next page
            const nextButton = document.querySelector("a[aria-label='Next']");
            if (nextButton) {
              nextButton.click();
              await new Promise((resolve) => setTimeout(resolve, 3000));
            } else {
              break;
            }
          }
        }
      };

      automateFavoriting();
    }
});
