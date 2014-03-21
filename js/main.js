$(document).ready(function() {
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
  
  $(".date").html("Heute ist " + dOWInWords[dayOfWeek] + ", der " + day + "." + month + "." + year); //change date to today
  
  if (dayOfWeek == 5) { //Freitag
    if (hrs >= 17) {
      $("#yes").show();
      $("#almost").hide();
      $("#no").hide();
    } else {
      $("#yes").hide();
      $("#almost").show();
      $("#no").hide();    
    }
  }
  console.log(dayOfWeek);
  if (dayOfWeek == 6 || dayOfWeek == 0) { //Samstag Sonntag
      $("#yes").show();
      $("#almost").hide();
      $("#no").hide();
  }
  
  if (dayOfWeek < 5 && dayOfWeek > 0) { // Montag bis Freitag
      $("#yes").hide();
      $("#almost").hide();
      $("#no").show();
  }
  
  $('#yes').each(function() {
      var elem = $(this);
      setInterval(function() {
          if (elem.css('visibility') == 'hidden') {
              elem.css('visibility', 'visible');
              elem.css('color', randColor())
          } else {
              elem.css('visibility', 'hidden');
          }    
      }, 500);
  });
});