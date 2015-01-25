define( [ 'DREAM_ENGINE', 'shared' ],
function( DE, shared )
{
  function Fuck( el, component )
  {
    DE.GameObject.call( this, {
      "name": el.name, "tag": component.tag
      , "x": el.x >> 0,"y": el.y >> 0
      , "z": el.z || component.z || 0
      , "zindex": el.zindex || component.zindex
      , "renderer": sprite, "collider": collider
    } );
    
    
  }
  
  Fuck.prototype = new DE.GameObject();
  Fuck.prototype.constructor = Fuck;
  Fuck.prototype.supr = DE.GameObject.prototype;
  
  return Fuck;
} );