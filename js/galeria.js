document.addEventListener("DOMContentLoaded", function(){

    fetch('../data/galeria.json')
    .then(response => response.json())
    .then(data =>{
        const galeriag = document.querySelector('.contenedor-galeria')
        data.forEach(drone => {
            const droneHTML = 
            `
            <div class="contenedor-drone">
                <div class="contenedor-imgdrone">
                    <img class="imgdrone" src="${drone.imagen}" alt="">
                </div>
                <div class="info-drone">
                    <h3 class="nombre-drone">${drone.nombre}</h3>
                    <div class="descripcion-drone">
                        <p>${drone.descripcion}</p>
                    </div> 
                    <div class="precio-drone">
                        <p>${drone.precio}</p>
                    </div>   
                </div>
            </div>
            `;
                galeriag.insertAdjacentHTML("beforeend", droneHTML)
        })
    })
    .catch(error => console.error('Error al obtener los datos: ', error))
})
