/**
 * @fileOverview  Defining the main namespace ("candy shop") and its MVC subnamespaces
 * @author 
 */
 'use strict';
 // main namespace cs = "candy shop"
 var cs = { models:{}, views:{}, controllers:{} };
 if(localStorage.getItem("login"))
 {
    console.log(fs.readFile(__dirname + '/../../foo.bar'))
    document.location.href = "../home.html";
 }