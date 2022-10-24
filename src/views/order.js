'use strict'

/**
 * @fileOverview  The view class order with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */


/***********************************************
***  Methods for home dashboard   ******
************************************************/
cs.views.order = {

   /**
   * set up user interface on start
   */
  setupUserInterface: async function () {

    //fetch all orders
    Order.fetchAll(1,"");

    //handle search queries
    cs.views.order.handleSearch()
 

  },


  /**
   *  function to handle search
   */
  handleSearch : function (){
    
    //Get reference to search input and button
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    //add eventListner to search button
    searchButton.addEventListener('click', () => {
     
      //get search input data
      const inputValue = searchInput.value;

      //fetch data based on search input data
      Order.fetchAll(1,inputValue);
    
});
  },
  
  /**
   *  function to populate orders into view
   * @param {*} pageNum - page number for current orders data
   * @param {*} total - total number of order data retrieved
   * @param {*} search_term - search term to retrive data
   */
  populateData : function (pageNum,total,search_term) {
 
    //get order data length
    var orderLength = Object.keys(Order.instances).length
  

    //if data was retrived then populate it
    if(orderLength)
    {

     //load all order objects
      Order.retrieveAll();
    
    
    //Get refrence to pagination container  
    const paginationContainer = document.getElementById("pagination-container");

    //set the paination container to empty for fresh data
    paginationContainer.innerHTML = "";

    //Get refrence to order table  
    var tableBodyEl = document.querySelector("table#orders>tbody");

    //set the table rows to empty for fresh data
    tableBodyEl.innerHTML = ""

    //number of data to display per page
    const perPage = 50;

    //Get total page numbers by dividing the total number of orders
    // retrieved from server by number of data to display per page
    const pageCount = Math.ceil(total/ perPage);

    //add the page numbers to the pagination container
    cs.views.order.getPaginationNumbers(pageCount,paginationContainer,pageNum,search_term);
   
 
    //Get the starting point of displaying the order data
    // by substracting the length of the retrived orders from per page,
    // if result is less than 0 set previous Range to 0 else the result
    const prevRange = orderLength - perPage < 0 ? 0 : orderLength - perPage;

    //set the current range to the number of orders retrieved
    const currRange = orderLength;

    //init variables
    var keys = [], key = "", row = {}, i = 0;


    keys = Object.keys(Order.instances);
    
    //for each bestseller, create a table row with a cell for each attribute
    for (i = prevRange ; i < currRange; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow();
      var order = Order.instances[key]

      if(order)
          row.insertCell(-1).textContent = order.product.name ? order.product.name: ""
          row.insertCell(-1).textContent =  order.created_at ? new Date(order.created_at).toLocaleDateString() : ""
          row.insertCell(-1).textContent = order.currency+order.total ? order.currency+order.total : ""
          row.insertCell(-1).innerHTML = order.status ? order.status === "processing" ? '<span class="text-danger">'+order.status+'</span>' : order.status === "delivered" ?'<span class="text-success">'+order.status+'</span>': order.status : ""

    }
  }

  },

  /**
   *  function to get page numbers for pagination
   * @param {*} pageCount - number of pages
   * @param {*} paginationContainer - pagination container
   * @param {*} pageNum - current page number
   * @param {*} search_term - query search text
   */
  getPaginationNumbers: function (pageCount,paginationContainer,pageNum,search_term) {
   
    //for each page count add a page number element to pagination container
    for (let i = 1; i <= pageCount; i++) {
      cs.views.order.appendPageNumber(i,paginationContainer,false,false,pageNum,search_term);
    }
  },

  /**
   * function to add a page number to pagination container
   * @param {*} index - pagae number value
   * @param {*} paginationContainer  - pagination container
   * @param {*} isPrevious - whether is a previous button
   * @param {*} isNext  - whether is  next button
   * @param {*} pageNum - page number
   * @param {*} search_term - search text
   */
  appendPageNumber : function(index,paginationContainer,isPrevious,isNext,pageNum,search_term) {
    
    //Get reference to page number element
    const pageNumber = document.createElement("li");

    //set the class name for the page number element
    pageNumber.className = `page-item ${index == pageNum ? 'active' :''}`;

    // create a link and add it to the oage number element for nagivation
    const link = pageNumber.appendChild(document.createElement("a"));
    link.href="#"

    //set the link class
    link.className = "page-link";

    //set an onclick attribute to link to call fetch function  
    link.setAttribute("onclick", `Order.fetchAll(${index},"")`);
    //set text for next and previous buttons
    link.innerHTML = isNext ? 'Next' : isPrevious ? "Previous" : index;

    //Add the page number element to pagination container
    paginationContainer.appendChild(pageNumber);

  }



}





