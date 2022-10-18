
/***********************************************
***  Methods for the use case Login  ******
************************************************/
cs.views.home = {
  setupUserInterface: function () {

    if(!localStorage.getItem("refresh_token_active"))
    {
        Home.scheduleTokenRefresh()
        localStorage.setItem("refresh_token_active",true)
     
    }
    
   // Home.retrieveDashbaord()


   
    },


}