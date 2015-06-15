//making good code out of working codes

"use strict"; 
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

window.circle = (function () {
  var Circle = Circle || {};

  Circle = function(props){
    // this.r = r;
    // this.id = id;
    // this.data = data;
    // this.childCircleCount = this.n;
    var defaults = {
      r: 170,
      id: "default-circle",
      data:[{}],
      childCircleCount: 4,
      childRadius: 120,
      childOffset: 170,
      childAngle: 0,
      childClass: "default-child-class",
      totalOffset: 0
    };

    this.userSettings = jQuery.extend({}, defaults, props);
    this.makeParentCircle();
  }

  Circle.prototype.makeParentCircle = function(){
    var ths = this;
    var self = this.userSettings;
    var parentCircle = document.getElementById(self.id);

    ths.setRadius(parentCircle, self.r);

    $(parentCircle).fadeIn('slow');
    $('#'+self.id).css('display', 'inline-block');

    ths.attachMouseEvent();
  }

  Circle.prototype.setRadius = function(circle,radius){
    $(circle).css('width', radius.toString()+'px').css('height', radius.toString()+'px');
    return true;
  }

  Circle.prototype.calculateOffset = function(){
    var self = this.userSettings;
    var parentCircle = document.getElementById(self.id);
    var offsetToParentCenter = parseInt(parentCircle.offsetWidth / 2);
    var offsetToChildCenter = self.childRadius / 2;
    var totalOffset = (offsetToParentCenter - offsetToChildCenter);
    this.userSettings.totalOffset = totalOffset;
    return totalOffset;
  }

  Circle.prototype.plotSatelliteCircles = function(){
    var ths = this;
    var self = this.userSettings;
    var div = (360 / self.childCircleCount );
    var radius = self.childOffset;
    var totalOffset = (self.totalOffset===0) ? ths.calculateOffset() : self.totalOffset ;

    for(var i=1; i<=self.childCircleCount; i++){
      var parentdiv = document.getElementById(self.id);
      var childDiv = document.createElement('div');
      
      childDiv.className = self.childClass + ' childCircle';
      ths.setRadius(childDiv, self.childRadius);
      
      var y = Math.sin(((div*i)+(div-self.childAngle)) * (Math.PI / 180)) * radius;
      var x = Math.cos(((div*i)+(div-self.childAngle)) * (Math.PI / 180)) * radius;

      var data = self.data;
      if(data.length!==0){
        data[i-1].x = x;
        data[i-1].y = y;
      }
      
      $(childDiv).animate({left:  (x + totalOffset), top: (y + totalOffset)}, 500);

      childDiv.innerText = data[i-1].text;
      parentdiv.appendChild(childDiv);
    }
  }

  Circle.prototype.showCircle = function(){
    var self = this.userSettings;
    var parentCircleId = self.id;
    var circle = document.getElementById(parentCircleId);
      if(circle.children.length > 0){
        this.slideCircle();  
      }else{
        this.plotSatelliteCircles();
      }
  }

  Circle.prototype.attachMouseEvent = function(){
    var ths = this;
    var self = this.userSettings;
    var id = self.id;
    var $this = jQuery('#' + id);
    $this.mouseenter(function(e){ 
      ths.showCircle();
    }).mouseout(function(e){
      ths.hideCircle();
    });
  }

  Circle.prototype.hideCircle = function(){
    var self = this.userSettings;
    var posX = (self.totalOffset===0) ? ths.calculateOffset() : self.totalOffset ;
    var $childCircleClass = $('.'+self.childClass);

    $childCircleClass.animate({left: posX, top: posX}, 1000);
  }
  
  Circle.prototype.slideCircle = function(){
    var self = this.userSettings;
    var totalOffset = (self.totalOffset===0) ? ths.calculateOffset() : self.totalOffset ;
    var $childCircleClass = $('.'+self.childClass);

    $childCircleClass.each(function(i,div){
      var $child = $(div);
      $child.animate({left : (self.data[i].x + totalOffset), top : (self.data[i].y + totalOffset)}, 1000);
    });
  }

    return Circle;

}());


var childCircle = new circle({ 
      r: 180,
      id: "Golden_Days",
      data: childhood,
      childCircleCount: childhood.length,
      childRadius: 120,
      childOffset: 170,
      childAngle: 0,
      childClass: "childhood"
    });

var teenCircle = new circle({ 
      r: 180,
      id: "Rebel_Phase",
      data: teen,
      childCircleCount: teen.length,
      childRadius: 120,
      childOffset: 170,
      childAngle: 0,
      childClass: "teen"
    });

var adultCircle = new circle({ 
      r: 180,
      id: "Shit_Gets_Real",
      data: adult,
      childCircleCount: adult.length,
      childRadius: 120,
      childOffset: 170,
      childAngle: 0,
      childClass: "adult"
    });
//var childCircle = new circle(0,0,120);


//bigCircle.makeParentCircle('Shit_Gets_Real');
//bigCircle.makeChild(120);

