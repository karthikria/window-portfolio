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
  }, 1000);
});

// ================== YOUTUBE PLAYLIST ==================
function openPlaylist() {
  const playlistId = "PL2TeHhnB0c8jT3P453h97GennHOVQxB8q";
  window.open(`https://www.youtube.com/playlist?list=${playlistId}`, "_blank");
}

// Developer Terminal

const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

const terminalCommands = {
  help: `
Available commands:

about       About me
skills      Technical skills
projects    My projects
education    Education details
github      Open GitHub
linkedin    Open LinkedIn
email       Contact via email
resume      Open resume
contact     Contact options
clear       Clear terminal
exit        Close terminal
`,

  about: `
Full Stack Developer | CSE Student | AI Enthusiast

I enjoy building responsive web applications
and exploring new technologies.
`,

  skills: `
Programming:
Java, Python, JavaScript, C

Frontend:
HTML, CSS, React, Tailwind CSS, Bootstrap

Backend:
Node.js, Express.js, REST APIs

Database:
MongoDB, PostgreSQL, Firebase

Tools:
Git, GitHub, VS Code, Eclipse, Postman
`,

  education: `
B.E. Computer Science and Engineering
Mahendra College of Engineering
Expected Graduation: 2027
CGPA: 8.1

Higher Secondary:
Gugai Higher Secondary School
Percentage: 79%

SSLC:
Completed in 2021
`,

  projects: `
My Projects:

1. Chat Application
2. Ebus Management System
3. Recipe Book
4. AI Traffic Accident Analysis
5. Movie Recommendation
6. E-Commerce Design
7. Spotify Clone
8. Gemini Clone
`,

  contact: `
Contact options:

Type email     to contact via email
Type linkedin  to open LinkedIn
Type github    to open GitHub
`,

  email: "Opening email composer..."
};

function printTerminal(text) {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  terminalOutput.appendChild(paragraph);
}

function runTerminalCommand(command) {
  const cmd = command.trim().toLowerCase();

  printTerminal("visitor@karthik:~$ " + command);

  if (!cmd) return;

  if (cmd === "clear") {
    terminalOutput.innerHTML = "";
    return;
  }

  if (cmd === "exit") {
    closeWindow("terminalWindow");
    return;
  }

  if (cmd === "github") {
    window.open("https://github.com/karthikria", "_blank");
    printTerminal("Opening GitHub...");
    return;
  }

  if (cmd === "linkedin") {
    window.open("https://www.linkedin.com/in/karthikria/", "_blank");
    printTerminal("Opening LinkedIn...");
    return;
  }

  if (cmd === "email") {
  window.open(
    "https://mail.google.com/mail/?view=cm&fs=1&to=s.karthikria@gmail.com",
    "_blank"
  );
    printTerminal("Opening email composer...");
    return;
  }

  if (cmd === "resume") {
    window.open("karthikria resume.pdf", "_blank");
    printTerminal("Opening resume...");
    return;
  }

  if (cmd === "contact") {
    printTerminal(terminalCommands.contact);
    return;
  }

  if (cmd === "help") {
    printTerminal(terminalCommands.help);
    return;
  }
if (cmd === "settings") {
  openWindow("settingsWindow");

  printTerminal("Opening Personalization Settings...");
  return;
}
  if (terminalCommands[cmd]) {
    printTerminal(terminalCommands[cmd]);
    return;
  }

  printTerminal(
    "Command not found: " + cmd +
    "\nType 'help' to see available commands."
  );
}

if (terminalInput && terminalOutput) {
  terminalInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const command = terminalInput.value;

      terminalInput.value = "";

      runTerminalCommand(command);

      terminalOutput.parentElement.scrollTop =
        terminalOutput.parentElement.scrollHeight;
    }
  });
}
// PERSONALIZATION SETTINGS

