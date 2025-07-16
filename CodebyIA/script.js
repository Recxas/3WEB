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
