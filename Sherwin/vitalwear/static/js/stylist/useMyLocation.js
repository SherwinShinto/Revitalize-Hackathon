// Author: Sherwin S
// Part of the Outfits tab (the stylist). This file holds useMyLocation().

// Asks the browser for the user's location, then loads the weather there.
function useMyLocation() {
  if (!navigator.geolocation) {
    alert("Your browser does not support location.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      loadStyleWeather({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => alert(
      "Location unavailable. Enter your city instead."
    ),
    {timeout: 10000}
  );
}
