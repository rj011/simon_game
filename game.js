var userClickedPattern =[];
var gamePattern=[];
var buttonColours =[];
buttonColours=['red','blue','green','yellow'];
var start =0;
var level =0;
document.addEventListener("keypress",function()
{
    if(start==0)
    {nextSequence();
    document.querySelector("h1").innerHTML="Level 0";
    start=1;
    }
    else
    return;
});

function nextSequence()
{    
    userClickedPattern =[];
    var random = Math.random();
    random=random*4;
    random=Math.floor(random);
    level++;
    document.querySelector("h1").innerHTML="Level "+level;

var randomChosenColour = buttonColours[random];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
btnsound(randomChosenColour);

}

function checkAnswer(currentlevel)
{
    if(gamePattern[currentlevel]==userClickedPattern[currentlevel])
    {
        if(gamePattern.length==userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            } , 1000);
        }
    }
    else
    {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        var wrong = $("body").addClass("game-over");
        setTimeout(function()
        {
      wrong.removeClass("game-over");
         }, 200);

         document.querySelector("h1").innerHTML= "Game Over, Press Any Key to Restart";
         startOver();
    }

}


function startOver()
{
   level =0;
   gamePattern =[];
   start=0;
}


for(var i=0;i<document.querySelectorAll(".btn").length;i++)
{
    document.querySelectorAll(".btn")[i].addEventListener("click",function()
    {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        btnsound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(buttonColours.indexOf(userChosenColour));
    });
}

function btnsound(key)
{
    var audio = new Audio('sounds/'+key+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
  var active = $("#"+currentColour).addClass("pressed");
  setTimeout(function()
  {
      active.removeClass("pressed");
  }, 100);

}
