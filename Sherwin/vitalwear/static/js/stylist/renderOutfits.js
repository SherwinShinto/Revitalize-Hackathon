// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds renderOutfits().

// Draws the stylist page: weather inputs, mood picker, chat box, and the outfit area.
function renderOutfits() {
  root.innerHTML = `
    <div class="stylist-heading">
      <h1>✨ Your Style Assistant</h1>

      <p>
        Tell us your plans. We'll style you using
        the clothes you already own.
      </p>
    </div>

    <div class="stylist-layout">
      <section class="panel">
        <h2>🌤 Weather & Location</h2>

        <label>City</label>
        <input id="styleCity" value="Calgary"
          placeholder="Enter your city">

        <div class="actions">
          <button class="blue" onclick="loadStyleWeather()">
            Check Google Weather
          </button>

          <button class="muted" onclick="useMyLocation()">
            Use My Location
          </button>
        </div>

        <div id="weatherDisplay" class="weather-result">
          Check live weather or enter conditions manually.
        </div>

        <label>Temperature (°C)</label>
        <input id="styleTemp" type="number" value="10">

        <label>Conditions</label>
        <select id="styleCondition">
          <option>Clear</option>
          <option>Cloudy</option>
          <option>Rainy</option>
          <option>Snowy</option>
          <option>Stormy</option>
        </select>

        <label>How are you feeling?</label>
        <select id="styleMood">
          <option>Comfortable</option>
          <option>Casual</option>
          <option>Professional</option>
          <option>Sporty</option>
          <option>Stylish</option>
        </select>

        <h2>💬 Ask Your Stylist</h2>

        <div id="styleChat" class="style-chat"></div>

        <form onsubmit="askStylist(event)">
          <textarea id="styleMessage" rows="3"
            placeholder="I'm going to a Flames game tonight. I want something red, warm and comfortable."
            required></textarea>

          <button class="green" type="submit"
            id="styleSubmit">
            ✨ Suggest My Outfits
          </button>
        </form>

        <p class="small">Try a prompt:</p>

        <div class="prompt-chips">
          <button onclick="quickStyle('Flames game tonight, red and warm')">
            🏒 Flames Game
          </button>

          <button onclick="quickStyle('Job interview, professional outfit')">
            💼 Interview
          </button>

          <button onclick="quickStyle('Casual coffee date, stylish and comfortable')">
            ☕ Coffee Date
          </button>

          <button onclick="quickStyle('Going to the gym, sporty')">
            🏋️ Gym
          </button>
        </div>
      </section>

      <section class="panel">
        <h2>Today's Outfit Breakdown</h2>

        <p class="small">
          Outfits from your kept items.
          Swap any individual piece.
        </p>

        <div id="styleResults" class="style-results">
          <div class="style-empty">
            <div style="font-size:54px">👔</div>
            <h3>Your outfits will appear here</h3>
            <p>
              Ask your stylist a question to get
              three combinations made for you.
            </p>
          </div>
        </div>
      </section>
    </div>
  `;

  drawStyleMessages();

  if (styleOutfits.length) {
    drawStyleOutfits();
  }

  if (styleWeather) {
    updateWeatherDisplay(styleWeather);
  }
}
