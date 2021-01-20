var dir = import.meta.url.substring( 0,import.meta.url.lastIndexOf("/")+1 );
var file= dir + "snowstep1.mp3";

export default function setup(obj) {

obj.addCheckbox("audio-enabled",true,function(v) {
});

var animprev=[];
var stepplaying={};
obj.trackParam("T",function() {
  if (!obj.pts.animations_3) return;
  if (!obj.getParam("audio-enabled")) return;

  var count = obj.pts.positions.length / 3;
  if (count == 0) return;

  var animcur = obj.pts.animations_3.map( function(v){ return v%100});
  //console.log("count=",count,"animprev=",animprev)

  var activated=0;
  for (var i=0; i<count; i+=1) {
    var a = animcur[i];
    var dt = -10;
    if ( !stepplaying[i] && (a >= 25+dt && animprev[i] < 25+dt) || (a >= 75+dt && animprev[i] < 75+dt) )  {
      
      activated++;
      if (activated>10 && Math.random() > 0.2) continue; // если слишком много звуков то оставляем играть в 20% случаев

      var play = function(ii) { 
         //console.log("stepping",ii);
         var coords = [ obj.pts.positions[3*ii],obj.pts.positions[3*ii+1],obj.pts.positions[3*ii+2] ];
         stepplaying[ii] = true;
         vz.vis.playSound3d( coords, file,function(snd) {
          //snd.play(-2);
          //snd.setPlaybackRate(1.5);
          /*
          setTimeout( function(){
              snd.stop();
          },1500)
          */
        },function() {
          stepplaying[ii] = false;
        } ); }

      //setTimeout( play,Math.random()*50 );
      play(i);
    }
      
  }
  animprev = animcur.slice();

})

}