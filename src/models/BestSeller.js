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


