let Tile38 = require('tile38');
let client = new Tile38();

client.set('Station', 'EnelX', [ 44.64701352313015, 10.886374409919698 ]).then(() => {
    console.log('Station EnelX added');
}).catch(err => {
    console.err("Error: " + err)
});
client.set('Station', 'Be Charge', [ 44.64651863723766, 10.892356791848103 ]).then(() => {
    console.log('Station Be Charge added');
}).catch(err => {
    console.err("Error: " + err)
});
client.set('Station', 'FREEtoX', [ 44.66163938662867, 10.854815562426293 ]).then(() => {
    console.log('Station FREEtoX added');
}).catch(err => {
    console.err("Error: " + err)
});
/*
 * mettere dei console.log() nello script principale, ovvero qui ad esempio,
 * non garantisce la corretta esecuzione delle promise!
 */

/*
 * Sembra che così la fence funzioni, basato sulla risposta qua: https://github.com/phulst/node-tile38/issues/39
 */
let query = client.intersectsQuery('Station', { fence: true})  // sembra il parametro fence non serva in realtà
    .detect('inside','outside')
    .bounds(44.63, 10.87, 44.67, 10.90);
let fence = query.executeFence((err, result) => {
    console.log("Callback called")
    if (err) {
        console.error("Error: " + err);
    } else {
        console.dir(result);
    }
});
/*
 * Test della fence: aggiungi stazione dopo 3 secondi dall'esecuzione del main script
 */
setTimeout(() => {
    client.set('Station', 'SMariani', [ 44.64, 10.88 ]).then(() => {
        console.log('Station SMariani added');
    }).catch(err => {
        console.err("Error: " + err)
    });
}, 3000)

/*
 * anche così funziona, ma questa non è una fence, è una query sincrona
 */
query = client.intersectsQuery('Station').bounds(44.63, 10.87, 44.67, 10.90);
query.execute().then(result => {
    console.log("Synchronous query called")
    console.dir(result);
}).catch(err => {
    console.error("Error: " + err);
});

/*
 * sotto un'altra modalità per invocare comandi descritta nella documentazione (in fondo),
 * ma che non funziona
 */
/*client.executeCommand('INTERSECTS Station BOUNDS 44.64701352313015, 10.886374409919698, 44.66163938662867, 10.892356791848103 FENCE DETECT inside, outside', { parseJson: false }).then(result => {
    console.dir(result);
}).catch(err => {
    console.error("Error: " + err);
});*/



// I COMANDI SOTTO NON LI HO TESTATI

/*
// if you want to be notified when the connection gets closed, register a callback function with onClose()
fence.onClose(() => {
    console.log("geofence was closed");
});

// later on, when you want to close the socket and kill the live geofence:
fence.close();

// salva una posizione con campi aggiuntivi 
//client.set ( 'fleet' ,  'truck2' ,  [ 33.5123 ,  - 112.2693 ] ,  { value : 10 , othervalue : 20 } ) ;

// construct the geofence query
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
});
*/
