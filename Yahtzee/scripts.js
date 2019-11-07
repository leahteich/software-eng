/*
Yahtzee Project - Software Engineering/Fa 2019
By Leah Teichholtz
Extensions: Animated Dice

Lauren Teichholtz '22 and Cindy Hou '20 user tested this game

***   Note to Mr. Gohde: I coded using the Yahtzee rules online
      so you can only put a 0 if the value is actually 0
      https://winning-moves.com/images/YAHTZEERULESv2.pdf


*/

var dice_width = 70;
var rollcount = 3;
var turncount = 13;
var dicevals = Array(5);

var username = "";
var acesval = null;
var twosval = null;
var threesval = null;
var foursval = null;
var fivesval = null;
var sixesval = null;
var threekindval = null;
var fourkindval = null;
var fullhouseval = null
var smval = null;
var lgval = null;
var yahtzeeval = null;
var chanceval = null;

var myUser = "";

var dice_tags = [
  "<img src='images/one.svg' height = '70'/>", //0
  "<img src='images/two.svg' height = '70'/>",//1
  "<img src='images/three.svg' height = '70'/>",//2
  "<img src='images/four.svg' height = '70'/>",//3
  "<img src='images/five.svg' height = '70'/>",//4
  "<img src='images/six.svg' height = '70'/>",//5
  "<img src='images/spinning_one.svg' height = '70'/>",//6
  "<img src='images/spinning_two.svg' height = '70'/>",//7
  "<img src='images/spinning_three.svg' height = '70'/>",//8
  "<img src='images/spinning_four.svg' height = '70'/>",//9
  "<img src='images/spinning_five.svg' height = '70'/>",//10
  "<img src='images/spinning_six.svg' height = '70'/>",//11
];


var roll_button = document.getElementById("roll_button");
var feedback = document.getElementById("feedback");
var save_button = document.getElementById("save_game");

save_button.addEventListener('click', function() {
  var currentuser = {};

  currentuser.username = username;
  currentuser.aces = acesval;
  currentuser.twos = twosval;
  currentuser.threes = threesval;
  currentuser.fours = foursval;
  currentuser.fives = fivesval;
  currentuser.sixes = sixesval;
  currentuser.threekind = threekindval;
  currentuser.fourkind = fourkindval;
  currentuser.sm = smval;
  currentuser.lg = lgval;
  currentuser.fullhouse = fullhouseval;
  currentuser.yahtzee = yahtzeeval;
  currentuser.chance = chanceval;
  currentuser.turncount = turncount;
  currentuser.rollcount = rollcount;
  currentuser.dice = dicevals;

  localStorage.setItem(username,JSON.stringify(currentuser));
});

var nameval = document.getElementById("name_value");

nameval.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var nameval = this.value;
    var letters = /^[A-Za-z]+$/; //From https://www.w3resource.com/javascript/form/all-letters-field.php
    //checking that only letters are inputted as a name (so people don't put code in and hack yahtzee :o)

  if(nameval.match(letters)) {
      if (Object.keys(localStorage).includes(nameval)) {
        document.getElementById("nosavedg").setAttribute("id", "savedg");
      } else {
        document.getElementById("noscorecard").setAttribute("id", "scorecard");
        document.getElementById("nodice").setAttribute("id", "dice");
        document.getElementById("nolocstorage").setAttribute("id","locstorage");
      }
      document.getElementById("titleval").innerHTML = nameval.toUpperCase() + "'S YAHTZEE GAME!";
      username = this.value;
      myUser = this.value;
      namevalue.setAttribute("id", "noname");

    } else {
     document.getElementById("nameq").innerHTML = "Please input a valid name";
    }
  }
});

var blank_user = { //for every time you press new game
  aces: null,
  twos: null,
  threes: null,
  fours: null,
  fives: null,
  sixes: null,
  threekind: null,
  fourkind: null,
  fullhouse: null,
  sm: null,
  lg: null,
  yahtzee: null,
  chance: null,
  username: username,
  turncount: 13,
  rollcount: 3,
  dice: [null,null,null,null,null],
}

var opensaved = document.getElementById("old_game");
opensaved.addEventListener('click', function() {
  document.getElementById("nodice").setAttribute("id", "dice");
  document.getElementById("noscorecard").setAttribute("id", "scorecard");
  document.getElementById("savedg").setAttribute("id", "nosavedg");
  document.getElementById("nolocstorage").setAttribute("id","locstorage");
  loadSaved(JSON.parse(localStorage.getItem(username)), false);

});

