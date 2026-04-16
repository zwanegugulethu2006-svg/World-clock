const citySelect = document.getElementById("city-select");
const cityOutput = document.getElementById("city-output");

citySelect.addEventListener("change", function () {
  const timezone = this.value;

  if (!timezone) return;

  function updateTime() {
    const now = new Date();

    const time = now.toLocaleTimeString("en-ZA", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

    const date = now.toLocaleDateString("en-ZA", {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    cityOutput.innerHTML = `
      <div class="city-card">
        <div class="city-name">${citySelect.options[citySelect.selectedIndex].text}</div>
        <div class="city-date">${date}</div>
        <div class="city-time">${time}</div>
      </div>
    `;
  }

  updateTime();
  setInterval(updateTime, 1000);
});