// CARGA DINAMICA DE SECCIÓN NOTICIAS EN LA HOME -----------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function(){

    fetch('../data/news.json')
    .then(response => response.json())
    .then(data =>{
        const galeria = document.querySelector('.contenedor-galeria')
        data.forEach(noticia => {
            const noticiaHTML = 
            `
            <div class="contenedor-noticia">
                <div class="contenedor-imgnoticia">
                    <img class="imgnoticia" src="${noticia.imagen}" alt="">
                </div>
                <div class="info-noticia">
                    <h3 class="titulo-noticia">${noticia.title}</h3>
                    <div class="descripcion-noticia">
                        <p>${noticia.content}</p>
                    </div> 
                    <div class="fecha-noticia">
                        <p>${noticia.date}</p>
                    </div>   
                </div>
            </div>
            `;
                galeria.insertAdjacentHTML("beforeend", noticiaHTML)
        })
    })
    .catch(error => console.error('Error al obtener los datos: ', error))
})
    