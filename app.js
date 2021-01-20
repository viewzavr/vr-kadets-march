import * as kadets from "./kadets-march-library.js";
import program from "./march2.js";

var march = program( kadets );
//console.log("MARCH=",march);

import * as konv from "./march2viewzavr.js";
var obj = konv.convert( march, vz.root );

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