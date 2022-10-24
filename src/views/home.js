'use strict'

/**
 * @fileOverview  The view class home with attribute definitions and storage management methods
 * @author Ampong Stephen Rexford
 */



/***********************************************
***  Methods for home dashboard   ******
************************************************/
cs.views.home = {

  

  /**
   * set up user interface on start
   */
  setupUserInterface: async function () {   

    //fetch dashboard data from server
     await Home.retrieveDashbaord()
    
  },

  /**
   *  function to retrive order summary for today, last week and last month
   */
  getOrderSummary : function(){

    //Get reference to week summary element 
    var weekSummary = document.getElementById("week_summary");

     //Get reference to week  order  element 
    var weekOrder = document.getElementById("week_order");
    
    //Check if the summary data exist
    if(RevenueWeek.get(2))
    {
      //Set the total weekly summary amount
       weekSummary.innerHTML = "$"+RevenueWeek.get(2).total + " / ";

       //Set the total weekly summary orders
       weekOrder.innerHTML = RevenueWeek.get(2).orders + " orders";
    }
   

     //Get reference to monthly summary element 
    var monthSummary = document.getElementById("month_summary");

    //Get reference to monthly  order  element 
    var monthOrder = document.getElementById("month_order");


    //Check if the summary data exist
    if(RevenueYear.get(2))
    {

       //Set the total monthly summary amount
       monthSummary.innerHTML = "$"+RevenueYear.get(2).total + " / ";

       //Set the total monthly summary orders
       monthOrder.innerHTML = RevenueYear.get(2).orders + " orders";
  
    }

  },


  setUpSwitch : function() {
    
    //Get reference to chart switch element 
    var switichButton = document.getElementById("switch");

    var chartHeader = document.getElementById("chart_title");

    //set event Listner to chart switch
    switichButton.addEventListener('change',function(){

      //if switeched on, switch to yearly chart and vice versa
      if(this.checked == true){
        cs.views.home.initRevenueChart("year")
        chartHeader.innerHTML = "Revenue (last 12 months)";
      }else{
        cs.views.home.initRevenueChart("week")
        chartHeader.innerHTML = "Revenue (last 7 days)";
      }
    });

  
  },

  /**
   *  function to retrive and display BestSellers
   */ 
  listBestSellers: function () {

    //Get reference  to bestsellers  table element
    var tableBodyEl = document.querySelector("table#bestsellers>tbody");

    //init variables
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

  /**
   * function to setup  revenue chart
   * @param {*} type - type of revenue
   */
   initRevenueChart: function (type) {

    //init variables
    var keys = [], key = "", i = 0;

    // load all revenue objects
    type === "week" ? RevenueWeek.retrieveAll(): RevenueYear.retrieveAll();
    var data = type === "week"  ? RevenueWeek.instances : RevenueYear.instances;
   
    keys = Object.keys(data);
    var revenues = [];
    
    // for each revenue, add to the revenue array
    for (i = 0; i < keys.length; i++) {
      key = keys[i];
      revenues.push(data[key].total)
    }

  
    //display the weekly revenue data in the chart 
    cs.views.home.displayChart(revenues,type);

  },

  /**
   *  function to display chart
   * @param {*} revenues -- revenues to display on chart
   * @param {*} type - revenue type
   */
  displayChart : function (revenues,type) {
			// Bar chart
			new Chart(document.getElementById("chartjs-dashboard-bar"), {
				type: "bar",
				data: {
					labels: type ==="week" ? ["today", "yesterday", "day 3", "day 4", "day 5", "day 6", "day 7"]: ["this month", "last month", "month 3", "month 4", "month 5", "month 6", "month 7","month 8", "month 9", "month 10"
        ,"month 11", "month 12"],
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
		
    
  },

  /**
   * function setup and   display data into views
   */
  populateData: function()
  {
    cs.views.home.listBestSellers();
    cs.views.home.getOrderSummary();
    cs.views.home.initRevenueChart("week");
    cs.views.home.setUpSwitch();
  }



}





