define( [ 'DREAM_ENGINE', 'shared' ],
function( DE, shared )
{
  function cameraSizer()
  {
    var sizer = new DE.GameObject();
    
    sizer.scrollSpeed = 40;
    sizer.toEdit = function()
    {
      if ( shared.camera1.renderPosition.y < 540 )
        shared.camera1.renderPosition.y += 10;
      if ( shared.camera1.fieldSizes.height < 1080 )
      {
        shared.camera1.fieldSizes.height += 20;
        shared.camera1.renderSizes.height += 20;
        shared.camera1._buffer.canvas.height += 20;
      }
      
      if ( shared.camera2.renderPosition.y < 1080 + 540 )
        shared.camera2.renderPosition.y += 30;
      if ( shared.camera2.fieldSizes.height < 1080 )
      {
        shared.camera2.fieldSizes.height += 20;
        shared.camera2.renderSizes.height += 20;
        shared.camera2._buffer.canvas.height += 20;
      }
      if ( shared.camera2.renderPosition.y == 1080 + 540 && shared.camera2.fieldSizes.height == 1080
        && shared.camera1.renderPosition.y == 540 && shared.camera1.fieldSizes.height == 1080 )
      {
        this.removeAutomatism( "toEdit" );
        shared.camera1.gui = shared.camera1.guiBuild;
        shared.camera2.gui = shared.camera2.guiBuild;
        shared.camera1.gui.show();
        shared.camera2.gui.show();
        shared.camera2.gui.sleep = true;
      }
    };
    sizer.cam1ToCam2 = function()
    {
      if ( shared.camera1.renderPosition.y > -540 )
        shared.camera1.renderPosition.y -= this.scrollSpeed;
      if ( shared.camera2.renderPosition.y > 540 )
        shared.camera2.renderPosition.y -= this.scrollSpeed;
      if ( shared.camera1.renderPosition.y <= -540 )
      {
        shared.camera1.gui.sleep = true;
        shared.camera2.gui.sleep = false;
        shared.camera2.renderPosition.y = 540;
        this.removeAutomatism( "cam1ToCam2" );
      }
    };
    sizer.cam2ToCam1 = function()
    {
      if ( shared.camera1.renderPosition.y < 540 )
        shared.camera1.renderPosition.y += this.scrollSpeed;
      if ( shared.camera2.renderPosition.y < 1080 + 540 )
        shared.camera2.renderPosition.y += this.scrollSpeed;
      if ( shared.camera1.renderPosition.y >= 540 )
      {
        shared.camera1.gui.sleep = false;
        shared.camera2.gui.sleep = true;
        shared.camera1.renderPosition.y = 540;
        this.removeAutomatism( "cam2ToCam1" );
      }
    };
    sizer.toPlay = function()
    {
      if ( shared.camera1.renderPosition.y > 270 )
        shared.camera1.renderPosition.y -= 10;
      if ( shared.camera1.fieldSizes.height > 540 )
      {
        shared.camera1.fieldSizes.height -= 20;
        shared.camera1.renderSizes.height -= 20;
        shared.camera1._buffer.canvas.height -= 20;
      }
      
      if ( shared.camera2.renderPosition.y < 270 + 540 )
        shared.camera2.renderPosition.y += 10;
      if ( shared.camera2.fieldSizes.height > 540 )
      {
        shared.camera2.fieldSizes.height -= 20;
        shared.camera2.renderSizes.height -= 20;
        shared.camera2._buffer.canvas.height -= 20;
      }
      if ( shared.camera2.renderPosition.y >= 270 + 540 && shared.camera2.fieldSizes.height == 540
        && shared.camera1.renderPosition.y <= 270 && shared.camera1.fieldSizes.height == 540 )
      {
        shared.camera1.renderPosition.y = 270;
        shared.camera2.renderPosition.y = 270 + 540;
        this.removeAutomatism( "toPlay" );
        shared.player1.position.x = shared.levels[ sizer.currentLevel ].startX;
        shared.player1.position.y = shared.levels[ sizer.currentLevel ].startY;
        shared.player2.position.x = shared.levels[ sizer.currentLevel ].startX;
        shared.player2.position.y = shared.levels[ sizer.currentLevel ].startY;
        
        shared.camera1.focus( shared.player1 );
        shared.camera2.focus( shared.player2 );
        shared.player1.enable = true;
        shared.player2.enable = true;
        
        shared.camera1.gui = shared.camera1.guiPlay;
        shared.camera2.gui = shared.camera2.guiPlay;
        DE.trigger( "playReady" ); // init the counter
      }
    };
    
    return sizer;
  }
  
  return cameraSizer;
} );