import * as kadets from "./kadets-march-library.js";

// converts march object produced by `kadets-march-library` to a viewzavr visual object
export function convert( march,vz, parent ) {

   //root.vz.create_obj( {} )
   var obj = vz.create_obj( {},{parent:parent,name:"march"} );
   var pts = vz.vis.addGltfArray( obj, "kadets" );
   pts.source = "models/Soldier.glb";
   obj.pts = pts;

   obj.addSlider( "T",0,0,kadets.get_duration(march),0.15,function(v) {
   	  var stage = kadets.compute_stage( march, v );
   	  stage2gr( stage, pts );
   })
   
   obj.addCheckbox( "coloring",true,function() {} );

   // конвертирует состояние кадет в графические аттрибуты
   function stage2gr( stage, tgt ) {
   	 
     var count = stage.length;
     var positions = [];
     var colors = [];
     var rotations = [];
     var anims = [];

     for (var i=1; i<=count; i++) {
     	var kadet = stage[i];
     	positions.push( kadet.pos[0],0,-kadet.pos[1] );
     	colors.push( kadet.color[0],kadet.color[1],kadet.color[2] )
     	rotations.push( 0, torad( kadet.angle-90 ), 0 );
     	anims.push( kadet.anim );
     }
     tgt.positions = positions;
     if (obj.getParam("coloring")) tgt.colors = colors;
     
     tgt.rotations = rotations;
     tgt.animations_3 = anims;
     // tgt.refresh();
   }

   obj.setParam("T",0);

   return obj;
}

export function convert_clones( march,root ) {

   //root.vz.create_obj( {} )
   var obj = root.vz.create_obj( {},{parent:root,name:"march"} );
   var model = root.vz.vis.addGltf( obj, "kadet-model" );
   var pts = root.vz.vis.addClones( obj,"kadets");
   model.track("loaded",function() {
     model.animation_3 = 0;
     //console.log("!!!!!!!!!!!!!!! model loaded");
     pts.setSource( model );
     obj.signalTracked("T");
     /*
     setTimeout( function() {
       obj.setParam("T",0);
     }, 500 );
     */
   });

   model.setParam("src","models/Soldier.glb");
   obj.pts = pts;

   obj.addSlider( "T",0,0,kadets.get_duration(march),0.15,function(v) {
   	  var stage = kadets.compute_stage( march, v );
   	  stage2gr( stage, pts );
   })
   
   obj.addCheckbox( "coloring",true,function() {} );

   // конвертирует состояние кадет в графические аттрибуты
   function stage2gr( stage, tgt ) {

     var count = stage.length;
     var positions = [];
     var colors = [];
     var rotations = [];
     var anims = [];

     for (var i=1; i<=count; i++) {
     	var kadet = stage[i];
     	positions.push( kadet.pos[0],0,-kadet.pos[1] );
     	colors.push( kadet.color[0],kadet.color[1],kadet.color[2] )
     	rotations.push( 0, torad( kadet.angle-90 ), 0 );
     	anims.push( kadet.anim );
     }
     tgt.positions = positions;
     if (obj.getParam("coloring")) tgt.colors = colors;
     tgt.rotations = rotations;
     tgt.animations_3 = anims;
   }

   obj.setParam("T",0);

   return obj;
}

export function convert_pts( march,root ) {

   //root.vz.create_obj( {} )
   var obj = root.vz.create_obj( {},{parent:root,name:"march"} );
   var pts = root.vz.vis.addPoints( obj, "kadets" );
   pts.color=[1,1,1];

   obj.addSlider( "T",0,0,kadets.get_duration(march),1,function(v) {
   	  var stage = kadets.compute_stage( march, v );
   	  stage2gr( stage, pts );
   })

   // конвертирует состояние кадет в графические аттрибуты
   function stage2gr( stage, tgt ) {
   	 
     var count = stage.length;
     var positions = [];
     var colors = [];
     var rotations = [];

     for (var i=1; i<=count; i++) {
     	var kadet = stage[i];
     	positions.push( kadet.pos[0],0,-kadet.pos[1] );
     	colors.push( kadet.color[0],kadet.color[1],kadet.color[2] )
     	rotations.push( 0, kadet.angle, 0 );
     }
     tgt.positions = positions;
     tgt.colors = colors;
     tgt.rotations = rotations;
   }
}

function torad( angl ) {
  return angl * Math.PI / 180.0;
}
