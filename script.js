// Elementos del DOM
const fechaInput = document.querySelector('input[name="fecha"]');
const horaSelect = document.querySelector('select[name="hora"]');
const form = document.querySelector('form');

// Div para mostrar citas (opcional)
let citasAgendadasDiv = document.createElement("div");
citasAgendadasDiv.style.maxWidth = "500px";
citasAgendadasDiv.style.margin = "20px auto";
document.body.appendChild(citasAgendadasDiv);

// Inicializar: generar la fecha mínima (hoy)
const hoy = new Date().toISOString().split('T')[0];
fechaInput.min = hoy;

// Función para bloquear horas ya ocupadas para la fecha seleccionada
function actualizarHorasDisponibles() {
  const fecha = fechaInput.value;
  const citas = JSON.parse(localStorage.getItem("citas")) || {};
  const ocupadas = citas[fecha] ? citas[fecha].map(c => c.hora) : [];

  for (let option of horaSelect.options) {
    option.disabled = ocupadas.includes(option.value);
  }
}

// Función para mostrar las citas de la fecha seleccionada
function mostrarCitas() {
  const fecha = fechaInput.value;
  citasAgendadasDiv.innerHTML = "";
  const citas = JSON.parse(localStorage.getItem("citas")) || {};
  if (!citas[fecha]) return;

  citas[fecha].forEach(c => {
    let div = document.createElement("div");
    div.className = "cita";
    div.textContent = `${c.hora} - ${c.nombre}`;
    citasAgendadasDiv.appendChild(div);
  });
}

// Cuando cambia la fecha
fechaInput.addEventListener("change", () => {
  actualizarHorasDisponibles();
  mostrarCitas();
});

// Manejar envío del formulario
form.addEventListener("submit", function(e) {
  const nombre = form.nombre.value;
  const fecha = form.fecha.value;
  const hora = form.hora.value;

  if (!nombre || !fecha || !hora) {
    alert("Por favor completa todos los campos");
    e.preventDefault();
    return;
  }

  // Guardar en localStorage para bloquear la hora
  let citas = JSON.parse(localStorage.getItem("citas")) || {};
  if (!citas[fecha]) citas[fecha] = [];

  if (citas[fecha].some(c => c.hora === hora)) {
    alert("Esta hora ya está ocupada, elige otra");
    e.preventDefault();
    return;
  }

  citas[fecha].push({ hora, nombre });
  localStorage.setItem("citas", JSON.stringify(citas));

  // Actualizar horas y mostrar citas
  actualizarHorasDisponibles();
  mostrarCitas();
});
