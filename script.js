// =======================================================================
// LÓGICA DE ANIMACIÓN (SCROLLREVEAL)
// =======================================================================

// Inicialización y configuración de las animaciones
ScrollReveal({ 
    distance: '60px',
    duration: 1000,
    delay: 100,
    easing: 'ease-in-out'
});

// Aplicación de animaciones
ScrollReveal().reveal('.reveal-left', { origin: 'left' });
ScrollReveal().reveal('.reveal-right', { origin: 'right' });
ScrollReveal().reveal('.reveal-bottom', { origin: 'bottom' });

// Animación de los ítems del menú uno tras otro
ScrollReveal().reveal('.menu-item', { interval: 150 });

// Animación de las imágenes de la galería (mantenida por si cambias el diseño)
ScrollReveal().reveal('.gallery-grid img', { interval: 100, origin: 'top' });


// =======================================================================
// LÓGICA DE NAVEGACIÓN (HEADER DINÁMICO Y MENÚ HAMBURGUESA)
// =======================================================================

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    // --- 1. Header Dinámico ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { 
            header.classList.add('scrolled'); // Añade la clase 'scrolled'
        } else {
            header.classList.remove('scrolled'); // Remueve la clase 'scrolled'
        }
    });

    // --- 2. Menú Hamburguesa ---
    // Función para alternar la clase 'active'
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Función para cerrar el menú al hacer clic en un enlace (en móvil)
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
});

// =======================================================================
// LÓGICA DEL CARRUSEL DE GALERÍA (AHORA CON AVANCE AUTOMÁTICO)
// =======================================================================

let slideIndex = 1; // El índice DEBE empezar en 1 para esta lógica.

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa el carrusel en la primera slide y empieza el avance automático
    if (document.getElementsByClassName("mySlides").length > 0) {
        showSlides(slideIndex); 
        autoShowSlides(); // Llama a la nueva función de avance automático
    }
});

// Función para cambiar slides con flechas
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Función para cambiar slides manualmente al hacer click en los dots
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Función principal para mostrar una slide específica (usada por flechas y dots)
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;
    
    // Manejar el ciclo (si es mayor que el total, vuelve a 1)
    if (n > slides.length) {slideIndex = 1}    
    // Manejar el ciclo (si es menor que 1, va a la última)
    if (n < 1) {slideIndex = slides.length}
    
    // Ocultar todas las slides y remover el estado activo de los dots
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Mostrar la slide actual y activar el dot correspondiente
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}

// Nueva función para el AVANCE AUTOMÁTICO
function autoShowSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;

    // Ocultar todas las slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    // Avanzar al siguiente índice
    slideIndex++;
    
    // Si el índice es mayor que el número de slides, vuelve a 1
    if (slideIndex > slides.length) {
         slideIndex = 1
    } 
    
    // Remover el estado activo de todos los dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    // Mostrar la slide actual y activar el dot correspondiente
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    
    // Llamar a autoShowSlides cada 4 segundos (4000 milisegundos)
    setTimeout(autoShowSlides, 4000); 
}

// =======================================================================
// LÓGICA DEL FORMULARIO DE RESERVAS (WHATSAPP)
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Busca el formulario solo si existe en la página actual
    const form = document.getElementById('reservationForm');
    if (form) {
        const submitBtn = document.getElementById('submitButton');
        const WHATSAPP_NUMBER = '573112534783'; 
        
        const getFormData = () => {
            let isValid = true;
            let data = {};
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                // Limpiar errores
                input.classList.remove('input-error');
                
                // Validación específica para Checkboxes
                if (input.type === 'checkbox') {
                    if (!input.checked) {
                        isValid = false;
                        input.classList.add('input-error'); // Aplica error al checkbox
                    }
                    data[input.name] = input.checked; // Guardar true/false
                } 
                // Validación para otros inputs (texto, email, tel, select, date)
                else {
                    if (!input.value.trim()) { 
                        isValid = false;
                        input.classList.add('input-error');
                    }
                    data[input.name] = input.value.trim();
                }
            });
            
            const messageInput = document.getElementById('message');
            data['message'] = messageInput && messageInput.value.trim() ? messageInput.value.trim() : 'Ninguna';

            return isValid ? data : false;
        };

        submitBtn.addEventListener('click', (event) => {
            event.preventDefault(); 

            const formData = getFormData();

            if (formData) {
                // CONSTRUCCIÓN del cuerpo del mensaje
                const messageBody = 
                    `¡Hola, Montana Vinos & Parrilla!\n\n` + 
                    `Tengo una solicitud de RESERVA:\n` +
                    `-------------------------------\n` +
                    `Nombre: ${formData.name}\n` +
                    `Email: ${formData.email}\n` +
                    `Teléfono: ${formData.phone}\n` +
                    `Personas: ${formData.guests}\n` +
                    `Fecha: ${formData.date}\n` +
                    `Hora: ${formData.time}\n` +
                    `Peticiones: ${formData.message}\n\n` +
                    `--- Consentimientos ---\n` +
                    `Tratamiento de Datos: SÍ\n` +
                    `Recepción de Comunicaciones: SÍ\n\n` +
                    `¡Espero su confirmación!`;

                // CODIFICACIÓN
                const encodedMessage = encodeURIComponent(messageBody);

                // CONSTRUCCIÓN FINAL del enlace de WhatsApp
                const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

                // Redirigir al usuario
                window.open(whatsappURL, '_blank');
                
                form.reset(); 
                
            } else {
                alert('Por favor, complete todos los campos obligatorios, incluyendo los consentimientos, antes de continuar.');
            }
        });
    }
});
// =======================================================================
// LÓGICA DEL CARRUSEL DE MENÚ (INDEPENDIENTE)
// =======================================================================

let menuSlideIndex = 1; 

document.addEventListener('DOMContentLoaded', function() {
    const menuSlides = document.getElementsByClassName("myMenuSlides");
    if (menuSlides.length > 0) {
        showMenuSlides(menuSlideIndex); 
    }
});

// Función para cambiar slides con flechas del menú
function plusMenuSlides(n) {
    showMenuSlides(menuSlideIndex += n);
}

// Función para cambiar slides manualmente con los dots del menú
function currentMenuSlide(n) {
  showMenuSlides(menuSlideIndex = n);
}

// Función principal para mostrar una slide del menú
function showMenuSlides(n) {
    let i;
    let slides = document.getElementsByClassName("myMenuSlides");
    let dots = document.getElementsByClassName("menu-dot");
    
    if (slides.length === 0) return;
    
    if (n > slides.length) {menuSlideIndex = 1}    
    if (n < 1) {menuSlideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[menuSlideIndex-1].style.display = "block";  
    dots[menuSlideIndex-1].className += " active";
}