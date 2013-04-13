var KilledCounter = function() {
	
	this.selectedImage = null;
	this.images = Array();
	
	this.settings = {
		tickLength : 50,
		domain : "killedsofar.com"
	}

	this.start = function() {
		var domain = "killedsofar.com";
		if (document.domain!=domain && document.domain!="")
			window.location = "http://"+domain;
	
		this.initializeCounterValues();
		this.initializeImages();
		this.initializeInterface();
		
	}
	
	this.initializeImages = function() {
		this.images.push({path:"images/Slaughterhouse_cattle_bodies.jpg",credit:"Anonymous"});
		this.images.push({path:"images/Slaughterhouse-Floor.jpg",credit:"Anonymous"});
		this.images.push({path:"images/BeautifulCow.jpg",credit:"Jim Champion, Flickr"});
		this.images.push({path:"images/Lamb.jpg",credit:"Donald Macleod, Flickr"});
		this.images.push({path:"images/Piglet.jpg",credit:"Sander van der Wel, Flickr"});
	}
	
	this.initializeInterface = function() {
		this.selectedImage = this.images[Math.floor((Math.random()*this.images.length))];
		$("html").css("background-image","url("+this.selectedImage.path+")");
		$("#version").load("DEPLOYED_VERSION.txt");
		$("#credit").html("Image Credit: "+this.selectedImage.credit);
		
		setTimeout(function() {
			$("#floater").fadeIn({duration:3000});
		}, 3000);
		setTimeout(function() {
			$("#comments-wrapper").fadeIn({duration:1000});
		}, 5000);
		this.doUpdate();
	}
	
	this.initializeCounterValues = function() {
		this.countervalues = {
		};
		this.countervalues.ticklength = 50;
		this.countervalues.total = 59000000000;
		this.countervalues.perday = this.countervalues.total / 365;
		this.countervalues.perhour = this.countervalues.perday / 24;
		this.countervalues.permin = this.countervalues.perhour / 60;
		this.countervalues.persec = this.countervalues.permin / 60;
		this.countervalues.permilli = this.countervalues.persec / 1000;
		this.countervalues.pertick = this.countervalues.persec / (1000/this.settings.tickLength);
		this.currentVal = 0;
		this.currDate = new Date();
		this.countervalues.doy = this.dayOfYear(this.currDate);
	}	
	
	this.positionCounter = function() {
		var pointer = window;
		if ($(window).height() != $(document).height())
		{
			// Mozilla HACK
			pointer = document;
		}
		var top = ($(pointer).height()/2) - $("#floater").height()/2; 
		$("#floater").css("top",top+"px");
	}
	
	this.updateCurrentValue = function() {
		
		this.currDate = new Date();
	
		this.currentVal = (this.countervalues.perday*this.countervalues.doy)
			+(this.currDate.getHours()*this.countervalues.perhour)
			+(this.currDate.getMinutes()*this.countervalues.permin)
			+(this.currDate.getSeconds()*this.countervalues.persec)
			+(this.currDate.getMilliseconds()*this.countervalues.permilli);
	}
	
	this.doUpdate = function() {
		this.updateCurrentValue();
		this.positionCounter();
		$("#total").html(numberWithCommas(Math.round(this.currentVal)));
		var _this = this;
		var t = setTimeout(function() {
			_this.doUpdate();
		}, this.settings.tickLength);
	}
	
	this.dayOfYear = function(d) {
			var yn = d.getFullYear();
			var mn = d.getMonth();
			var dn = d.getDate();
			var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
			var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
			var ddiff = Math.round((d2-d1)/864e5);
			return ddiff+1; 
	}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
 
$(document).ready(function() { 
	var k = new KilledCounter();
	k.start();
});

