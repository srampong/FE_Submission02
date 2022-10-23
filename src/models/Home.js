'use strict'

/**
 * Constructor function for the class User 
 * 
 * @constructor
 * @param {{access_token: string, refresh_token: string}} slots - Object creation slots.
 */

function Home(slots) {
    
};


Home.instances = {};


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
           // console.log("dashboard response" + response)
            return response.json();
        }
        throw response;
    }).then(function (data) {

       var jsonData = JSON.parse(JSON.stringify(data));
       //console.log(jsonData.dashboard)
       BestSeller.saveAll(jsonData.dashboard.bestsellers)
       RevenueWeek.saveAll(jsonData.dashboard.sales_over_time_week)
       RevenueYear.saveAll(jsonData.dashboard.sales_over_time_year)
       //console.log(jsonData.dashboard.sales_over_time_week)
       cs.views.home.populateData()
      


    }).catch(function (error) {

        console.warn(error);
    });


};







