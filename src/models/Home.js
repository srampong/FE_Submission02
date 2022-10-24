'use strict'


/**
 * @fileOverview  The model class Home with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */


/**
 * Constructor function for the class User 
 * 
 * @constructor
 * @param {{access_token: string, refresh_token: string}} slots - Object creation slots.
 */

//Constructor function
function Home(slots) {
    
};


/**
 * Method to fetch Dashboard data from server 
 */
Home.retrieveDashbaord = async function () {

    // Retrieve dashboard data
    fetch('https://freddy.codesubmit.io/dashboard', {
        method: "GET",
        headers: {
            'Content-Type': 'application/json', 'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate, br'
            , 'Connection': 'keep-alive',
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`
        },
    }).then(function (response) {
        if (response.ok) {
          
            //Return retrived orders as JSON
            return response.json();
        }
        throw response;
    }).then(function (data) {

     //Convert retrive orders to Javascript Object Notation(JSON)
       var jsonData = JSON.parse(JSON.stringify(data));
      
       //save all BestSellers from dashaboard data
       BestSeller.saveAll(jsonData.dashboard.bestsellers)

       //save all Weekly Revenue from dashaboard data
       RevenueWeek.saveAll(jsonData.dashboard.sales_over_time_week)

       //save all Yearly Revenue from dashaboard data
       RevenueYear.saveAll(jsonData.dashboard.sales_over_time_year)

      //Populate the dashboard data into view
       cs.views.home.populateData()
      


    }).catch(function (error) {

        console.warn(error);
    });


};







