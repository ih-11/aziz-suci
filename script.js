// ======================================================
// HOW THIS WORKS
// guests.txt -> generate_links.py -> URL like:
// https://your-site.pages.dev/?to=Ibnu%20Halim
//
// Then this script reads ?to=... and shows it on the page
// ======================================================

const DEFAULT_GUEST = "Bapak / Ibu / Saudara / i";

// Read guest name from URL
function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("to");

  if (name && name.trim() !== "") {
    return decodeURIComponent(name.trim());
  }

  return DEFAULT_GUEST;
}

const guestName = getGuestName();

// Put guest name in multiple places
document.getElementById("guest-name").textContent = guestName;
document.getElementById("guest-name-inline").textContent = guestName;
document.getElementById("footer-guest-name").textContent = guestName;

// Prefill RSVP name only if URL has real guest name
if (guestName !== DEFAULT_GUEST) {
  document.getElementById("rsvpName").value = guestName;
}

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
const targetDate = new Date("2026-03-29T08:00:00").getTime();

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

// RSVP mock submit
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