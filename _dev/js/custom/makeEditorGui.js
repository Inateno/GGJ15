define( [ 'DREAM_ENGINE', 'shared', 'createComponent' ],
function( DE, shared, createComponent )
{
  function makeGui( playerId, camera, level )
  {
    var gui = camera.guiBuild;
    gui.deleteAll();
    gui.playerId = playerId;
    
    var objects = JSON.parse( JSON.stringify( shared.levels[ level ].objects ) );
    
    gui.container = new DE.GameObject( {
      x: 960, y: 540, zindex: 1
      , renderer: new DE.BoxRenderer( { fillColor: "rgb(100,100,100)", alpha: 0.8 }, 1920, 1080 )
    } );
    gui.selector = new DE.GameObject( {
      x: 64 + 128, y: 28 + 330, zindex: 10
      , renderer: new DE.BoxRenderer( { method: "stroke", strokeColor: "red", lineWidth: 2 }, 258, 258 )
    } );
    
    gui.emptyContainer = new DE.GameObject();
    gui.emptyContainer.add( gui.selector, gui.container, new DE.GameObject( {
      "x": 960, "y": 150, "zindex": 9
      , "renderer": new DE.TextRenderer( { fontSize: 40 }, 800, 100, "Choose a stuff to put on the field" )
    } ) );
    
    var inputId = 1;
    if ( playerId == 1 )
      inputId = 2;
    gui.selector.tiledPos = { x: 0, y: 0 };
    gui.selector.checkPad = function()
    {
      if ( shared[ "player" + inputId ].axes.x > 0 && this.tiledPos.x + 1 < tiledObjects[ this.tiledPos.y ].length )
        this.tiledPos.x += 1;
      else if ( shared[ "player" + inputId ].axes.x < 0 && this.tiledPos.x - 1 >= 0 )
        this.tiledPos.x -= 1;
      
      if ( shared[ "player" + inputId ].axes.y > 0 && this.tiledPos.y + 1 < tiledObjects.length )
        this.tiledPos.y += 1;
      else if ( shared[ "player" + inputId ].axes.y < 0 && this.tiledPos.y - 1 > 0 )
        this.tiledPos.y -= 1;
      
      if ( DE.Inputs.key( "valid-block-" + inputId ) )
      {
        tiledObjects[ this.tiledPos.y ][ this.tiledPos.x ].onMouseUp();
        return;
      }
      
      this.focus( tiledObjects[ this.tiledPos.y ][ this.tiledPos.x ] );
    };
    gui.selector.addAutomatism( "checkPad", "checkPad", { interval: 150 } );
    gui.add( gui.emptyContainer );
    
    var obj = null;
    var nbyline = 7;
    var tiledObjects = new Array();
    for ( var i = 0; i < objects.length; ++i )
    {
      obj = new DE.GameObject( {
        "x": 64 + 256 * ( i % nbyline ) + 128
        ,"y": 28 + ( 260 * ( i / nbyline >> 0 ) ) + 330
        ,"zindex": 8
        ,"name": objects[ i ].id
        ,"renderers": [
          new DE.SpriteRenderer( { spriteName: "block_icons", startFrame: objects[ i ].f } )
          ,new DE.TextRenderer( { offsetX: 95, offsetY: 100, fontSize: 32 }, 100, 50, "x" + objects[ i ].q )
        ]
        ,"collider": new DE.FixedBoxCollider( 256, 256 )
      } );
      obj.quantity = objects[ i ].q;
      obj.onMouseMove = function()
      {
        gui.selector.position.x = this.position.x;
        gui.selector.position.y = this.position.y;
      };
      obj.onMouseUp = function()
      {
        if ( this.quantity == 0 )
          return;
        var o = createComponent( {
          "x": camera.scenePosition.x + 960, "y": camera.scenePosition.y + 540, "name": this.name
          ,"zindex": 10
        }, camera.scene );
        o.renderer.alpha = 0.7;
        camera.focus( o, { lock: { y: true } } );
        o.on( "cancel-creation", this.restore, this );
        o.on( "placed", this.placed, this );
        o.scene.startPlacingObject( o );
        this.quantity--;
        this.renderers[ 1 ].setText( "x" + this.quantity );
        if ( this.quantity == 0 )
          this.renderer.currentLine = 1;
        gui.emptyContainer.enable = false;
      };
      obj.restore = function()
      {
        camera.target = null;
        this.quantity++;
        this.renderers[ 1 ].setText( "x" + this.quantity );
        this.renderer.currentLine = 0;
        gui.emptyContainer.enable = true;
      };
      obj.placed = function()
      {
        camera.target = null;
        --gui.objectsToPlace;
        DE.trigger( "endPlaceObject", gui );
        if ( gui.objectsToPlace > 0 )
          gui.emptyContainer.enable = true;
      };
      if ( i % nbyline == 0 )
        tiledObjects.push( new Array() );
      tiledObjects[ i / nbyline >> 0 ].push( obj );
      gui.emptyContainer.add( obj );
    }
    
    gui.show = function()
    {
      this.objectsToPlace = 2;
      this.emptyContainer.enable = true;
    }
    gui.hide = function()
    {
      this.emptyContainer.enable = false;
    }
  };
  
  return makeGui;
} );