var newgame1 = document.getElementById("new_game");
newgame1.addEventListener('click', function() {
  document.getElementById("nodice").setAttribute("id", "dice");
  document.getElementById("noscorecard").setAttribute("id", "scorecard");
  document.getElementById("savedg").setAttribute("id", "nosavedg");
  document.getElementById("nolocstorage").setAttribute("id","locstorage");
});

var newgame2 = document.getElementById("new_game2");
newgame2.addEventListener('click', function() {
  loadSaved(blank_user, true);
});


var aces = document.getElementById("aces_score_value"); //aces category
aces.addEventListener('keyup', function(e) { // https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
  console.log("aces attempt");
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    for (var i = 0; i < dicevals.length; i++) {
      if (dicevals[i] === 1) {
        correctvalue = correctvalue+1;
      }
    }
    score_validation("aces",value,correctvalue);
  }
});

var twos = document.getElementById("twos_score_value"); //twos category
twos.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    for (var i = 0; i < dicevals.length; i++) {
      if (dicevals[i] === 2) {
        correctvalue = correctvalue+2;
      }
    }
    score_validation("twos",value,correctvalue)
  }
});

var threes = document.getElementById("threes_score_value"); //threes category
threes.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    for (var i = 0; i < dicevals.length; i++) {
      if (dicevals[i] === 3) {
        correctvalue = correctvalue+3;
      }
    }
    score_validation("threes",value,correctvalue)
  }
});

var fours = document.getElementById("fours_score_value"); //fours category
fours.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    for (var i = 0; i < dicevals.length; i++) {
      if (dicevals[i] === 4) {
        correctvalue = correctvalue+4;
      }
    }
    score_validation("fours",value,correctvalue);
  }
});

var fives = document.getElementById("fives_score_value"); //fives category
fives.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    for (var i = 0; i < dicevals.length; i++) {
      if (dicevals[i] === 5) {
        correctvalue = correctvalue+5;
      }
    }
    score_validation("fives",value,correctvalue);
  }
});

var sixes = document.getElementById("sixes_score_value"); //sixes category
sixes.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    for (var i = 0; i < dicevals.length; i++) {
      if (dicevals[i] === 6) {
        correctvalue = correctvalue+6;
      }
    }
    score_validation("sixes",value,correctvalue)
  }
});

var threekind = document.getElementById("threekind_score_value"); //threekind category
threekind.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    dicevals.sort(function (a,b) {return b-a});
    if ((dicevals[0]==dicevals[1] && dicevals[0] == dicevals[2]) || (dicevals[1]==dicevals[2] && dicevals[1] == dicevals[3]) || (dicevals[2]==dicevals[3] && dicevals[2] == dicevals[4])){
      for (var i = 0 ; i< dicevals.length; i++) {
        correctvalue = correctvalue + dicevals[i];
      }
    }
    score_validation("threekind",value,correctvalue)
  }
});

var fourkind = document.getElementById("fourkind_score_value"); //fourkind category
fourkind.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    dicevals.sort(function (a,b) {return b-a});
    if ((dicevals[0]==dicevals[1] && dicevals[0] == dicevals[2] && dicevals[0] == dicevals[3]) || (dicevals[1]==dicevals[2] && dicevals[1] == dicevals[3] && dicevals[1] == dicevals[4])){
      for (var i = 0 ; i< dicevals.length; i++) {
        correctvalue = correctvalue + dicevals[i];
      }
    }
    score_validation("fourkind",value,correctvalue)
  }
});

var fullhouse = document.getElementById("house_score_value"); //fullhouse category
fullhouse.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    dicevals.sort(function (a,b) {return b-a});
    if ((dicevals[0]==dicevals[1] && dicevals[0]==dicevals[2]) && (dicevals[3] == dicevals[4]) || (dicevals[2]==dicevals[3] && dicevals[2]==dicevals[4]) && (dicevals[0] == dicevals[1])){
      correctvalue = 25;
    }
    score_validation("fullhouse",value,correctvalue);
  }
});

var sm = document.getElementById("sm_score_value"); //small straight category
sm.addEventListener('keyup', function(e) {

  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    dicevals.sort(function (a,b) {return a-b});
    var temp = [...new Set(dicevals)]; //from https://wsvincent.com/javascript-remove-duplicates-array/
    if (temp[0]+1==temp[1] && temp[0]+2==temp[2] && temp[0]+3==temp[3]) {
       correctvalue = 30;
    }
    else if (dicevals[0]+1==dicevals[1]&&dicevals[0]+2==dicevals[2] && dicevals[0]+3 == dicevals[3] && dicevals[0]+4==dicevals[4]){
      //a large straight is also a small straight
      correctvalue = 30;
    }
    score_validation("sm",value,correctvalue)
  }
});