// $(function() {
//   makeParentCircle('Golden_Days', 180);
//   makeParentCircle('Rebel_Phase', 180);
//   makeParentCircle('Shit_Gets_Real', 180);
//  });





// parent circle id >> div 

//  working code



//   var satelliteCircles = function(n){
//     return 360/n;
//   }

//   var setRadius = function(circle, radius){
//     circle.style.width = radius.toString()+'px';
//     circle.style.height = radius.toString()+'px';
//   }
//   var setCircleText = function(circle, text){
//     circle.innerHTML = text.text;
//   }

//   var plotCircles = function(noOfCircles, angle, r, offset, parentDivId, data, childCircleClass){
//     console.log("Plotting circles");
//     var div = satelliteCircles(noOfCircles);
//     var radius = offset;
//     var parentCircle = document.getElementById(parentDivId);
//     //setRadius(parentCircle, R);
//     //makeParentCircle(parentDivId, R);
//     var offsetToParentCenter = parseInt(parentCircle.offsetWidth / 2);
//     var offsetToChildCenter = r / 2;
//     var totalOffset = (offsetToParentCenter - offsetToChildCenter);

//     for(var i=1; i<=noOfCircles; i++){
//       var childDiv = document.createElement('div');
//       childDiv.className = childCircleClass + ' div2';
//       setRadius(childDiv, r);
//       var y = Math.sin(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
//       var x = Math.cos(((div*i)+(div-angle)) * (Math.PI / 180)) * radius;
//       data[i-1].x = x;
//       data[i-1].y = y;
//       $(childDiv).animate({left:  (x + totalOffset), top: (y + totalOffset)}, 1000);
      
//       childDiv.innerText = data[i-1].text;
//       parentCircle.appendChild(childDiv);
      
//     }
//   }
//   var makeParentCircle = function(parentCircleId, R){
//     var parentCircle = document.getElementById(parentCircleId);
//     setRadius(parentCircle, R); 
//     $(parentCircle).fadeIn('slow');
//     parentCircle.style.display = 'inline-block';
//   }
//   var showCircle = function(parentCircleId, childCircleClass){
//     //if already plotted, just show them
//       var circle = document.getElementById(parentCircleId);
//       switch(parentCircleId) {
//       case 'Golden_Days':
//           if(circle.children.length > 0){
//             slideCircle(circle,childCircleClass, childhood);  
//           }else{
//             plotCircles(4, 0, 120, 170, 'Golden_Days', childhood, 'childhood');
//           }
//           break;
//       case 'Rebel_Phase':
//         if(circle.children.length > 0){
//           slideCircle(circle,childCircleClass, teen);
//         }else{
//           plotCircles(6, 0, 120, 170, 'Rebel_Phase', teen, 'teen');
//         }
//           break;
//       case 'Shit_Gets_Real':
//         if(circle.children.length > 0){
//           slideCircle(circle,childCircleClass, adult);
//         }else{
//           plotCircles(5, 90, 120, 170, 'Shit_Gets_Real', adult, 'adult');
//         }
//           break;
//       default:
//           return;
//       }
//   }
//   var hideCircle = function(parentCircleId, childCircleClass){
//     //hide the circles.
//     var circle = document.getElementById(parentCircleId);
//     var offsetToParentCenter = parseInt(circle.offsetWidth / 2);
//     var posX = offsetToParentCenter - 60+'px';
//     $('.'+childCircleClass).animate({left: posX, top: posX}, 1000);
//   }
//   var slideCircle = function(parentCircle,childCircleClass,data){
    
//     var offsetToParentCenter = parseInt(parentCircle.offsetWidth / 2);
//     var offsetToChildCenter = 60;
//     var totalOffset = (offsetToParentCenter - offsetToChildCenter);
    
//     $('.'+childCircleClass).each(function(i,div){
//       var $child = $(div);
//       $child.animate({left : (data[i].x + totalOffset), top : (data[i].y + totalOffset)}, 1000);
//     })
//       //childCircles[i].animate({left:  (data[i].x + totalOffset), top: (data[i].y + totalOffset)}, 500);
    
//   }


// $(function() {
//   makeParentCircle('Golden_Days', 180);
//   makeParentCircle('Rebel_Phase', 180);
//   makeParentCircle('Shit_Gets_Real', 180);
//  });



// $('#Golden_Days').mouseenter(function(e){ 
//   showCircle('Golden_Days', 'childhood');
    
// }).mouseout(function(e){
//   hideCircle('Golden_Days', 'childhood');

// });

// $('#Rebel_Phase').mouseenter(function(e){
//   showCircle('Rebel_Phase', 'teen');
  
// }).mouseout(function(e){
//   hideCircle('Rebel_Phase', 'teen');
  
// });

// $('#Shit_Gets_Real').mouseenter(function(e){
//   showCircle('Shit_Gets_Real', 'adult');
  
// }).mouseout(function(e){
//   hideCircle('Shit_Gets_Real', 'adult');
  
// });

  
 




