// Variables globales
let points = []; // Almacena todos los puntos dibujados
let pointColor = 'blue'; // Color inicial de los puntos
let eraserMode = false; // Modo borrador apagado por defecto

// Selecciona el canvas y su contexto
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');

// Carga la imagen del mapa
const mapImage = new Image();
mapImage.src = 'MAPA.png'; // Asegúrate de colocar la imagen en el mismo directorio o especificar la ruta correcta

mapImage.onload = function() {
    canvas.width = mapImage.width;
    canvas.height = mapImage.height;
    ctx.drawImage(mapImage, 0, 0);
};

// Detecta clics en el canvas y dibuja puntos o borra en función del modo activo
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (eraserMode) {
        erasePoint(x, y);
    } else {
        drawPoint(x, y, pointColor);
        points.push({ x, y, color: pointColor });
    }
});

// Función para dibujar un punto en el canvas
function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Función para alternar el modo borrador
function toggleEraserMode() {
    eraserMode = !eraserMode;
    if (eraserMode) {
        canvas.style.cursor = 'crosshair'; // Cambia el cursor al modo borrador
    } else {
        canvas.style.cursor = 'default'; // Restaura el cursor por defecto
    }
}

// Función para borrar un punto cercano a la posición del clic
function erasePoint(x, y) {
    const radius = 10; // Define un radio para detectar puntos cercanos
    points = points.filter(point => {
        return Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2) > radius;
    });
    redrawCanvas();
}

// Función para redibujar todo el canvas
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mapImage, 0, 0);
    points.forEach(point => drawPoint(point.x, point.y, point.color));
}

// Función para deshacer el último punto
function undoLastPoint() {
    if (points.length > 0) {
        points.pop(); // Elimina el último punto de la lista
        redrawCanvas(); // Redibuja el canvas sin ese punto
    }
}

// Función para cambiar el color del punto
function setColor(color) {
    pointColor = color;
}

// Función para exportar el canvas a PNG
function exportToPNG() {
    const controls = document.querySelector('.controls');
    controls.style.display = 'none';

    setTimeout(() => {
        const link = document.createElement('a');
        link.download = 'mapa.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        controls.style.display = 'flex';
    }, 100);
}
// Función para borrar todos los puntos
function clearAllPoints() {
    points = []; // Vacía la lista de puntos
    redrawCanvas(); // Redibuja el canvas sin puntos
}