var lg = document.getElementById("lg_score_value"); //large straight category
lg.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;
    dicevals.sort(function (a,b) {return a-b});

    if (dicevals[0]+1==dicevals[1]&&dicevals[0]+2==dicevals[2] && dicevals[0]+3 == dicevals[3] && dicevals[0]+4==dicevals[4]){
      correctvalue = 40;
    }
    score_validation("lg",value,correctvalue)
  }
});

var yahtzee = document.getElementById("yahtzee_score_value"); //yahtzee category
yahtzee.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;

    if (dicevals[0]==dicevals[1]&&dicevals[0]==dicevals[2] && dicevals[0]==dicevals[3] && dicevals[0]==dicevals[4]){
      correctvalue = 50;
    }
    score_validation("yahtzee",value,correctvalue);
  }
});

var chance = document.getElementById("chance_score_value"); //chance category
chance.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    var value = this.value;
    var correctvalue = null;

    for (var i=0; i<dicevals.length; i++) {
      correctvalue = correctvalue + dicevals[i];
    }
    score_validation("chance",value,correctvalue);
  }
});

var totupbox = document.getElementsByClassName("total")[2];
var totlowbox = document.getElementsByClassName("total_lower")[2];
var othertotup = document.getElementsByClassName("total_upper")[2];
var othertotup2 = document.getElementsByClassName("total_upper2")[2];
var upperbonus = document.getElementsByClassName("upper_bonus")[2];
var totgrand = document.getElementById("total_grand");
var totalupper = 0;
var totallower = 0;
var inclbonus = false;

function score_validation(id,val,correctval) {
  if (die_1.innerHTML.includes("hmm")) {
    correctval = NaN; //no correctval when you haven't rolled yet
    feedback.innerHTML = "You haven't rolled yet!"
  }
  if (isNaN(val)) {
    feedback.innerHTML = "Value must be a number!";
  }
  if (correctval !== val) {
    feedback.innerHTML = "That value is invalid!";
  }
  if (correctval === null) {
      correctval = 0;
  }
   if (correctval == val) {
    feedback.innerHTML = "Correct score inputted! Yay!";
    this[id+'val'] = correctval; //modifies each variable dynamically
    //https://stackoverflow.com/questions/12149233/concatenate-a-dynamic-variable-name-in-javascript
    var newid = this[id+'_score_value'];
    console.log(document.getElementsByClassName(id)[2].childNodes[0])
    document.getElementsByClassName(id)[2].childNodes[0].setAttribute("readonly", "readonly");

    document.getElementsByClassName(id)[2].setAttribute("class", id + " score finished");
    document.getElementsByClassName(id)[1].setAttribute("class", id + " description finished");
    document.getElementsByClassName(id)[0].setAttribute("class", id + " category finished");
    correctval = parseInt(correctval);

      if ((id == "aces") || (id == "twos") || (id == "threes") || (id=="fours") || (id == "fives") || (id == "sixes")) {
        totalupper = correctval + totalupper;

        if (totalupper >= 63) {
          var inclbonus = true;
          totupbox.innerHTML = totalupper;
          upperbonus.innerHTML = 35;
          othertotup.innerHTML = totalupper + 35;
          othertotup2.innerHTML = totalupper + 35;
          totlowbox.innerHTML = totallower;
        }
        else {
          totupbox.innerHTML = totalupper;
          othertotup.innerHTML = totalupper;
          othertotup2.innerHTML = totalupper;
          totlowbox.innerHTML = totallower;
        }
    } else {
      totallower = correctval + totallower;
      totupbox.innerHTML = totalupper;
      othertotup.innerHTML = totalupper;
      othertotup2.innerHTML = totalupper;
      totlowbox.innerHTML = totallower;
    }

    if (inclbonus) {
      totgrand.innerHTML = totalupper + totallower + 35;
    }
    else {
      totgrand.innerHTML = totalupper + totallower;
    }
    resetting();
  }
}

