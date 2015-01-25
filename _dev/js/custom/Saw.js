define( [ 'DREAM_ENGINE', 'shared' ],
function( DE, shared )
{
  function Saw( el, component, sprite, collider )
  {
    DE.GameObject.call( this, {
      "name": el.name, "tag": component.tag
      , "x": el.x >> 0,"y": el.y >> 0
      , "z": el.z || component.z || 0
      , "zindex": el.zindex || component.zindex
      , "renderer": sprite, "collider": collider
    } );
    
    this.customInit = function()
    {
      this.bar = new DE.GameObject( {
        x: this.position.x, y: this.position.y
        ,zindex: this.zindex - 1
        ,renderer: new DE.TileRenderer( {
            "imageName": component.sprite
            , "w": component.back.w, "h": component.back.h
            , "tilesizes": { "w": component.back.tw || component.back.w, "h": component.back.th || component.back.h }
            , "tileposition": { "x": component.back.sx, "y": component.back.sy }
          } )
      } )
      this.scene.add( this.bar );
    }
    
    this.spawnY = this.position.y;
    this.dir = 1;
    this.speed = 10;
    this.moveDist = 370;
    this.moveLogic = function()
    {
      this.bar.position.x = this.position.x;
      this.rotate( 1 );
      this.translateY( this.speed * this.dir, true );
      if ( this.dir == 1 && this.position.y + this.speed >= this.spawnY + this.moveDist )
        this.dir = -1;
      else if ( this.dir == -1 && this.position.y - this.speed <= this.spawnY - this.moveDist )
        this.dir = 1;
    }
    this.addAutomatism( "moveLogic", "moveLogic" );
    
    this.on( "collision-enter", function( player )
    {
      player.onFloor = false;
      if ( player.position.y > this.position.y )
        player.gravity.y = 3;
      else
        player.gravity.y = -3;
      player.gravity.x = 3;
      shared[ "camera" + player.playerId ].shake( 10, 10,  500 );
      player.setAnim( "hurt" );
      DE.trigger( "play-random-fx", "big-hurt" );
    } );
  }
  
  Saw.prototype = new DE.GameObject();
  Saw.prototype.constructor = Saw;
  Saw.prototype.supr = DE.GameObject.prototype;
  
  return Saw;
} );