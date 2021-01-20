import * as kadets from "./kadets-march-library.js";
import program from "./march2.js";

var march = program( kadets );
//console.log("MARCH=",march);

import * as konv from "./march2viewzavr.js";
var obj = konv.convert( march, vz.root );
//var obj = konv.convert_clones( march, vz.root );

import snd from "./sounds/init.js";
snd( obj );

var env = vz.vis.addGltf();
env.setParam("src","models/VC.glb");
env.scale = 10;
//env.positions = [-100,-500,0];
obj.trackParam("T",function(){
  //env.setParam("animation_0", obj.getParam("T") );
})

vz.restoreFromHash();

/////////////////////////////
// thus this block is a feature; in contrast with snd, where snd is feature
import timer from "./timer.js";
//timer( obj, march );
timer( obj,"T",1,kadets.get_duration(march),1.6 );
