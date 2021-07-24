{
    'use strict';
    const select = {
      templateOf: {
        book: '#template-book',
      },
  
      containerOf: {
        booksPanel: '.books-list',
      }
    };
  
    const templates = {
      book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };
  
    function render(){
  
      for(const data of dataSource.books){
        /*generate HTML based on template */
        const generateHTML = templates.book(data);
        console.log('template', generateHTML);
        /*create element using utils.createElementFromHTML */
        const elementHTML = utils.createDOMFromHTML(generateHTML);
        /*find menu container */
        const menuContainer = document.querySelector(select.containerOf.booksPanel);
        console.log('menuContainer: ', menuContainer);
        /*add element to menu */
        menuContainer.appendChild(elementHTML);
      }
    }
  
    render();
  } 