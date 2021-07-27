{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      booksPanel: '.books-list',
    },

    book: {
      image: '.books-list .book__image',
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const favoriteBooks = [];

  function render(){

    for(const data of dataSource.books){
      /*generate HTML based on template */
      const generateHTML = templates.book(data);
      
      /*create element using utils.createElementFromHTML */
      const elementHTML = utils.createDOMFromHTML(generateHTML);
      /*find menu container */
      const menuContainer = document.querySelector(select.containerOf.booksPanel);
      console.log('menuContainer: ', menuContainer);
      /*add element to menu */
      menuContainer.appendChild(elementHTML);
    }
  }
  
  function initActions(){
    const booksList = document.querySelectorAll(select.book.image);  
    //for every element of book image in books-list
    for(const element of booksList){
      //add EventListener for every element on double klick
      element.addEventListener('dblclick', function(event){
        //prevent default
        event.preventDefault();
        //add this element to favoriteBooks
        const bookId = element.getAttribute('data-id');
        favoriteBooks.push(bookId);
        //add class favorite
        
        if(bookId != null && bookId != favoriteBooks)element.classList.add('favorite');
        
        
        console.log('ID\'s', favoriteBooks);
      });
    }

  }
  render();
  initActions();
}