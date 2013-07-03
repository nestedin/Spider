// JavaScript Document
$(function(){


	 function createMouseEvent(){
		     var event= document.createEvent("MouseEvents");
	         event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);
	  	 	 return event;
	 		 // btn.dispatchEvent(event);	  
	 }
	 function getData(){		 
		var o= {
			   "pageData.title":$("div#detail h3 a").html(),
			   "pageData.subTitle":$("div#detail h3 a").html(),
			   "pageData.cx":$("div#J_PromoBox em").eq(0).html(),
			   "pageData.originalPrice":$("ul.tb-meta strong#J_StrPrice").html(),
			   "pageData.price":$("strong.J_CurPrice").html(),
			   "pageData.monSalesNum":$("ul.tb-meta em.J_TDealCount").html(),
			   "pageData.fromeTo":$("span#J_deliveryAdd").html()+"-"+$("a#J_dqPostAgeCont").html(),			  
			   "pageData.score":$("div#J_Stars span em").html(),
			   "pageData.pjNum":$("div#J_Stars a em").html(),
			   "pageData.url":window.location.href,
			   "pageData.pj":""
			   		 
			};
			
			setTimeout(function(){
				var e=	createMouseEvent();
				//var em=document.querySelector("em.J_ReviewsCount");
				var em=$("em.J_ReviewsCount")[0];		
					 em.dispatchEvent(e);					
					 nestInGet(o,1);		 
			},3000);			
			
	  };
	  function  nestInGet(o,count){
		  //console.log("count=="+count);
		  if(count>3){
			 // 
			  o["pageData.pj"]="["+o["pageData.pj"]+"]";
			//  console.log(o);
			o.urls=getWrapConAHref();
			 sendData(o)
			return;
		  }
		  setTimeout(function(){
					  var tr = $("div.rate-grid").find("tr");
					  for(var i=0;i<tr.length;i++){
						  o["pageData.pj"]+=getTrDate(tr[i]);  
					  }
					   count++;
					  var e=createMouseEvent();  
					  var next=$("div.rate-paginator >a[href*='page="+count+"']")[0];
					  if(next){
						  next.dispatchEvent(e);
						  nestInGet(o,count); 
					  }else{
						 // console.log("---------------------------------------------------");
						  o["pageData.pj"]="["+o["pageData.pj"]+"]";
						 // console.log(o);
						  o.urls=getWrapConAHref();
						  sendData(o)
						return;
					  }	  
					  					  
		  },10000);
		 
	 } 
	 function sendData(obj){		 
	     // console.log(obj);
		  chrome.extension.sendRequest(obj,function(resp){
		     //  console.log(resp);
			   var v=resp.v;
			   //console.log(v);
			   var i=v.indexOf(":'");
			   var e=v.lastIndexOf("'}")
			   var url=v.substr(i+2,e-8);
			   window.location.href=url;
			 //  console.log(url);
		  });		 
	 }  
	 
	 setTimeout(function(){
		  getData();	 		 
	 },1000);
	 
	 
	 function getCurrentTime(){
		  var time= new Date();
		  var o= {
			     year:time.getFullYear(),
				 month:time.getMonth(),
				 day:time.getDay()
			  }
			o.toString=function(){
				  return this.year+"/"+this.month+"/"+this.day;
				} 
			return o;
		 
	 };
	 
	 function getTrDate(tr){
		 var trDetail={};
		 var $tr=$(tr);
		 trDetail.content=$tr.find("div.rate-fulltxt").html();
		 var time=$tr.find("div.rate-date").html();
		 trDetail.time=time=='今天' ? getCurrentTime().toString() : getCurrentTime()+"/"+time
		 trDetail.skuColor=$tr.find("td.col-meta p").eq(0).attr("title") // 颜色分类
		 trDetail.skuCM=$tr.find("td.col-meta p").eq(1).attr("title"); // 尺码，只有部分类别有尺码
		 trDetail.author=$tr.find("td.col-author div").eq(0).html(); // 作者名
		 trDetail.authorXinYong=$tr.find("td.col-author div").eq(1).html(); // 
		
		
			 
		 return "{content:'"+	 trDetail.content +
			        "',time:'"   +trDetail.time +
					"',skuColor:'"+ trDetail.skuColor +
					"',skuCM:'"+trDetail.skuCM+
					"',authorXinYong:'"+ trDetail.authorXinYong	+				
					"',author:'"+ trDetail.author+"'}";
		
		 
	 
	 	  
		  
	 }
	 
	 
	 
	 function getWrapConAHref(){
		
		console.log($("div.wrapCon ul li a").length); 
	
		var strs="";
		$("div.wrapCon ul li a").each(function(index, element) {
			var href=$(element).attr("href");			
            strs+=href+";";
        });
		
		 console.log(strs);
		 return strs;
		 
	};
		
	
	 
	 
	 
	 
});