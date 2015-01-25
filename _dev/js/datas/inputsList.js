/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
*
* @singleton
* @inputsList
this is the inputsList will be available in the project.
Please declare in the same way than this example.
**/

define( [ 'DE.CONFIG' ],
function( CONFIG )
{
  var inputsList = {
    "left1":{"keycodes":[ "K.left" ] }
    ,"right1":{"keycodes":[ "K.right" ] }
    ,"up1":{"keycodes":[ "K.up" ] }
    ,"down1":{"keycodes":[ "K.down" ] }
    ,"jump1":{"keycodes":[ 'G0.B.A', "K.n" ], "stayOn": true }
    
    ,"haxe1":{"keycodes":[ "G0.A.LHorizontal" ] }
    ,"vaxe1":{"keycodes":[ "G0.A.LVertical" ] }
    
    ,"left2":{"keycodes":[ 'K.a', 'K.q' ] }
    ,"right2":{"keycodes":[ 'K.d' ] }
    ,"up2":{"keycodes":[ 'K.z', 'K.w' ] }
    ,"down2":{"keycodes":[ 'K.s' ] }
    ,"jump2":{"keycodes":[ 'G1.B.A', "K.space" ], "stayOn": true }
    
    ,"haxe2":{"keycodes":[ "G1.A.LHorizontal" ] }
    ,"vaxe2":{"keycodes":[ "G1.A.LVertical" ] }
    
    ,"valid-block-1":{"keycodes": [ "G0.B.A", "K.space", "K.enter" ] }
    ,"valid-block-2":{"keycodes": [ "G1.B.A", "K.space", "K.enter" ] }
    
    ,"cancel-block-1":{"keycodes": [ "G0.B.B", "K.escape", "K.return" ] }
    ,"cancel-block-2":{"keycodes": [ "G1.B.B", "K.escape", "K.return" ] }
    
    ,"start2":{"keycodes": [ "G1.B.start", "G1.B.A", "K.space", "K.enter" ] }
  };
  CONFIG.debug.log( "inputsList loaded", 3 );
  return inputsList;
} );