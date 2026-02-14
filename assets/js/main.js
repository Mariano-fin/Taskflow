let listaTareas = []

const nombreTarea = document.getElementById("nombre-nueva-tarea");
const descripcionTarea = document.getElementById("descripcionTareaHTML");
const fechaLimiteTarea = document.getElementById("fechaLimiteTareaHTML");

class Tarea {
    constructor(id, descripcion, estado, fechaCreacion, fechaLimite) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaLimite = fechaLimite;
    }
}

class GestorTareas {

}

function toggleCompletar() {

}


function normalizarTexto(texto){
    return String(texto)
        .trim()
        .replace(/\s+/g , " ")
}



function new Tarea 

function agregarTarea {
    listaTareas.push ({
        nombre: nombreTarea,
        descripcion: descripcionTarea,
        fecha: fechaLimiteTarea
        
    }

    )
}

async function cargarRutina() {
    const rutina = await obtenerRutina 
}