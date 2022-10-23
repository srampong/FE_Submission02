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


Order.instances = {};

  Order.add = function (slots) {
    var data = new Order( slots);
    // add Orders to the Orders.instances collection
    Order.instances[slots.id] = data;
    
  };

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
     // console.log( keys.length +" Orderss loaded.");
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


  


