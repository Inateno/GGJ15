define( [ 'DREAM_ENGINE', 'shared' ],
function( DE, shared )
{
  function makeGui( playerId, camera )
  {
    var gui = new DE.Gui( shared.camera1, { 'id': "Test" } )
    camera.gui = gui;
    
    // Press start to launch the game
    if ( playerId == 1 )
    {
      var firstLaunch = new DE.GameObject( {
        "x": 960, "y": 320
        ,"renderer": new DE.TextRenderer( { fontSize: 72 }, 780, 200, "Player 2 Press start" )
      } );
      firstLaunch.checkStart = function()
      {
        if ( DE.Inputs.key( 'start2' ) )
        {
          this.askToKill();
          DE.trigger( 'goEdit' );
        }
      };
      firstLaunch.addAutomatism( "checkStart", "checkStart" );
      gui.add( firstLaunch );
    }
    
    // progression bar
    
    // timer
    var chrono = new DE.GameObject( {
      "x": 0, "y": 100
      ,"renderer": new DE.TextRenderer( { fontSize: 40, textAlign: "right" }, 400, 50, "00.00.00" )
    } );
    chrono.value = 0;
    chrono.count = function()
    {
      this.value += DE.Time.timeSinceLastFrameScaled;
      var min = ( this.value / ( 1000 * 60 ) >> 0 ).toString();
      var sec = ( ( this.value / 1000 >> 0 ) % 60 ).toString();
      var ms = ( this.value % 1000 ).toString();
      if ( ms.length > 2 )
        ms = ms[ 0 ].toString() + "" + ms[ 1 ].toString();
      else if ( ms.length == 1 )
        ms = "0" + ms[ 0 ].toString();
      if ( sec.length < 2 )
        sec = "0" + sec.toString();
      if ( min.length < 2 )
        min = "0" + min.toString();
      
      this.renderer.setText( min + "." + sec + "." + ms );
    };
    
    // global timer
    var totalTime = new DE.GameObject( {
      "x": 0, "y": 50
      ,"renderer": new DE.TextRenderer( { fontSize: 40, textAlign: "right" }, 675, 50, "Total: 00.00.00" )
    } );
    totalTime.value = 0;
    totalTime.count = chrono.count;
    
    // counter
    var counter = new DE.GameObject( {
      "x": 960, "y": 270
      ,"renderer": new DE.TextRenderer( { fontSize: 92 }, 300, 300, "3" )
    } );
    counter.time = 3;
    counter.count = function()
    {
      this.time--;
      if ( this.time == -1 )
      {
        this.enable = false;
        chrono.addAutomatism( "count", "count" );
        shared[ "player" + playerId ].locked = false;
      }
      else if ( this.time == 0 )
        this.renderer.setText( "Go !" );
      else
        this.renderer.setText( this.time );
    };
    counter.enable = false;
    counter.addAutomatism( "count", "count", { interval: 1000 } );
    
    var goal = new DE.GameObject( {
      "x": 960, "y": 270
      ,"renderer": new DE.TextRenderer( { fontSize: 92 }, 300, 300, "Goal !" )
    } );
    goal.enable = false;
    gui.getReady = function()
    {
      goal.enable = false;
      counter.enable = true;
      counter.time = 4;
      chrono.value = 0;
    };
    gui.playerGoal = function()
    {
      goal.enable = true;
      shared[ "player" + playerId ].locked = true;
      totalTime.value += chrono.value;
      totalTime.count();
      totalTime.renderer.setText( "Total: " + totalTime.renderer.text );
      chrono.removeAutomatism( "count" );
      chrono.value = 0;
      chrono.count();
      if ( shared.player1.onGoal && shared.player2.onGoal )
        DE.trigger( "goEdit" );
    };
    
    var bar = new DE.GameObject( {
      "x": 960, "y": playerId == 1 ? 538 : 2
      ,"renderer": new DE.BoxRenderer( { fillColor: "black" }, 1920, 4 )
    } );
    gui.add( goal, chrono, totalTime, counter, bar );
    
    DE.on( "playReady", gui.getReady );
    DE.on( "player" + playerId + "TouchEnd", gui.playerGoal );
    
    return gui;
  };
  
  return makeGui;
} )