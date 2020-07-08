var error = false;
var usuario;

function comprobarSesion(){
    if(sessionStorage.ci){
        setUsuario();
        $('#btn').html(usuario.nombres + " " + usuario.apellidos);
    }
}

function setUsuario(){
    ci = sessionStorage.ci;
    contrasena = sessionStorage.contrasena;
    url="php/controlador/ControladorUsuario.php";
    data = {
        'request': 'getByCiContrasena',
        'ci': ci,
        'contrasena': contrasena
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: result => {
            usuario = JSON.parse(result);
        }
    });
}

$(document).ready(function() {
    console.log("ASDf");
    comprobarSesion();
});