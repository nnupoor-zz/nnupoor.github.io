//making good code out of working codes

"use strict"; 

window.life = (function () {
			// var this;
    		var Circle = function(x,y,r){
		    		this.r = r;
		    		this.x = x;
		    		this.y = y;
		    		// this=this;
	    	}
	        Circle.prototype.setRadius = function(circle, radius){
					circle.style.width = radius.toString()+'px';
					circle.style.height = radius.toString()+'px';
			}
			Circle.prototype.satelliteCircles = function(noOfCircles){
					return (360/(parseInt(noOfCircles)));
			}
			Circle.prototype.calculateOffset = function(parentDivId){
				//how to use previous functions.
					var parentCircle = document.getElementById(parentDivId);
					this.setRadius(parentCircle, this.R);
					var offsetToParentCenter = parseInt(parentCircle.offsetWidth / 2);
					var offsetToChildCenter = (this.r) / 2;
					var totalOffset = (offsetToParentCenter - offsetToChildCenter);
					return totalOffset;
			}
			Circle.prototype.plotSatelliteCircles = function(noOfCircles, angle, offset, parentDivId, className, text){
					var div = this.satelliteCircles(noOfCircles);
					var radius = offset;
					var offset = this.calculateOffset(parentDivId);
					for(var i=1; i<=noOfCircles; i++){
						var parentdiv = document.getElementById(parentDivId);
						var childDiv = document.createElement('div');
						
						childDiv.className = className;
						this.setRadius(childDiv, r);
						
						var y = Math.sin(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
						var x = Math.cos(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
						
						childDiv.style.top = (y + offset ).toString() + "px";
						childDiv.style.left = (x + offset ).toString() + "px";
						parentdiv.appendChild(childDiv);
					}
			}
			Circle.prototype.setText = function(selectorId, text){
						var circle = document.querySelectorAll(selectorId);
						circle.innerText = text.toString();
			}
			Circle.prototype.setCircleColor = function(circle, color){
						var clr = color.toString();
						if(/^#(?:[0-9a-f]{3}){1,2}$/i.test(clr)){
							circle.style.backgroundColor = clr;
						}else {
							circle.style.backgroundColor = '0033a6';
						}		
			}


    return Circle;
}());



//	working code
var childhood = [
	{text : 'Born' },
	{text : 'Started School'},
	{text : 'Met crazy friends'},
	{text : 'Lost grandparents'}
];

var teen = [
	{text : 'Burnt Examsheet'},
	{text : 'High School Topper'},
	{text : 'Engineering'},
	{text : 'Fell in love'},
	{text : 'Flunked M2'},
	{text : '1st Laptop'}
];

var adult = [
	{text : 'Rejected TCS'},
	{text : 'Failed GATE'},
	{text : 'Got into startup'},
	{text : 'started travelling'},
	{text : 'made the website'}
];

var posX,posY;
	var satelliteCircles = function(n){
		return 360/n;
	}

	var setRadius = function(circle, radius){
		circle.style.width = radius.toString()+'px';
		circle.style.height = radius.toString()+'px';
	}
	var setCircleText = function(circle, text){
		circle.innerHTML = text.text;
	}

	var plotCircles = function(noOfCircles, angle, r, R, offset, parentDivId, data, className){
			var div = satelliteCircles(noOfCircles);
			var radius = offset;
			var parentCircle = document.getElementById(parentDivId);
			//setRadius(parentCircle, R);
			//makeParentCircle(parentDivId, R);
			var offsetToParentCenter = parseInt(parentCircle.offsetWidth / 2);
			var offsetToChildCenter = r / 2;
			var totalOffset = (offsetToParentCenter - offsetToChildCenter);

			for(var i=1; i<=noOfCircles; i++){
				var childDiv = document.createElement('div');
				childDiv.className = className + ' div2';
				setRadius(childDiv, r);
				var y = Math.sin(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
				var x = Math.cos(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
				
				posY = (y + totalOffset).toString(); posX = (x + totalOffset).toString();

    			$(childDiv).animate({left: '+='+(x + totalOffset).toString(), top: '+='+(y + totalOffset).toString()}, 500);
				
				// childDiv.style.display = 'none';
				childDiv.innerText = data[i-1].text;
				parentCircle.appendChild(childDiv);
				
			}
	}
	var makeParentCircle = function(parentCircleId, R){
			var parentCircle = document.getElementById(parentCircleId);
			setRadius(parentCircle, R);	
			$(parentCircle).fadeIn('slow');
			parentCircle.style.display = 'inline-block';
	}


$(function() {
	makeParentCircle('Golden_Days', 180);
	makeParentCircle('Rebel_Phase', 180);
	makeParentCircle('Shit_Gets_Real', 180);
 });

$('.div2').hover(function(e){
	e.stopPropogation();
	e.preventDefault();
});

$('#Golden_Days').mouseenter(function(e){	
	plotCircles(4, 0, 120, 180, 170, 'Golden_Days', childhood, 'childhood');
       return false;
});

$('#Rebel_Phase').mouseenter(function(e){
	plotCircles(6, 0, 120, 180, 170, 'Rebel_Phase', teen, 'teen');
	return false;
}).mouseout(function(e){
	// $('.teen').animate({left: '-='+posX, top: '-='+posY}, 500);
});

$('#Shit_Gets_Real').mouseenter(function(e){
	plotCircles(5, 90, 120, 180, 170, 'Shit_Gets_Real', adult, 'adult');
	return false;
});

  
 




