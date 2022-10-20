'use strict'

/**
 * Constructor function for the class User 
 * 
 * @constructor
 * @param {{product: Map, revenue: number,units: string}} slots - Object creation slots.
 */

function BestSeller(slots) {
    
    this.product = slots.product;
    this.revenue = slots.revenue;
    this.units =  slots.units;

};


BestSeller.instances = {};


BestSeller.add = function (slots) {
    var bestseller = new BestSeller( slots);
    // add bestseller to the Bestseller.instances collection
    BestSeller.instances[slots.product.id] = bestseller;

  };


  BestSeller.add = function (slots) {
    var bestseller = new BestSeller( slots);
    // add bestseller to the Bestseller.instances collection
    BestSeller.instances[slots.product.id] = bestseller;
    
  };

  BestSeller.saveAll =   function(bestsellers)
  {

    bestsellers.forEach(data => {
       BestSeller.add(data);     
    });


    try {
        var  bestsellersString = JSON.stringify( BestSeller.instances);
        localStorage.setItem("bestsellers", bestsellersString);
      } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
     
      }  
  }


  BestSeller.retrieveAll = function () {
    var key="", keys=[], bestsellersString ="", bestsellers={}, i=0;  
    try {
      if (localStorage.getItem("bestsellers")) {
        bestsellersString  = localStorage.getItem("bestsellers");
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }
    if (bestsellersString ) {
      bestsellers = JSON.parse( bestsellersString );
      keys = Object.keys( bestsellers);
      console.log( keys.length +" bestsellers loaded.");
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        BestSeller.instances[key] = BestSeller.convertRow2Obj( bestsellers[key]);
      }
    }
  };


  BestSeller.convertRow2Obj = function (bestsellerRow) {
    var bestseller = new BestSeller( bestsellerRow);
    return bestseller;
  };


  


