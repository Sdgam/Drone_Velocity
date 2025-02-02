// FORMULARIO -------------------------------------------------------------------------------------------------

// Creamos la función para calcular el presupuesto incluído en el form
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("presupuestoForm");
    const presupuestoSpan = document.getElementById("presupuesto");

    function calcularPresupuesto() {
        let total = Number(document.getElementById("producto").value) || 0;
        let extras = document.querySelectorAll(".extra:checked");
        extras.forEach(extra => {
            total += Number(extra.value);
        });
        let plazo = Number(document.getElementById("plazo").value) || 0;
        if (plazo >= 7) {
            total *= 0.9; // Descuento del 10% si lo pide para dentro de una semana o más.
        }
        presupuestoSpan.textContent = total.toFixed(2) + "€";
    }

    document.getElementById("producto").addEventListener("change", calcularPresupuesto);
    document.getElementById("plazo").addEventListener("change", calcularPresupuesto);
    document.querySelectorAll(".extra").forEach(extra => {
        extra.addEventListener("change", calcularPresupuesto);
    });

    // Añadimos la función para validar y enviar el formulario
    form.addEventListener("submit", function(event) {
        let nombre = document.getElementById("nombre").value;
        let apellidos = document.getElementById("apellidos").value;
        let telefono = document.getElementById("telefono").value;
        let email = document.getElementById("email").value;
        let condiciones = document.getElementById("condiciones").checked;

        let nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{1,15}$/.test(nombre);
        let apellidosValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]{1,40}$/.test(apellidos);
        let telefonoValido = /^[0-9]{9}$/.test(telefono);
        let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!nombreValido || !apellidosValido || !telefonoValido || !emailValido || !condiciones) {
            alert("Por favor, revise los datos ingresados y acepte las condiciones.");
            event.preventDefault();
        }
    });
});


// MAPA CON UBICACIÓN -----------------------------------------------------------------------------------------

// Coordenadas de la empresa
let latEmpresa = 41.64637657816195;
let lonEmpresa = -0.8898054037540718;

// Inicializamos el mapa
let map = L.map('map')
  .setView([latEmpresa, lonEmpresa], 15);

// Cargamos capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Añadimos un control de escala
L.control.scale().addTo(map);

// Añadimos marcador de la empresa
L.marker([latEmpresa, lonEmpresa],{draggable: true}).addTo(map);

// Función para calcular la ruta desde la ubicación del usuario
function calcularRuta() {
    if (!navigator.geolocation) {
        alert('La geolocalización no está soportada en tu navegador.');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(function (position) {
        let latUsuario = position.coords.latitude;
        let lonUsuario = position.coords.longitude;
        
        // Añadir marcador del usuario
        L.marker([latUsuario, lonUsuario]).addTo(map)
            .bindPopup('Tu ubicación').openPopup();
        
        // Dibujar línea de ruta
        let ruta = L.polyline([
            [latUsuario, lonUsuario],
            [latEmpresa, lonEmpresa]
        ], {color: 'blue'}).addTo(map);
        
        map.fitBounds(ruta.getBounds());
    }, function () {
        alert('No se pudo obtener tu ubicación.');
    });
}

// CARGA DINAMICA DE SECCIÓN NOTICIAS -----------------------------------------------------------------------------------------

const news1 = document.getElementById('news1');
const news2 = document.getElementById('news2');
const news3 = document.getElementById('news3');

fetch('../data/new1.json')
    .then(response => response.json())
    .then(data => {
        let contenido = ''
        contenido +=`<p>${data.noticia1.title}</p>`
    })

fetch('../data/new2.json')
    .then(response => response.json())
    .then(data => {
        news2.innerHTML = `
            <p>${data.title}</p>
            <p>${data.date}</p>
            <p>${data.content}</p>
        `
    })

fetch('../data/new3.json')
    .then(response => response.json())
    .then(data => {
        news3.innerHTML = `
            <p>${data.title}</p>
            <p>${data.date}</p>
            <p>${data.content}</p>
        `
    })


