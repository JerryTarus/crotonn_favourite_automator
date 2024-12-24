document.getElementById("settings-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const keyword = document.getElementById("keyword").value;
  const quantity = parseInt(document.getElementById("quantity").value, 10);
  const minDelay = parseInt(document.getElementById("minDelay").value, 10);
  const maxDelay = parseInt(document.getElementById("maxDelay").value, 10);

  // Send data to content script
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "startAutomation",
      keyword,
      quantity,
      minDelay,
      maxDelay,
    });
  });
});
