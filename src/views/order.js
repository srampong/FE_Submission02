'use strict'
/***********************************************
***  Methods for home dashboard   ******
************************************************/
cs.views.order = {
  setupUserInterface: async function () {

    Order.fetchAll(1,"");

  },

  populateData : function (pageNum,total) {
 
    var orderLength = Object.keys(Order.instances).length

    if(orderLength)
    {

    //load all bestseller objects
    Order.retrieveAll();
    
    
        
    const paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = "";

    var tableBodyEl = document.querySelector("table#orders>tbody");
    tableBodyEl.innerHTML = ""

    const perPage = 50;
    const pageCount = Math.ceil(total/ perPage);

    cs.views.order.getPaginationNumbers(pageCount,paginationContainer,pageNum);
   
 
    const prevRange = orderLength - perPage;
    const currRange = orderLength;

    console.log(prevRange)
    console.log(currRange)
  
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

  getPaginationNumbers: function (pageCount,paginationContainer,pageNum) {
    for (let i = 1; i <= pageCount; i++) {
      cs.views.order.appendPageNumber(i,paginationContainer,false,false,pageNum);
    }
  },

  appendPageNumber : function(index,paginationContainer,isPrevious,isNext,pageNum) {
    
    const pageNumber = document.createElement("li");
    pageNumber.className = `page-item ${index == pageNum ? 'active' :''}`;
    const link = pageNumber.appendChild(document.createElement("a"));
    link.className = "page-link";
    link.setAttribute("onclick", `Order.fetchAll(${index},"")`);
    link.innerHTML = isNext ? 'Next' : isPrevious ? "Previous" : index;
    paginationContainer.appendChild(pageNumber);

  }



}





