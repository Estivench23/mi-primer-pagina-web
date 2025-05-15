const hamburguesa = document.querySelector('#hamburguer') 
const enlaces = document.querySelector('#nav-links')
const slideList = Array.from(document.querySelectorAll('.slide'));
const controlSlideList = Array.from(document.querySelectorAll('.control-slide'));

let autoSlideTimer;
const autoSlideInterval = 5000; // 5 segundos

function startAutoSlide() {
    // Limpia si ya había un timer anterior
    clearInterval(autoSlideTimer);
    // Inicia nuevo intervalo
    autoSlideTimer = setInterval(() => updateCurrentSlide(), autoSlideInterval);
}

function updateCurrentSlide(nextSlideIndexToShow = undefined) {
    const classNameSlideHidden = 'slide-hidden';
    const slideListLength = slideList.length;
    
    // Encuentra el índice del slide que se esta mostrando en pantalla
    const currentSlideIndex = slideList.findIndex(slide => 
        !slide.classList.contains(classNameSlideHidden)
    );

    if (nextSlideIndexToShow === undefined) {
        // El índice vuelve al principio cuando se alcanza el final de la lista de slides
        nextSlideIndexToShow = (currentSlideIndex + 1) % slideListLength;
    }

    // Oculta el slide actual y muestra el siguiente
    slideList[currentSlideIndex].classList.add(classNameSlideHidden);
    slideList[nextSlideIndexToShow].classList.remove(classNameSlideHidden);

    // Cambiar de color el control selecionado
    const classNameControlSlideActive = 'control-slide-active';
    controlSlideList[currentSlideIndex].classList.remove(classNameControlSlideActive);
    controlSlideList[nextSlideIndexToShow].classList.add(classNameControlSlideActive);
}

hamburguesa.addEventListener('click', () => {
    enlaces.classList.toggle('show')
})

document.addEventListener('DOMContentLoaded', () => {
    if (['/', '/index.html'].includes(window.location.pathname)) {
      startAutoSlide();
    }

    // Crear listeners dinamicos
    controlSlideList.forEach((controlSlide, controlSlideKey) => {
        controlSlide.addEventListener('click', () => updateCurrentSlide(controlSlideKey))
    });
});


function showTab(index) {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.products');

  tabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
    contents[i].classList.toggle('active', i === index);
  });
}

let cartCount = 0;
let cartItems = [];
let cartTotal = 0;

function addToCart() {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
}

function closeCart() {
  document.getElementById('cart-popup').style.display = 'none';
}

if (['/', '/index.html'].includes(window.location.pathname)) {
  $(document).ready(function(){
    $('#carrusel').slick({
      infinite: true,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1400,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        }
      ]
    });
  });
}
