var Tile38 = require('tile38');
//import Tile38 from 'tile38';
var client = new Tile38();

// salva posizione Stazioni di ricarica
client.set ( 'Station' ,  'EnelX' ,  [ 44.64701352313015, 10.886374409919698 ] ) ; 
client.set ( 'Station' ,  'Be Charge' ,  [ 44.64651863723766, 10.892356791848103 ] ) ; 
client.set ( 'Station' ,  'FREEtoX' ,  [ 44.66163938662867, 10.854815562426293 ] ) ; 
console.log('Station ok');

let query = client.intersectsQuery('Station').detect('inside','outside').bounds(44.64701352313015, 10.886374409919698);
console.log('Geofence ok');

let fence = query.executeFence((err, results) => {
    // this callback will be called multiple times
    if (err) {
        console.error("something went wrong! " + err);
    } else {
        console.dir(results);
    }
});

// if you want to be notified when the connection gets closed, register a callback function with onClose()
fence.onClose(() => {
    console.log("geofence was closed");
});

// later on, when you want to close the socket and kill the live geofence:
fence.close();




// salva una posizione con campi aggiuntivi 
//client.set ( 'fleet' ,  'truck2' ,  [ 33.5123 ,  - 112.2693 ] ,  { value : 10 , othervalue : 20 } ) ;

// construct the geofence query
/*
let query = client.intersectsQuery('Station').detect('inside','outside').bounds(44.64701352313015, 10.886374409919698);
let query2 = client.intersectsQuery('Station').detect('inside','outside').bounds(44.64651863723766, 10.892356791848103);
let query3 = client.intersectsQuery('Station').detect('inside','outside').bounds(44.66163938662867, 10.854815562426293);


// start the live geofence
let fence = query.executeFence((err, results) => {
    // this callback will be called multiple times
    if (err) {
        console.log("error:", err);
    } else {
        console.dir(results);
    }
});
// if you want to be notified when the connection gets closed
fence.onClose(() => {
    console.log("geofence was closed");
});*/