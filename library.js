let myLibrary = [];

updateBooks();

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

const input = document.querySelector(".input");
input.addEventListener("submit", (field) => {
  field.preventDefault();
  const title = input.title.value;
  const author = input.author.value;
  const pages = input.pages.value;

  const book = new Book(title, author, pages);

  if (checkIfBookInLibrary(book)) {
    alert("This book already in library");
    return;
  }

  if (title && author && pages) {
    addBookToLibrary(title, author, pages);
  } else {
    alert("Book need more information!");
  }
});

document
  .querySelector("#toggle-selected-read")
  .addEventListener("click", () => {
    toggleRead();
  });

document.querySelector("#remove-selected").addEventListener("click", () => {
  removeSelected();
});

function addBookToLibrary(title, author, pages) {
  myLibrary.push(new Book(title, author, pages));
  updateBooks();
}

function updateBooks() {
  document.querySelectorAll(".book").forEach((book) => {
    document.querySelector(".books").removeChild(book);
  });
  for (let i = 0; i < myLibrary.length; i++) {
    const bookElement = createBookInfo(myLibrary[i], i);
    document.querySelector(".books").appendChild(bookElement);

    if (myLibrary[i].read) {
      document.getElementById(`read-${i}`).textContent = "Read";
      bookElement.classList.add("read");
    }
  }
}

function capitalize(string) {
  let new_string = string.toUpperCase();
  if (string) {
    new_string = string[0].toUpperCase();
    new_string += string.slice(1).toLowerCase();
  }

  return new_string + ":";
}

function createBookInfo(book, index) {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.setAttribute("id", index);

  bookEvent(bookElement, index);
  for (const info in book) {
    if (info === "read") {
      continue;
    }
    const info_box = document.createElement("div");
    info_box.classList.add("info-box");

    const info_name = document.createElement("div");
    info_name.textContent = capitalize(info);
    info_name.classList.add("info-title");

    const info_content = document.createElement("p");
    info_content.textContent = book[info];
    info_content.classList.add("info");

    info_box.appendChild(info_name);
    info_box.appendChild(info_content);
    bookElement.appendChild(info_box);
  }
  let read = document.createElement("div");
  read.classList.add("read-text");
  read.setAttribute("id", `read-${index}`);
  bookElement.appendChild(read);

  return bookElement;
}

function bookEvent(book, id) {
  book.addEventListener("click", () => {
    book.classList.toggle("selected");
  });
}

function toggleRead() {
  for (let i = 0; i < myLibrary.length; i++) {
    let bookElement = document.getElementById(i);
    if (bookElement.classList.contains("selected")) {
      bookElement.classList.toggle("read");
      myLibrary[i].read = true;
    }

    bookElement.classList.remove("selected");

    const read = document.querySelector(`#read-${i}`);

    if (bookElement.classList.contains("read")) {
      read.textContent = "Read";
    } else {
      read.textContent = "";
    }
  }
}

function removeSelected() {
  for (let i = 0; i < myLibrary.length; i++) {
    let book = document.getElementById(i);
    if (book.classList.contains("selected")) {
      delete myLibrary[i];
    }
  }

  myLibrary = myLibrary.filter((element) => element);

  updateBooks();
}

function checkIfBookInLibrary(newBook) {
  let exist = false;
  myLibrary.forEach((book) => {
    if (
      book.title === newBook.title &&
      book.author === newBook.author &&
      book.pages === newBook.pages
    ) {
      exist = true;
    }
  });

  return exist;
}
