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
       method: "POST",
        headers: {'Content-Type': 'application/json','Accept': '*/*' ,'Accept-Encoding': 'gzip, deflate, br' 
        ,'Connection':'keep-alive'}, 
        body: JSON.stringify(user)
    }).then(function (response) {
        if (response.ok) {
            console.log("response"+response)
            return response.json();
        }
        throw response;
    }).then(function (data) {
        
        console.log("access_token: "+ data.access_token);
        console.log("refresh_token: "+ data.refresh_token);
       
        User.save(user,data)
        document.location.href = "home.html";
         
        
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

User.save = function(slots,data)
{
    localStorage.setItem("username", slots.username);
    localStorage.setItem("password", slots.password);
    localStorage.setItem("login", true);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
}