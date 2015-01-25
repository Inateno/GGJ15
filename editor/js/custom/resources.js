define( [],
function()
{
  // tag : steps = escalier, bounce = fait rebondir (sur l'axe y )
  var resources = {
    components: {
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
    
    , gridsize: 32 // taille de la grille d'émantation
    , scene: null
    , currentEl: null
    , elGui: null
  };
  window.resources = resources;
  return resources;
} );