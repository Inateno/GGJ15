define( [ 'DREAM_ENGINE', 'shared', 'data' ],
function( DE, shared, data )
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
      endRun.enable = false;
      goal.enable = false;
      counter.enable = true;
      counter.time = 4;
      chrono.value = 0;
    };
    gui.playerGoal = function()
    {
      goal.enable = true;
      shared[ "player" + playerId ].locked = true;
      chrono.removeAutomatism( "count" );
      shared[ "player" + playerId ].setAnim( "idle" );
      if ( shared.player1.onGoal && shared.player2.onGoal )
        DE.trigger( "endRun" );
    };
    
    var endRun = new DE.GameObject();
    var runCount = new DE.GameObject( {
      "x": 960, "y": 100
      ,"renderer": new DE.TextRenderer( { fontSize: 55 }, 900, 60, "Run 1 / x" )
    } );
    var totalTimeInc = new DE.GameObject( {
      "x": 960, "y": 180
      ,"renderer": new DE.TextRenderer( { fontSize: 55 }, 900, 60, "Total: 00.00.00" )
    } );
    var runTime = new DE.GameObject( {
      "x": 960, "y": 250
      ,"renderer": new DE.TextRenderer( { fontSize: 55 }, 900, 60, "Round: 00.00.00" )
    } );
    var runPosition = new DE.GameObject( {
      "x": 960, "y": 280
      ,"renderer": new DE.TextRenderer( { fontSize: 75, fillColor: "green" }, 900, 100, "Player " + playerId + " you lead" )
    } );
    endRun.add( totalTimeInc, runTime, runPosition, runCount );
    endRun.enable = false;
    gui.add( endRun );
    gui.endRun = function( otherTime, nrun )
    {
      runCount.renderer.setText( "Run " + nrun + " / " + data.runsByGame );
      runPosition.enable = false;
      goal.enable = false;
      // display a total time on center
      endRun.enable = true;
      totalTimeInc.renderer.setText( totalTime.renderer.text ); // old total
      
      // calc the new one
      totalTime.value += chrono.value;
      totalTime.count();
      totalTime.renderer.setText( "Total: " + totalTime.renderer.text );
      
      // + new time
      runTime.enable = true;
      runTime.renderer.fillColor = "green";
      if ( otherTime < chrono.value )
        runTime.renderer.fillColor = "red";
      runTime.renderer.setText( "Round: +" + chrono.renderer.text );
      
      chrono.value = 0;
      chrono.count();
      
      // after a while increment and disable new time
      setTimeout( function()
      {
        totalTimeInc.renderer.setText( totalTime.renderer.text );
        runTime.enable = false;
        
        // display if the player is better
        if ( runTime.renderer.fillColor == "green" )
          runPosition.enable = true;
      }, 4000 );
    };
    
    gui.reset = function()
    {
      totalTime.value = 0;
      chrono.value = 0;
      chrono.count();
      totalTime.count();
      totalTime.renderer.setText( "Total: " + totalTime.renderer.text );
    };
    
    var bar = new DE.GameObject( {
      "x": 960, "y": playerId == 1 ? 538 : 2
      ,"renderer": new DE.BoxRenderer( { fillColor: "black" }, 1920, 4 )
    } );
    gui.add( goal, chrono, totalTime, counter, bar );
    
    DE.on( "playReady", gui.getReady );
    DE.on( "player" + playerId + "TouchEnd", gui.playerGoal );
    
    gui.getRunScore = function()
    {
      return chrono.value;
    };
    gui.getScore = function()
    {
      return totalTime.value;
    };
    
    return gui;
  };
  
  return makeGui;
} )