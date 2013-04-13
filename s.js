var killedCounter = {

}

var domain = "killedsofar.com";
if (document.domain!=domain && document.domain!="")
	window.location = "http://"+domain;

var ticklength = 50;
var total = 59000000000;
var perday = total / 365;
var perhour = perday / 24;
var permin = perhour / 60;
var persec = permin / 60;
var permilli = persec / 1000;
var pertick = persec / (1000/ticklength);
var startingVal = 0;
var currDate = new Date();
var doy = dayofyear(currDate);
var isInitialized = false;

var images = Array();
images[0] = "Slaughterhouse_cattle_bodies.jpg";
images[1] = "Slaughterhouse-Floor.jpg";

var selectedImage = images[Math.floor((Math.random()*images.length))];

function dayofyear(d) {   // d is a Date object
	var yn = d.getFullYear();
	var mn = d.getMonth();
	var dn = d.getDate();
	var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
	var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
	var ddiff = Math.round((d2-d1)/864e5);
	return ddiff+1; 
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getCurrentValue() {
	var currDate = new Date();
	
	startingVal = (perday*doy)
		+(currDate.getHours()*perhour)
		+(currDate.getMinutes()*permin)
		+(currDate.getSeconds()*persec)
		+(currDate.getMilliseconds()*permilli);

	return startingVal;
}	

function intialize() {
	if (isInitialized)
		return;
	var selectedImage = images[Math.floor((Math.random()*images.length))];
	$("html").css("background-image","url("+selectedImage+")");
	isInitialized = true;
	$("#version").load("DEPLOYED_VERSION.txt");
}
function doUpdate() {
	$("#total").html(numberWithCommas(Math.round(getCurrentValue())));
	var top = ($(window).height()/2) - $("#floater").height()/2; 
	var contentHeight = $("#content").height();
	$("#floater").css("top",top+"px");
	var t = setTimeout(doUpdate,ticklength);	
}
  
$(document).ready(function() { 
	intialize();
	setTimeout(function() {
		$("#floater").fadeIn({duration:3000});
	}, 3000);
	setTimeout(function() {
		$("#comments-wrapper").fadeIn({duration:1000});
	}, 5000);
	doUpdate(); 
});

