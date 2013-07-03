// JavaScript Document

$(function(){
     console.log("1111111111111111111111111");
	 chrome.extension.onRequest.addListener(function(
	 		req,sender,resp){
			 // console.log(req);				  
			  $.ajax({
				 type:'post',
				 url:'http://127.0.0.1:8080/peony/taobao!save',
				 success:function(data){
					 console.log("---------------------");
					console.log(data); 
				 },
				 error:function(data){
					// console.log("+++++++++++++++++++");
					 var url=data.responseText;
					// console.log(url);
					 resp({v:url}); 
				 },
				 dataType:'json',
				 data:req
			  });		  
			
	       });
	
	  
		   
		   
});