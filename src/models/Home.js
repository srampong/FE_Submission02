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



Home.scheduleTokenRefresh = function () {
    setInterval(function () {

        //Fetch a new access token using refresh token
        fetch('https://freddy.codesubmit.io/refresh', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*', 
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
            },
            body: {}
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw response;
        }).then(function (data) {

            console.log("access_token: " + data.access_token);
            localStorage.setItem("access_token", data.access_token);

           



        }).catch(function (error) {

            console.warn(error);
        });

    }, 600000);
}







