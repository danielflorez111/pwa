function sumarUno(numero) {
    var promesa = new Promise((resolve, reject) => {

        if (numero >= 7) {
            reject("El número es muy alto");
        }

        setTimeout(() => resolve(numero + 1), 800)
    });

    return promesa;
}

sumarUno(1)
    .then(sumarUno)
    .then(sumarUno)
    .then(sumarUno)
    .then(sumarUno)
    .then(sumarUno)
    .then(sumarUno)
    .then(sumarUno)
    .catch(error => {
        console.log("Error en promesa");
    });

    // .then(sumarUno)
    // .then((nuevoNumero) => (
    //     console.log(nuevoNumero)
    // ));