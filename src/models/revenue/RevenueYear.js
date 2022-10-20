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


RevenueYear.getTotal = function()
{
    var total = 0;

    for(let i = 1 ; i<=Object.keys(RevenueYear.instances).length; i++)
    {
         var revenue = RevenueYear.instances[i];
         total += revenue.total;
    }

    return total;
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
      localStorage.setItem("revenues", revenuesString);
    } catch (e) {
      alert("Error when writing to Local Storage\n" + e);
   
    }  
}


RevenueYear.retrieveAll = function () {
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
      RevenueYear.instances[key] = RevenueYear.convertRow2Obj( revenues[key]);
     // console.log(RevenueYear.instances[key])
    }
  }
};


RevenueYear.convertRow2Obj = function (revenueRow) {
 
  var revenue = new RevenueYear(revenueRow);
  return revenue;
};



