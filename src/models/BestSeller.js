'use strict'


/**
 * @fileOverview  The model class BestSeller with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */


/**
 * Constructor function for the class User 
 * 
 * @constructor
 * @param {{product: Map, revenue: number,units: string}} slots - Object creation slots.
 */


//Constructor function
function BestSeller(slots) {
    
    this.product = slots.product;
    this.revenue = slots.revenue;
    this.units =  slots.units;

};


/** HashMap to store retrived Bestsellers from server
 *  locally
 */
BestSeller.instances = {};



/**
 *  Method to add an Order instance to local collection
 * @param {*} slots - json data
 */
  BestSeller.add = function (slots) {
    var bestseller = new BestSeller( slots);
    // add bestseller to the Bestseller.instances collection
    BestSeller.instances[slots.product.id] = bestseller;
    
  };

  /**
   * function to Save BestSeller Instances
   * @param {*} bestsellers 
   */
  BestSeller.saveAll =   function(bestsellers)
  {

    //Add All retrived bestsellers to BestSeller Collection
    bestsellers.forEach(data => {
       BestSeller.add(data);     
    });


    try {
       //Convert bestseller to string and store locally
        var  bestsellersString = JSON.stringify( BestSeller.instances);
        localStorage.setItem("bestsellers", bestsellersString);
      } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
     
      }  
  }


  /**
   *  Retrive  stored BestSellers
   */
  BestSeller.retrieveAll = function () {
    var key="", keys=[], bestsellersString ="", bestsellers={}, i=0;  
    try {

      //Check if BestSellers have been Stored and Retrieve them
      if (localStorage.getItem("bestsellers")) {
        bestsellersString  = localStorage.getItem("bestsellers");
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }

    //if Stored BestSellers, Convert them to JSON and add them to BestSeller Instances
    if (bestsellersString ) {

      //parse Order string to JSON
      bestsellers = JSON.parse( bestsellersString );

      //Get all the Keys associated with the Order JSON
      keys = Object.keys( bestsellers);
    
      //Iterate through all the Orders
      for (i=0; i < keys.length; i++) {
        key = keys[i];

        //add Converted Order Onject to Order Instances 
        BestSeller.instances[key] = BestSeller.convertRow2Obj( bestsellers[key]);
      
      }
    }
  };

  //Convert data into an Order Object
  BestSeller.convertRow2Obj = function (bestsellerRow) {
    var bestseller = new BestSeller( bestsellerRow);
    return bestseller;
  };


  


