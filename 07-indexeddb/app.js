// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);

request.onupgradeneeded = event => {
    console.log('Actualizacion de BD');
    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    });
};

// Manejor de errores
request.onerror = event => {
    console.log('DB error:', event.target.error);
};

// Insertar datos
request.onsuccess = event => {
    let db = event.target.result;
    let heroesData = [
        { id: '111', heroe: 'Spiderman', mensaje: 'Aquí su amigo Spiderman' },
        { id: '222', heroe: 'Ironman', mensaje: 'Aquí en mi nuevo Mark 50' }
    ];

    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log('Error guardando', event.target.error);
    };

    heroesTransaction.oncomplete = event => {
        console.log('Transaccion hecha', event);
    };

    let heroesStore = heroesTransaction.objectStore('heroes');

    for (let heroe of heroesData) {
        heroesStore.add(heroe);
    }

    heroesStore.onsuccess = event => {
        console.log('Nuevo item agregado');
    }
};