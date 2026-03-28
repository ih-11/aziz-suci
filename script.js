const DEFAULT_GUEST = "Bapak / Ibu / Saudara / i";
const WEDDING_DATE = "2026-06-01";
const WEDDING_TIME = "08:00:00";

// Format date to Indonesian
function formatTanggalIndonesia(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Read guest name from URL
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("to");

  if (name && name.trim() !== "") {
    return decodeURIComponent(name.trim());
  }

  return DEFAULT_GUEST;
}

// Apply guest name to page
const guestName = getGuestName();
document.getElementById("guest-name").textContent = guestName;
document.getElementById("guest-name-inline").textContent = guestName;
document.getElementById("footer-guest-name").textContent = guestName;

if (guestName !== DEFAULT_GUEST) {
  document.getElementById("rsvpName").value = guestName;
}

// Apply Indonesian-formatted dates
const tanggalFormatted = formatTanggalIndonesia(WEDDING_DATE);
document.getElementById("cover-date").textContent = tanggalFormatted;
document.getElementById("akad-date").textContent = tanggalFormatted;
document.getElementById("resepsi-date").textContent = tanggalFormatted;

// Open invitation logic
const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

let musicPlaying = false;

openBtn.addEventListener("click", () => {
  cover.classList.add("fade-out");

  setTimeout(() => {
    cover.style.display = "none";
    mainContent.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 800);

  music.play()
    .then(() => {
      musicPlaying = true;
      musicToggle.textContent = "Music: On";
    })
    .catch(() => {
      musicPlaying = false;
      musicToggle.textContent = "Music: Off";
      console.log("Music file missing or browser blocked playback.");
    });
});

// Music toggle
musicToggle.addEventListener("click", () => {
  if (!musicPlaying) {
    music.play()
      .then(() => {
        musicPlaying = true;
        musicToggle.textContent = "Music: On";
      })
      .catch(() => {
        console.log("Music file missing or browser blocked playback.");
      });
  } else {
    music.pause();
    musicPlaying = false;
    musicToggle.textContent = "Music: Off";
  }
});

// Countdown
const targetDate = new Date(`${WEDDING_DATE}T${WEDDING_TIME}`).getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// RSVP demo submit
const rsvpForm = document.getElementById("rsvpForm");
const rsvpStatus = document.getElementById("rsvpStatus");

rsvpForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("rsvpName").value.trim();
  const attendance = document.getElementById("attendance").value;
  const message = document.getElementById("message").value.trim();

  if (!name) {
    rsvpStatus.textContent = "Silakan isi nama terlebih dahulu.";
    return;
  }

  rsvpStatus.textContent =
    `Terima kasih, ${name}. Kehadiran Anda tercatat sebagai "${attendance}" pada demo ini.`;

  console.log({
    name,
    attendance,
    message
  });
});

// Scroll reveal animation
const fadeElements = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach((el) => observer.observe(el));