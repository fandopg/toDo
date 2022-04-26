let fechaNavar;

function fechaNav() {
  fecha = new Date(); //Actualizar fecha.

  anio = fecha.getFullYear();
  mes = fecha.getMonth();
  diaNum = fecha.getDate();
  diaLetra = fecha.getDay();

  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let diaSemana = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  fechaNavar =
    diaSemana[diaLetra - 1] +
    " " +
    diaNum +
    " de " +
    meses[mes] +
    " del " +
    anio;
  console.log(fechaNavar);
  document.getElementById("fechaCompleta").innerText = fechaNavar;
}
fechaNav();

const cardsTask = document.getElementById("ConteinerTareas");
//Guardar Tarea

const registrarTarea = (e) => {
  e.preventDefault();
  let tarea = {};

  tarea["title"] = document.getElementById("inputResgistro").value;
  tarea["description"] = document.getElementById("inputDescripcion").value;
  tarea["completed"] = false;

  document.getElementById("inputResgistro").value = ""; //Limpia Input
  document.getElementById("inputDescripcion").value = ""; //Limpia Input

  crearTarea(tarea);

  const delay = setTimeout(() => {
    recuperarTareas();
  }, 2000);
  // EstadoTareas();
};

//Pinta tarea
const pintarTarea = (taskList) => {
  //ConteinerTareas
  let tareaHTML = document.getElementById("ConteinerTareas");
  tareaHTML.innerHTML = "";

  taskList.forEach((Task) => {
    let decoration = "";
    if (Task.completed == true) {
      decoration = "text-decoration-line-through text-secondary";
    }
    tareaHTML.insertAdjacentHTML(
      "beforeend",
      `<div id=C-${Task._id} class="d-flex justify-content-between p-2">
                                                <div class="form-check">
                                                    <input id=I-${Task._id} class="form-check-input" type="checkbox" onChange="cambiaEstilo(id)" id="flexCheckDefault">
                                                    <label class="form-check-label" for="flexCheckDefault">
                                                        <span><i id='Icon-${Task._id}' class="fa-solid fa-clock text-primary "></i></span> <span id=T-${Task._id} class="${decoration}">${Task.title}</span><p class="text-secondary">${Task.description}</p>
                                                    </label>
                                                </div>

                                                <div>
                                                    <button id=E-${Task._id} data-bs-toggle="modal" data-bs-target="#exampleModal" type="button" class="btn btn-outline-primary" onclick='llenar(id)' ><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <button id=B-${Task._id} type="button" class="btn btn-outline-danger" onclick="eliminaTask(id)" ><i class="fa-solid fa-trash-can"></i></button>
                                                </div>
                                            </div>`
    );
  });

  contadorTareas(taskList);
  pintarTarea(Task);
};

//Cambia estilo de Tarea
const cambiaEstilo = (id, completed) => {
  let cadena = id.split("-");
  let idCard = cadena[1];
  let checkBoxTask = document.getElementById(`I-${idCard}`);
  if (checkBoxTask.checked == true || completed == true) {
    document
      .getElementById(`T-${idCard}`)
      .classList.add("text-decoration-line-through", "text-secondary"); //Tachar texto
    document.getElementById(`Icon-${idCard}`).hidden = true; //hidden al icono
    document.getElementById(`I-${idCard}`).checked = true;
    marcarCompleta(idCard, true); //Cambia estado
  } else {
    document
      .getElementById(`T-${idCard}`)
      .classList.remove("text-decoration-line-through", "text-secondary"); //Tachar texto
    document.getElementById(`Icon-${idCard}`).hidden = false; //Quita hidden al icono
    document.getElementById(`I-${idCard}`).checked = false;
    desmarcarCompleta(idCard, false); //Cambia estado
  }
};

