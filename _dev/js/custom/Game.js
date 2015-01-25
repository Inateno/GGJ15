/**
* Author
 @Inateno / http://inateno.com / http://dreamirl.com

* ContributorsList
 @Inateno

***
 Sample empty to make Games
 
**/
define( [ 'DREAM_ENGINE', 'screens.menu', 'screens.game' ],
function( DE, menuScreen, gameScreen )
{
  var Game = {};
  
  Game.render  = null;
  
  // init
  Game.init = function()
  {
    console.log( "init Engine" );
    DE.CONFIG.DEBUG = 0; // debug on
    DE.CONFIG.DEBUG_LEVEL = 0; // all debug
    
    // create render
    Game.render = new DE.Render( "render", { fullScreen: "ratioStretch"} );
    Game.render.init();
    
    // launch the engine
    DE.start();
  }
  
  // start
  Game.start = function()
  {
    // scene
    console.log( "game starto!!" );
    
    Game.screens = {
      game: gameScreen( Game.render )
      ,menu: menuScreen( Game.render )
    };
    
    DE.on( 'changeScreen', changeScreen );
    DE.on( "play-random-fx", playFx );
    DE.trigger( 'changeScreen', 'menu' );
    
    DE.AudioManager.setVolume( 80 );
    // DE.AudioManager.music.mute();
    // always let a little delay between the real load and the visual load, better feeling
    setTimeout( function(){ DE.States.down( "isLoading" ); }, 200 );
  };
  
  var fxs = {
    "hurt"      : [ "v_hurt_aie", "v_hurt_ouille1", "v_hurt_ouille2", "v_hurt_ouille3", "v_hurt_ouillex2", "v_hurt_fuck1", "v_hurt_fuck2" ]
    ,"big-hurt" : [ "v_bhurt_awawa", "v_bhurt_ouilleaie", "v_bhurt_ouillex3", "v_bhurt_waha" ]
    ,"happy"    : [ "v_hap_wahou", "v_hap_weee", "v_hap_wouhou", "v_hap_yay", "v_hap_yepee", "v_jump_zdoing", "v_jump_zdoing2" ]
    ,"rage"     : [ "v_rage_fuck", "v_rage_bouhou", "v_rage_grumble" ]
  }
  function playFx( type )
  {
    DE.AudioManager.fx.play( fxs[ type ][ Math.random() * fxs[ type ].length >> 0 ] );
  }
  
  function changeScreen( screenName, optional )
  {
    for ( var i in Game.screens )
    {
      if ( i != screenName )
        Game.screens[ i ].hide();
    }
    Game.screens[ screenName ].show( optional );
  }
  
  // window.Game = Game; // debug only
  // window.DREAM_E = DE;
  return Game;
} );