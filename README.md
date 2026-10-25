<!--
  Authors: Naren P, Sherwin S, Bazil T
  How to run VitalWear and where everything lives.
-->

# VitalWear

Your closet. Your bank account. Your community.

## Run it

Mac:
```bash
cd VitalWear
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run.py
```

Windows:
```bash
cd VitalWear
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

Open http://127.0.0.1:5000. Next time, just activate the `.venv` and run `python run.py`.

For live weather, set a Google key first: `export GOOGLE_MAPS_API_KEY=your-key` (Windows: `set GOOGLE_MAPS_API_KEY=your-key`).

## How the folders work

```
VitalWear/
├── Naren/        Naren P's code
├── Sherwin/      Sherwin S's code
├── Bazil/        Bazil T's code
├── data/         the database (closet.db) and uploaded photos
├── run.py        starts the site
├── requirements.txt
├── README.md
└── .gitignore
```

Each teammate's folder holds their own piece of the same `vitalwear` code, in the same sub-folders
(`vitalwear/routes/...`, `vitalwear/static/js/...`). `run.py` tells Python to look in all three, and the
page loads CSS and JS from all three, so the site runs straight from this layout. Nobody shares a file,
so nobody overwrites anyone else's work.

## Naren P: Foundation and Accounts

Settings, the database, login, page loading, navigation, and the shared helpers.

| Folder in `Naren/` | Files |
|---|---|
| `vitalwear/` | `__init__.py`, `config.py`, `catalog.py` |
| `vitalwear/database/` | `__init__.py`, `conn.py`, `init_db.py` |
| `vitalwear/auth/` | `__init__.py`, `user.py`, `auth_error.py` |
| `vitalwear/routes/` | `__init__.py` (the list of every URL) |
| `vitalwear/routes/pages/` | `__init__.py`, `home.py`, `frontend_files.py`, `static_folders.py`, `static_file.py` |
| `vitalwear/routes/account/` | `__init__.py`, `login.py`, `me.py`, `logout.py` |
| `vitalwear/templates/` | `index.html` |
| `vitalwear/static/css/` | `base.css`, `responsive.css` |
| `vitalwear/static/js/core/` | `state.js`, `constants.js`, `initialize.js` |
| `vitalwear/static/js/` | `start.js` |
| `vitalwear/static/js/helpers/` | `el.js`, `escapeHTML.js`, `api.js`, `post.js`, `patchItem.js`, `refreshItems.js`, `statusItems.js`, `showError.js`, `formatStatus.js` |
| `vitalwear/static/js/navigation/` | `renderNavigation.js`, `showPage.js` |
| `vitalwear/static/js/account/` | `renderLogin.js`, `login.js`, `demoLogin.js`, `logout.js`, `renderAccount.js`, `resetDemo.js` |

**Gives the others:** Python `conn()`, `user()`, `auth_error()`, `CATEGORIES`, `ROLES`, `STATUSES`, `SELL_PLATFORMS`, `UPLOAD`; JS `api()`, `post()`, `patchItem()`, `el()`, `escapeHTML()`, `statusItems()`, `showError()`, `showPage()`, and the `items` and `history` variables.

## Sherwin S: Stylist and Weather

The weather lookup, outfit scoring, the Outfits tab, and the clothing drawings.

| Folder in `Sherwin/` | Files |
|---|---|
| `vitalwear/weather/` | `__init__.py`, `fetch_json.py`, `google_weather.py` |
| `vitalwear/stylist/` | `__init__.py`, `score_item.py`, `choose.py` |
| `vitalwear/routes/stylist/` | `__init__.py`, `style_weather.py`, `style_chat.py` |
| `vitalwear/static/css/` | `stylist.css` |
| `vitalwear/static/js/stylist/` | `renderOutfits.js`, `drawStyleMessages.js`, `loadStyleWeather.js`, `updateWeatherDisplay.js`, `useMyLocation.js`, `quickStyle.js`, `askStylist.js`, `drawStyleOutfits.js`, `swapStylePiece.js` |
| `vitalwear/static/js/illustrations/` | `clothingColor.js`, `clothingIllustration.js`, `clothingImage.js` |

**Gives the others:** `clothingImage()` and `clothingIllustration()` (Bazil's pages), `renderOutfits()` (Naren's `showPage`).

## Bazil T: Closet, Selling, Donating

Adding clothes, swiping, keep and remove, sell or donate, listings, and pickup plans.

| Folder in `Bazil/` | Files |
|---|---|
| `vitalwear/routes/closet/` | `__init__.py`, `get_items.py`, `demo.py`, `add_item.py`, `update_item.py`, `uploaded.py` |
| `vitalwear/routes/selling/` | `__init__.py`, `create_listing.py`, `get_listings.py` |
| `vitalwear/routes/donations/` | `__init__.py`, `save_pickup.py`, `get_pickups.py` |
| `vitalwear/static/css/` | `closet.css`, `selling.css` |
| `vitalwear/static/js/closet/` | `renderCloset.js`, `clothingCard.js`, `editClothing.js` |
| `vitalwear/static/js/add-clothes/` | `renderAdd.js`, `addClothing.js` |
| `vitalwear/static/js/decisions/` | `recordDecision.js`, `changeClothingStatus.js`, `undoLastDecision.js`, `undoItemDecision.js` |
| `vitalwear/static/js/swipe/` | `attachSwipe.js` |
| `vitalwear/static/js/revitalize/` | `renderRevitalize.js` |
| `vitalwear/static/js/removal/` | `renderRemove.js` |
| `vitalwear/static/js/selling/` | `renderSell.js`, `writeDescription.js`, `saveListing.js` |
| `vitalwear/static/js/donations/` | `renderDonate.js`, `findDonationCentres.js`, `savePickup.js` |

**Gives the others:** `renderCloset()`, `renderAdd()`, `renderRevitalize()`, `renderRemove()`, `renderSell()`, `renderDonate()` (Naren's `showPage`), `changeClothingStatus()`, `undoLastDecision()`.

## Adding code

- **New Python route:** put the function in its own file in your folder, under `vitalwear/routes/<feature>/`. Then ask Naren to import it and add one line to `ROUTES` in `Naren/vitalwear/routes/__init__.py`.
- **New JS function:** create `<YourName>/vitalwear/static/js/<feature>/<functionName>.js`. The page finds and loads it automatically.
- **New CSS file:** drop it in `<YourName>/vitalwear/static/css/`. It loads automatically.
- **Never put the same file path in two folders.** If two teammates both had `vitalwear/static/js/helpers/api.js`, only Naren's would load.
