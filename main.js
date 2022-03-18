let fechaNavar

function fechaNav() {
    fecha = new Date(); //Actualizar fecha.

    anio = fecha.getFullYear();
    mes = fecha.getMonth();
    diaNum = fecha.getDate();
    diaLetra = fecha.getDay();

    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let diaSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    fechaNavar = diaSemana[diaLetra] + ' ' + diaNum + ' de ' + meses[mes] + ' del ' + anio;
    console.log(fechaNavar);
    document.getElementById('fechaCompleta').innerText = fechaNavar;
}
fechaNav();



let tareas = [];
const cardsTask = document.getElementById('ConteinerTareas');
//Guardar Tarea

const registrarTarea = (e) => {
    e.preventDefault();
    let tarea = {};

    tarea[document.getElementById('inputResgistro').name] = document.getElementById('inputResgistro').value;
    tarea['Termino'] = false;
    tarea['Id'] = generarId();

    document.getElementById('inputResgistro').value = ''; //Limpia Input
    tareas.push(tarea);
    const tareasJson = JSON.stringify(tareas);
    localStorage.setItem('Tareas', tareasJson);
    pintarTarea(tarea, tarea.Id); //Llamo a la función que pinta tarea
    EstadoTareas();
}

//Genera Id
const generarId = () => Math.floor(Math.random() * 100000000);

//Pinta tarea
const pintarTarea = (Task) => {
    //ConteinerTareas
    let tareaHTML = document.getElementById("ConteinerTareas");
    tareaHTML.insertAdjacentHTML("beforeend", `<div id=C-${Task.Id} class="d-flex justify-content-between p-2">
                                                <div class="form-check">
                                                    <input id=I-${Task.Id} class="form-check-input" type="checkbox" onChange="cambiaEstilo(id)" id="flexCheckDefault">
                                                    <label class="form-check-label" for="flexCheckDefault">
                                                        <span><i id='Icon-${Task.Id}' class="fa-solid fa-clock text-primary "></i></span> <span id=T-${Task.Id} >${Task.Task}</span>
                                                    </label>
                                                </div>

                                                <div>
                                                    <button id=E-${Task.Id} data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" class="btn btn-outline-primary" onclick='llenar(id)' ><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button id=B-${Task.Id} type="button" class="btn btn-outline-danger" onclick="eliminaTask(id)" ><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </div>`);
}

//Cambia estilo de Tarea
const cambiaEstilo = (id, termino) => {

    let cadena = id.split('-');
    let idCard = cadena[1];
    let checkBoxTask = document.getElementById(`I-${idCard}`);
    if (checkBoxTask.checked == true || termino == true) {
        document.getElementById(`T-${idCard}`).classList.add('text-decoration-line-through', 'text-secondary'); //Tachar texto
        document.getElementById(`Icon-${idCard}`).hidden = true; //hidden al icono
        document.getElementById(`I-${idCard}`).checked = true;
        cambioId(idCard, true); //Cambia estado
    } else {
        document.getElementById(`T-${idCard}`).classList.remove('text-decoration-line-through', 'text-secondary'); //Tachar texto
        document.getElementById(`Icon-${idCard}`).hidden = false; //Quita hidden al icono
        document.getElementById(`I-${idCard}`).checked = false;
        cambioId(idCard, false); //Cambia estado 
    }
    EstadoTareas();
}

//Cambia contador de las tareas terminadas 
const EstadoTareas = () => {
    let pendientes = tareas.filter(tarea => tarea.Termino == false);
    let contador = pendientes.length;
    let pendientesContador = document.getElementById("pendientesContador");
    pendientesContador.innerText = contador;
    let completadas = tareas.filter(tarea => tarea.Termino == true);
    contador = completadas.length;
    let completadasContador = document.getElementById("completadasContador");
    completadasContador.innerText = contador;
}
//Cambia el estado de la tarea en el objeto
const cambioId = (id, estado) => {
    let index = tareas.findIndex(tarea => tarea.Id == id);
    let arregloTemp;
    tareas[index].Termino = estado; //Cambio a nivel variable
    arregloTemp = JSON.stringify(tareas);
    localStorage.setItem('Tareas', arregloTemp);
}
//Llena input del modal 
const llenar = (id) => {
    let cadena = id.split('-');
    let idCard = cadena[1];
    let valor = document.getElementById(`T-${idCard}`).textContent;
    document.getElementById('modal').value = valor;
    document.getElementById('modal-id').innerText = idCard;
}

//Guarda tarea editada del modal
const guardarModal = () => {
    let TaskModal;
    let idModal;
    let index;
    let arregloTemp;
    TaskModal = document.getElementById('modal').value;
    idModal = document.getElementById('modal-id').textContent;
    index = tareas.findIndex(tarea => tarea.Id == idModal);
    tareas[index].Task = TaskModal; //Cambio a nivel variable
    arregloTemp = JSON.stringify(tareas);
    localStorage.setItem('Tareas', arregloTemp); //Cambio a nivel LocalStorage
    document.getElementById(`T-${idModal}`).innerText = TaskModal; //Cambio a nivel FrondEnd
}

//Eliminar tarea
const eliminaTask = (id) => {
    let cadena = id.split('-');
    let idCard = cadena[1];
    let arreglo = tareas.filter(tarea => tarea.Id != idCard);
    arreglo = JSON.stringify(arreglo);
    localStorage.setItem('Tareas', arreglo);
    renderizarTareas();
    EstadoTareas();
}

//Renderiza Heroe
const renderizarTareas = () => {
    const tareasLS = localStorage.getItem("Tareas");
    if (tareasLS) {
        tareas = JSON.parse(tareasLS);
    }

    const taskEnDiv = cardsTask.children;
    if (taskEnDiv.length > 0) {
        const tarea = Array.from(taskEnDiv);
        tarea.forEach((card) => {
            cardsTask.removeChild(card);
        })
    }
    tareas.forEach((task) => {
        const card = pintarTarea(task);
        if (task.Termino == true) {
            cambiaEstilo(`T-${task.Id}`, task.Termino);
        }
    });
    EstadoTareas();
}
renderizarTareas();


//Hora
function actual() {
    fecha = new Date(); //Actualizar fecha.

    anio = fecha.getFullYear();
    mes = fecha.getMonth();
    diaLetra = fecha.getDate();
    diaNum = fecha.getDay();
    hora = fecha.getHours(); //hora actual
    minuto = fecha.getMinutes(); //minuto actual
    segundo = fecha.getSeconds(); //segundo actual
    if (hora < 10) { //dos cifras para la hora
        hora = "0" + hora;
    }
    if (minuto < 10) { //dos cifras para el minuto
        minuto = "0" + minuto;
    }
    if (segundo < 10) { //dos cifras para el segundo
        segundo = "0" + segundo;
    }
    //ver en el recuadro del reloj:
    mireloj = hora + " : " + minuto + " : " + segundo;
    return mireloj;
}

function actualizar() { //función del temporizador
    mihora = actual(); //recoger hora actual
    mireloj = document.getElementById("reloj"); //buscar elemento reloj
    mireloj.innerHTML = mihora; //incluir hora en elemento
}
setInterval(actualizar, 1000); //iniciar temporizador