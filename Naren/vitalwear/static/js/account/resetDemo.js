// Author: Naren P
// Part of logging in, logging out, and the Account tab. This file holds resetDemo().

// Asks first, then replaces the closet with the sample clothes.
async function resetDemo() {
  if (!confirm(
    "Replace your current closet with demo items?"
  )) return;

  try {
    await post("/api/demo", {});

    history = [];
    styleOutfits = [];
    styleMessages = [];

    await showPage("closet");
  } catch (error) {
    showError(error);
  }
}
