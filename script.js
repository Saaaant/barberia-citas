const horaSelect = document.getElementById("hora");
const citasAgendadasDiv = document.getElementById("citasAgendadas");

// Generar horarios
function generarHorarios() {
  let hora = 10;
  let min = 0;
  while (hora < 19) {
    let horaStr = (hora < 10 ? "0" + hora : hora) + ":" + (min < 10 ? "0" + min : min);
    let option = document.createElement("option");
    option.value = horaStr;
    option.textContent = horaStr;
    horaSelect.appendChild(option);

    min += 40;
    if (min >= 60) {
      hora += 1;
      min -= 60;
    }
  }
}

generarHorarios();

// Guardar citas
let citas = [];

function agendarCita() {
  const nombre = document.getElementById("nombre").value;
  const hora = horaSelect.value;

  if (!nombre) {
    alert("Por favor ingresa tu nombre y apellido");
    return;
  }

  // Verificar si la hora ya está ocupada
  if (citas.find(c => c.hora === hora)) {
    alert("Esta hora ya está ocupada, elige otra");
    return;
  }

  citas.push({ nombre, hora });
  mostrarCitas();
}

function mostrarCitas() {
  citasAgendadasDiv.innerHTML = "";
  citas.forEach(c => {
    let div = document.createElement("div");
    div.className = "cita";
    div.textContent = `${c.hora} - ${c.nombre}`;
    citasAgendadasDiv.appendChild(div);
  });
}