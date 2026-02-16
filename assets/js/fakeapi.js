/* CARGAR RUTINA EJERCICIOS */

const RUTINA = [
    {id:"89999", nombre:"Lagartijas", descripcion:"100 lagartijas en sets de 25 cada uno", fecha: "30-10-2026", estado:"pendiente"},
    {id:"899999", nombre:"Sentadillas", descripcion:"100 sentadillas en sets de 25 cada uno" , fecha: "30-10-2026", estado:"pendiente"},
    {id:"8999999", nombre:"Abdominales", descripcion:"100 abdominales en sets de 25 cada uno" , fecha: "30-10-2026", estado:"pendiente"},
    {id:"89999999", nombre:"Trote", descripcion:"correr por 10 kilómetros, con pausas cada 5 kilómetros", fecha: "30-10-2026", estado:"pendiente"}
]

let tareasGuardadas = clonar(RUTINA);

function clonar(valor){
    return  JSON.parse(JSON.stringify(valor))
}


export async function cargarRutina(){
   
    return clonar(tareasGuardadas)
}

