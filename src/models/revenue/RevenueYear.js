'use strict'

/**
 * Constructor function for the class RevenueYear
 * 
 * @constructor
 * @param {{id: string, orders: number, total: number }} slots - Object creation slots.
 */

function RevenueYear(slots) {
    
    this.id = slots.id;
    this.orders = slots.orders;
    this.total =  slots.total;

};


RevenueYear.instances = {};


RevenueYear.add = function (slots) {
    var revenue = new RevenueYear( slots);
    // add RevenueYear to the RevenueYear.instances collection
    RevenueYear.instances[slots.id] = revenue;
  };



  RevenueYear.get = function(index)
  {
  
    RevenueYear.retrieveAll()
    return RevenueYear.instances[index]
  
  }
  

RevenueYear.saveAll = function(revenues)
{
  

  for( const key of  Object.keys(revenues))
  {
        var revenue =  JSON.parse(JSON.stringify(revenues[key]))
        revenue["id"] = key;
        RevenueYear.add(revenue); 
  }
  

  try {
      var  revenuesString = JSON.stringify( RevenueYear.instances);
      localStorage.setItem("revenuesYear", revenuesString);
    } catch (e) {
      alert("Error when writing to Local Storage\n" + e);
   
    }  
}


RevenueYear.retrieveAll = function () {
  var key="", keys=[], revenuesString ="", revenues={}, i=0;  
  try {
    if (localStorage.getItem("revenuesYear")) {
      revenuesString  = localStorage.getItem("revenuesYear");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (revenuesString ) {
    revenues = JSON.parse( revenuesString );
    keys = Object.keys( revenues);
    console.log( keys.length +" revenues years loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      RevenueYear.instances[key] = RevenueYear.convertRow2Obj( revenues[key]);
     // console.log(RevenueYear.instances[key])
    }
  }
};


RevenueYear.convertRow2Obj = function (revenueRow) {
 
  var revenue = new RevenueYear(revenueRow);
  return revenue;
};



