const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");
const form = document.querySelector("#contactForm");
const statusEl = document.querySelector("#formStatus");
const serviceForm = document.querySelector("#serviceForm");
const serviceStatus = document.querySelector("#serviceStatus");
const productButtons = document.querySelectorAll("[data-product]");
const sliders = document.querySelectorAll("[data-slider]");
const revealEls = document.querySelectorAll(".reveal");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-open");
  });
}

productButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const product = btn.dataset.product || "Printer";
    window.location.href = `contact.html?product=${encodeURIComponent(product)}`;
  });
});

if (form && statusEl) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    statusEl.textContent = `Thanks, ${data.name || "there"}! We’ll contact you at ${data.email}.`;
    form.reset();
  });
}

if (serviceForm && serviceStatus) {
  serviceForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(serviceForm));
    serviceStatus.textContent = `Request received for ${data.service || "service"}. We’ll reach out to ${data.email}.`;
    serviceForm.reset();
  });
}

sliders.forEach((slider) => {
  const slides = Array.from(slider.querySelectorAll(".hero__slide"));
  const dotsContainer = slider.querySelector(".slider__dots");
  const prevBtn = slider.querySelector(".slider__btn--prev");
  const nextBtn = slider.querySelector(".slider__btn--next");
  let current = 0;
  let timer;

  const goTo = (index) => {
    slides[current].classList.remove("is-active");
    dotsContainer.children[current]?.classList.remove("is-active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dotsContainer.children[current]?.classList.add("is-active");
  };

  slides.forEach((_s, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => {
      goTo(i);
      resetTimer();
    });
    dotsContainer.appendChild(dot);
  });

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const resetTimer = () => {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  };

  prevBtn?.addEventListener("click", () => {
    prev();
    resetTimer();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    resetTimer();
  });

  resetTimer();
});

if ("IntersectionObserver" in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();
/* Expand / Collapse */
document.querySelectorAll(".service-toggle").forEach(button => {
  button.addEventListener("click", () => {
    const extra = button.nextElementSibling;
    extra.classList.toggle("active");
    button.textContent = extra.classList.contains("active")
      ? "View Less"
      : "View More";
  });
});

/* Scroll Reveal */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));


  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true
  });
document.querySelectorAll('.card.product').forEach(card => {
  const inner = card.querySelector('.card-inner');
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    inner.style.setProperty('--rotateY', `${x / 20}deg`);
    inner.style.setProperty('--rotateX', `${-y / 20}deg`);
  });
  card.addEventListener('mouseleave', () => {
    inner.style.setProperty('--rotateY', `0deg`);
    inner.style.setProperty('--rotateX', `0deg`);
  });
});
const swiperSlides = document.querySelectorAll('.swiper-slide');
document.querySelectorAll('.filter-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    swiperSlides.forEach(slide => {
      if(filter === 'all' || slide.dataset.category === filter) slide.style.display = 'block';
      else slide.style.display = 'none';
    });
    swiper.update(); // refresh Swiper
  });
});
  const track = document.querySelector(".carousel-track");

  // Duplicate items for seamless infinite scroll
  track.innerHTML += track.innerHTML;
  //country code
  const phoneInput = document.querySelector("#phone");

  window.intlTelInput(phoneInput, {
    initialCountry: "in",          // Default India
    separateDialCode: true,        // +91 separate
    preferredCountries: ["in", "us", "gb", "ae"],
    utilsScript:
      "https://cdn.jsdelivr.net/npm/intl-tel-input@18.5.2/build/js/utils.js",
  });

  const cards = document.querySelectorAll('.kc');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X in card
    const y = e.clientY - rect.top;  // mouse Y in card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * 10; // Max 10deg
    const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg
    
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    card.classList.add('hovered');
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    card.classList.remove('hovered');
  });
});
  function toggleSpecs(btn) {
  const specs = btn.nextElementSibling; // the <ul> right after the button
  if (specs.style.maxHeight && specs.style.maxHeight !== "0px") {
    specs.style.maxHeight = "0";         // hide the specs
    btn.textContent = "View Details";    // change button text
  } else {
    specs.style.maxHeight = specs.scrollHeight + "px"; // show specs
    btn.textContent = "Hide Details";    // change button text
  }
}
// experience










