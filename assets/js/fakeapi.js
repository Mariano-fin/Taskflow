/* CARGAR RUTINA EJERCICIOS */

const RUTINA = [
    {id:"ejercicio1", nombre:"Lagartijas", descripcion:"100 lagartijas en sets de 25 cada uno", fecha: "30-10-2026", estado:"pendiente"},
    {id:"ejercicio2", nombre:"Sentadillas", descripcion:"100 sentadillas en sets de 25 cada uno" , fecha: "30-10-2026", estado:"pendiente"},
    {id:"ejercicio3", nombre:"Abdominales", descripcion:"100 abdominales en sets de 25 cada uno" , fecha: "30-10-2026", estado:"pendiente"},
    {id:"ejercicio4", nombre:"Trote", descripcion:"correr por 10 kilómetros, con pausas cada 5 kilómetros", fecha: "30-10-2026", estado:"pendiente"}
]

let tareasGuardadas = clonar(RUTINA);

function clonar(valor){
    return  JSON.parse(JSON.stringify(valor))
}