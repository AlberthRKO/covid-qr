$('#qr').qrcode({
    render: 'div',
    fill: '#1620AC',
    text: '1:PARADA RAVELO:ALTO:-19.0258807:-65.2782766'//idUbicacion:Lugar:Riesgo:latitud:longitud
});

function mostrarqr() {
    document.getElementById('mostrar').style.setProperty('display', 'block', 'important');
}

$(document).ready(function() {
    mostrarqr();
});

// $('#hola').qrcode("<button>Hola</button>");