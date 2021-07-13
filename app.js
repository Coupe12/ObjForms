//Book constructor 
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//Ui consstructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');

  //Create tr element 
  const row = document.createElement('tr');

  //insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

  list.appendChild(row);

}

//Show Alerts
UI.prototype.showAlert = function(message, className) {
  //Create div
  const div = document.createElement('div');

  //class Name 
  div.className = `alert ${className}`;

  //Add classes
  div.appendChild(document.createTextNode(message));

  //Get parent
  const container = document.querySelector('.container')

  //Get form
  const form = document.querySelector('#book-form');

  //Insert alert
  container.insertBefore(div, form);

  //Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

//Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

function Store() {

}

Store.prototype.getBooks = function() {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
}

store = new Store();









//Event listeners\
document.getElementById('book-form').addEventListener('submit',
  function(e) {
    const title = document.getElementById('title').value,
      author = document.getElementById('author').value,
      isbn = document.getElementById('isbn').value


    //Instantiate Book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    const ui = new UI();

    //Validate 
    if (title === '' || author === '' || isbn === '') {

      //Error alert
      ui.showAlert('Please fill in all fields', 'error');

    } else {

      //Add book to list 
      ui.addBookToList(book);

      //Show success
      ui.showAlert('Book Added!', 'success');

      //Clear fields
      ui.clearFields();



    }

    e.preventDefault();
  }
)

//Event Listener for Delete
document.getElementById('book-list').addEventListener('click',
  function(e) {


    const ui = new UI();


    //Delete book
    ui.deleteBook(e.target);

    //Show message
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
  })