//Angular
angular.module('weekendApp', [])
.controller('WeekendController', function($scope){
    $scope.optionsD = [
      { label: "Montag",     value: 1},
      { label: "Dienstag",   value: 2},
      { label: "Mittwoch",   value: 3},
	    { label: "Donnerstag", value: 4},
      { label: "Freitag",    value: 5},
	    { label: "Samstag",    value: 6},
	    { label: "Sonntag",    value: 7}
    ];
    var d=new Date()
    var today = d.getDate() + 1
    $scope.weekdaySel = $scope.optionsD[4];

    $scope.daysUntil  = function() {return 5 - $scope.weekdaySel.value;};
    
    $scope.optionsT = [
      { label: "19", value: 19 },
      { label: "18", value: 18 },
      { label: "17", value: 17 },
	    { label: "16", value: 16 },
      { label: "15", value: 15 },
    ];
	$scope.timeSel = $scope.optionsT[2]; 


  
  $scope.format = 'dd.MM.yyyy, HH:mm:ss'; 
  angular.element(document).ready(function () {
     var ynm = $("#yes-no-maybe");
     bla = angular.element('[ng-controller=WeekendController]').scope()
     console.log(bla.weekdays)
     randColor = function() {
      colors = ["red", "green", "blue", "orange", "pink", "yellow", "brown", "grey", "black"]
      randNo = Math.floor(Math.random()*10);
     return colors[randNo]
     };
  
  var currentTime = new Date();
  var hrs = currentTime.getHours();
  var mnts = currentTime.getMinutes();
  var scnds = currentTime.getSeconds();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  var dayOfWeek = currentTime.getDay();
  var dOWInWords = new Array("Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag");
  var hrs = ((hrs < 10) ? "0" + hrs : hrs); //add a 0 to 1 digit numbers
  var mnts = ((mnts < 10) ? "0" + mnts : mnts);
  var scnds = ((scnds < 10) ? "0" + scnds : scnds);
  
  currentTime.setDate(currentTime.getDate() + 1);
  var dayPlus = currentTime.getDate();
  var monthPlus = currentTime.getMonth()+1;
  var dayPlus = ((dayPlus < 10) ? "0" + dayPlus : dayPlus);
  var monthPlus = ((monthPlus < 10) ? "0" + monthPlus : monthPlus);
  
  var tmmrw = dayPlus +  "." + monthPlus + ".";
  var thisDay = day +  "." + month + ".";

  //when does the user have Feierabend? By default we say "Freitag, 17 Uhr"
  var feierabendDay = $scope.weekdaySel.value;
  var feierabendHour = $scope.timeSel.value;
  var feierabendDiffH = feierabendHour - hrs - 1
  var feierabendDiffM = 60 - mnts
  var feierabendDiffD = 5 - dayOfWeek
  feierabendDiffD > 1 ? dayString = 'Tage' : dayString = 'Tag' 
  feierabendDiffH == 1 ? hourString = 'Stunde' : hourString = 'Stunden' 
  //if we have let's say Wednesday, 18:00 we would get "2 days, -1 hour"
  feierabendDiffH = feierabendDiffH % 24
 
  
  $scope.hoursUntil  = function() {return $scope.timeSel.value - hrs;};

  if (dayOfWeek == feierabendDay) { //Freitag
    if (hrs >= feierabendHour) {
      ynm.text('Yes, Wochenende \\o/ (Falls du ' + dOWInWords[feierabendDay] + ', ' +  feierabendHour +' Uhr Feierabend hast). Ab nach Hause! Worauf wartest du?')
    } else {
      ynm.text("Fast geschafft \\o/")
      if (feierabendDiffH >= 1)
        ynm.append('<p>Noch ' + feierabendDiffH + "h " + feierabendDiffM + 'm bis Feierabend! (' + dOWInWords[feierabendDay] + ', ' +  feierabendHour +' Uhr).</p>') 
      else 
      ynm.append('<p>Noch ' + feierabendDiffM + 'm bis Feierabend! (' + dOWInWords[feierabendDay] + ', ' +  feierabendHour +' Uhr).</p>')
    }
  }

  if (dayOfWeek == 6 || dayOfWeek == 0) { //Samstag Sonntag
      ynm.text('Yes, Wochenende \\o/ (Falls du ' + dOWInWords[feierabendDay] + ', ' +  feierabendHour +' Uhr Feierabend hast)')
  }
  
  if (dayOfWeek < feierabendDay && dayOfWeek > 0) { // Montag bis Freitag
    //if actual hours < Feierabend-hours
      ynm.text('Nein :( Bis zum Wochenende musst du noch ' + feierabendDiffD + ' ' + dayString + ' und ' + feierabendDiffH + ' ' + hourString + ' aushalten.')
      var scope = angular.element("#yes-no-maybe").scope();
      scope.$apply(function(){
          // angular world
          scope.data = html;
      });
  }
    });
  })

.directive('myCurrentTime', function($timeout, dateFilter) {
  return function(scope, element, attrs) {
    var format,
        timeoutId;
    function updateTime() {
      element.text(dateFilter(new Date(), format));
    }
    scope.$watch(attrs.myCurrentTime, function(value) {
      format = value;
      updateTime();
    });

    function updateLater() {
      timeoutId = $timeout(function() {
        updateTime();
        updateLater();
      }, 1000);
    }
    element.bind('$destroy', function() {
      $timeout.cancel(timeoutId);
    });
    updateLater();
  }
  });

$(document).ready(function() {
  

});