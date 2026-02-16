import {cargarRutina} from "./fakeapi.js"

let listaTareas = []

let contadorID = 0;


const botonAgregar = document.getElementById("agregar-tarea");
const nombreTarea = document.getElementById("nombre-nueva-tarea");
const descripcionTarea = document.getElementById("descripcionTareaHTML");
const fechaLimiteTarea = document.getElementById("fechaLimiteTareaHTML");
const botonRutina = document.getElementById("boton-rutina");

// =======================Variables para modal de Editar Tarea=======

const editarNombre = document.getElementById("editar-nombre");
const editarDescripcion = document.getElementById("editar-descripcion");
const editarFecha = document.getElementById("editar-fecha");
const botonGuardarEdicion = document.getElementById("guardar-edicion");

let tareaEditandoId = null;


/*================== Actualiza array a partir de form ==============*/

botonAgregar.addEventListener('click', agregarTarea => {
    agregarTarea.preventDefault();
    

    listaTareas.push ({
        id: contadorID++,
        nombre: nombreTarea.value,
        descripcion: descripcionTarea.value,
        fecha: fechaLimiteTarea.value,
        estado: "pendiente"      
    })
    
    nombreTarea.value = "";
    descripcionTarea.value = "";
    fechaLimiteTarea.value = "";

    loadingGuardado();
    
    renderizarLista(listaTareas); 

    console.log("Tarea agregada ---->", listaTareas);
});

botonGuardarEdicion.addEventListener('click', () => {
    
    if (tareaEditandoId === null) return;
    
    listaTareas = listaTareas.filter(t => t.id !== tareaEditandoId);
    
    listaTareas.push({
        id: contadorID++,
        nombre: editarNombre.value,
        descripcion: editarDescripcion.value,
        fecha: editarFecha.value,
        estado: "pendiente"
    });
    
    editarNombre.value = "";
    editarDescripcion.value = "";
    editarFecha.value = "";
    
    tareaEditandoId = null;

    const editarModal = bootstrap.Modal.getInstance(document.getElementById('editarModal'));
    editarModal.hide();

    renderizarLista(listaTareas);
    
    console.log("Tarea editada ---->", listaTareas);
});


// =============== Función que simula guardado y carga ================

async function loadingGuardado() {
    try{
        const loadingModal = new bootstrap.Modal(document.getElementById('loadingModal'));
        const confirmacionModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        
        loadingModal.show();
       
        await falsoLoading();
      
        loadingModal.hide();
      
        setTimeout(() => {
            confirmacionModal.show();
        }, 300);

    }
    catch (error) {
        console.error("Error en el guardado:",error);
    }}


// =============Función de carga, complemento de loadingGuardado====================


function falsoLoading() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Tarea guardada");
        }, 1500); // Simula 1.5 segundos de procesamiento
    });
}


// =============Función para renderizar la lista en pantalla===========

function renderizarLista(listaTareas) {
    const lista = document.getElementById("listado-tareas-HTML")
    lista.textContent = ""  // limpia lista

    if( !listaTareas || listaTareas.length === 0){
        const nuevo_div = document.createElement("div")
        nuevo_div.className = "muted";
        nuevo_div.textContent = "No hay tareas aún. Puedes agregar una nueva o cargar la rutina de ejercicio predeterminada"
        lista.appendChild(nuevo_div)
        return 
    }

    for(const tarea of listaTareas){
        lista.appendChild( crearTareaHTML( tarea ) );
    }

}

function crearTareaHTML(tarea) {
    const divTarea = document.createElement("div");
    divTarea.className = "list-group-item tarea-item";
    if( tarea.estado === "completada") divTarea.classList.add("completada")
            
    const div2 = document.createElement("div");
    div2.className = "tarea-contenido";

    const div3 = document.createElement("div");
    div3.className = "d-flex align-items-center gap-2 mb-1";

    const nombre_tarea = document.createElement("span");
    nombre_tarea.className = "tarea-nombre";
    nombre_tarea.textContent = tarea.nombre

    const estado_tarea = document.createElement("span");
    estado_tarea.className = tarea.estado === "completada" ? "badge bg-success text-white" : "badge bg-warning text-dark";
    estado_tarea.textContent = tarea.estado === "completada" ? "Completada" : "Pendiente";

    const descripcion_tarea = document.createElement("p");
    descripcion_tarea.className = "tarea-descripcion";
    descripcion_tarea.textContent = tarea.descripcion

    const fecha_tarea = document.createElement("span");
    fecha_tarea.className = "tarea-fecha";
    fecha_tarea.textContent = "Fecha Límite: " + tarea.fecha;

    const div_botones = document.createElement("div");
    div_botones.className = "tarea-acciones";
    
    const boton_editar = document.createElement("button");
    boton_editar.type = "button";
    boton_editar.className = "btn-tarea btn-editar";
    boton_editar.textContent = "Editar";
    boton_editar.dataset.accion = "editar";

    const boton_completar = document.createElement("button");
    boton_completar.type = "button";
    boton_completar.className = "btn-tarea btn-completar";
    boton_completar.textContent = tarea.estado === "completada" ? "Reiniciar" : "Completar"; 
    boton_completar.dataset.accion = "toggle";

    const boton_eliminar = document.createElement("button");
    boton_eliminar.type = "button";
    boton_eliminar.className = "btn-tarea btn-eliminar";
    boton_eliminar.textContent = "Eliminar";


    divTarea.appendChild(div2);
    div2.appendChild(div3);
    div3.appendChild(nombre_tarea);
    div3.appendChild(estado_tarea);
    div2.appendChild(fecha_tarea);
    div2.appendChild(descripcion_tarea);
    divTarea.appendChild(div_botones);
    div_botones.appendChild(boton_completar);
    div_botones.appendChild(boton_editar);
    div_botones.appendChild(boton_eliminar);

    boton_completar.addEventListener('click', () => {
        toggleCompletar(tarea.id);
    });

    boton_editar.addEventListener('click', () => {
        editarTarea(tarea.id);
    });

    boton_eliminar.addEventListener('click', () => {
        eliminarTarea(tarea.id);
    });

    return divTarea
}

// =========Funciones de botones


function toggleCompletar(id) {
    const tarea = listaTareas.find(t => t.id === id);
    if (!tarea) return;
    tarea.estado = tarea.estado === "completada" ? "pendiente" : "completada";
    renderizarLista(listaTareas);
}

function editarTarea(id) {
    const tarea = listaTareas.find(t => t.id === id);
    if (!tarea) return;
   
    tareaEditandoId = id;
    
    editarNombre.value = tarea.nombre;       
    editarDescripcion.value = tarea.descripcion;  
    editarFecha.value = tarea.fecha;        
    
    const editarModal = new bootstrap.Modal(document.getElementById("editarModal"));
    editarModal.show();
}

function eliminarTarea(id, divPadre) {
    
    listaTareas = listaTareas.filter(t => t.id !== id);
    
    if (divPadre?.remove) divPadre.remove() 
     
    renderizarLista(listaTareas);
    
}

// ================Función de rutina (tareas de prueba)

async function cargarRutinaAsync() {
    try {
    listaTareas = await cargarRutina()
    renderizarLista(listaTareas);
    const maxId = Math.max(...listaTareas.map(t => t.id), contadorID - 1);
    contadorID = maxId + 1;
    } 
    catch (error) {
        console.error("ERROR: ", error)
    }
}

function iniciar() {
    renderizarLista(listaTareas);
    console.log("Taskflow iniciado correctamente")
    
    botonRutina.addEventListener("click", cargarRutinaAsync)

}

iniciar();