function setPortfolioTheme(theme) {
  document.body.dataset.theme = theme;

  if (theme === "light") {
    document.body.style.backgroundColor = "#f1f5f9";
    document.body.style.color = "#111827";
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
  }

  localStorage.setItem("portfolio-theme", theme);
}

function setAccentColor(color) {
  document.documentElement.style.setProperty(
    "--accent-color",
    color
  );

  localStorage.setItem("portfolio-accent", color);
}

function setPortfolioWallpaper(type) {
  if (type === "gradient") {
    document.body.style.backgroundImage =
      "linear-gradient(135deg, #0f172a, #1e3a5f, #312e81)";
  } else if (type === "gradients") {
    document.body.style.backgroundImage =
      "linear-gradient(135deg, #12d6ac, #6ed31b, #db179a)";
  } else {
    document.body.style.backgroundImage = "";
  }

  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundAttachment = "fixed";

  localStorage.setItem("portfolio-wallpaper", type);

  // Remove uploaded image when selecting gradient
  localStorage.removeItem("portfolio-wallpaper-image");
}

function setTerminalTheme(theme) {
  const terminal = document.querySelector(".terminal-body");

  if (!terminal) {
    return;
  }

  if (theme === "blue") {
    terminal.style.color = "#60a5fa";
    terminal.style.caretColor = "#60a5fa";
  } else {
    terminal.style.color = "#4ade80";
    terminal.style.caretColor = "#4ade80";
  }

  localStorage.setItem("terminal-theme", theme);
}

// Restore saved settings

function loadPortfolioSettings() {
  const theme = localStorage.getItem("portfolio-theme");
  const accent = localStorage.getItem("portfolio-accent");
  const wallpaper = localStorage.getItem("portfolio-wallpaper");
  const wallpaperImage = localStorage.getItem("portfolio-wallpaper-image");
  const terminalTheme = localStorage.getItem("terminal-theme");

  if (theme) {
    setPortfolioTheme(theme);
  }

  if (accent) {
    setAccentColor(accent);
  }

  // Restore uploaded wallpaper first
  if (wallpaperImage) {
    document.body.style.backgroundImage =
      `url("${wallpaperImage}")`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  } else if (wallpaper) {
    setPortfolioWallpaper(wallpaper);
  }

  if (terminalTheme) {
    setTerminalTheme(terminalTheme);
  }
}

// Wallpaper image upload

