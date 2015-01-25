/**
* @ContributorsList
* @Inateno / http://inateno.com / http://dreamirl.com
*
***
* @images plane and touchControl : Credit (Kenney or www.kenney.nl)
*
* 
***
*
* @singleton
* imagesList
this is the imagesList will be available in the project.
Please declare in the same way than this example.
To load image as default just set "load" to true.
Otherwhise you can load/add images when you want, load images by calling the DREAM_ENGINE.ImageManager.pushImage function

- [ name, url, extension, 
parameters: load:Bool, totalFrame:Int, totalLine:Int, eachAnim:Int (ms), isAnimated:Bool, isReversed:Bool
] -

All parameters are optionnal but at least an empty object need to be set
**/
define( [ 'DE.CONFIG' ],
function( CONFIG )
{
  var datas = {
    // avalaible images sizes (engine will load optimisest images depends on user resolution)
    screenSizes: [
      { "w": 1920, "h": 1080, "path": "" }
    ]
    
    // index of the used screen size during game conception
    , conceptionSizeIndex: 0
    
    // images folder name 
    , folderName: "img"
    
    // usage name, real name (can contain subpath), extension, parameters
    , imagesList: [      
      [ "env", "env", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
      ,[ "mountroll", "mountroll", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
      ,[ "bg_main", "mainscreen", "jpg", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
      ,[ "panel_main", "panel_main", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
      ,[ "flag", "flag", "png", { "load": true, "totalFrame": 1, "eachAnim": 1, "totalLine": 1, "isAnimated":false } ]
      ,[ "block_icons", "block_icons", "png", { "load": true, "totalFrame": 8, "totalLine": 2, "isAnimated": false } ]
      ,[ "player1", "character/p1/run", "png", { "load": true, "totalFrame": 6, "totalLine": 2, "eachAnim": 70, "isAnimated": true } ]
      ,[ "player1_states", "character/p1/states", "png", { "load": true, "totalFrame": 3, "totalLine": 2, "isAnimated": false } ]
      ,[ "player2", "character/p2/run", "png", { "load": true, "totalFrame": 6, "totalLine": 2, "eachAnim": 70, "isAnimated": true } ]
      ,[ "player2_states", "character/p2/states", "png", { "load": true, "totalFrame": 3, "totalLine": 2, "isAnimated": false } ]
    ]
  };
  CONFIG.debug.log( "imagesDatas loaded", 3 );
  return datas;
} );