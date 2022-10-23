'use strict'

/**
 * Constructor function for the class User 
 * 
 * @constructor
 * @param {{created_at:string,customer:Map,product:Map,id:string,total:number,status:string,currency:string}} slots - Object creation slots.
 */

function Order(slots) {
    
    this.product = slots.product;
    this.created_at = slots.created_at;
    this.id =  slots.id;
    this.total = slots.total
    this.status = slots.status
    this.currency = slots.currency
    this.customer = slots.customer

};

var pageNum = 1;
var currentPage = 1;

Order.instances = {};

Order.add = function (slots) {
    var data = new Order( slots);
    // add Orders to the Orders.instances collection
    Order.instances[slots.id] = data;
    
 };


  Order.fetchAll = function(page,search_term)
  {
    console.log("fetching "+ page + " "+ search_term)
          // Retrieve dashboard data
      fetch(search_term !== ""? `https://freddy.codesubmit.io/orders?page=${page}&q=${search_term}` : `https://freddy.codesubmit.io/orders?page=${page}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json', 'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate, br'
            , 'Connection': 'keep-alive',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
    }).then(function (response) {
        if (response.ok) {           
           
            return response.json();
        }
        throw response;
    }).then(function (data) {

         var jsonData = JSON.parse(JSON.stringify(data));
        
     
         if(search_term)
         {
             Order.instances = {}  
         }
            Order.saveAll(jsonData.orders)
            cs.views.order.populateData(jsonData.page,jsonData.total,search_term);

    }).catch(function (error) {

        console.warn(error);
    });


  }

  Order.saveAll =   function(Orders)
  {
     
    Orders.forEach(data => {
       Order.add(data);     
    });
    

    try {
        var  OrderString = JSON.stringify( Order.instances);
        localStorage.setItem("Orders", OrderString);
      } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
     
      }  
  }


  Order.retrieveAll = function () {
    var key="", keys=[], OrderssString ="", Orders={}, i=0;  
    try {
      if (localStorage.getItem("Orders")) {
        OrderssString  = localStorage.getItem("Orders");
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }
    if (OrderssString ) {
      Orders = JSON.parse( OrderssString );
      keys = Object.keys( Orders);
      console.log( keys.length +" Orders loaded.");
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        Order.instances[key] = Order.convertRow2Obj( Orders[key]);
      }
    }
  };


  Order.convertRow2Obj = function (OrderRow) {
    var order = new Order( OrderRow);
    return order;
  };


  