document.getElementById("wallpaperUpload").addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        const img = new Image();

        img.onload = function () {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Resize image to maximum 1920px
            const maxSize = 1920;
            let width = img.width;
            let height = img.height;

            if (width > maxSize || height > maxSize) {
                const ratio = Math.min(
                    maxSize / width,
                    maxSize / height
                );

                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            // Compress image
            const compressedImage = canvas.toDataURL(
                "image/jpeg",
                0.6
            );

            try {
                localStorage.setItem(
                    "portfolio-wallpaper-image",
                    compressedImage
                );

                localStorage.removeItem("portfolio-wallpaper");

                document.body.style.backgroundImage =
                    `url("${compressedImage}")`;

                document.body.style.backgroundSize = "cover";
                document.body.style.backgroundPosition = "center";
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.style.backgroundAttachment = "fixed";

                alert("Wallpaper saved successfully!");

            } catch (error) {
                console.error("Wallpaper save error:", error);

                alert("Image still too large. Try a smaller image.");
            }
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

// Reset Wallpaper

function resetPortfolioWallpaper() {
  document.body.style.backgroundImage = "";

  localStorage.removeItem("portfolio-wallpaper");
  localStorage.removeItem("portfolio-wallpaper-image");
}

// Load settings on page refresh

loadPortfolioSettings();




/* ===== Custom Image Hover Tooltip ===== */

document.querySelectorAll(".app img[title]").forEach((img) => {

    img.addEventListener("mouseenter", () => {

        const tooltip = document.createElement("div");

        tooltip.className = "portfolio-tooltip";
        tooltip.textContent = img.getAttribute("title");

        document.body.appendChild(tooltip);

        const rect = img.getBoundingClientRect();

        tooltip.style.left =
            rect.left + rect.width / 2 + "px";

        tooltip.style.top =
            rect.bottom + 12 + "px";

        requestAnimationFrame(() => {
            tooltip.classList.add("show");
        });

        img._portfolioTooltip = tooltip;
    });

    img.addEventListener("mouseleave", () => {

        const tooltip = img._portfolioTooltip;

        if (tooltip) {
            tooltip.classList.remove("show");

            setTimeout(() => {
                tooltip.remove();
            }, 200);

            img._portfolioTooltip = null;
        }
    });

});

/* ===== Desktop Right Click Context Menu ===== */

const desktopMenu = document.getElementById("desktopContextMenu");
const desktopWidget = document.getElementById("desktopWidget");

document.addEventListener("contextmenu", function (e) {

    // Don't show desktop menu on icons, windows or taskbar
    if (
        e.target.closest(".app") ||
        e.target.closest(".window") ||
        e.target.closest(".container") ||
        e.target.closest(".desktop-context-menu") ||
        e.target.closest(".desktop-widget")
    ) {
        return;
    }

    e.preventDefault();

    desktopMenu.classList.add("show");

    const menuWidth = desktopMenu.offsetWidth;
    const menuHeight = desktopMenu.offsetHeight;

    const x = Math.min(
        e.clientX,
        window.innerWidth - menuWidth - 8
    );

    const y = Math.min(
        e.clientY,
        window.innerHeight - menuHeight - 8
    );

    desktopMenu.style.left = Math.max(8, x) + "px";
    desktopMenu.style.top = Math.max(8, y) + "px";
});


/* Close menu on outside click */

document.addEventListener("click", function (e) {

    if (!e.target.closest("#desktopContextMenu")) {
        desktopMenu.classList.remove("show");
    }

});


/* Context menu actions */

desktopMenu.addEventListener("click", function (e) {

    const action = e.target.dataset.action;

    if (!action) return;

    desktopMenu.classList.remove("show");

    if (action === "refresh") {
        location.reload();
    }

    if (action === "widgets") {
        desktopWidget.classList.toggle("show");
        updateDesktopWidget();
    }

    if (action === "wallpaper") {
        const wallpaperInput =
            document.getElementById("wallpaperUpload");

        if (wallpaperInput) {
            wallpaperInput.click();
        }
    }
    if (action === "settings") {
    const settingsWindow = document.getElementById("settingsWindow");

    if (settingsWindow) {
        openWindow("settingsWindow");
    } else {
        alert("Settings window is not created yet!");
    }
}

    if (action === "about") {
        const aboutWindow =
            document.getElementById("aboutWindow");

        if (aboutWindow) {
            openWindow("aboutWindow");
        } else {
            alert("Welcome to my Windows Portfolio!");
        }
    }

});


/* Close widget */

document.getElementById("closeWidget")
    .addEventListener("click", function () {

        desktopWidget.classList.remove("show");

    });


/* ===== Desktop Widget Clock & Date ===== */

function updateDesktopWidget() {

    const now = new Date();

    const timeElement =
        document.getElementById("widgetTime");

    const dateElement =
        document.getElementById("widgetDate");

    const weatherElement =
        document.getElementById("widgetWeather");

    if (timeElement) {
        timeElement.textContent =
            now.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit"
            });
    }

    if (dateElement) {
        dateElement.textContent =
            now.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
    }

    // Reuse existing weather display if available
    const existingWeather =
        document.querySelector(".weather-box");

    if (weatherElement && existingWeather) {
        weatherElement.textContent =
            existingWeather.textContent.trim() ||
            "Weather information";
    }
}

updateDesktopWidget();

setInterval(updateDesktopWidget, 1000);
=======
>>>>>>> 9e62f7fab186d8ccda42944429dbaa4f1410ed22
