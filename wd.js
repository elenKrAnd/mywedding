
const splash = document.getElementById('splash-screen');
const circle = document.getElementById('slider-circle');

let isDragging = false;
let startX = 0;
let currentX = 0;
let maxSlide = 400; // значение будет обновлено ниже

function updateMaxSlide() {
  maxSlide = window.innerWidth < 480 ? 100 : 400;
}

window.addEventListener('resize', updateMaxSlide);
updateMaxSlide(); // вызвать при старте

function setCirclePosition(x) {
  circle.style.left = `${Math.min(x, maxSlide)}px`;
}

function resetSlider() {
  circle.style.transition = 'left 0.3s ease';
  circle.style.left = '5px';
  setTimeout(() => {
    circle.style.transition = '';
  }, 300);
}


function completeSlide() {
  splash.classList.add('fade-out');
  splash.style.pointerEvents = 'none';
  setTimeout(() => {
    splash.style.display = 'none';
  }, 1000);
}


function onMove(x) {
  if (!isDragging) return;
  currentX = x - startX;
  if (currentX > maxSlide) {
    completeSlide();
    isDragging = false;
  } else if (currentX > 0) {
    setCirclePosition(currentX);
  }
}

// Touch
circle.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

window.addEventListener('touchmove', (e) => {
  if (isDragging) onMove(e.touches[0].clientX);
});

window.addEventListener('touchend', () => {
  if (currentX < maxSlide) resetSlider();
  isDragging = false;
});

// Mouse
circle.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

window.addEventListener('mousemove', (e) => {
  if (isDragging) onMove(e.clientX);
});

window.addEventListener('mouseup', () => {
  if (currentX < maxSlide) resetSlider();
  isDragging = false;
});



document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.fade-in-on-scroll').forEach(elem => {
    observer.observe(elem);
  });
});

const carousels = {
  'carousel-girls': {
    index: 0,
    total: 0,
    images: [],
    container: null,
    counter: null
  },
  'carousel-boys': {
    index: 0,
    total: 0,
    images: [],
    container: null,
    counter: null
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("rsvpForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const drinks = formData.getAll("drink");
    const typedrink = formData.get("typedrink");
    const payload = {
      fio: formData.get("name"),
      willGo: formData.get("attendance") === "yes",
      withWhom: formData.get("guestName") || "",
      preferences: [...drinks, typedrink].filter(Boolean).join(", ")
    };

    try {
      const response = fetch("https://wedding.noxly.ru/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      alert("Спасибо! Заявка отправлена.");
    } catch (err) {
      alert("Не удалось отправить. Попробуйте позже.");
    }
  });
});


// Укажи здесь дату свадьбы
const weddingDate = new Date("2025-08-27T00:00:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    document.getElementById("timer").innerHTML = "Счастливого дня свадьбы!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").textContent = days.toString().padStart(2, '0');
  document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer(); // для запуска сразу при загрузке

const slides = document.querySelectorAll('.wish-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');

let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  pageIndicator.textContent = `${index + 1} / ${slides.length}`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

// Инициализация
showSlide(currentIndex);
