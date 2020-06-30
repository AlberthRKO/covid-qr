$('#qr').qrcode({
    render: 'div',
    fill: '#1620AC',
    text: 'Tu ubicacion https://www.google.com/maps/@-19.0289818,-65.2501004,15z'
});

function mostrarqr() {
    document.getElementById('mostrar').style.setProperty('display', 'block', 'important');
}


// $('#hola').qrcode("<button>Hola</button>");