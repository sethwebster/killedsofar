var KilledCounter = function() {
	
	this.selectedImageIndex = -1;
	this.images = Array();
	
	this.settings = {
		tickLength : 100,
		ticksBeforeImageChange: 5000,
		domain : "killedsofar.com",
		includeMarineLife : false,
	}

	this.start = function() {
		var domain = "killedsofar.com";
		/*if (document.domain!=domain && document.domain!="")
			window.location = "http://"+domain;*/
	
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
		this.images.push({path:"images/calf-bw.jpg",credit:"Edward Dalmulder, Flickr"});
		this.images.push({path:"images/chicken1.jpg",credit:"cuatrok77, Flickr"});
		this.images.push({path:"images/Cute%20piglet.jpg",credit:"http://www.stanleyliew.com/2011_10_01_archive.html"});
		this.images.push({path:"images/Rocky.jpg",credit:"http://sethwebster.com","Seth Webster"});
		
		var imagesStr = "";
		for(var i=0;i<this.images.length;i++)
		{
			imagesStr+="<img src='"+this.images[i].path+"'/>";
		}
		$("#hiddenimages").html(imagesStr);
	}
	
	this.initializeInterface = function() {
		this.positionCounter();
		this.initializeAndSelectBackground();
		var _this = this;
		$("#version").load("DEPLOYED_VERSION.txt");
	
		setTimeout(function() {
			$("#floater").fadeIn({duration:3000});
		}, 3000);
		setTimeout(function() {
			$("#comments-wrapper").fadeIn({duration:1000});
		}, 5000);
		$("#include-fish-checkbox").prop("checked",this.settings.includeMarineLife);
		this.doUpdate();
	}
	
	this.initializeAndSelectBackground = function() {
		if (this.selectedImageIndex	== -1) {
			this.selectedImageIndex = Math.floor((Math.random()*this.images.length));
		}
		if (this.selectedImageIndex >= this.images.length) {
			this.selectedImageIndex = 0;
		}
		this.selectedImage = this.images[this.selectedImageIndex];
		$("html").css("background-image","url("+this.selectedImage.path+")");
		$("#credit").html("Image Credit: "+this.selectedImage.credit);
		this.lastImageSet = new Date();
	}
	
	this.initializeCounterValues = function() {
		this.countervalues = {
		};
		this.countervalues.ticklength = 50;
		this.countervalues.total = !this.settings.includeMarineLife ?
			59000000000 : 1059000000000;			 
		this.countervalues.perday = this.countervalues.total / 365;
		this.countervalues.perhour = this.countervalues.perday / 24;
		this.countervalues.permin = this.countervalues.perhour / 60;
		this.countervalues.persec = this.countervalues.permin / 60;
		this.countervalues.permilli = this.countervalues.persec / 1000;
		this.countervalues.pertick = this.countervalues.persec / (1000/this.settings.tickLength);
		this.currentVal = 0;
		this.currDate = new Date();
		this.countervalues.doy = this.dayOfYear(this.currDate);
		this.countervalues.ticks = 0;
	}	
	
	this.positionCounter = function() {
		var pointer = window;
		if ($(window).height() != $(document).height())
		{
			// Mozilla HACK
			pointer = document;
		}
		var top = $(pointer).height()-290; 
		$("#floater").css("top",top+"px");
	}
	
	this.updateCurrentValue = function() {
		
		this.currDate = new Date();
		if (!$("#include-fish-checkbox").is(':checked')) {
			this.settings.includeMarineLife = false;
		}
		else {
			this.settings.includeMarineLife = true;
		}
	
		this.initializeCounterValues();
	
		this.currentVal = (this.countervalues.perday*this.countervalues.doy)
			+(this.currDate.getHours()*this.countervalues.perhour)
			+(this.currDate.getMinutes()*this.countervalues.permin)
			+(this.currDate.getSeconds()*this.countervalues.persec)
			+(this.currDate.getMilliseconds()*this.countervalues.permilli);
	}
	
	this.doUpdate = function() {
		this.countervalues.ticks++;
		
		if (new Date().getTime()-this.lastImageSet.getTime() > this.settings.ticksBeforeImageChange) {
			this.selectedImageIndex++;
			this.initializeAndSelectBackground();
			this.countervalues.ticks = 0;
		}
		
		this.updateCurrentValue();
		
		$("#total").html(numberWithCommas(Math.round(this.currentVal)));
		$(".st_twitter_vcount").attr("st_summary",this.currentVal+" animals have been killed for food so far this year.");
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

