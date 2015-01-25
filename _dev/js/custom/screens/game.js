define( [ 'shared', 'DREAM_ENGINE', 'cameraSizer', 'makeEditorGui', 'makeGameGui', 'Character', 'levelGenerator' ],
function( shared, DE, cameraSizer, makeEditorGui, makeGameGui, Character, levelGenerator )
{
  function screen( render )
  {
    /*
     camera1 and 2, one by players
     cameraEdit is when editing
     scene1 and 2, one by player
     when cameraEditing, switch between scenes
    */
    shared.scene1 = new DE.Scene( "Test" );
    shared.camera1 = new DE.Camera( 1920, 540, 0, 0, { 'name': "Test zoom 100%", 'backgroundColor': "rgb(150,150,170)" } );
    shared.camera1.scene = shared.scene1;
    
    shared.scene2 = new DE.Scene( "Test" );
    shared.camera2 = new DE.Camera( 1920, 540, 0, 540, { 'name': "Test zoom 100%", 'backgroundColor': "rgb(160,150,150)" } );
    shared.camera2.scene = shared.scene2;
    
    shared.camera1.guiBuild = new DE.Gui( shared.camera1, { 'id': "Test" } );
    shared.camera2.guiBuild = new DE.Gui( shared.camera2, { 'id': "Test" } );
    shared.camera1.guiPlay = makeGameGui( 1, shared.camera1 );
    shared.camera2.guiPlay = makeGameGui( 2, shared.camera2 );
    
    render.add( shared.camera1 );
    render.add( shared.camera2 );
    
    shared.camera1.scenePosition.z = -15;
    shared.camera2.scenePosition.z = -15;
    
    //
    function startPlacingObject( object )
    {
      var inputId = 1;
      if ( this.playerId == 1 )
        inputId = 2;
      
      object.playerId = inputId;
      object.onMouseUp = function()
      {
        this.onMouseUp = undefined;
        this.trigger( "placed" );
        this.renderer.alpha = 1;
        this.scene.isPlacing = false;
      };
      this.isPlacing = true;
      this.placedObject = object;
      object.checkPlacenementInputs = function()
      {
        if ( DE.Inputs.key( "valid-block-" + this.playerId ) )
        {
          this.removeAutomatism( "checkPlacenementInputs" );
          this.onMouseUp = undefined;
          this.renderer.alpha = 1;
          this.trigger( "placed" );
          this.scene.isPlacing = false;
        }
        else if ( DE.Inputs.key( "cancel-block-" + this.playerId ) )
        {
          this.removeAutomatism( "checkPlacenementInputs" );
          this.scene.isPlacing = false;
          this.scene.placedObject = null;
          this.trigger( "cancel-creation" );
          this.askToKill();
        }
        else
        {
          if ( shared[ "player" + this.playerId ].axes.x )
            this.position.x += 15 * shared[ "player" + this.playerId ].axes.x;
          if ( shared[ "player" + this.playerId ].axes.y )
            this.position.y += 5 * shared[ "player" + this.playerId ].axes.y;
          
          if ( this.position.x + this.biggerOffset.width > this.scene.buildLimits.maxX )
            this.position.x = this.scene.buildLimits.maxX - this.biggerOffset.width;
          else if ( this.position.x - this.biggerOffset.width < this.scene.buildLimits.minX )
            this.position.x = this.scene.buildLimits.minX + this.biggerOffset.width;
          
          if ( this.position.y - this.biggerOffset.height > this.scene.buildLimits.maxY )
            this.position.y = this.scene.buildLimits.maxY + this.biggerOffset.height;
          else if ( this.position.y + this.biggerOffset.height < this.scene.buildLimits.minY )
            this.position.y = this.scene.buildLimits.minY - this.biggerOffset.height;
        }
      };
      setTimeout( function()
      {
        object.addAutomatism( "checkPlacenementInputs", "checkPlacenementInputs" );
      }, 500 );
    }
    shared.scene1.playerId = 1;
    shared.scene2.playerId = 2;
    shared.scene1.startPlacingObject = startPlacingObject;
    shared.scene2.startPlacingObject = startPlacingObject;
    
    // switch between cam 1 and 2 when editor
    DE.on( "switchToCam1", function()
    {
      shared.camera1.gui.sleep = true;
      shared.camera2.gui.sleep = true;
      shared.sizer.addAutomatism( "cam2ToCam1", "cam2ToCam1" );
    } );
    DE.on( "switchToCam2", function()
    {
      shared.camera1.gui.sleep = true;
      shared.camera2.gui.sleep = true;
      shared.sizer.addAutomatism( "cam1ToCam2", "cam1ToCam2" );
    } );
    
    // launch edit mode starting with player 1 
    DE.on( "goEdit", function()
    {
      shared.sizer.addAutomatism( "toEdit", "toEdit" );
      shared.camera1.focus( null );
      shared.camera2.focus( null );
      shared.camera1.moveTo( { z: -10 }, 500, function()
      {
        this.scenePosition.y = -300;
      } );
      shared.camera2.moveTo( { z: -10 }, 500, function()
      {
        this.scenePosition.y = -300;
      } );
    } );
    DE.on( "endPlaceObject", function( gui )
    {
      if ( gui.objectsToPlace > 0 )
      {
        if ( gui.playerId == 1 && shared.camera2.gui.objectsToPlace > 0 )
          DE.trigger( "switchToCam2" );
        if ( gui.playerId == 2 && shared.camera1.gui.objectsToPlace > 0 )
          DE.trigger( "switchToCam1" );
      }
      else
      {
        if ( gui.playerId == 1 )
        {
          if ( shared.camera2.gui.objectsToPlace == 0 )
            DE.trigger( "goPlay" );
          else
            DE.trigger( "switchToCam2" );
        }
        else if ( gui.playerId == 2 )
        {
          if ( shared.camera1.gui.objectsToPlace == 0 )
            DE.trigger( "goPlay" );
          else
            DE.trigger( "switchToCam1" );
        }
      }
    } );
    
    // launch play mode
    DE.on( "goPlay", function()
    {
      shared.player1.onGoal = false;
      shared.player2.onGoal = false;
      shared.camera1.gui.sleep = false;
      shared.camera2.gui.sleep = false;
      shared.camera1.renderPosition.y = 540;
      shared.camera2.renderPosition.y = 540;
      shared.camera1.focus( shared.player1 );
      shared.camera2.focus( shared.player2 );
      shared.camera1.moveTo( { z: -15 }, 500 );
      shared.camera2.moveTo( { z: -15 }, 500 );
      shared.sizer.addAutomatism( "toPlay", "toPlay" );
    } );
    
    return {
      show: function( levelName )
      {
        shared.camera1.sleep = false;
        shared.camera2.sleep = false;
        shared.scene1.sleep = false;
        shared.scene2.sleep = false;
        loadLevel( levelName );
      }
      , hide: function()
      {
        shared.camera1.sleep = true;
        shared.camera2.sleep = true;
        shared.scene1.sleep = true;
        shared.scene2.sleep = true;
      }
    }
  }
  
  function loadLevel( levelName )
  {
    levelGenerator( levelName, shared.scene1, shared.camera1, {
      limits: {
        maxX: true, maxY: true, minX: true
        ,colliderOffset: true
      }
    } );
    levelGenerator( levelName, shared.scene2, shared.camera2, {
      limits: {
        maxX: true, maxY: true, minX: true
        ,colliderOffset: true
      }
    } );
    
    // x, y, tag, colliderW, colliderH
    shared.player1 = new Character( shared.levels[ levelName ].startX, shared.levels[ levelName ].startY
      , "player", 50, 140 ).bindControls( 1 );
    shared.player2 = new Character( shared.levels[ levelName ].startX, shared.levels[ levelName ].startY
      , "player", 50, 140 ).bindControls( 2 );
    shared.player1.enable = false;
    shared.player2.enable = false;
    shared.player1.locked = true;
    shared.player2.locked = true;
    
    shared.scene1.buildLimits = shared.levels[ levelName ].buildLimits;
    shared.scene2.buildLimits = shared.levels[ levelName ].buildLimits;
    
    shared.scene1.add( shared.player1 );
    shared.scene2.add( shared.player2 );
    shared.camera1.focus( shared.player1 );
    shared.camera2.focus( shared.player2 );
    
    makeEditorGui( 1, shared.camera1, levelName );
    makeEditorGui( 2, shared.camera2, levelName );
    
    shared.sizer = cameraSizer();
    shared.scene1.add( shared.sizer );
    shared.sizer.currentLevel = levelName;
  }
  
  return screen;
} );