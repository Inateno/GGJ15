define( [ 'DREAM_ENGINE', 'shared', 'createComponent' ],
function( DE, shared, createComponent )
{
  var generateEnvironment = function( levelId, scene, camera, params )
  {
    params = params || {
      limits: {}
    };
    
    if ( params.limits.maxX == true )
      camera.limits.maxX = 0;
    if ( params.limits.minX == true )
      camera.limits.minX = 0;
    if ( params.limits.maxY == true )
      camera.limits.maxY = 0;
    if ( params.limits.minY == true )
      camera.limits.minY = 0;
    
    scene.collideObjects = [];
    scene.event_triggers = [];
    // add other collide (example barrel)
    
    // clean the scene
    scene.deleteAll();
    
    if ( !shared.levels[ levelId ] )
    {
      console.log( "%cGive a levelId not found in levels: " + levelId, "colors:red" );
      return;
    }
    var level = shared.levels[ levelId ];
    var ldata = level.components;
    
    for ( var i = 0; i < ldata.length; ++i )
    {
      var el = ldata[ i ];
      
      var o = createComponent( el, scene );
      if ( !o )
        continue;
      
      // setting limits on camera if asked
        if ( params.limits.maxY == true && ( !params.limits.colliderOffset || !o.collider )
          && o.position.y > camera.limits.maxY )
          camera.limits.maxY = o.position.y;
        else if ( params.limits.maxY == true && params.limits.colliderOffset && o.collider )
        {
          if ( o.collider.radius && o.position.y + o.collider.radius >> 0 > camera.limits.maxY )
            camera.limits.maxY = o.position.y + o.collider.radius;
          else if ( o.collider.height && o.position.y + o.collider.height * 0.5 >> 0 > camera.limits.maxY )
            camera.limits.maxY = o.position.y + o.collider.height * 0.5 >> 0;
        }
        
        if ( params.limits.minY == true && ( !params.limits.colliderOffset || !o.collider )
          && o.position.y < camera.limits.minY )
          camera.limits.minY = o.position.y;
        else if ( params.limits.minY == true && params.limits.colliderOffset && o.collider )
        {
          if ( o.collider.radius && o.position.y - o.collider.radius >> 0 < camera.limits.minY )
            camera.limits.minY = o.position.y - o.collider.radius;
          else if ( o.collider.height && o.position.y - o.collider.height * 0.5 >> 0 < camera.limits.minY )
            camera.limits.minY = o.position.y - o.collider.height * 0.5 >> 0;
        }
        
        if ( params.limits.maxX == true && ( !params.limits.colliderOffset || !o.collider )
          && o.position.x > camera.limits.maxX )
          camera.limits.maxX = o.position.x;
        else if ( params.limits.maxX == true && params.limits.colliderOffset && o.collider )
        {
          if ( o.collider.radius && o.position.x + o.collider.radius >> 0 > camera.limits.maxX )
            camera.limits.maxX = o.position.x + o.collider.radius;
          else if ( o.collider.width && o.position.x + o.collider.width * 0.5 >> 0 > camera.limits.maxX )
            camera.limits.maxX = o.position.x + o.collider.width * 0.5 >> 0;
        }
        
        // min x value
        if ( params.limits.minX == true && ( !params.limits.colliderOffset || !o.collider )
          && o.position.x < camera.limits.minX )
          camera.limits.minX = o.position.x;
        else if ( params.limits.minX == true && params.limits.colliderOffset && o.collider )
        {
          if ( o.collider.radius && o.position.x - o.collider.radius >> 0 < camera.limits.minX )
            camera.limits.minX = o.position.x - o.collider.radius;
          else if ( o.collider.width && o.position.x - o.collider.width * 0.5 >> 0 < camera.limits.minX )
            camera.limits.minX = o.position.x - o.collider.width * 0.5 >> 0;
        }
    }
    
    if ( level.limits.maxX != true && !isNaN( level.limits.maxX ) )
      camera.limits.maxX = level.limits.maxX;
    if ( level.limits.minX != true && !isNaN( level.limits.minX ) )
      camera.limits.minX = level.limits.minX;
    if ( level.limits.maxY != true && !isNaN( level.limits.maxY ) )
      camera.limits.maxY = level.limits.maxY;
    if ( level.limits.minY != true && !isNaN( level.limits.minY ) )
      camera.limits.minY = level.limits.minY;
    
    DE.trigger( "map-loaded", levelId, scene, camera );
  };
  
  return generateEnvironment;
} );
