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

  class BookList{
    constructor(){
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.getElements();
      thisBookList.render();
      thisBookList.determineRatingBgc();  
      thisBookList.initActions();
    }

    initData(){
      const thisBookList = this;
      thisBookList.data = dataSource.books;
    }

    getElements(){
      const thisBookList = this;
      thisBookList.favoriteBooks = [];
      thisBookList.filters = [];
      thisBookList.booksWrapper = document.querySelector(select.containerOf.booksPanel);
      thisBookList.filtersFormHTML = document.querySelector(select.containerOf.form);
    }

    render(){
      const thisBookList = this;
      for(const data of thisBookList.data){

        data.ratingBgc = thisBookList.determineRatingBgc(data.rating);
        data.ratingWidth = data.rating * 10;
        const generateHTML = templates.book(data);
      
        const elementHTML = utils.createDOMFromHTML(generateHTML);
      
        thisBookList.booksWrapper.appendChild(elementHTML);
      }
    }
  
    initActions(){
      const thisBookList = this;
      thisBookList.filtersFormHTML.addEventListener('change', function(event){
        event.preventDefault();
        const clickedElement = event.target;
        if(clickedElement.type === 'checkbox'){
          if(clickedElement.checked){
            thisBookList.filters.push(clickedElement.value);
          } else {
            const indexOfFilter = thisBookList.filters.indexOf(clickedElement.value);
            thisBookList.filters.splice(indexOfFilter, 1);
          }
        }
        thisBookList.filterBooks();
      });
      thisBookList.booksWrapper.addEventListener('dblclick', function(event){
        event.preventDefault();

        const clickedElement = event.target.offsetParent;

        if(clickedElement.classList.contains('book__image')){  
          const bookId = clickedElement.getAttribute('data-id');
          if(thisBookList.favoriteBooks.includes(bookId)){
        
            const indexOfBookID = thisBookList.favoriteBooks.indexOf(bookId);
            clickedElement.classList.remove('favorite');
            thisBookList.favoriteBooks.splice(indexOfBookID, 1);
          }
          else{

            clickedElement.classList.add('favorite');
            thisBookList.favoriteBooks.push(bookId);
          }        
        }
      });
    }

    filterBooks(){
      const thisBookList = this;
    
      for(const element of thisBookList.data){

        let shouldBeHidden = false;

        for(const filter of thisBookList.filters){
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

    determineRatingBgc(rating){
      let background = '';
      if(rating<=6) background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%);';
      else if(rating>6 && rating<=8) background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%);';
      else if(rating>8 && rating<=9) background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      else if(rating>9) background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
      return background;
    }

    
  }
  const app = {
    initializeProject: function(){
      new BookList();
    }
  };
  app.initializeProject();
}