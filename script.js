const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const weatherEl = document.getElementById("weather");

function updateDateTime() {
  const now = new Date();

  // Show time (HH:MM)
  timeEl.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Show date (Windows 11 style: Sat, 23 Aug 2025)
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  dateEl.textContent = now.toLocaleDateString("en-GB", options);
}

setInterval(updateDateTime, 1000);
updateDateTime();

// weather
async function fetchWeather(city = "Salem") {
  const apiKey = "d4cedb0e2244c282fced705d15d1d865";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === 200) {
      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].icon;
      const icon = getWeatherIcon(condition);
      weatherEl.textContent = `${icon} ${temp}°C`;
    } else {
      weatherEl.textContent = "｡°⚠︎°｡ Weather Error";
    }
  } catch (err) {
    weatherEl.textContent = "⚠︎ No data";
  }
}

// Get emoji based on condition
function getWeatherIcon(condition) {
  switch (true) {
    case condition.toLowerCase().includes("clear"):
      return "☀";
    case condition.toLowerCase().includes("cloud"):
      return "☁";
    case condition.toLowerCase().includes("rain"):
      return "☂";
    case condition.toLowerCase().includes("thunder"):
      return "⛈";
    case condition.toLowerCase().includes("snow"):
      return "❄";
    case condition.toLowerCase().includes("mist"):
    case condition.toLowerCase().includes("fog"):
    case condition.toLowerCase().includes("haze"):
      return "🌫";
    default:
      return "✞";
  }
}

// Update weather every 10 minutes
fetchWeather("Salem");
setInterval(() => fetchWeather("Salem"), 600000);

// Open windows
document.querySelectorAll(".app-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    const app = icon.getAttribute("data-app");
    const win = document.getElementById(app + "Window");
    if (win) openWindow(win.id);
  });
});

// Open / Close functions
function openWindow(id) {
  const win = document.getElementById(id);
  if (win) win.style.display = "flex"; // only toggle display
}

function closeWindow(id) {
  const win = document.getElementById(id);
  if (win) win.style.display = "none";
}

// ================== DRAGGING (DESKTOP ONLY) ==================
if (window.innerWidth > 768) {
  let dragTarget = null,
    offsetX,
    offsetY;

  document.querySelectorAll(".window-header").forEach((header) => {
    header.addEventListener("mousedown", (e) => {
      dragTarget = header.parentElement;
      offsetX = e.clientX - dragTarget.offsetLeft;
      offsetY = e.clientY - dragTarget.offsetTop;
      dragTarget.style.zIndex = 2000;
    });
  });

  document.addEventListener("mousemove", (e) => {
    if (dragTarget) {
      let newX = e.clientX - offsetX;
      let newY = e.clientY - offsetY;

      // Keep inside viewport
      const maxX = window.innerWidth - dragTarget.offsetWidth;
      const maxY = window.innerHeight - dragTarget.offsetHeight;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      dragTarget.style.left = newX + "px";
      dragTarget.style.top = newY + "px";
      dragTarget.style.transform = "none"; // allow dragging
    }
  });

  document.addEventListener("mouseup", () => {
    dragTarget = null;
  });
}

// ================== PRELOADER ==================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  setTimeout(() => {
    preloader.classList.add("hide");
    if (content) content.style.display = "block";
  }, 2500);
});

// ================== YOUTUBE PLAYLIST ==================
function openPlaylist() {
  const playlistId = "PL2TeHhnB0c8jT3P453h97GennHOVQxB8q";
  window.open(`https://www.youtube.com/playlist?list=${playlistId}`, "_blank");
}
