const DEFAULT_GUEST = "Bapak / Ibu / Saudara / i";

const AKAD_DATE = "2026-06-02";
const RESEPSI_DATE = "2026-06-03";

const WEDDING_TIME = "08:00:00";

const API_URL =
  "https://script.google.com/macros/s/AKfycbx-9zt-P7oW8LU7a_a6NJlA8YmQTqnRLzFuxPyVsJHCmZEcXbj3M2x8OMBR9_vcz7muJQ/exec";

function formatTanggalIndonesia(dateString) {

  const [year, month, day] =
    dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

// Ambil nama tamu dari URL
function getGuestName() {

  const params =
    new URLSearchParams(window.location.search);

  const name = params.get("to");

  if (name && name.trim() !== "") {
    return decodeURIComponent(name.trim());
  }

  return DEFAULT_GUEST;
}

// Terapkan nama tamu
const guestName = getGuestName();

document.getElementById("guest-name").textContent =
  guestName;

document.getElementById("guest-name-inline").textContent =
  guestName;

document.getElementById("footer-guest-name").textContent =
  guestName;

if (guestName !== DEFAULT_GUEST) {
  document.getElementById("rsvpName").value =
    guestName;
}

// Terapkan tanggal Indonesia
const akadFormatted =
  formatTanggalIndonesia(AKAD_DATE);

const resepsiFormatted =
  formatTanggalIndonesia(RESEPSI_DATE);

document.getElementById("cover-date").textContent =
  akadFormatted;

document.getElementById("akad-date").textContent =
  akadFormatted;

document.getElementById("resepsi-date").textContent =
  resepsiFormatted;

// Logic buka undangan
const openBtn =
  document.getElementById("openBtn");

const cover =
  document.getElementById("cover");

const mainContent =
  document.getElementById("mainContent");

const music =
  document.getElementById("bgMusic");

const musicToggle =
  document.getElementById("musicToggle");

let musicPlaying = false;

openBtn.addEventListener("click", () => {

  cover.classList.add("fade-out");

  setTimeout(() => {

    cover.style.display = "none";

    mainContent.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 800);

  music.play()
    .then(() => {

      musicPlaying = true;

      musicToggle.textContent =
        "Music: On";

    })
    .catch(() => {

      musicPlaying = false;

      musicToggle.textContent =
        "Music: Off";

    });

});

// Toggle musik
musicToggle.addEventListener("click", () => {

  if (!musicPlaying) {

    music.play()
      .then(() => {

        musicPlaying = true;

        musicToggle.textContent =
          "Music: On";

      });

  } else {

    music.pause();

    musicPlaying = false;

    musicToggle.textContent =
      "Music: Off";

  }

});

// Countdown
const targetDate = new Date(
  `${AKAD_DATE}T${WEDDING_TIME}+07:00`
).getTime();

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

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (distance / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (distance / 1000) % 60
  );

  document.getElementById("days").textContent =
    days;

  document.getElementById("hours").textContent =
    hours;

  document.getElementById("minutes").textContent =
    minutes;

  document.getElementById("seconds").textContent =
    seconds;
}

updateCountdown();

setInterval(updateCountdown, 1000);

// Guestbook
const rsvpForm =
  document.getElementById("rsvpForm");

const rsvpStatus =
  document.getElementById("rsvpStatus");

const guestbookList =
  document.getElementById("guestbookList");

function createGuestbookItem(
  name,
  attendance,
  message
) {

  const item =
    document.createElement("div");

  item.classList.add("guestbook-item");

  item.innerHTML = `
    <h4 class="guestbook-name">
      ${name}
    </h4>

    <span class="guestbook-attendance">
      ${attendance}
    </span>

    <p class="guestbook-message">
      ${message}
    </p>
  `;

  return item;
}

// Load existing guestbook
async function loadGuestbook() {

  try {

    const response =
      await fetch(API_URL);

    const data =
      await response.json();

    guestbookList.innerHTML = "";

    if (data.length === 0) {

      guestbookList.innerHTML = `
        <p class="guestbook-empty">
          Belum ada ucapan.
        </p>
      `;

      return;
    }

    data.forEach((item) => {

      const guestItem =
        createGuestbookItem(
          item.name,
          item.attendance,
          item.message
        );

      guestbookList.appendChild(
        guestItem
      );

    });

  } catch (error) {

    console.error(error);

  }

}

loadGuestbook();

// Submit RSVP
rsvpForm.addEventListener(
  "submit",
  async function (event) {

    event.preventDefault();

    const name =
      document.getElementById("rsvpName")
      .value
      .trim();

    const attendance =
      document.getElementById("attendance")
      .value;

    const message =
      document.getElementById("message")
      .value
      .trim();

    if (!name) {

      rsvpStatus.textContent =
        "Silakan isi nama.";

      return;
    }

    if (!message) {

      rsvpStatus.textContent =
        "Silakan isi ucapan.";

      return;
    }

    rsvpStatus.textContent =
      "Mengirim ucapan...";

    try {

      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
          name,
          attendance,
          message
        })
      });

      rsvpStatus.textContent =
        "Ucapan berhasil dikirim.";

      document.getElementById("message")
        .value = "";

      loadGuestbook();

    } catch (error) {

      rsvpStatus.textContent =
        "Gagal mengirim ucapan.";

      console.error(error);

    }

  }
);

// Animasi scroll
const fadeElements =
  document.querySelectorAll(".fade-section");

const observer =
  new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  }, {
    threshold: 0.2
  });

fadeElements.forEach((el) =>
  observer.observe(el)
);