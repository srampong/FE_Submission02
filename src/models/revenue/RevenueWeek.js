'use strict'


/**
 * @fileOverview  The model class RevenueWeek with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */


/**
 * Constructor function for the class RevenueWeek 
 * 
 * @constructor
 * @param {{id: string, orders: number, total: number }} slots - Object creation slots.
 */

function RevenueWeek(slots) {
    
    this.id = slots.id;
    this.orders = slots.orders;
    this.total =  slots.total;

};


/** HashMap to store retrived weekly revenues from server
 *  locally
 */
RevenueWeek.instances = {};


/**
 * Method to add an weekly Revenue instance to local collection
 * @param {*} slots - json data
 */
RevenueWeek.add = function (slots) {
    var revenue = new RevenueWeek( slots);
   
    // add RevenueWeek to the RevenueWeek.instances collection
    RevenueWeek.instances[slots.id] = revenue;
  };

/**
 * function to get a weekly revenue record from weekly revenue instances
 * @param {*} index  - index location to get record
 * @returns 
 */
RevenueWeek.get = function(index)
{

  //Retrive all weekly revenues
    RevenueWeek.retrieveAll()
    return RevenueWeek.instances[index]

}



/**
 * function to Save Weekly Revenue Instances
 * @param {*} revenues 
 */
  RevenueWeek.saveAll = function(revenues)
  {
    
    //Add All retrived reveues to Weekly Revenue Collection
    for( const key of  Object.keys(revenues))
    {
          var revenue =  JSON.parse(JSON.stringify(revenues[key]))
          revenue["id"] = key;
          RevenueWeek.add(revenue); 
    }
    

    try {

       //Convert weekly revenue to string and store locally
        var  revenuesString = JSON.stringify( RevenueWeek.instances);
        localStorage.setItem("revenues", revenuesString);
      } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
     
      }  
  }


  /**
   *  Retrive  stored Weekly Revenues
  */
  RevenueWeek.retrieveAll = function () {
    var key="", keys=[], revenuesString ="", revenues={}, i=0;  
    try {

       //Check if Weekly Revenues have been Stored and Retrieve them
      if (localStorage.getItem("revenues")) {
        revenuesString  = localStorage.getItem("revenues");
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }

    //if Stored weekly revenues, Convert them to JSON and add them to Weekly revenue Instances  
    if (revenuesString ) {

      //parse weekly revenue string to JSON
      revenues = JSON.parse( revenuesString );

      //Get all the Keys associated with the weekly reveue JSON
      keys = Object.keys( revenues);
   
      //Iterate through all the weekly revenues
      for (i=0; i < keys.length; i++) {
        key = keys[i];

        //Add Converted Weekly Revenue Object to Weekly Revenue Instances 
        RevenueWeek.instances[key] = RevenueWeek.convertRow2Obj( revenues[key]);
      
      }
    }
  };


  //Convert data into a Weekly Revenue Object
  RevenueWeek.convertRow2Obj = function (revenueRow) {
    var revenue = new RevenueWeek(revenueRow);
    return revenue;
  };

