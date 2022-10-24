'use strict'

/**
 * @fileOverview  The model class Order with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */

/**
 * Constructor function for the class User 
 * @constructor
 * @param {{created_at:string,customer:Map,product:Map,id:string,total:number,status:string,currency:string}} slots - Object creation slots.
 */

//Constructor function
function Order(slots) {
    
    this.product = slots.product;
    this.created_at = slots.created_at;
    this.id =  slots.id;
    this.total = slots.total
    this.status = slots.status
    this.currency = slots.currency
    this.customer = slots.customer

};


/** HashMap to store retrived orders from server
 *  locally
 */
Order.instances = {};


/**
 *  Method to add an Order instance to local collection
 * @param {} slots - json data 
 */
Order.add = function (slots) {
    var data = new Order( slots);
    // add Orders to the Orders.instances collection
    Order.instances[slots.id] = data;
    
 };


 /**
  *  Method to fetch Orders from server 
  * @param {*} page - the page number to retrive orders 
  * @param {*} search_term - search term to search orders from.
  */
  Order.fetchAll = function(page,search_term)
  {
     
    // Retrieve order data using access token Header
      fetch(search_term !== ""? `https://freddy.codesubmit.io/orders?page=${page}&q=${search_term}` : `https://freddy.codesubmit.io/orders?page=${page}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json', 'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate, br'
            , 'Connection': 'keep-alive',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
    }).then(function (response) {
        if (response.ok) {           
             
           //Return retrived orders as JSON
            return response.json();
        }
        throw response;
    }).then(function (data) {

        //Convert retrive orders to Javascript Object Notation(JSON)
         var jsonData = JSON.parse(JSON.stringify(data));
      
         //check if a search term was supplied 
         if(search_term)
         {
             //clear Order instances
             Order.instances = {}  
         }

          //save all Orders from JSON
          Order.saveAll(jsonData.orders)

          //Populate the data into view
          cs.views.order.populateData(jsonData.page,jsonData.total,search_term);

    }).catch(function (error) {
 
        //display occured error  
        console.warn(error);
    });


  }

  /**
   * function to Save Order Instances
   * @param {*} Orders - Orders retrieved from server
   */
  Order.saveAll =   function(Orders)
  {
     
    //Add All retrived orders to Order Collection
    Orders.forEach(data => {
       Order.add(data);     
    });
    

    try {
        //Convert order to string and store locally
        var  OrderString = JSON.stringify( Order.instances);
        localStorage.setItem("Orders", OrderString);
      } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
     
      }  
  }


  /**
   * Retrive  stored Orders
   */
  Order.retrieveAll = function () {
    var key="", keys=[], OrderssString ="", Orders={}, i=0;  
    try {

      //Check if Orders have been Stored and Retrieve them
      if (localStorage.getItem("Orders")) {
        OrderssString  = localStorage.getItem("Orders");
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }

    //if Stored Orders, Convert them to JSON and add them to Order Instances
    if (OrderssString ) {
     
      //parse Order string to JSON
      Orders = JSON.parse( OrderssString );
      
      //Get all the Keys associated with the Order JSON
      keys = Object.keys( Orders);
    
      //Iterate through all the Orders
      for (i=0; i < keys.length; i++) {
        key = keys[i];
       
        //Add Converted Order Object to Order Instances 
        Order.instances[key] = Order.convertRow2Obj( Orders[key]);
      }
    }
  };


  //Convert data into an Order Object
  Order.convertRow2Obj = function (OrderRow) {
    var order = new Order( OrderRow);
    return order;
  };


  


