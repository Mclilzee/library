let myLibrary = [];

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

function addBookToLibrary(title, author, pages) {

  myLibrary.push(new Book(title, author, pages));
}

for (let i = 1; i <= 10; i++) {
  addBookToLibrary(i, i, i * 100);
}

myLibrary.forEach((book) => {
  let bookElement = document.createElement("div");
  bookElement.classList.add("book");
  
  for (let info in book) {
    let info_box = document.createElement("div");
    info_box.classList.add("info-box");
    let info_name = document.createElement("div");
    info_name.textContent = capitalize(info);
    let info_content = document.createElement("div");
    info_content.textContent = book[info] + " yesssssssssssssssssssssssssss";

    info_box.appendChild(info_name);
    info_box.appendChild(info_content);
    bookElement.appendChild(info_box);
  }
  document.querySelector(".books").appendChild(bookElement);
});

function capitalize(string) {
  let new_string = string.toUpperCase();
  if (string) {
    new_string = string[0].toUpperCase();
    new_string += string.slice(1).toLowerCase();
  }

  return new_string + ":";
}


