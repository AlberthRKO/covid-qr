var usuario;

$('#qr').qrcode({
    render: 'div',
    fill: '#1620AC',
    text: '1:PARADA RAVELO:ALTO:-19.0258807:-65.2782766'//idUbicacion:Lugar:Riesgo:latitud:longitud
});

function mostrarqr() {
    document.getElementById('mostrar').style.setProperty('display', 'block', 'important');
}

$(document).ready(function() {
    comprobarSesion();
    mostrarqr();
});

function setUsuario(){
    usuario = JSON.parse(sessionStorage.usuario);
    usuario = JSON.parse(usuario);
}

function comprobarSesion(){
    if(sessionStorage.usuario){
        setUsuario();
    }
    else
        window.location.href = "login.html";
}

// $('#hola').qrcode("<button>Hola</button>");