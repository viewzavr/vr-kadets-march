export function create( obj ) {

   // object obj_music_coords
  var obj_music_coords = obj.vz.create_obj_by_type( { type: 'music_with_coords', parent: obj, name: 'music_coords', manual: true } );
    obj_music_coords.setParam( 'file', '//viewlang.ru/assets/sounds/kadet-marsh-minus.mp3' );
    obj_music_coords.setParam( 'volume', '50' );
    obj_music_coords.setParam( 'refdistance', '100' );
    obj_music_coords.setParam( 'coords', '0,0,0' );

  obj.addSlider( "march-music",100,0,100,1,function(e) {
    obj_music_coords.setParam("volume",e);
  });
  
  obj.track( "start",function() {
    obj_music_coords.play();
  });
  
  obj.track( "stop",function() {
    obj_music_coords.stop();
  });
}
