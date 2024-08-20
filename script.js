const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};

function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  displayBooks(); //Refresh the page to show the new book
}

function displayBooks() {
  const libraryContainer = document.getElementById("libraryContainer");
  libraryContainer.innerHTML = ""; // Clear the container

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;

    const bookPages = document.createElement("p");
    bookPages.textContent = `Pages: ${book.pages}`;

    const bookRead = document.createElement("p");
    bookRead.textContent = `Read: ${book.hasRead ? "Yes" : "No"}`;

    const toggleReadBtn = document.createElement("button");
    toggleReadBtn.textContent = "Read Status";
    toggleReadBtn.onclick = () => {
      book.toggleRead();
      displayBooks();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Book";
    removeBtn.onclick = () => {
      myLibrary.splice(index, 1);
      displayBooks();
    };

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookRead);
    bookCard.appendChild(toggleReadBtn);
    bookCard.appendChild(removeBtn);

    libraryContainer.appendChild(bookCard);
  });
}

document.getElementById("newBookBtn").addEventListener("click", () => {
  document.getElementById("formContainer").classList.toggle("hidden");
});

document.getElementById("bookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const hasRead = document.getElementById("read").checked;

  addBookToLibrary(title, author, pages, hasRead);

  document.getElementById("bookForm").reset();
  document.getElementById("formContainer").classList.add("hidden");
});

// Example books to see the display
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("1984", "George Orwell", 328, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 296, false);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 257, true);
addBookToLibrary(
  "Harry Potter and the Sorcerer's Stone",
  "J.K. Rowling",
  303,
  false
);
