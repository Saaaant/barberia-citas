const form = document.getElementById("formCita");
const fechaInput = form.fecha;
const horaSelect = form.hora;
const citasAgendadasDiv = document.getElementById("citasAgendadas");

// Inicializar fecha mínima (hoy)
const hoy = new Date().toISOString().split('T')[0];
fechaInput.min = hoy;

// Bloquear horas ya ocupadas por fecha
function actualizarHorasDisponibles() {
  const fecha = fechaInput.value;
  const citas = JSON.parse(localStorage.getItem("citas")) || {};
  const ocupadas = citas[fecha] ? citas[fecha].map(c => c.hora) : [];

  for (let option of horaSelect.options) {
    option.disabled = ocupadas.includes(option.value);
  }
}

// Mostrar citas agendadas
function mostrarCitas() {
  citasAgendadasDiv.innerHTML = "";
  const fecha = fechaInput.value;
  const citas = JSON.parse(localStorage.getItem("citas")) || {};
  if (!citas[fecha]) return;

  citas[fecha].forEach(c => {
    const div = document.createElement("div");
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
  const fecha = fechaInput.value;
  const hora = horaSelect.value;

  if (!nombre || !fecha || !hora) {
    alert("Completa todos los campos");
    e.preventDefault();
    return;
  }

  let citas = JSON.parse(localStorage.getItem("citas")) || {};
  if (!citas[fecha]) citas[fecha] = [];

  if (citas[fecha].some(c => c.hora === hora)) {
    alert("Esta hora ya está ocupada, elige otra");
    e.preventDefault();
    return;
  }

  citas[fecha].push({ hora, nombre });
  localStorage.setItem("citas", JSON.stringify(citas));

  actualizarHorasDisponibles();
  mostrarCitas();
});
