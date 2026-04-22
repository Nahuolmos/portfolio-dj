/**
 * MÁQUINA DE CARRUSELES
 * Esta función permite activar cualquier carrusel pasando sus IDs.
 */
function activarCarrusel(idTrack, idBtnLeft, idBtnRight) {
    const track = document.getElementById(idTrack);
    const btnLeft = document.getElementById(idBtnLeft);
    const btnRight = document.getElementById(idBtnRight);

    if (track && btnLeft && btnRight) {
        btnRight.onclick = () => track.scrollBy({ left: 400, behavior: "smooth" });
        btnLeft.onclick = () => track.scrollBy({ left: -400, behavior: "smooth" });
    }
}

// Inicializamos todos los carruseles
activarCarrusel('carousel-track', 'btn-left', 'btn-right'); // Personal
activarCarrusel('track-xv', 'btn-left-xv', 'btn-right-xv');     // XV
// activarCarrusel('track-bodas', 'btn-left-bodas', 'btn-right-bodas'); // (Cuando lo agregues)


/**
 * LÓGICA DE WHATSAPP
 */
document.getElementById('whatsapp-btn').onclick = () => {
    const nombre = document.getElementById('nombre-input').value;
    const mensaje = document.getElementById('mensaje-input').value;
    const miTelefono = "549261XXXXXXX"; // Tu número

    if (!nombre || !mensaje) {
        alert("Completa los datos para contactarnos.");
        return;
    }

    const url = `https://wa.me/${miTelefono}?text=${encodeURIComponent("Hola Nahuel, soy " + nombre + ". " + mensaje)}`;
    window.open(url, '_blank');
};

/**
 * LÓGICA DEL MENÚ RESPONSIVE
 */
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.checked = false;
    });
});