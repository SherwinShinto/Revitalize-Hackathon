// Author: Bazil T
// Makes cards swipeable with a mouse or finger. This file holds attachSwipe().

// Makes a card draggable: drag right more than 90px for one action, left for the other.
function attachSwipe(cardId, rightAction, leftAction) {
  const card = el(cardId);
  if (!card) return;

  let startX = null;

  card.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;
    startX = event.clientX;
  });

  card.addEventListener("pointermove", event => {
    if (startX === null) return;

    const distance = event.clientX - startX;

    card.style.transform =
      `translateX(${distance}px) rotate(${distance * 0.04}deg)`;
  });

  card.addEventListener("pointerup", event => {
    if (startX === null) return;

    const distance = event.clientX - startX;
    startX = null;
    card.style.transform = "";

    if (distance > 90) rightAction();
    else if (distance < -90) leftAction();
  });

  card.addEventListener("pointercancel", () => {
    startX = null;
    card.style.transform = "";
  });
}
