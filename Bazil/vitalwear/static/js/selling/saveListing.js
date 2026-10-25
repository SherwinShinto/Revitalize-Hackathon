// Author: Bazil T
// Part of the Sell tab. This file holds saveListing().

// Checks the price and platforms, saves them, and creates the demo listing.
async function saveListing(id) {
  const price = Number(el(`price-${id}`).value);
  const description = el(`description-${id}`).value.trim();

  const platforms = [
    ...document.querySelectorAll(
      `input.platform-${id}:checked`
    )
  ].map(input => input.value);

  if (!Number.isFinite(price) || price < 0) {
    alert("Enter a valid price.");
    return;
  }

  if (!platforms.length) {
    alert("Select at least one platform.");
    return;
  }

  try {
    await patchItem(id, {price, description});

    await post("/api/listings", {
      item_id: id,
      platforms
    });

    alert("Demo listing saved. Nothing was posted externally.");
    await showPage("sell");
  } catch (error) {
    showError(error);
  }
}
