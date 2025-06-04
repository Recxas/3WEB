// Déclaration des questions
const questions = [
    {
        question: "Quelle est la capitale de la France ?",
        answers: ["Paris", "Londres", "Madrid"],
        correctIndex: 0
    },
    {
        question: "Combien de pattes a une araignée ?",
        answers: ["6", "8", "10"],
        correctIndex: 1
    }
];

// Création des variables
let currentQuestionIndex = 0;
let score = 0;

// Récupère les éléments HTML
const questionText = document.getElementById("question-text");
const feedbackText = document.getElementById("feedback-text");
const buttons = document.querySelectorAll(".answer-button");
const nextButton = document.getElementById("next-button");

// Création du bouton "Recommencer"
const restartButton = document.createElement("button");
restartButton.id = "restart-button";
restartButton.textContent = "Recommencer";
restartButton.style.display = "none";
document.body.appendChild(restartButton); // Ajoute le bouton à la fin du <body>

// Déclaration de la fonction 'showQuestion()'
function showQuestion() {
    // Stock la valeur de la question actuelle
    const currentQuestion = questions[currentQuestionIndex];

    // Met à jour le texte de la question actuelle
    questionText.textContent = currentQuestion.question;
    feedbackText.textContent = "";

    // Récupère chacun des boutons de réponse
    buttons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index]; // Met à jour le texte
        button.disabled = false; // Rend les boutons cliquables
        button.style.backgroundColor = ""; // Réinitialise la couleur de fond
        button.style.display = "inline-block"; // Réaffiche les boutons s'ils avaient été masqués
    });

    // Masque les autres boutons
    nextButton.style.display = "none";
    restartButton.style.display = "none";
}

// Parcours les 3 boutons
buttons.forEach(button => {
    button.addEventListener("click", () => { // Écoute le clic
        // Récupère et stock l'indice du bouton cliqué
        const selectedIndex = parseInt(button.dataset.index);

        // Récupère et stock l'indice de la bonne réponse
        const correctIndex = questions[currentQuestionIndex].correctIndex;

        // Si la réponse cliquée est correcte
        if (selectedIndex === correctIndex) {
            feedbackText.textContent = "Bonne réponse !"; // Met à jour le texte
            score++; // Incrémente le score
            button.style.backgroundColor = "green"; // Vert si bonne réponse
        } else {
            feedbackText.textContent = "Mauvaise réponse.";
            button.style.backgroundColor = "red"; // Rouge si mauvaise réponse
        }

        // Désactive tous les boutons
        buttons.forEach(b => b.disabled = true);

        // Affiche le bouton "Question suivante"
        nextButton.style.display = "inline-block";
    });
});

// Gère le clic sur "Question suivante"
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    // S'il reste des questions
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        // Fin du quiz
        questionText.textContent = "Quiz terminé !";
        feedbackText.textContent = `Votre score est ${score} / ${questions.length}`;
        buttons.forEach(b => b.style.display = "none"); // Cache les boutons
        nextButton.style.display = "none"; // Cache le bouton "suivant"
        restartButton.style.display = "inline-block"; // Affiche "Recommencer"
    }
});

// Gère le clic sur "Recommencer"
restartButton.addEventListener("click", () => {
    // Réinitialise les variables
    currentQuestionIndex = 0;
    score = 0;

    // Réaffiche les boutons
    buttons.forEach(b => {
        b.style.display = "inline-block";
    });

    // Recharge la première question
    showQuestion();
});

// Appel initial
showQuestion();
