  const form = document.getElementById('fanart-form');
  const pseudo = document.getElementById('pseudo');
  const email = document.getElementById('email');
  const fileInput = document.getElementById('file');
  const social = document.getElementById('social');
  const uploadBox = document.getElementById('upload-box');

  // Fonction pour créer un message d'erreur sous un input
  function showError(input, message) {
    // Supprimer l'ancien message d'erreur s'il existe
    let error = input.parentElement.querySelector('.error-message');
    if (error) error.remove();

    // Créer un élément span pour le message d'erreur
    const span = document.createElement('span');
    span.className = 'error-message';
    span.style.color = 'red';
    span.style.fontSize = '0.85rem';
    span.textContent = message;

    // Ajouter le message après l'input
    input.parentElement.appendChild(span);
  }

  // Fonction pour enlever le message d'erreur
  function clearError(input) {
    let error = input.parentElement.querySelector('.error-message');
    if (error) error.remove();
  }

  // Validation au submit
  form.addEventListener('submit', function(e) {
    let valid = true;

    // Reset erreurs précédentes
    [pseudo, email, fileInput, social].forEach(clearError);

    // Validation Pseudo (min 3 caractères)
    if (!pseudo.value || pseudo.value.trim().length < 3) {
      showError(pseudo, "Le pseudo doit contenir au moins 3 caractères.");
      valid = false;
    }

    // Validation Email (format simple)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailPattern.test(email.value.trim())) {
      showError(email, "Veuillez saisir une adresse email valide.");
      valid = false;
    }

    // Validation fichier
    if (!fileInput.files || fileInput.files.length === 0) {
      showError(uploadBox, "Veuillez sélectionner un fichier image.");
      valid = false;
    } else {
      const file = fileInput.files[0];
      const allowedTypes = ['image/png', 'image/jpeg'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        showError(uploadBox, "Seuls les fichiers PNG et JPEG sont acceptés.");
        valid = false;
      }
      if (file.size > maxSize) {
        showError(uploadBox, "Le fichier ne doit pas dépasser 5 Mo.");
        valid = false;
      }
    }

    // Validation URL réseau social (format basique)
    try {
      const url = new URL(social.value.trim());
    } catch {
      showError(social, "Veuillez saisir une URL valide.");
      valid = false;
    }

    if (!valid) {
      e.preventDefault(); // Empêche l'envoi du formulaire si erreur
    }
  });

  // Pour ouvrir la sélection de fichier en cliquant sur la zone d'upload
  uploadBox.addEventListener('click', () => fileInput.click());