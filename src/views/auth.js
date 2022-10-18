
/***********************************************
***  Methods for the use case Login  ******
************************************************/
cs.views.auth = {
  setupUserInterface: function () {
        
     var loginButtton = document.forms["User"].commit;
       
    // set an event handler for the submit/save button
    loginButtton.addEventListener("click", 
    cs.views.auth.authenticateUser);
   
    },

  // authenticate  user using input data
  authenticateUser: function () {

    var formEl = document.forms['User'];
    var slots = { username: formEl.username.value, 
        password: formEl.password.value, 
    }
    
    console.log(slots);
    User.login(slots);
    formEl.reset();
  }

}