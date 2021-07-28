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

      /*prepare const for rating bgc oraz width*/
      data.ratingBgc = determineRatingBgc(data.rating);
      data.ratingWidth = determineratingWidth(data.rating);
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
        } else {
          const indexOfFilter = filters.indexOf(clickedElement.value);
          filters.splice(indexOfFilter, 1);
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

  function determineRatingBgc(rating){
    let background = '';
    if(rating<=6) background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
    else if(rating>6 && rating<=8) background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
    else if(rating>8 && rating<=9) background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
    else if(rating>9) background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
    console.log(background);
    return background;
  }

  function determineratingWidth(rating) {
    let Width = 0;
    if (rating > 1) {
      Width = 10;
    }
    if (rating > 2) {
      Width = 20;
    }
    if (rating > 3) {
      Width = 30;
    }
    if (rating > 4) {
      Width = 40;
    }
    if (rating > 5) {
      Width = 50;
    }
    if (rating > 6) {
      Width = 60;
    }
    if (rating > 7) {
      Width = 70;
    }
    if (rating > 8) {
      Width = 80;
    }
    if (rating > 9) {
      Width = 90;
    }
    if (rating > 10) {
      Width = 100;
    }
  
    return Width;
  }
  render();
  determineRatingBgc();
  determineratingWidth();
  
  initActions();
}