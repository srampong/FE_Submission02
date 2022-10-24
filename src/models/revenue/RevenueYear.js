'use strict'


/**
 * @fileOverview  The model class RevenueYear with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */


/**
 * Constructor function for the class RevenueYear
 * 
 * @constructor
 * @param {{id: string, orders: number, total: number }} slots - Object creation slots.
 */


//Constructor function
function RevenueYear(slots) {
    
    this.id = slots.id;
    this.orders = slots.orders;
    this.total =  slots.total;

};


/** HashMap to store retrived yearly revenues from server
 *  locally
 */
RevenueYear.instances = {};


/**
 *  Method to add an Yearly Revenue instance to local collection
 * @param {*} slots - json data
 */
RevenueYear.add = function (slots) {
    var revenue = new RevenueYear( slots);
    // add RevenueYear to the RevenueYear.instances collection
    RevenueYear.instances[slots.id] = revenue;
  };



  /**
   * function to get a yearly revenue record from Yearly revenue instances
   * @param {*} index  - index location to get record
   * @returns 
   */
  RevenueYear.get = function(index)
  {
  
    //Retrive all yearly revenues
    RevenueYear.retrieveAll()

    return RevenueYear.instances[index]
  
  }
  

/**
 * function to Save Yearly Revenue Instances
 * @param {*} revenues 
 */
RevenueYear.saveAll = function(revenues)
{
  

  //Add All retrived reveues to Yearly Revenue Collection
  for( const key of  Object.keys(revenues))
  {
        var revenue =  JSON.parse(JSON.stringify(revenues[key]))
        revenue["id"] = key;
        RevenueYear.add(revenue); 
  }
  

  try {
      //Convert yearly revenue to string and store locally
      var  revenuesString = JSON.stringify( RevenueYear.instances);
      localStorage.setItem("revenuesYear", revenuesString);
    } catch (e) {
      alert("Error when writing to Local Storage\n" + e);
   
    }  
}


/**
 *  Retrive  stored Yearly Revenues
 */
RevenueYear.retrieveAll = function () {
  var key="", keys=[], revenuesString ="", revenues={}, i=0;  
  try {

    //Check if Yearly Revenues have been Stored and Retrieve them
    if (localStorage.getItem("revenuesYear")) {
      revenuesString  = localStorage.getItem("revenuesYear");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }

  
  //if Stored yearly revenues, Convert them to JSON and add them to Yearly revenue Instances  
  if (revenuesString ) {

   //parse yearly revenue string to JSON
    revenues = JSON.parse( revenuesString );

    //Get all the Keys associated with the yearly reveue JSON
    keys = Object.keys( revenues);
  
    //Iterate through all the yearly revenues
    for (i=0; i < keys.length; i++) {
      key = keys[i];

      //Add Converted Yearly Revenue Object to Yearly Revenue Instances 
      RevenueYear.instances[key] = RevenueYear.convertRow2Obj( revenues[key]);
    
    }
  }
};


//Convert data into a Yearly Revenue Object
RevenueYear.convertRow2Obj = function (revenueRow) {
 
  var revenue = new RevenueYear(revenueRow);
  return revenue;
};



