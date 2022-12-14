'use strict'
/**
 * @fileOverview  The model class User with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */


/**
 * Constructor function for the class User 
 * 
 * @constructor
 * @param {{username: string, password: string}} slots - Object creation slots.
 */

//Constructor function
function User (slots) {
    
    this.username = slots.username;
    this.password = slots.password;
};



//Log User into Server
User.login = function (credentials,event)
{
   event.preventDefault();

   //new User Object from supplied credentails
   var user = new User(credentials);
   
    // Authenticate user login
   fetch('https://freddy.codesubmit.io/login', {
       method: "POST",
        headers: {'Content-Type': 'application/json','Accept': '*/*' ,'Accept-Encoding': 'gzip, deflate, br' 
        ,'Connection':'keep-alive'}, 
        body: JSON.stringify(user)
    }).then(function (response) {
        if (response.ok) {
            
            //Return retrived orders as JSON
            return response.json();
        }
        throw response;
    }).then(function (data) {
 
       //save  User data from JSON
        User.save(user,data)

        //Navigate to Home page after Login
        document.location.href = "home.html";
         
        
    }).catch(function (error) {
        
        console.warn(error);
    });


};

/**
 *  Log User out of Application
 */
User.logout = function ()
{
   
    //Confirm User logout
    if (confirm("Are you sure you want to log out") == true)
    {
        //Update User login  Status
        localStorage.setItem("login",false);

        //Navigate to Login page after Logout
        document.location.href = "index.html";
      
    }
  

};

/**
 * function to Save User data
 * @param {*} slots 
 * @param {*} data 
 */

User.save = function(slots,data)
{
    localStorage.setItem("username", slots.username);
    localStorage.setItem("password", slots.password);
    localStorage.setItem("login", true);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
}