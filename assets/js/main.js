let listaTareas = []

const nombreTarea = document.getElementById(nombreTarea)
const descripcion = document.getElementById(descripcion)
const fechaLimite = document.getElementById(fechaLimite)

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

