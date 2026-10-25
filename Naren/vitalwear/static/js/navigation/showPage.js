// Author: Naren P
// Part of the tab navigation at the top of the site. This file holds showPage().

// Switches tabs: reloads the clothes, then draws the chosen page.
async function showPage(page) {
  currentPage = page;

  try {
    await refreshItems();

    const renderers = {
      closet: renderCloset,
      add: renderAdd,
      revitalize: renderRevitalize,
      outfits: renderOutfits,
      remove: renderRemove,
      sell: renderSell,
      donate: renderDonate,
      account: renderAccount
    };

    if (renderers[page]) {
      await renderers[page]();
    }
  } catch (error) {
    showError(error);
  }
}
