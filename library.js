let myLibrary = [];

for (let i = 1; i <= 10; i++) {
  addBookToLibrary(i, i, i * 100);
}

updateBooks();

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

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
    book.classList.toggle("read");
    const read = document.querySelector(`#read-${id}`);

    if (book.classList.contains("read")) {
      read.textContent = "Read";
    } else {
      read.textContent = "";
    }
  });
}
