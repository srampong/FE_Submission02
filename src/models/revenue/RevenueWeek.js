'use strict'

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


RevenueWeek.instances = {};


RevenueWeek.add = function (slots) {
    var revenue = new RevenueWeek( slots);
   // console.log(revenue)
    // add RevenueWeek to the RevenueWeek.instances collection
    RevenueWeek.instances[slots.id] = revenue;
  };


RevenueWeek.get = function(index)
{

    RevenueWeek.retrieveAll()
    return RevenueWeek.instances[index]

}




  RevenueWeek.saveAll = function(revenues)
  {
    

    for( const key of  Object.keys(revenues))
    {
          var revenue =  JSON.parse(JSON.stringify(revenues[key]))
          revenue["id"] = key;
          RevenueWeek.add(revenue); 
    }
    

    try {
        var  revenuesString = JSON.stringify( RevenueWeek.instances);
        localStorage.setItem("revenues", revenuesString);
      } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
     
      }  
  }


  RevenueWeek.retrieveAll = function () {
    var key="", keys=[], revenuesString ="", revenues={}, i=0;  
    try {
      if (localStorage.getItem("revenues")) {
        revenuesString  = localStorage.getItem("revenues");
      }
    } catch (e) {
      alert("Error when reading from Local Storage\n" + e);
    }
    if (revenuesString ) {
      revenues = JSON.parse( revenuesString );
      keys = Object.keys( revenues);
      console.log( keys.length +" revenues loaded.");
      for (i=0; i < keys.length; i++) {
        key = keys[i];
        RevenueWeek.instances[key] = RevenueWeek.convertRow2Obj( revenues[key]);
       // console.log(RevenueWeek.instances[key])
      }
    }
  };


  RevenueWeek.convertRow2Obj = function (revenueRow) {
   
    var revenue = new RevenueWeek(revenueRow);
    return revenue;
  };

