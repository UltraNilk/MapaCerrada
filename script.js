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

    // Cargar puntos desde localStorage
    loadPoints();
};

// Variables para el color del punto y la lista de puntos
let pointColor = 'blue'; // Color inicial
let points = [];

// Detecta clics en el canvas y dibuja puntos
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Dibuja un círculo en la posición del clic
    drawPoint(x, y, pointColor);

    // Guarda el punto en la lista
    points.push({ x, y, color: pointColor });
});

// Función para dibujar un punto en el canvas
function drawPoint(x, y, color) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

// Cambia el color del punto
function setColor(color) {
    pointColor = color;
}

// Función para exportar el mapa a PNG
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

// Función para guardar los puntos en localStorage
function savePoints() {
    localStorage.setItem('points', JSON.stringify(points));
    alert('Puntos guardados!');
}

// Función para cargar los puntos desde localStorage
function loadPoints() {
    const storedPoints = localStorage.getItem('points');
    if (storedPoints) {
        points = JSON.parse(storedPoints);
        points.forEach(point => drawPoint(point.x, point.y, point.color));
    }
}

// Función para borrar todos los puntos
function clearPoints() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(mapImage, 0, 0);
    points = [];
    localStorage.removeItem('points');
}
