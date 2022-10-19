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

