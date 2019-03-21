
// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);

request.onupgradeneeded = event => {
    console.log('Actualizacion de BD');
    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    });
};