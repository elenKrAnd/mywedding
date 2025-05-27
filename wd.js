
const splash = document.getElementById('splash-screen');
const circle = document.getElementById('slider-circle');

let isDragging = false;
let startX = 0;
let currentX = 0;
const maxSlide = 200; // сколько пикселей тянуть вправо

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

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const drinks = formData.getAll("drink");

    console.log("Форма отправлена!");
    console.log("Имя:", data.name);
    console.log("Будет ли присутствовать:", data.attendance);
    console.log("Гость:", data.guestName || "Без гостя");
    console.log("Предпочтения:", drinks.join(", ") || "Не выбрано");
    console.log("Ваш вариант", data.typedrink);

    alert("Спасибо! Ваша заявка отправлена.");
    form.reset();
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
