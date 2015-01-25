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
    DE.CONFIG.DEBUG = 1; // debug on
    DE.CONFIG.DEBUG_LEVEL = 2; // all debug
    
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
      menu: menuScreen( Game.render )
      ,game: gameScreen( Game.render )
    };
    
    DE.on( 'changeScreen', changeScreen );
    
    DE.trigger( 'changeScreen', 'game', 'flat' );
    
    // always let a little delay between the real load and the visual load, better feeling
    setTimeout( function(){ DE.States.down( "isLoading" ); }, 200 );
  };
  
  function changeScreen( screenName, optional )
  {
    for ( var i in Game.screens )
    {
      if ( i != screenName )
        Game.screens[ i ].hide();
    }
    Game.screens[ screenName ].show( optional );
  }
  
  window.Game = Game; // debug only
  window.DREAM_E = DE;
  return Game;
} );