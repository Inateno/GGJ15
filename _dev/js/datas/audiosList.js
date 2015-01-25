/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
* @sound mouseclick1 : Credit (Kenney or www.kenney.nl)
*
* 
***
*
* @singleton
* audioList
this is the audioList will be available in the project.
Please declare in the same way than this example.
To load audio as default just set "preload" to true.
**/

define( [ 'DE.CONFIG' ],
function( CONFIG )
{
  var audioList = [
    // MUSICS
    [ "game_music", "audio/fight", [ 'ogg', 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ]
    ,[ "edit_music", "audio/editor", [ 'ogg', 'mp3' ], { "preload": true, "loop": true, "isMusic": true } ]
    
    // FX
    ,[ "mouseclick1", "audio/mouseclick1", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    
    ,[ "v_intro", "audio/voice/intro", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    
    ,[ "v_hurt_aie", "audio/voice/short_ouille/aie", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hurt_ouille1", "audio/voice/short_ouille/ouille1", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hurt_ouille2", "audio/voice/short_ouille/ouille2", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hurt_ouille3", "audio/voice/short_ouille/ouille3", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hurt_ouillex2", "audio/voice/short_ouille/ouilleouille", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hurt_fuck1", "audio/voice/short_ouille/fuck1", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hurt_fuck2", "audio/voice/short_ouille/fuck2", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    
    ,[ "v_bhurt_awawa", "audio/voice/big_ouille/awawa", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_bhurt_ouilleaie", "audio/voice/big_ouille/ouilleaie", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_bhurt_ouillex3", "audio/voice/big_ouille/ouillex3", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_bhurt_waha", "audio/voice/big_ouille/waha", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    
    ,[ "v_hap_wahou", "audio/voice/happy/wahou", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hap_weee", "audio/voice/happy/weeeeee", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hap_wouhou", "audio/voice/happy/wouhou", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hap_yay", "audio/voice/happy/yay", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_hap_yepee", "audio/voice/happy/yepee", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    
    ,[ "v_jump_zdoing", "audio/voice/jump/zdoing", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_jump_zdoing2", "audio/voice/jump/doinoing", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    
    ,[ "v_v_gnihihi", "audio/voice/victory/gnihihi", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_v_nininini", "audio/voice/victory/nininini", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_v_niagniana", "audio/voice/victory/niagniana", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_v_titoli", "audio/voice/victory/titoli-yahi", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_v_tutuwatutu", "audio/voice/victory/tutuwatutu", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    
    ,[ "v_rage_fuck", "audio/voice/rage/fuck", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_rage_bouhou", "audio/voice/rage/bouhou", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
    ,[ "v_rage_grumble", "audio/voice/rage/grumble", [ 'ogg', 'mp3' ], { "preload": true, "loop": false, "isMusic": false } ]
  ];
  CONFIG.debug.log( "audioList loaded", 3 );
  return audioList;
} );