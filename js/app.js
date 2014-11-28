//Angular
angular.module('weekendApp', [])
.controller('WeekendController', function($scope, $filter){
  $scope.date = new Date();
  $scope.dayInWeek = new Date().getDay();
    var d     =new Date()
    var today = d.getDate() + 1;
    var hrs   = d.getHours();
    var mnts  = d.getMinutes();
    var scnds = d.getSeconds();
  
  $scope.optionsD   = [
    { label: "Montag"    , value:  1},
    { label: "Dienstag"  , value:  2},
    { label: "Mittwoch"  , value:  3},
    { label: "Donnerstag", value:  4},
    { label: "Freitag"   , value:  5},
    { label: "Samstag"   , value:  6},
    { label: "Sonntag"   , value:  7}
  ];
  $scope.weekdaySel = $scope.optionsD[4];

  $scope.optionsT   = [
    { label: "19"        , value: 19 },
    { label: "18"        , value: 18 },
    { label: "17"        , value: 17 },
    { label: "16"        , value: 16 },
    { label: "15"        , value: 15 },
  ];
	$scope.timeSel    = $scope.optionsT[2];

  var todayDay = $filter('date')($scope.date, 'EEE');
  var todayHrs = $filter('date')($scope.date, 'HH');
  var todayMin = $filter('date')($scope.date, 'mm');
  var calendarWeek = $filter('date')($scope.date, 'ww');

  $scope.$watch('timeSel', function() { //check if dropdown changes
    hoursDiff = $scope.timeSel.value - hrs - 1;
    minutesDiff = 60 - mnts;
    console.log("It is " + todayDay + hrs + ":" + mnts + ":" + scnds + " and your weekend starts " + todayDay + "at " + $scope.timeSel.value + " p.m. That's " + hoursDiff + " hours and " + minutesDiff + " minutes to go.")
    
    if ($scope.dayInWeek == 5) { //is today Friday?
      console.log("Today is Friday and you have to work for hrs/min");
      if (hoursDiff <= 3 && hoursDiff != 0) {
        console.log("Noch " + hoursDiff + " Stunden und " + minutesDiff + " Minuten")
        $scope.prompt = "Noch " + hoursDiff + " Stunden und " + minutesDiff + " Minuten bis zum wohlverdienten Wochenende."
      } else if (hoursDiff = 0 && minutesDiff > 0) {
        console.log ("Noch " + minutesDiff + " Minuten")
        $scope.prompt = "Noch " + minutesDiff + " Minuten bis zum wohlverdienten Wochenende."
      } else {
        console.log ("Noch mehr als " + hoursDiff + " Stunden")
        $scope.prompt = "Noch mehr als " + hoursDiff + " Stunden"
      }
    } else { //no, it's not Friday
      if ($scope.dayInWeek == 4) { //at least it's Thursday. Not much longer now.
        console.log("Tomorrow is Friday. Nearly there.")
        $scope.prompt = "Tomorrow is Friday. Nearly there."
      } else if ($scope.dayinWeek == 1) { //why are you looking at this page on a Monday???
        console.log("Bro, today's Monday. If you hate Mondays so much, maybe you should change something in your life.")
        $scope.prompt = "Bro, today's Monday. If you hate Mondays so much, maybe you should change something in your life."
      } else if ($scope.dayinWeek == 6 || dayinWeek == 7) { //it's saturday or sunday
        console.log("It's weekend, dude. Relax. Get off the internet!")
        $scope.prompt = "It's weekend, dude. Relax. Get off the internet!"
      } else { //Weekend is still far away
        console.log("It is " + todayDay + hrs + ":" + mnts + ":" + scnds + " and your weekend starts " + todayDay + "at " + $scope.timeSel.value + " p.m. That's " + hoursDiff + " hours and " + minutesDiff + " minutes to go.")
        $scope.prompt = "It is " + todayDay + hrs + ":" + mnts + ":" + scnds + " and your weekend starts " + todayDay + "at " + $scope.timeSel.value + " p.m. That's " + hoursDiff + " hours and " + minutesDiff + " minutes to go."
      }
    }
  });
});