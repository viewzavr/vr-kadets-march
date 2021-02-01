import * as kadets from "./kadets-march-library.js";
import program from "./march2.js";
import * as konv from "./march2viewzavr.js";
import * as mus from "./music-march/init.js";
import timer from "./timer.js";
import snd from "./sounds/init.js";

export function create( vz,opts ) {

var march = program( kadets );
//console.log("MARCH=",march);

var obj = konv.convert( march, vz, opts.parent );

///////////////// env city

var dir = vz.getDir( import.meta.url );
var env = vz.vis.addGltf();
env.setParam("src",dir+"/models/VC.glb");
env.scale = 10;
//env.positions = [-100,-500,0];
obj.trackParam("T",function(){
  //env.setParam("animation_0", obj.getParam("T") );
})

//////////////////
// thus this block is a feature; in contrast with snd, where snd is feature

timer( obj,"T",1,kadets.get_duration(march),1.7 );


////////////////// music march
mus.create( obj );

////////////////// step sounds

snd( obj );

return obj;
}


export function setup( vz ) {
  vz.addItemType( "kadety","Kadet's march", function( opts ) {
    return create( vz, opts );
  } );
}
