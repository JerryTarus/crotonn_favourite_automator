document.getElementById("start").addEventListener("click", async () => {
    const keyword = document.getElementById("keyword").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const minDelay = parseInt(document.getElementById("minDelay").value) * 1000;
    const maxDelay = parseInt(document.getElementById("maxDelay").value) * 1000;
  
    try {
      const response = await fetch("http://localhost:3000/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, quantity, minDelay, maxDelay }),
      });
  
      const result = await response.json();
      alert(result.message || "Automation started!");
    } catch (error) {
      alert("Failed to start automation: " + error.message);
    }
  });
  