async function sendPrompt() {
  const prompt = document.getElementById("prompt").value.trim();
  const output = document.getElementById("output");
  output.innerHTML = "⏳ Generating recommendation...";

  // Replace with your n8n webhook URL
  const webhookUrl = "https://jaimelee333.app.n8n.cloud/webhook/aea75698-f19c-48d8-a23e-94749d576da5/chat";

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt })
    });

    const data = await res.json();
    output.innerHTML = `
      <h3>📊 Recommended Asset Allocation</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (err) {
    output.innerHTML = "❌ Error fetching allocation. Please check connection.";
    console.error(err);
  }
}
