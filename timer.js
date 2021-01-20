import * as kadets from "./kadets-march-library.js";

/*
export default function setup( obj, march ) {
  addTimer( obj, "T",1,kadets.get_duration(march),1.6 );
}
*/

export default function addTimer( obj,paramname, parammin, parammax, paramcoef = 1.6 ) {

/////////////////////////////
var playing=false;
var lasttick;
function ontick() {
  //console.log("t");
  var t = performance.now();
  if (lasttick) {
    var delta_s = (t - lasttick) /1000.0;
    //var coef = 1.5;
    var coef = obj.getParam("coef");
    var nv = obj.getParam( paramname ) + delta_s*coef;
    if (nv > parammax) nv = parammin;
    obj.setParam("T",nv );
  }
  lasttick=t;
}

obj.addCmd("play/pause",function() {
  if (playing) 
    threejs.scene.removeEventListener( "render", ontick );
  else {
    threejs.scene.addEventListener( "render", ontick );
    lasttick = undefined;
  }
  playing = !playing;
});

obj.addSlider("coef", paramcoef ,1,2,0.1,function() {});

}