function loadSaved(user, isBlank) {
  var currentgame = user;

  rollcount = currentgame.rollcount;
  turncount = currentgame.turncount;
  acesval = currentgame.aces;
  twosval = currentgame.twos;
  threesval = currentgame.threes;
  foursval = currentgame.fours;
  fivesval = currentgame.fives;
  sixesval = currentgame.sixes;
  threekindval = currentgame.threekind;
  fourkindval = currentgame.fourkind;
  fullhouseval = currentgame.fullhouse;
  smval = currentgame.sm;
  lgval = currentgame.lg;
  yahtzeeval = currentgame.yahtzee;
  chanceval = currentgame.chance;
  dicevals = currentgame.dice;
  username = currentgame.username;

  var ishmm = false;

  if (dicevals[1] === null) {
    ishmm = true;
  }

  username = myUser;
  rollcount = 3;
  turncount = 13;
  totalupper = 0;
  totallower = 0;
  feedback.innerHTML = "Feedback box";

  if (isBlank) {
    inclbonus = false;
    document.getElementsByClassName("upper_bonus")[2].innerHTML = null;

    for (var i = 0; i < 13; i++) {
      var currid = Object.keys(currentgame)[i];
      document.getElementsByClassName(currid)[2].childNodes[0].removeAttribute("readonly");
      document.getElementsByClassName(currid)[2].childNodes[0].value = null;
      document.getElementsByClassName(currid)[2].setAttribute("class",currid + " score");
      document.getElementsByClassName(currid)[1].setAttribute("class",currid + " description");
      document.getElementsByClassName(currid)[0].setAttribute("class",currid + " category");
      document.getElementById("counter").innerHTML = rollcount+ " Rolls Left";
    }
  for (var i =0; i < dicevals.length; i++) {
    if(document.getElementById("die_"+i).getAttribute("class")=="reserve") {
      document.getElementById("die_"+i).setAttribute("class","nonreserve");
    }
    document.getElementById("die_"+i).innerHTML = "<img src='images/hmm.svg' height = '70'/>";
  }
}

if (!isBlank) {
  for (var i = 0; i < dicevals.length; i++) {
    if (!ishmm)
      document.getElementById("die_"+i).innerHTML = dice_tags[dicevals[i]-1];
    else
      document.getElementById("die_"+i).innerHTML = "<img src='images/hmm.svg' height = '70'/>";
  }
}
  var uppertotal = 0;
  var lowertotal = 0;

  if (acesval!==null) {
    setNonNull("aces", acesval);
    uppertotal = uppertotal + acesval;
  }  if (twosval!==null) {
    setNonNull("twos", twosval);
    uppertotal = uppertotal + twosval;
  } if (threesval!==null) {
    setNonNull("threes", threesval);
    uppertotal = uppertotal + threesval;
  } if (foursval!==null) {
    setNonNull("fours",foursval);
    uppertotal = uppertotal + foursval;
  } if (fivesval!==null) {
    setNonNull("fives",fivesval);
    uppertotal = uppertotal + fivesval;
  } if (sixesval!==null) {
    setNonNull("sixes",sixesval);
    uppertotal = uppertotal + sixesval;
  } if (threekindval!==null) {
    setNonNull("threekind",threekindval);
    lowertotal = lowertotal + threekindval;
  } if (fourkindval!==null) {
    setNonNull("fourkind",fourkindval);
    lowertotal = lowertotal + fourkindval;
  } if (fullhouseval!==null) {
    setNonNull("fullhouse",fullhouseval);
    lowertotal = lowertotal + fullhouseval;
  } if (smval!==null) {
    setNonNull("sm",smval);
    lowertotal = lowertotal + smval;
  } if (lgval!==null) {
    setNonNull("lg",lgval);
    lowertotal = lowertotal + lgval
  } if (yahtzeeval!==null) {
    setNonNull("yahtzee",yahtzeeval);
    lowertotal = lowertotal + yahtzeeval;
  } if (chanceval!==null) {
    setNonNull("chance",chanceval);
    lowertotal = lowertotal + chanceval;
  }


  if (uppertotal >= 63) {
    var inclbonus = true;
    totupbox.innerHTML = uppertotal;
    upperbonus.innerHTML = 35;
    othertotup.innerHTML = uppertotal + 35;
    othertotup2.innerHTML = uppertotal + 35;
    totlowbox.innerHTML = lowertotal;
  }
  else {
    totupbox.innerHTML = uppertotal;
    othertotup.innerHTML = uppertotal;
    othertotup2.innerHTML = uppertotal;
    totlowbox.innerHTML = lowertotal;
  }
  if (inclbonus) {
    totgrand.innerHTML = uppertotal + lowertotal + 35;
  }
  else {
    totgrand.innerHTML = uppertotal + lowertotal;
  }
}