//Cambia contador de las tareas terminadas
const contadorTareas = (tareas) => {
  let pendientes = tareas.filter((tarea) => tarea.completed == false);
  let contador = pendientes.length;
  let pendientesContador = document.getElementById("pendientesContador");
  pendientesContador.innerText = contador;
  let completadas = tareas.filter((tarea) => tarea.completed == true);
  contador = completadas.length;
  let completadasContador = document.getElementById("completadasContador");
  completadasContador.innerText = contador;
};

//Cambia el estado de la tarea en el objeto
const cambioEstado = (id, estado) => {};

// //Llena input del modal
// const llenar = (id) => {
//   let cadena = id.split("-");
//   let idCard = cadena[1];
//   let valor = document.getElementById(`T-${idCard}`).textContent;
//   document.getElementById("modal").value = valor;
//   document.getElementById("modal-id").innerText = idCard;
// };

// //Guarda tarea editada del modal
// const guardarModal = () => {
//   let TaskModal;
//   let idModal;
//   let index;
//   let arregloTemp;
//   TaskModal = document.getElementById("modal").value;
//   idModal = document.getElementById("modal-id").textContent;
//   index = tareas.findIndex((tarea) => tarea.Id == idModal);
//   tareas[index].Task = TaskModal; //Cambio a nivel variable
//   arregloTemp = JSON.stringify(tareas);
//   localStorage.setItem("Tareas", arregloTemp); //Cambio a nivel LocalStorage
//   document.getElementById(`T-${idModal}`).innerText = TaskModal; //Cambio a nivel FrondEnd
// };

//Eliminar tarea
const eliminaTask = (id) => {
  let cadena = id.split("-");
  let idCard = cadena[1];

  eliminarTarea(idCard);

  const delay = setTimeout(() => {
    recuperarTareas();
  }, 2000);
  // renderizarTareas();
  // EstadoTareas();
};

// //Renderiza tareas
// const renderizarTareas = () => {
//   const tareasLS = localStorage.getItem("Tareas");
//   if (tareasLS) {
//     tareas = JSON.parse(tareasLS);
//   }

//   const taskEnDiv = cardsTask.children;
//   if (taskEnDiv.length > 0) {
//     const tarea = Array.from(taskEnDiv);
//     tarea.forEach((card) => {
//       cardsTask.removeChild(card);
//     });
//   }
//   tareas.forEach((task) => {
//     const card = pintarTarea(task);
//     if (task.Termino == true) {
//       cambiaEstilo(`T-${task.Id}`, task.Termino);
//     }
//   });
//   EstadoTareas();
// };
// renderizarTareas();

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
  if (hora < 10) {
    //dos cifras para la hora
    hora = "0" + hora;
  }
  if (minuto < 10) {
    //dos cifras para el minuto
    minuto = "0" + minuto;
  }
  if (segundo < 10) {
    //dos cifras para el segundo
    segundo = "0" + segundo;
  }
  //ver en el recuadro del reloj:
  mireloj = hora + " : " + minuto + " : " + segundo;
  return mireloj;
}

function actualizar() {
  //función del temporizador
  mihora = actual(); //recoger hora actual
  mireloj = document.getElementById("reloj"); //buscar elemento reloj
  mireloj.innerHTML = mihora; //incluir hora en elemento
}
setInterval(actualizar, 1000); //iniciar temporizador

// API consume
const url = "http://localhost:8000/tasks";

const recuperarTareas = () => {
  var requestOptions = {
    "content-type": "application/json",
    method: "GET",
    redirect: "follow",
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((body) => {
      pintarTarea(body.payload);
    });
};

const crearTarea = (tarea) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(tarea),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((body) => console.log(body));
};

const eliminarTarea = (id) => {
  fetch(`${url}/${id}`, {
    method: "DELETE",
  })
    .then((respuesta) => respuesta.json())
    .then((body) => console.log(body));
};

const marcarCompleta = (id, completed) => {
  const tarea = { id, completed };

  fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(tarea),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((body) => console.log(body));
};

const desmarcarCompleta = (id, completed) => {
  const tarea = { id, completed };

  fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(tarea),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((respuesta) => respuesta.json())
    .then((body) => console.log(body));
};

recuperarTareas();
