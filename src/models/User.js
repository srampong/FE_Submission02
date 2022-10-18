'use strict'

/**
 * Constructor function for the class User 
 * 
 * @constructor
 * @param {{username: string, password: string}} slots - Object creation slots.
 */

function User (slots) {
    
    this.username = slots.username;
    this.password = slots.password;
};

User.instances = {};


User.login = function (credentials)
{
   var user = new User(credentials);
   
    // Authenticate user login
   fetch('https://freddy.codesubmit.io/login', {
        headers: {
            'Authorization': `Basic ${btoa(user.username)}:${btoa(user.password)}`
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.warn(error);
    });


};

User.logout = function (credentials)
{
   var user = new User(credentials);

 

    // Authenticate user login
   fetch('https://some-awesome-api.com/authenticate', {
        headers: {
            'Authorization': `Basic ${btoa(username)}:${btoa(password)}`
        }
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.warn(error);
    });


};