//making good code out of working codes
window.life = (function () {
    function Life (someParam) {
         
    }
   
    var Circle = {
        setRadius: function(circle, radius){
				circle.style.width = radius.toString()+'px';
				circle.style.height = radius.toString()+'px';
			}
        }   
    };
     
    return life;
}());

var Circle = function(x,y,r){
	this.r = r;
	this.x = x;
	this.y = y;
}

//working code
var satelliteCircles = function(n){
	return 360/n;
}

var setRadius = function(circle, radius){
	circle.style.width = radius.toString()+'px';
	circle.style.height = radius.toString()+'px';
}

var plotCircles = function(noOfCircles, angle, r, R, offset, parentDivId){
		var div = satelliteCircles(noOfCircles);
		var radius = offset;
		var parentCircle = document.getElementById(parentDivId);
		setRadius(parentCircle, R);
		var offsetToParentCenter = parseInt(parentCircle.offsetWidth / 2);
		var offsetToChildCenter = r/2;
		var totalOffset = (offsetToParentCenter - offsetToChildCenter);

		for(var i=1; i<=noOfCircles; i++){
			var childDiv = document.createElement('div');
			childDiv.className = 'div2';
			setRadius(childDiv, r);
			var y = Math.sin(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
			var x = Math.cos(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
			childDiv.style.top = (y + totalOffset).toString() + "px";
			childDiv.style.left = (x + totalOffset).toString() + "px";
			parentdiv.appendChild(childDiv);
		}


}

plotCircles(4, 0, 120, 180, 170, 'parentdiv' );


