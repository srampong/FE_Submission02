
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
      cs.views.home.initRevenueChart("year")
    })


  },

  listBestSellers: function () {

    var tableBodyEl = document.querySelector("table#bestsellers>tbody");
    var keys = [], key = "", row = {}, i = 0;
    // load all bestseller objects
    BestSeller.retrieveAll();
    keys = Object.keys(BestSeller.instances);
    // for each bestseller, create a table row with a cell for each attribute
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = BestSeller.instances[key].product.name;
      row.insertCell(-1).textContent = BestSeller.instances[key].revenue;
      row.insertCell(-1).textContent = BestSeller.instances[key].units;
    }

  },

   initRevenueChart: function (type) {

    var keys = [], key = "", i = 0;

    // load all revenue objects
    type == "week" ? RevenueWeek.retrieveAll(): RevenueYear.retrieveAll();
    var data = type == "week"  ? RevenueWeek.instances :RevenueYear.instances;

    keys = Object.keys(data);
    var revenues = [];
    // for each revenue, add to the revenue array
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      revenues.push(data[key].total)
    }

   // console.log(revenues)
    //display the weekly revenue data in the chart 
    cs.views.home.displayChart(revenues,type);

  },

  displayChart : function (revenues,type) {
			// Bar chart
			new Chart(document.getElementById("chartjs-dashboard-bar"), {
				type: "bar",
				data: {
					labels: type ==="week" ? ["today", "yesterday", "day 3", "day 4", "day 5", "day 6", "day 7"]: ["this month", "last month", "month 3", "month 4", "month 5", "month 6", "month 7"],
					datasets: [{
						label: type ==="week" ? "This week":"This year",
						backgroundColor: window.theme.primary,
						borderColor: window.theme.primary,
						hoverBackgroundColor: window.theme.primary,
						hoverBorderColor: window.theme.primary,
						data: revenues,
						barPercentage: .75,
						categoryPercentage: .5
					}]
				},
				options: {
					maintainAspectRatio: false,
					legend: {
						display: false
					},
					scales: {
						
						xAxes: [{
							stacked: false,
							gridLines: {
								color: "transparent"
							}
						}]
					}
				}
			});
		
    
  }



}





