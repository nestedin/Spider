// JavaScript Document
	i=0;


$(function(){
	
	
    $("#main").click(function(e){
		  // document.getElementById("main").innerHTML=i++;
			//console.log(i);
			chrome.windows.getCurrent(function(tab){
				
				 console.log(tab);
				});
		})	
	
	
})