/* Utiles de selección */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* Año actual */
$("#currentYear").textContent = new Date().getFullYear();

/* ==== Contador (años/meses/días/horas) desde data-start-date ==== */
/* ==== Contador de tiempo juntos (años, meses, días, horas, minutos y segundos) ==== */
(function initCounter() {
  const startStr = "2024-09-21"; // Cambia la fecha de inicio, en este caso el primer aniversario
  const start = new Date(startStr + "T00:00:00");

  function diffParts(from, to) {
    // Años, meses, días, horas, minutos y segundos
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
      days += prevMonth;
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    const ms = to - from;
    const totalDays = Math.floor(ms / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(ms / (1000 * 60 * 60));
    const totalMinutes = Math.floor(ms / (1000 * 60));
    const totalSeconds = Math.floor(ms / 1000);

    return {
      years,
      months,
      days: totalDays,
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds,
    };
  }

  function render() {
    const now = new Date();
    const p = diffParts(start, now);
    $("#years").textContent = p.years;
    $("#months").textContent = p.months + p.years * 12;
    $("#days").textContent = p.days;
    $("#hours").textContent = p.hours % 24;
    $("#minutes").textContent = p.minutes % 60;
    $("#seconds").textContent = p.seconds % 60;
  }

  render();
  setInterval(render, 1000); // Actualiza cada segundo
})();

/* ==== Reveal on scroll (IntersectionObserver) ==== */
(function revealOnScroll() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("reveal--visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("reveal--visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
})();

/* ==== Parallax suave en el header ==== */
(function parallaxHeader() {
  const container = $(".parallax-hearts");
  if (!container) return;
  const items = $$("span", container);
  document.addEventListener("mousemove", (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = e.clientX / w - 0.5;
    const y = e.clientY / h - 0.5;
    items.forEach((el, i) => {
      const depth = (i + 1) * 6; // distinto para cada emoji
      el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
})();

/* ==== Lightbox sencillo para la galería ==== */
(function lightbox() {
  const dlg = $("#lightbox");
  const img = $("#lbImg");
  const close = $("#lbClose");
  if (!dlg || !img) return;

  $$(".photo-gallery img").forEach((th) => {
    th.addEventListener("click", () => {
      img.src = th.dataset.full || th.src;
      img.alt = th.alt || "Foto";
      dlg.showModal();
    });
  });

  close?.addEventListener("click", () => dlg.close());
  dlg?.addEventListener("click", (e) => {
    const r = img.getBoundingClientRect();
    const inside =
      e.clientX >= r.left &&
      e.clientX <= r.right &&
      e.clientY >= r.top &&
      e.clientY <= r.bottom;
    if (!inside) dlg.close();
  });
})();

/* ==== Barra de progreso de lectura ==== */
(function readingProgress() {
  const bar = $("#progressBar");
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.max(0, Math.min(1, scrollTop / height));
    bar.style.width = pct * 100 + "%";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();

/* ==== Corazones al hacer click en cualquier parte ==== */
(function clickHearts() {
  const layer = $("#clickHearts");
  const EMOJIS = ["❤️", "💖", "💘", "💕", "💞", "💝"];
  function burst(x, y, n = 14) {
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      el.className = "click-heart";
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const angle = Math.random() * Math.PI - Math.PI / 2; // hacia arriba
      const distance = 60 + Math.random() * 80;
      const tx = Math.cos(angle) * distance;
      const ty =
        -Math.abs(Math.sin(angle) * distance) - (40 + Math.random() * 40);

      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.setProperty("--tx", `calc(-50% + ${tx}px)`);
      el.style.setProperty("--ty", `calc(-50% + ${ty}px)`);

      layer.appendChild(el);
      setTimeout(() => el.remove(), 1300);
    }
  }

  // click global (evita botones/links/inputs)
  document.addEventListener("click", (e) => {
    if (e.target.closest("button, a, input, textarea, dialog")) return;
    burst(e.clientX, e.clientY, 16);
  });
})();

/* ==== Fondo: corazones flotantes en canvas (liviano) ==== */
(function bgHearts() {
  const canvas = $("#bgHearts");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width,
    height,
    DPR = Math.min(window.devicePixelRatio || 1, 2);
  let hearts = [];
  const N = 60;

  function resize() {
    width = canvas.clientWidth = window.innerWidth;
    height = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(width * DPR);
    canvas.height = Math.floor(height * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  function makeHeart(x = Math.random() * width, y = Math.random() * height) {
    const s = 6 + Math.random() * 10;
    return {
      x,
      y,
      vx: (-0.5 + Math.random()) * 0.3,
      vy: -0.15 - Math.random() * 0.35,
      size: s,
      rot: Math.random() * Math.PI,
      rotSpeed: (-0.5 + Math.random()) * 0.02,
      alpha: 0.35 + Math.random() * 0.35,
      hue: 330 + Math.random() * 20,
    };
  }

  for (let i = 0; i < N; i++) hearts.push(makeHeart());

  function drawHeart(x, y, size, rot, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.scale(size / 16, size / 16);
    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.bezierCurveTo(0, -4, 12, -4, 12, 4);
    ctx.bezierCurveTo(12, 10, 6, 14, 0, 16);
    ctx.bezierCurveTo(-6, 14, -12, 10, -12, 4);
    ctx.bezierCurveTo(-12, -4, 0, -4, 0, 4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.shadowColor = "rgba(236,64,122,.45)";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    hearts.forEach((h) => {
      h.x += h.vx;
      h.y += h.vy;
      h.rot += h.rotSpeed;
      if (h.y < -20 || h.x < -20 || h.x > width + 20) {
        h.x = Math.random() * width;
        h.y = height + 20;
      }
      drawHeart(
        h.x,
        h.y,
        h.size,
        h.rot,
        `hsla(${h.hue}, 85%, 65%, ${h.alpha})`
      );
    });
    requestAnimationFrame(step);
  }
  step();
})();

/* ==== Flores Amarillas Flotantes (al hacer clic) ==== */
(function createFlowers() {
  const layer = document.getElementById("floatingFlowers");
  const EMOJIS = ["🌸", "🌼", "💐", "🌻", "🌺"];

  function burst(x, y, n = 10) {
    for (let i = 0; i < n; i++) {
      const flower = document.createElement("div");
      flower.className = "flower";
      flower.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

      const angle = Math.random() * Math.PI - Math.PI / 2; // dirección hacia arriba
      const distance = 50 + Math.random() * 150;
      const tx = Math.cos(angle) * distance;
      const ty =
        -Math.abs(Math.sin(angle) * distance) - (40 + Math.random() * 40);

      flower.style.left = `${x}px`;
      flower.style.top = `${y}px`;
      flower.style.setProperty("--tx", `calc(-50% + ${tx}px)`);
      flower.style.setProperty("--ty", `calc(-50% + ${ty}px)`);

      layer.appendChild(flower);
      setTimeout(() => flower.remove(), 4000); // Eliminar después de la animación
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("button, a, input, textarea, dialog")) return;
    burst(e.clientX, e.clientY, 15); // Crea flores donde haga clic
  });

  // Flores al presionar el botón "Presiona aquí"
  document.getElementById("heartButton").addEventListener("click", function () {
    const rect = this.getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);
    showModal(); // Muestra el modal con flores
  });

  // Función para mostrar el modal con flores
  function showModal() {
    const modal = document.getElementById("flowerModal");
    if (modal) {
      modal.showModal();
      setTimeout(() => {
        burst(window.innerWidth / 2, window.innerHeight / 2, 30); // Flores al abrir el modal
      }, 200);
    }
  }

  // Cerrar el modal
  document.getElementById("modalClose").addEventListener("click", () => {
    const modal = document.getElementById("flowerModal");
    if (modal) modal.close();
  });
})();

/* ==== Cambiar imagen automáticamente con fade ==== */
(function changeImageAutomatically() {
  const images = [
    "img/foto1.jpeg",
    "img/foto2.jpeg",
    "img/foto3.jpeg",
    "img/foto4.jpeg",
    "img/foto5.jpeg",
    "img/foto6.jpeg",
    "img/foto7.jpeg",
    "img/foto8.jpeg",
    "img/foto9.jpeg",
    "img/foto10.jpeg",
    "img/foto11.jpeg",
  ]; // Aquí puedes poner las rutas de todas tus imágenes.

  const changingImageElement = document.getElementById("changingImage");
  let currentImageIndex = 0;

  // Función para cambiar la imagen
  function changeImage() {
    const imgElement = changingImageElement.querySelector("img");

    // Desaparece la imagen actual (efecto fade-out)
    imgElement.classList.add("fade-out");

    // Después de que la imagen desaparezca, cambiamos la imagen
    setTimeout(() => {
      // Actualizar la fuente de la imagen
      imgElement.src = images[currentImageIndex];
      imgElement.alt = "Imagen cambiada"; // Cambia el alt si lo deseas

      // Vuelve a aparecer la nueva imagen (efecto fade-in)
      imgElement.classList.remove("fade-out");
      imgElement.classList.add("fade-in");

      // Cambiar al siguiente índice de la imagen
      currentImageIndex = (currentImageIndex + 1) % images.length;
    }, 1000); // Tiempo del fade-out (1 segundo)
  }

  // Cambiar la imagen cada 5 segundos
  setInterval(changeImage, 5000); // Cambia la imagen cada 5 segundos
})();
