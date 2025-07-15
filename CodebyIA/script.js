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
