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
      favorite: '.books-list .favorite',
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  //Variables
  const favoriteBooks = [];
  const booksWrapper = document.querySelector(select.containerOf.booksPanel);

  function render(){

    for(const data of dataSource.books){
      /*generate HTML based on template */
      const generateHTML = templates.book(data);
      
      /*create element using utils.createElementFromHTML */
      const elementHTML = utils.createDOMFromHTML(generateHTML);
      
      /*add element to menu */
      booksWrapper.appendChild(elementHTML);
    }
  }
  
  function initActions(){
     
    //for every element of book image in books-list
      
    //add EventListener for every element on double klick
    booksWrapper.addEventListener('dblclick', function(event){
      //prevent default
      event.preventDefault();

      const clickedElement = event.target.offsetParent;
      console.log(clickedElement);
         
      //add or remove class favorite
      if(clickedElement.classList.contains('book__image')){  
        //get the id of clicked book image
        const bookId = clickedElement.getAttribute('data-id');
        if(favoriteBooks.includes(bookId)){
        
          const indexOfBookID = favoriteBooks.indexOf(bookId);
          clickedElement.classList.remove('favorite');
          favoriteBooks.splice(indexOfBookID, 1);
        }
        else{

          clickedElement.classList.add('favorite');
          favoriteBooks.push(bookId);
        } 
      }
        
    });
    
  }
  render();
  initActions();
}