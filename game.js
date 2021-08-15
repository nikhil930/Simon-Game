var buttoncolors=['red','blue','green','yellow'];
var gamepattern=[];
var userClickedPattern=[];
var level=1;
var started=false;
function nxtsequence()
{
  userClickedPattern=[];
    $('h1').text('Level '+level);
    var randomnum=Math.floor(3*Math.random())+1;
    var randomchosecolor=buttoncolors[randomnum];
    gamepattern.push(randomchosecolor);
    $("#"+randomchosecolor).fadeTo(100).fadeTo(100);
    playsound(randomchosecolor);
    animatepress(randomchosecolor);
    level++;
}
$('.btn').click(function () {
    var userchosecolor=$(this).attr('id');
    userClickedPattern.push(userchosecolor);
    playsound(userchosecolor);
    animatepress(userchosecolor);
    chkans(userClickedPattern.length-1);
  });
$(document).click(function (evnt) {
    playsound(evnt.key);
});
function playsound (key) {

    var audio=new Audio ("sounds/"+key+".mp3");
    audio.play();
  }
  function animatepress(currentcolor) {
    $("#"+currentcolor).addClass("pressed");
    setTimeout(function () {
      $("#"+currentcolor).removeClass("pressed");
    },100);
  }
 $(document).keypress(function()
 {
   if(!started)
   {
     nxtsequence();
     started=true;
   }
 })
 function chkans(currentlevel) {
   if(userClickedPattern[currentlevel] === gamepattern[currentlevel])
   {
     console.log("success");
     if(userClickedPattern.length === gamepattern.length )
     {
       setTimeout(function(){
         nxtsequence()},1000
       );
     }
   }
   else{
     console.log("lose");
     playsound("wrong");
     $("body").addClass('game-over');
     setTimeout(
       function(){
        $("body").removeClass('game-over');
       },300
     );
     $('h1').text("Game Over, Press any key to Restart !");
     startover();
   }
 }
 function startover()
     {
       level=1;started=false;
       gamepattern=[];
     }
