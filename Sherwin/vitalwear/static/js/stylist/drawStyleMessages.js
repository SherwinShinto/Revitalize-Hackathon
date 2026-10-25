// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds drawStyleMessages().

// Shows the chat history between the user and the stylist.
function drawStyleMessages() {
  const chat = el("styleChat");
  if (!chat) return;

  chat.innerHTML = `
    <div class="assistant-message">
      Hi! I'm your VitalWear stylist.
      What are we dressing for today?
    </div>

    ${styleMessages.map(message => `
      <div class="${
        message.role === "user"
          ? "user-message"
          : "assistant-message"
      }">
        ${escapeHTML(message.text)}
      </div>
    `).join("")}
  `;

  chat.scrollTop = chat.scrollHeight;
}
