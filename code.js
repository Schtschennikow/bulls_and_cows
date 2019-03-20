var t = "How-de-do, cowboy! I'm thinking of a 4-digit number. The digits all different. When you'll try to guess this number I'll tell the number of matches. If the matching digits will be in their right positions, they will be 'bulls', if in different positions, they will be 'cows'.",
    t3 = "Don't slumguzzle me, only digits!",
    t4 = "Yippee ki-yay, cowboy! You win!",
    t5 = "Can't you count to four, smarty-pants?",
    t6 = "All digits must be different, you four-flusher.",
    t7 = "The jig is up, coffee boiler. My number was ",
    t8 = "Higgledy-Piggledy!",
    t9 = "It can't start by zero, for god's sake."

function generate_number() {
  var number = Math.floor(
    Math.random() * 10000);
  while(!is_correct(number)) {
    number = Math.floor(
      Math.random() * 10000);
  }
  return number;
};

function is_correct(number) {
  number = number + ""
  if (number.length < 4) {
    return false;
  }
  if (number[0] == 0) {
    document.getElementById("text").innerHTML = t9;
    return false;  
      }
  if (number.length > 4) {
    document.getElementById("text").innerHTML = t5;
    return false;
  }
  if (! /^\d+$/.test(number)) {
    document.getElementById("text").innerHTML = t3;
    return false;
  }
  for (var i = 0; i < number.length - 1; i++) {
    for (var j = i + 1; j < number.length; j++) {
      if (number.charAt(i) === number.charAt(j)) {
        document.getElementById("text").innerHTML = t6;
        return false;
      }
    }
  }
  document.getElementById("text").innerHTML = t;
  return true;
};

function get_bulls_n_cows(number, guess) {
  number = number + ""
  guess = guess + ""
  var bulls = 0;
  var cows = 0;
  for (var i = 0; i < number.length; i++) {
    for (var j = 0; j < guess.length; j++) {
      if (number.charAt(i) === guess.charAt(j)) {
        if (i === j) {
          bulls++;
        }
        else {
          cows++;
        }
      }
    }
  }
  return [bulls, cows]
};

function pass_f() {
  document.getElementById("text").innerHTML = t7 + number;
  document.getElementById("guess").disabled = true;
  document.getElementById("btn").disabled = true;
}
function win_f() {
  document.getElementById("text").innerHTML = t4;
  document.getElementById("guess").disabled = true;
  document.getElementById("btn").disabled = true;
  document.getElementById("pass").disabled = true;
};
function res() {
  $("#results").find("tr").remove();
  main();
};

function updateScroll(){
    var sk = document.getElementById("scroll");
    sk.scrollTop = sk.scrollHeight;
};

var cou = 0;

function main() {
  
  cou = 0;
  
  document.getElementById("countd").innerHTML = cou;
  
  number = generate_number();
  document.getElementById("text").innerHTML = t;
  
  document.getElementById("guess").disabled = false;
  document.getElementById("btn").disabled = false;
  document.getElementById("pass").disabled = false;
  
  document.getElementById("pass").onclick = function() {pass_f()};
  document.getElementById("reset").onclick = function() {res()};
  
  $("#guess_form").submit(
    
    function(event){
      event.preventDefault();
      
      var guess = $("#guess").val();
      
      if (! is_correct(guess)) {
        $("#guess").addClass("is-invalid");
        return;
      }
      
      $("#guess").removeClass("is-invalid");
      
      var result = get_bulls_n_cows(number, guess);
      
      $("#results tbody").append($(
        "<tr><td align='center' style='width: 30%; color: rgb(245, 245, 220);'>" + guess + "</td><td align='center' style='width: 70%'>" + "<img class='animal' src='https://s6.postimg.cc/3jn7x9c3l/image.png'>".repeat(result[1]) + "<img class='animal' src='https://s6.postimg.cc/uzcaeuu1d/image.png'>".repeat(result[0]) + "</td></tr>"
      ));

      document.getElementById("countd").innerHTML = cou+=1;
      
      updateScroll();
      
      $("#guess").val("");
      if (result[0] === 4) {
        win_f();
      }
    }
  )
  
  $("#guess").on("input", function(event) {
    if(is_correct($("#guess").val())) {
      $("#guess").removeClass("is-invalid");
    }
  })
};

$(main());