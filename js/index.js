var usuario;

$('#btn').click(function(e){
    e.preventDefault();
    console.log(usuario.nombres + " " + usuario.apellidos);
});

function comprobarSesion(){
    if(sessionStorage.usuario){
        setUsuario();
        $('#btn').html(usuario.nombres + " " + usuario.apellidos);
    }
    else
        window.location.href = "login.html";
}

function setUsuario(){
    usuario = JSON.parse(sessionStorage.usuario);
    usuario = JSON.parse(usuario);
}

$(document).ready(function() {
    comprobarSesion();
});