function setNonNull(id, val) {
  document.getElementsByClassName(id)[2].childNodes[0].value = val;
  document.getElementsByClassName(id)[2].childNodes[0].setAttribute("readonly", "readonly");
  document.getElementsByClassName(id)[2].setAttribute("class", id+ " score finished");
  document.getElementsByClassName(id)[1].setAttribute("class", id + " description finished");
  document.getElementsByClassName(id)[0].setAttribute("class", id + " category finished");
}

function resetting() {
  turncount = turncount - 1;
  console.log(turncount + " remaining turns");
  rollcount = 3;
  for (var i = 0; i < 5; i++) {
    document.getElementById("die_"+i).setAttribute("class", "nonreserve");
    document.getElementById("die_"+i).innerHTML = '<img src="images/hmm.svg" width = 70/>';
    dicevals = [null,null,null,null,null];
  }
  document.getElementById("counter").innerHTML = rollcount+ " Rolls Left";
}

for (var j=0; j<5; j++) {
  var chooseDie = document.getElementById('die_'+j);
    chooseDie.addEventListener('click', function(){
      if (!chooseDie.innerHTML.includes("hmm")) {
        if (this.getAttribute("class") == "reserve")
          this.setAttribute("class","nonreserve");
        else
          this.setAttribute("class","reserve");
      }
    })
};

function boundTimeout(cbfunc, loop, j) {
    for (var i = 0; i < j; i++) {
        setTimeout(cbfunc, i * loop); //makes something run for certain time then stop
    }
    clearTimeout();
    //https://www.w3schools.com/jsref/met_win_settimeout.asp
}

roll_button.addEventListener('click', function() {

  if (rollcount > 0 && turncount!=0) {
    rollcount--;
    document.getElementById("counter").innerHTML = rollcount+ " Rolls Left";

    for (var i=0; i<5; i++) { //this loop is kinda useless but i didnt want to delete it bc everything broke
      if (document.getElementById("die_"+i).getAttribute("class")=="nonreserve")  {//only roll unsaved dice
        boundTimeout(function() {
            var spinval0 = Math.floor(6*Math.random()+6); //for some reason this didn't work in the for loop
            var spinval1 = Math.floor(6*Math.random()+6); // i know this entire section is super repetitive
            var spinval2 = Math.floor(6*Math.random()+6);
            var spinval3 = Math.floor(6*Math.random()+6);
            var spinval4 = Math.floor(6*Math.random()+6);
            if (document.getElementById("die_0").getAttribute("class")=="nonreserve") {
              document.getElementById("die_0").innerHTML = dice_tags[spinval0];
            }
            if (document.getElementById("die_1").getAttribute("class")=="nonreserve") {
              document.getElementById("die_1").innerHTML = dice_tags[spinval1];
            }
            if (document.getElementById("die_2").getAttribute("class")=="nonreserve") {
              document.getElementById("die_2").innerHTML = dice_tags[spinval2];
            }
            if (document.getElementById("die_3").getAttribute("class")=="nonreserve") {
              document.getElementById("die_3").innerHTML = dice_tags[spinval3];
            }
            if (document.getElementById("die_4").getAttribute("class")=="nonreserve") {
              document.getElementById("die_4").innerHTML = dice_tags[spinval4];
            }
        }, 50, 10);
        setTimeout(function(){ //this waits until spinning is over to display actual dice faces
          if (document.getElementById("die_0").getAttribute("class")=="nonreserve") {
            var diceValue0 = Math.floor(6*Math.random());
            document.getElementById("die_0").innerHTML = dice_tags[diceValue0];
            dicevals[0] = diceValue0 + 1;
          }
          if (document.getElementById("die_1").getAttribute("class")=="nonreserve") {
            var diceValue1 = Math.floor(6*Math.random());
            document.getElementById("die_1").innerHTML = dice_tags[diceValue1];
            dicevals[1] = diceValue1 + 1;
          }
          if (document.getElementById("die_2").getAttribute("class")=="nonreserve") {
            var diceValue2 = Math.floor(6*Math.random());
            document.getElementById("die_2").innerHTML = dice_tags[diceValue2];
            dicevals[2] = diceValue2 + 1;
          }
          if (document.getElementById("die_3").getAttribute("class")=="nonreserve") {
            var diceValue3 = Math.floor(6*Math.random());
            document.getElementById("die_3").innerHTML = dice_tags[diceValue3];
            dicevals[3] = diceValue3 + 1;
          }
          if (document.getElementById("die_4").getAttribute("class")=="nonreserve") {
            var diceValue4 = Math.floor(6*Math.random());
            document.getElementById("die_4").innerHTML = dice_tags[diceValue4];
            dicevals[4] = diceValue4 + 1;
          }
        }, 500);
        }
      }
  }

});
