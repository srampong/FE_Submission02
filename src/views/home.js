
/***********************************************
***  Methods for home dashboard   ******
************************************************/
cs.views.home = {
  setupUserInterface: function () {

    if (!localStorage.getItem("refresh_token_active")) {
      Home.scheduleTokenRefresh()
      localStorage.setItem("refresh_token_active", true)

    } else {
      console.log("token refresh active")
    }

    Home.scheduleTokenRefresh()
    Home.retrieveDashbaord().then(function () {
      cs.views.home.listBestSellers()
    })


  },

  listBestSellers: function () {

    var tableBodyEl = document.querySelector("table#bestsellers>tbody");
    var keys = [], key = "", row = {}, i = 0;
    // load all bestseller objects
    BestSeller.retrieveAll();
    keys = Object.keys(BestSeller.instances);
    // for each best, create a table row with a cell for each attribute
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = BestSeller.instances[key].product.name;
      row.insertCell(-1).textContent = BestSeller.instances[key].revenue;
      row.insertCell(-1).textContent = BestSeller.instances[key].units;
    }

  }


}





