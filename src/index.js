const citySelect = document.getElementById("city-select");
const cityOutput = document.getElementById("city-output");
let clockInterval;

citySelect.addEventListener("change", function () {
  if (this.value === "current") {

    if (!navigator.geolocation) {
      cityOutput.innerHTML = "Geolocation is not supported in your browser.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async function (position) {

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );

          const data = await response.json();
          const cityName = data.city || data.locality || "Unknown Location";

          clearInterval(clockInterval);

          function updateClock() {
            const now = new Date();

            const date = now.toLocaleDateString("en-ZA", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            });

            const time = now.toLocaleTimeString("en-ZA", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit"
            });

            cityOutput.innerHTML = `
              <div class="typing-effect">📍 ${cityName}</div>
              <div>${date}</div>
              <div>${time}</div>
            `;
          }

          updateClock();
          clockInterval = setInterval(updateClock, 1000);

        } catch (error) {
          cityOutput.innerHTML = "Failed to get location data.";
        }
      },

      function (error) {
        cityOutput.innerHTML = "Please allow location access to continue 📍";
      }
    );
  }
});