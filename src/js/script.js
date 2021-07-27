{
  'use strict';
  const select = {
    templateOf: {
      book: '#template-book',
    },

    containerOf: {
      booksPanel: '.books-list',
      form: '.filters',
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
  const filters = [];
  const booksWrapper = document.querySelector(select.containerOf.booksPanel);
  const filtersFormHTML = document.querySelector(select.containerOf.form);

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
    //add EventListener for checked boxes in filters
    filtersFormHTML.addEventListener('change', function(event){
      event.preventDefault();
      const clickedElement = event.target;
      if(clickedElement.type === 'checkbox'){
        if(clickedElement.checked){
          filters.push(clickedElement.value);
          console.log(filters);
        } else {
          const indexOfFilter = filters.indexOf(clickedElement.value);
          filters.splice(indexOfFilter, 1);
          console.log(filters);
        }

      }
      filterBooks();
    });
    //add EventListener for every element on double klick
    booksWrapper.addEventListener('dblclick', function(event){
      //prevent default
      event.preventDefault();

      const clickedElement = event.target.offsetParent;

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

  function filterBooks(){
    
    for(const element of dataSource.books){

      let shouldBeHidden = false;

      for(const filter of filters){
        if(!element.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      if(shouldBeHidden){
        const book = document.querySelector('.book__image[data-id="' + element.id + '"]');
        book.classList.add('hidden');
      } else {
        const book = document.querySelector('.book__image[data-id="' + element.id + '"]');
        book.classList.remove('hidden');
      }
    }
  }
  render();
  initActions();
}