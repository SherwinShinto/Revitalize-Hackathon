// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds loadStyleWeather().

// Asks the server for live weather (by city or location) and shows it.
async function loadStyleWeather(coords = null) {
  const city = el("styleCity").value.trim() || "Calgary";
  const display = el("weatherDisplay");

  display.textContent = "Checking Google Weather...";

  try {
    let url = "/api/style-weather?city=" +
      encodeURIComponent(city);

    if (coords) {
      url += "&lat=" + encodeURIComponent(coords.latitude);
      url += "&lon=" + encodeURIComponent(coords.longitude);
    }

    const weather = await api(url);

    styleWeather = weather;
    updateWeatherDisplay(weather);
  } catch (error) {
    display.textContent = error.message;
  }
}
