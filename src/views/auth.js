/**
 * @fileOverview  The view class auth with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */

/***********************************************
***  Methods for the use case Login  ******
************************************************/
cs.views.auth = {

  /**
   * set up user interface on start
   */
  setupUserInterface: function () { 
     
    //get reference to login submit button
    var loginButtton = document.forms["User"].commit;
    
    // set an event handler for the login from button
    loginButtton.addEventListener("click", 
    cs.views.auth.authenticateUser);
    },

  
  /**
   * function to authenticate  user using input data
   * @param {*} event 
   */
  authenticateUser: function (event) {
    event.preventDefault();

    //Get form reference
    var formEl = document.forms['User'];

    var username = formEl.username.value;
    var password = formEl.password.value

    //validate form data
    if (username === "" ||password === "") {
      alert("Please fill all data");
      return false;
    }else
    
    var slots = { username: formEl.username.value, 
        password: formEl.password.value, 
    }
  
    //log user in
    User.login(slots,event);
    
  }

}