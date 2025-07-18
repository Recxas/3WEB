// Creation d'une bibliothèque
const library = [];

// Fonction qui ajoute un livre dans la bibliothèque
function addBook(book) {

    library.push(book);
}

// Fonction qui ajoute un livre à partir des inputs dans la bibliothèque
function addBookFromInputs() {
    const title = document.getElementById('titleInput').value.trim();
    const author = document.getElementById('authorInput').value.trim();
    const year = document.getElementById('yearInput').value.trim();
    const book = { title, author, year, borrowed: false };
    addBook(book);
    document.getElementById('titleInput').value = "";
    document.getElementById('authorInput').value = "";
    document.getElementById('yearInput').value = "";
    console.log("Livre ajouté :", book);
    console.log(library);
}

// Fonction qui recherche un livre par son titre
function findBookByTitle() {
  const title = document.getElementById('searchInput').value.trim();
  for (let i = 0; i < library.length; i++) {
    const book = library[i];
    if (book.title.toLowerCase().trim() === title.toLowerCase()) {
      console.log("Le livre que vous recherchez est :", book);
      return book;
    }
  }
  console.log("Livre non trouvé.");
  return null;
}

// Fonction qui marque un livre comme non emprunté
function getAvailableBooks() {
    for (let i = 0; i < library.length; i++) {
        const book = library[i];
     if (book.borrowed === false) {
            console.log("les livres disponibles sont",book);
        }
      }
}
// Fonction qui marque le livre comme emprunté
function getUnavailableBooks() {
    for (let i = 0; i < library.length; i++) {
        const book = library[i];
        if (book.borrowed === true) {
                console.log("les livres indisponibles sont",book);            
            }           
          }
}

// Fonction qui permet de changer le borrowed d'un livre
function toggleBorrowedStatus() {    
    for (let i = 0; i < library.length; i++) {
        const book = library[i];
        if (book.borrowed === true ) {
            book.borrowed = false;
            console.log("Le livre", book.title, "a été retourné.");
        }
        else {
            book.borrowed = true;
            console.log("Le livre", book.title, "a été emprunté.");
        }
      }
}



addBook({
  title : "Le Petit Prince",
  author : "Antoine de Saint-Exupéry",
  year : 1943,
  borrowed: false   
})

addBook({
  title : "Prince",
  author : "Antoine ",
  year : 1941,
  borrowed: false   
})
addBook({
    title : "1984",
    author : "George Orwell",
    year : 1949,
    borrowed: true   
})

console.log(library);


addBookFromInputs();
getAvailableBooks();
getUnavailableBooks();

const titreRecherche = document.getElementById('searchInput').value;
console.log("Le livre que vous recherchez est ", findBookByTitle(titreRecherche));
document.getElementById('result').innerHTML = "Le livre que vous recherchez est " + findBookByTitle(titreRecherche).book.title;