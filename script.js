// Selecciona el canvas y define su contexto
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Carga la imagen del mapa
const mapImage = new Image();
mapImage.src = 'MAPA.png'; // Asegúrate de colocar la imagen en el mismo directorio o especificar la ruta correcta

mapImage.onload = function() {
    // Ajusta el tamaño del canvas al tamaño de la imagen del mapa
    canvas.width = mapImage.width;
    canvas.height = mapImage.height;

    // Dibuja la imagen en el canvas
    ctx.drawImage(mapImage, 0, 0);
};

// Variables para el color del punto
let pointColor = 'blue'; // Color inicial

// Detecta clics en el canvas y dibuja puntos
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Dibuja un círculo en la posición del clic
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = pointColor;
    ctx.fill();
});

// Cambia el color del punto
function setColor(color) {
    pointColor = color;
}

function exportToPNG() {
    const canvas = document.getElementById('mapCanvas');
    const controls = document.querySelector('.controls');

    console.log("Exportar a PNG llamado");

    if (!canvas || !controls) {
        console.log('Error: Canvas o controles no encontrados');
        return;
    }

    controls.style.display = 'none';

    setTimeout(() => {
        const link = document.createElement('a');
        link.download = 'mapa.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        console.log("Imagen exportada");

        controls.style.display = 'flex';
    }, 100);


}
