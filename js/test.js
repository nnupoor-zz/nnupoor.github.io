//making good code out of working codes

"use strict"; 

window.life = (function () {
  var Circle = function(x,y,r){
    this.r = r;
    this.x = x;
    this.y = y;
  }
    Circle.prototype.setRadius = function(circle, radius){
    circle.style.width = radius.toString()+'px';
    circle.style.height = radius.toString()+'px';
  }

  Circle.prototype.satelliteCircles = function(noOfCircles){
    return (360/(parseInt(noOfCircles)));
  }

  Circle.prototype.calculateOffset = function(parentDivId){
    var parentCircle = document.getElementById(parentDivId);
    this.setRadius(parentCircle, this.R);
    var offsetToParentCenter = parseInt(parentCircle.offsetWidth / 2);
    var offsetToChildCenter = (this.r) / 2;
    var totalOffset = (offsetToParentCenter - offsetToChildCenter);
    return totalOffset;
  }

  Circle.prototype.plotSatelliteCircles = function(noOfCircles, angle, offset, parentDivId, className, data){
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

      data[i-1].x = x;
      data[i-1].y = y;

      $(childDiv).animate({left:  (x + totalOffset), top: (y + totalOffset)}, 500);

      childDiv.innerText = data[i-1].text;
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
  Circle.prototype.showCircle = function(parentCircleId, childCircleClass){

  }
  Circle.prototype.hideCircle = function(parentCircleId, childCircleClass){

  }


    return Circle;
}());



//  working code
var childhood = [
  {text : 'Born' },
  {text : 'Started School'},
  {text : 'Made Friends'},
  {text : 'Lost Grandparents'}
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

  var plotCircles = function(noOfCircles, angle, r, offset, parentDivId, data, childCircleClass){
    console.log("Plotting circles");
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
      childDiv.className = childCircleClass + ' div2';
      setRadius(childDiv, r);
      var y = Math.sin(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
      var x = Math.cos(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
      data[i-1].x = x;
      data[i-1].y = y;
      $(childDiv).animate({left:  (x + totalOffset), top: (y + totalOffset)}, 1000);
      
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
  var showCircle = function(parentCircleId, childCircleClass){
    //if already plotted, just show them
      var circle = document.getElementById(parentCircleId);
      switch(parentCircleId) {
      case 'Golden_Days':
          if(circle.children.length > 0){
            slideCircle(circle,childCircleClass, childhood);  
          }else{
            plotCircles(4, 0, 120, 170, 'Golden_Days', childhood, 'childhood');
          }
          break;
      case 'Rebel_Phase':
        if(circle.children.length > 0){
          slideCircle(circle,childCircleClass, teen);
        }else{
          plotCircles(6, 0, 120, 170, 'Rebel_Phase', teen, 'teen');
        }
          break;
      case 'Shit_Gets_Real':
        if(circle.children.length > 0){
          slideCircle(circle,childCircleClass, adult);
        }else{
          plotCircles(5, 90, 120, 170, 'Shit_Gets_Real', adult, 'adult');
        }
          break;
      default:
          return;
      }
  }
  var hideCircle = function(parentCircleId, childCircleClass){
    //hide the circles.
    var circle = document.getElementById(parentCircleId);
    var offsetToParentCenter = parseInt(circle.offsetWidth / 2);
    var posX = offsetToParentCenter - 60+'px';
    $('.'+childCircleClass).animate({left: posX, top: posX}, 1000);
  }
  var slideCircle = function(parentCircle,childCircleClass,data){
    
    var offsetToParentCenter = parseInt(parentCircle.offsetWidth / 2);
    var offsetToChildCenter = 60;
    var totalOffset = (offsetToParentCenter - offsetToChildCenter);
    
    $('.'+childCircleClass).each(function(i,div){
      var $child = $(div);
      $child.animate({left : (data[i].x + totalOffset), top : (data[i].y + totalOffset)}, 1000);
    })
      //childCircles[i].animate({left:  (data[i].x + totalOffset), top: (data[i].y + totalOffset)}, 500);
    
  }


$(function() {
  makeParentCircle('Golden_Days', 180);
  makeParentCircle('Rebel_Phase', 180);
  makeParentCircle('Shit_Gets_Real', 180);
 });



$('#Golden_Days').mouseenter(function(e){ 
  showCircle('Golden_Days', 'childhood');
    
}).mouseout(function(e){
  hideCircle('Golden_Days', 'childhood');

});

$('#Rebel_Phase').mouseenter(function(e){
  showCircle('Rebel_Phase', 'teen');
  
}).mouseout(function(e){
  hideCircle('Rebel_Phase', 'teen');
  
});

$('#Shit_Gets_Real').mouseenter(function(e){
  showCircle('Shit_Gets_Real', 'adult');
  
}).mouseout(function(e){
  hideCircle('Shit_Gets_Real', 'adult');
  
});

  
 




