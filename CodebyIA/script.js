// script apparition au défilement

document.addEventListener("DOMContentLoaded", function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Calcul du délai en fonction de l'ordre
        const delay = el.dataset.delay || 0;
        el.style.transitionDelay = `${delay}s`;
        el.classList.add('active');
        // observer.unobserve(el); // Décommente si tu veux que l'animation se joue une seule fois
      }
    });
  }, {
    threshold: 0.1
  });

  const revealElements = document.querySelectorAll('.reveal');
  
  // Attribution d'un data-delay automatique croissant
  revealElements.forEach((el, i) => {
    el.dataset.delay = i * 0.1; // 0.2s d'écart entre chaque apparition
    observer.observe(el);
  });
});

// fanartForm.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("fanart-form");
  const pseudo = document.getElementById("pseudo");
  const email = document.getElementById("email");
  const fileInput = document.getElementById("file");
  const social = document.getElementById("social");
  const uploadBox = document.getElementById("upload-box");
  const fileIcon = document.getElementById("file-icon");

  // Visuel : clique sur la boîte déclenche l'upload
  uploadBox.addEventListener("click", () => {
    fileInput.click();
  });

  // Affiche le nom du fichier sélectionné
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileIcon.textContent = "✅ Fichier sélectionné : " + fileInput.files[0].name;
    } else {
      fileIcon.textContent = "⬆️";
    }
  });

  // Envoi du formulaire
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!pseudo.value.trim() || !email.value.trim() || !fileInput.files.length || !social.value.trim()) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    alert("Fanart envoyé avec succès !");
    form.reset();
    fileIcon.textContent = "⬆️";
  });
});

const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});


const slider = document.getElementById('tipsSlider');
const btnLeft = document.querySelector('.slider-btn.left');
const btnRight = document.querySelector('.slider-btn.right');

const slideWidth = slider.querySelector('img').offsetWidth + 16; // largeur image + gap (1rem = 16px)

let isScrolling = false;

// Cloner premier et dernier élément pour boucle infinie
function cloneSlides() {
  const slides = slider.children;
  if (slides.length === 0) return;

  const first = slides[0].cloneNode(true);
  const last = slides[slides.length - 1].cloneNode(true);

  slider.appendChild(first);
  slider.insertBefore(last, slides[0]);
}

cloneSlides();

// Position initiale sur le "premier vrai" slide (car on a ajouté un clone avant)
slider.scrollLeft = slideWidth;

function scrollTips(direction) {
  if (isScrolling) return; // éviter clics multiples trop rapides
  isScrolling = true;

  slider.scrollBy({
    left: direction * slideWidth,
    behavior: 'smooth'
  });

  setTimeout(() => {
    // Quand on arrive au début (scrollLeft <= 0)
    if (slider.scrollLeft <= 0) {
      // repositionne sans animation à la fin (dernier vrai slide)
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft = slider.scrollWidth - 2 * slideWidth;
      slider.style.scrollBehavior = 'smooth';
    }

    // Quand on arrive à la fin (scrollLeft >= max)
    if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
      // repositionne sans animation au début (premier vrai slide)
      slider.style.scrollBehavior = 'auto';
      slider.scrollLeft = slideWidth;
      slider.style.scrollBehavior = 'smooth';
    }

    isScrolling = false;
  }, 400); // temps animation smooth (ajuste si besoin)
}

// Optionnel: si tu veux faire défiler aussi au swipe tactile ou auto-scroll, tu peux me demander !
