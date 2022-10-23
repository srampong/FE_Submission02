'use strict'
/***********************************************
***  Methods for home dashboard   ******
************************************************/
cs.views.order = {
  setupUserInterface: async function () {

    Order.fetchAll(1,"");
  },

   populateData: function () {

    var tableBodyEl = document.querySelector("table#orders>tbody");
    var keys = [], key = "", row = {}, i = 0;

    //load all bestseller objects
    Order.retrieveAll();

    keys = Object.keys(Order.instances);
    //for each bestseller, create a table row with a cell for each attribute

    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = Order.instances[key].product.name;
      row.insertCell(-1).textContent =  new Date(Order.instances[key].created_at).toLocaleDateString();
      row.insertCell(-1).textContent = Order.instances[key].currency+Order.instances[key].total;
      row.insertCell(-1).textContent = Order.instances[key].status;
    }

  },




}





