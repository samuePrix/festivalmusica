document.addEventListener('DOMContentLoaded', function () {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollyt();
});
function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    window.addEventListener('scroll', function () {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixxed')
        } else {
            header.classList.remove('fixxed')
        }
    })
}

function crearGaleria() {
    const CANTIDAD_DE_IMAGENES = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= CANTIDAD_DE_IMAGENES; i++) {
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
        <source srcset="dist/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="dist/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="dist/img/gallery/full/${i}.jpg" alt="imagen galeria">
    `;
        


        // event handler
        imagen.onclick = function () {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
    <source srcset="dist/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="dist/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="dist/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;


    // generar modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal;
    modal.appendChild(imagen)
    // agregar al html
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden')
    body.appendChild(modal)

}
function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    setTimeout(() => {

        const body = document.querySelector('body');
        body.classList.remove('overflow-hidden')
        modal?.remove();
    }, 300);
}
function resaltarEnlace() {
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')

        let actual = '';
        sections.forEach(section =>{
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if(window.scrollY >= (sectionTop - sectionHeight / 3)){
                actual = section.id
            }
        })
        navLinks.forEach(link=>{
            
            if(link.getAttribute('href')=== '#' + actual) {
                link.classList.add('active')
            }else {
                link.classList.remove('active')
            }
        })
    })
}
function scrollyt() {
 const navLinks = document.querySelectorAll('.navegacion-principal a')
 navLinks.forEach(link =>{
    link.addEventListener('click', e => {
        e.preventDefault()
        const sectionScroll = e.target.getAttribute('href')
        const section = document.querySelector(sectionScroll)
        section.scrollIntoView({behavior: 'smooth'})
    })
 })
}