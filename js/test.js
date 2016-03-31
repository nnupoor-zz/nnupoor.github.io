//making good code out of working codes

"use strict"; 

var childhood = [
  {text : 'Born 24/1/91' },
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
  {text : 'Started Travelling'},
  {text : 'Own Domain'}
];

window.circle = (function () {
  var Circle = Circle || {};

  Circle = function(props){
    //enter checks if props values are correct
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

    $childCircleClass.animate({left: posX, top: posX}, 1500);
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

//write different data based on screen sizes
(function(){
  var x = { 
    r: 0,
    id: "",
    data: [],
    childCircleCount: 0,
    childRadius: 0,
    childOffset: 0,
    childAngle: 0,
    childClass: ""
  }

var screenWidth = $(window).width();

if(screenWidth>1500){
  x.r = 180;
  x.childRadius = 120;
  x.childOffset = 180;
} else if(screenWidth>700 && screenWidth<1500){
  x.r = 140;
  x.childRadius = 100;
  x.childOffset = 140;
}else{}

var childCircle = new circle( jQuery.extend(x, {id: "Golden_Days", data: childhood, childCircleCount : childhood.length, childAngle: 0, childClass: 'childhood'}) );
var teenCircle = new circle( jQuery.extend(x, {id: "Rebel_Phase", data: teen, childCircleCount : teen.length, childAngle: 0, childClass: 'teen'}) );
var adultCircle = new circle( jQuery.extend(x, {id: "Shit_Gets_Real", data: adult, childCircleCount : adult.length, childAngle: 90, childClass: 'adult'}) );

})();







// var childCircle = new circle({ 
     
//     });

// var teenCircle = new circle({ 
//       r: 180,
//       id: "Rebel_Phase",
//       data: teen,
//       childCircleCount: teen.length,
//       childRadius: 120,
//       childOffset: 180,
//       childAngle: 0,
//       childClass: "teen"
//     });

// var adultCircle = new circle({ 
//       r: 180,
//       id: "Shit_Gets_Real",
//       data: adult,
//       childCircleCount: adult.length,
//       childRadius: 120,
//       childOffset: 180,
//       childAngle: 90,
//       childClass: "adult"
//     });
