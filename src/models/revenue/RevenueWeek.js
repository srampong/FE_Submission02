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
    // add RevenueWeek to the RevenueWeek.instances collection
    RevenueWeek.instances[slots.id] = revenue;
  };


RevenueWeek.getTotal = function()
{
    var total = 0;

    for(let i = 1 ; i<=Object.keys(RevenueWeek.instances).length; i++)
    {
         var revenue = RevenueWeek.instances[i];
         total += revenue.total;
    }

    return total;

}

