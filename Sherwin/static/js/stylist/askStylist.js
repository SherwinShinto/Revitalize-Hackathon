// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds askStylist().

// Sends the user's plans to the server, then shows the reply and the 3 outfits.
async function askStylist(event) {
  event.preventDefault();

  const message = el("styleMessage").value.trim();
  const temperature = Number(el("styleTemp").value);
  const condition = el("styleCondition").value;
  const mood = el("styleMood").value;
  const button = el("styleSubmit");

  if (!message) return;

  button.disabled = true;
  button.textContent = "Creating outfits...";

  try {
    const result = await post("/api/style-chat", {
      message, temperature, condition, mood
    });

    styleMessages.push({
      role: "user",
      text: message
    });

    styleMessages.push({
      role: "assistant",
      text: result.reply
    });

    styleOutfits = result.outfits;

    drawStyleMessages();
    drawStyleOutfits();

    el("styleMessage").value = "";
  } catch (error) {
    showError(error);
  } finally {
    button.disabled = false;
    button.textContent = "✨ Suggest My Outfits";
  }
}
