// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds updateWeatherDisplay().

// Shows the weather card and fills in the temperature and conditions boxes.
function updateWeatherDisplay(weather) {
  const display = el("weatherDisplay");
  if (!display) return;

  el("styleTemp").value = weather.temperature;
  el("styleCondition").value = weather.condition;

  const icons = {
    Clear: "☀️",
    Cloudy: "☁️",
    Rainy: "🌧️",
    Snowy: "❄️",
    Stormy: "⛈️"
  };

  display.innerHTML = `
    <div class="weather-card">
      <div style="font-size:42px">
        ${icons[weather.condition] || "🌤️"}
      </div>

      <div>
        <strong>${escapeHTML(weather.city)}</strong>

        <div class="weather-big">
          ${Number(weather.temperature).toFixed(0)}°C
        </div>

        <p>
          ${escapeHTML(
            weather.description || weather.condition
          )}
        </p>

        <p class="small">
          Feels like ${weather.feels_like}°C
          · Wind ${weather.wind} km/h
        </p>

        <p class="small">
          Source: ${escapeHTML(weather.source)}
        </p>
      </div>
    </div>
  `;
}
