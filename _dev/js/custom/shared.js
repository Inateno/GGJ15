define( [],
function()
{
  var shared = {
    levels: {
      "flat": {
        components: [{"x":2048,"y":0,"z":4,"name":"mountain1","zindex":0,"rotation":0},{"x":3808,"y":64,"z":3,"name":"mountain1","zindex":0,"rotation":0},{"x":3136,"y":128,"z":3,"name":"mountain2","zindex":0,"rotation":0},{"x":2432,"y":-20,"z":3,"name":"trolls","zindex":0,"rotation":0},{"x":992,"y":32,"z":3,"name":"mountain1","zindex":0,"rotation":0},{"x":32,"y":0,"z":3,"name":"mountain2","zindex":0,"rotation":0},{"x":4192,"y":64,"z":2,"name":"mountain2","zindex":0,"rotation":0},{"x":3552,"y":128,"z":2,"name":"mountain1","zindex":0,"rotation":0},{"x":2688,"y":160,"z":2,"name":"mountain1","zindex":0,"rotation":0},{"x":1792,"y":96,"z":2,"name":"mountain2","zindex":0,"rotation":0},{"x":1184,"y":128,"z":2,"name":"mountain1","zindex":0,"rotation":0},{"x":640,"y":96,"z":2,"name":"mountain2","zindex":0,"rotation":0},{"x":-384,"y":96,"z":2,"name":"mountain2","zindex":0,"rotation":0},{"x":288,"y":128,"z":1,"name":"mountain1","zindex":0,"rotation":0},{"x":4960,"y":480,"z":0,"name":"earth","zindex":0,"rotation":0},{"x":4576,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":4160,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":3744,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":3328,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":2912,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":2496,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":2080,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":1664,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":1248,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":832,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":416,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":0,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":-416,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":-832,"y":416,"z":0,"name":"floor_large","zindex":0,"rotation":0},{"x":4576,"y":0,"z":0,"name":"floor_large","zindex":1,"rotation":0},{"x":-832,"y":-32,"z":0,"name":"floor_large","zindex":1,"rotation":0},{"x":-1216,"y":448,"z":0,"name":"earth","zindex":1,"rotation":0},{"x":4960,"y":128,"z":0,"name":"earth","zindex":2,"rotation":0},{"x":4544,"y":-448,"z":0,"name":"floor_large","zindex":2,"rotation":0},{"x":-800,"y":-480,"z":0,"name":"floor_large","zindex":2,"rotation":0},{"x":-1184,"y":96,"z":0,"name":"earth","zindex":2,"rotation":0},{"x":4960,"y":-224,"z":0,"name":"earth","zindex":3,"rotation":0},{"x":4512,"y":-896,"z":0,"name":"floor_large","zindex":3,"rotation":0},{"x":-768,"y":-928,"z":0,"name":"floor_large","zindex":3,"rotation":0},{"x":-1184,"y":-224,"z":0,"name":"earth","zindex":3,"rotation":0},{"x":4928,"y":-576,"z":0,"name":"earth","zindex":4,"rotation":0},{"x":-1184,"y":-576,"z":0,"name":"earth","zindex":4,"rotation":0},{"x":4822.857142857139,"y":-884.2857142857144,"z":0,"name":"earth","zindex":5,"rotation":0},{"x":-1152,"y":-896,"z":0,"name":"earth","zindex":5,"rotation":0},{"x":-256,"y":160,"z":0,"name":"goal","zindex":20,"rotation":0}]
        ,startX: 4100
        ,startY: 100
        ,objects: [ { q: 4, id: "floor_large", f: 0 }, { q: 2, id: "lava", f: 1 }
          , { q: 4, id: "bounce", f: 2 }, { q: 3, id: "slow", f: 3 }, { q: 4, id: "spikes", f: 4 }
          , { q: 6, id: "ice", f: 5 }, { q: 5, id: "saw", f: 6 }, { q: 1, id: "fuck", f: 7 } ]
        ,limits: {
          minX: -600, maxX: 4350, minY: -900, maxY: 400
        }
        ,buildLimits: {
          minX: -300, maxX: 4100, minY: -300, maxY: 100
        }
      }
    }
    
    , components: {
      "floor_large":{
        "name":"floor_large","tag":"block","sprite":"env","isTile":1
        ,"sx":1314,"sy":102,"tw":512,"th":512,"w":512,"h":512
        ,"collider":{"type":"box","w":512,"h":452,"l":0,"t":30},"zindex":0
      }
      ,"earth":{
        "name":"earth","tag":"env","sprite":"env","isTile":1
        ,"sx":1314,"sy":222,"tw":512,"th":392,"w":512,"h":392
        ,"collider":false,"zindex":0
      }
      , "wall":{
        "name":"wall","tag":"block","sprite":"env","isTile":1
        ,"sx":0,"sy":0,"tw":128,"th":512,"w":128,"h":512
        ,"collider":{"type":"box","w":128,"h":512,"l":0,"t":0},"zindex":0
      }
      ,"platform":{
        "name":"platform","tag":"block","sprite":"env","isTile":1
        ,"sx":0,"sy":0,"tw":512,"th":128,"w":512,"h":128
        ,"collider":{"type":"box","w":512,"h":128,"l":0,"t":0},"zindex":0
      }
      
      ,"lava":{
        "name":"lava","tag":"lava-block","sprite":"env","isTile":1
        ,"sx":32,"sy":50,"tw":512,"th":214,"w":512,"h":214
        ,"collider":{"type":"box","w":484,"h":108,"l":-6,"t":18},"zindex":5
      }
      ,"bounce":{
        "name":"bounce","tag":"bounce-block","sprite":"env","isTile":1
        ,"sx":32,"sy":308,"tw":512,"th":214,"w":512,"h":214
        ,"collider":{"type":"box","w":484,"h":108,"l":-6,"t":18},"zindex":5
      }
      ,"slow":{
        "name":"slow","tag":"slow-block","sprite":"env","isTile":1
        ,"sx":32,"sy":614,"tw":512,"th":214,"w":512,"h":214
        ,"collider":{"type":"box","w":484,"h":108,"l":-6,"t":18},"zindex":5
      }
      
      ,"spikes":{
        "name":"spikes","tag":"spike-block","sprite":"env","isTile":1
        ,"sx":612,"sy":50,"tw":512,"th":214,"w":512,"h":214
        ,"collider":{"type":"box","w":484,"h":108,"l":-6,"t":18},"zindex":5
      }
      ,"ice":{
        "name":"ice","tag":"ice-block","sprite":"env","isTile":1
        ,"sx":612,"sy":308,"tw":512,"th":214,"w":512,"h":214
        ,"collider":{"type":"box","w":484,"h":108,"l":-6,"t":18},"zindex":5
      }
      
      // bg
      ,"trolls": {
        "name":"trolls","tag":"bg","sprite":"mountroll","isTile":0
        ,"collider":false,"zindex":0
      }
      ,"mountain1": {
        "name":"mountain1","tag":"bg","sprite":"env","isTile":1
        ,"sx":64,"sy":902,"tw":786,"th":348,"w":786,"h":348
        ,"collider":false,"zindex":0
      }
      ,"mountain2": {
        "name":"mountain2","tag":"bg","sprite":"env","isTile":1
        ,"sx":934,"sy":890,"tw":1070,"th":456,"w":1070,"h":456
        ,"collider":false,"zindex":0
      }
      
      // goal
      ,"goal": {
        "name": "goal", "tag": "event_trigger","sprite":"flag","isTile":0
        ,"collider":{"type":"box","w":100,"h":1500,t:-500},"zindex":0
      }
      ,"saw": {
        "name":"saw","tag":"saw-block","sprite":"env","isTile":1
        ,"sx":870,"sy":1770,"tw":234,"th":234,"w":234,"h":234
        ,"collider":{type:"box",w:200,h:200},"zindex":9
        ,"back":{sx:644,sy:1264,w:210,h:780}
      }
      ,"fuck": {
        "name":"fuck","tag":"fuck-block","sprite":"env","isTile":1
        ,"sx":82,"sy":1284,"tw":506,"th":754,"w":506,"h":754
        ,"collider":{"type":"box","w":472,"h":392,"l":-10,"t":180},"zindex":4
      }
    }
  };
  
  return shared;
} );