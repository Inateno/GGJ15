define( [ 'shared', 'data', 'DREAM_ENGINE' ],
function( shared, data, DE )
{
  var _scene, _camera;
  function screen( render )
  {
    _scene = new DE.Scene( "Menu" );
    _camera = new DE.Camera( 1920, 1080, 0, 0, { 'name': "Test zoom 100%", 'backgroundColor': "rgb(150,150,170)" } );
    _camera.scene = _scene;
    
    _scene.add( new DE.GameObject( {
      "x": 960, "y": 540, "zindex": 0
      ,"renderer": new DE.SpriteRenderer( { spriteName: "bg_main" } )
    } ) );
    
    _scene.add( new DE.GameObject( {
      "x": 960, "y": 540, "zindex": 10
      ,"renderer": new DE.SpriteRenderer( { spriteName: "panel_main" } )
    } ) );
    
    var fdata = shared.components.fuck;
    var fuck = new DE.GameObject( {
      "x": 1160, "y": 540, "zindex": 4
      ,"renderer": new DE.TileRenderer( {
          "imageName": "env"
          , "w": fdata.w, "h": fdata.h
          , "tilesizes": { "w": fdata.tw || fdata.w, "h": fdata.th || fdata.h }
          , "tileposition": { "x": fdata.sx, "y": fdata.sy }
        } )
    } );
    fuck.position.setRotation( Math.PI * 0.5 );
    
    var press = new DE.GameObject( {
      "x": 960, "y": 950, zindex: 2
      ,"renderer": new DE.TextRenderer( { fontSize: 130, alpha: 0 }, 1920, 400, "Press Start" )
    } );
    _scene.add( press, fuck );
    press.checkPad = function()
    {
      if ( DE.Inputs.key( "start1" ) || DE.Inputs.key( "start2" ) )
      {
        DE.trigger( 'changeScreen', 'game', 'flat' );
        press.enable = false;
      }
    };
    press.addAutomatism( "checkPad", "checkPad" );
    
    _camera.on( "fadeEnd", function()
    {
      if ( _camera.alpha == 0 )
        _scene.sleep = true;
    } );
    
    render.add( _camera );
    return {
      show: function()
      {
        _scene.sleep = false;
        _camera.sleep = false;
        _camera.fadeIn( 500 );
        press.enable = true;
        DE.AudioManager.fx.play( "v_intro" );
        setTimeout( function()
        {
          press.fadeIn( 500 );
        }, 1000 )
        _camera.onMouseUp = function()
        {
          DE.trigger( 'changeScreen', 'game', 'flat' );
        }
        setTimeout( function()
        {
          fuck.moveTo( { x: 1460 }, 1000, function()
          {
            DE.AudioManager.fx.play( "v_v_gnihihi" );
            setTimeout( function()
            {
              fuck.moveTo( { x: 1060 }, 2000 );
              DE.AudioManager.fx.play( "v_v_nininini" );
            }, 3800 );
          } );
          // 1460
        }, 6850 );
      }
      , hide: function()
      {
        _camera.fadeOut( 1000 );
        press.fadeOut( 1000 );
      }
    }
  }
  
  return screen;
} );