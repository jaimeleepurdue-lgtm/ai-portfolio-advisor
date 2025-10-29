async function sendPrompt() {
  const prompt = document.getElementById("prompt").value.trim();
  const output = document.getElementById("output");
  output.innerHTML = "⏳ Generating recommendation...";

  // ✅ Your active n8n Hosted Chat Webhook
  const webhookUrl = "https://jaimelee333.app.n8n.cloud/webhook/aea75698-f19c-48d8-a23e-94749d576da5/chat";

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // 👇 Hosted Chat requires this structure, not {message: ""}
      body: JSON.stringify({
        action: "sendMessage",
        chatInput: prompt
        // sessionId: "optional-fixed-id"  // Uncomment if you want persistent memory
      })
    });

    // If the server responds with an error
    if (!res.ok) {
      const txt = await res.text();
      output.innerHTML = `
        ❌ Workflow error:<br><pre>${txt}</pre>
      `;
      return;
    }

    const data = await res.json();

    // Display formatted AI response
    output.innerHTML = `
      <h3>📊 Recommended Asset Allocation</h3>
      <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
  } catch (err) {
    output.innerHTML = "❌ Network error — please check your connection or make sure workflow is active.";
    console.error(err);
  }
}
