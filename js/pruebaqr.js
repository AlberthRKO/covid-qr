$('#qr').qrcode({
    render: 'div',
    fill: '#1620AC',
    text: 'Hospitales en Sucre https://www.google.com/maps/search/Hospitales/@-19.0357544,-65.2600568,15z'
});

function mostrarqr() {
    document.getElementById('mostrar').style.setProperty('display', 'block', 'important');
}


// $('#hola').qrcode("<button>Hola</button>");