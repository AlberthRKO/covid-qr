var errorNombres;
var errorApellidos;
var errorCi1;
var errorCi2;
var errorContrasena;
var errorUbicacion;

$('#btnRegistrar').click(function (e){
    e.preventDefault();
    if(hayError())
        return;
    insertar();
    limpiar();
    swal("Guardado", "Registro exitoso !", "success");
});

$('#btnUbicacion').click(function(){
    initMap();
});

function limpiar(){
    $('#nombres').val("");
    $('#apellidos').val("");
    $('#ci').val("");
    $('#correo').val("");
    $('#ejeX').val("");
    $('#ejeY').val("");
    $('#contrasena1').val("");
    $('#contrasena2').val("");
}

function hayError(){
    errorUbicacion = validarUbicacion();
    errorContrasena = validarContrasena();
    errorCi1 = validarCi();
    errorCi2 = validarCiExistente();
    errorApellidos = validarApellidos();
    errorNombres = validarNombres();
    if(errorNombres || errorApellidos || errorCi1 || errorCi2 ||errorContrasena || errorUbicacion)
        return true;
    return false;
}

function validarNombres(){
    let nombres = $('#nombres').val();
    if(nombres.trim() != ""){
        $('#alertaNombres').removeClass("alert alert-danger");
        $('#alertaNombresMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaNombres').addClass("alert alert-danger");
        $('#alertaNombresMensaje').fadeIn();
        $('#nombres').focus();
        return true;
    }
}

function validarApellidos(){
    let apellidos = $('#apellidos').val();
    if(apellidos.trim() != ""){
        $('#alertaApellidos').removeClass("alert alert-danger");
        $('#alertaApellidosMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaApellidos').addClass("alert alert-danger");
        $('#alertaApellidosMensaje').fadeIn();
        $('#apellidos').focus();
        return true;
    }
}

function validarCi(){
    let ci = $('#ci').val();
    if(ci.trim() != ""){
        $('#alertaCi').removeClass("alert alert-danger");
        $('#alertaCiMensaje1').fadeOut();
        return false;
    }
    else{
        $('#alertaCi').addClass("alert alert-danger");
        $('#alertaCiMensaje1').fadeIn();
        $('#ci').focus();
        return true;
    }
}

function validarUbicacion(){
    let latitud = $('#ejeX').val().trim();
    let longitud = $('#ejeY').val().trim();
    if(latitud != "" && longitud != ""){
        $('#alertaUbicacion').removeClass("alert alert-danger");
        $('#alertaUbicacionMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaUbicacion').addClass("alert alert-danger");
        $('#alertaUbicacionMensaje').fadeIn();
        $('#btnUbicacion').focus();
        return true;
    }
}

function validarCiExistente(){
    if($('#ci').val().trim() == "")
        return false;
    let ci = $('#ci').val().trim();
    let exists = checkUsuario(ci);
    if(!exists){
        $('#alertaCi').removeClass("alert alert-danger");
        $('#alertaCiMensaje2').fadeOut();
        return false;
    }
    else{
        $('#alertaCi').addClass("alert alert-danger");
        $('#alertaCiMensaje2').fadeIn();
        $('#ci').focus();
        return true;
    }
}

function checkUsuario(ci){
    let exists;
    url="php/controlador/ControladorUsuario.php";
    data = {
        'request': 'getByCi',
        'ci': ci
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success : result => {
            if(result != "empty")
                exists = true;
        }
    });
    return exists;
}

function validarContrasena(){
    let contrasena1 = $('#contrasena1').val();
    let contrasena2 = $('#contrasena2').val();
    if(contrasena1.trim() != "" && contrasena1 == contrasena2){
        $('#alertaContrasena').removeClass("alert alert-danger");
        $('#alertaContrasenaMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaContrasena').addClass("alert alert-danger");
        $('#alertaContrasenaMensaje').fadeIn();
        $('#contrasena1').focus();
        return true;
    }
}

function insertar(){
    let contrasena = $('#contrasena1').val();
    let ci = $('#ci').val().trim() + $('select[name=extension]').val();
    url="php/controlador/ControladorUsuario.php";
    data = {
        'request': 'insertar',
        'nombres': $('#nombres').val().trim(),
        'apellidos': $('#apellidos').val().trim(),
        'ci': ci,
        'telefono': '',
        'correo': $('#correo').val().trim(),
        'contrasena': contrasena,
        'rol': '1',
        'estado': 'NORMAL',
        'ejeX': $('#ejeX').val(),
        'ejeY': $('#ejeY').val()
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data
    });
}

$(document).ready(function (){
    comprobarAdmin();
});

function comprobarAdmin(){
    if(sessionStorage.usuario){
        usuario = JSON.parse(sessionStorage.usuario);
        usuario = JSON.parse(usuario);
        if(usuario.rol == "1")
            window.location.href = "index.html";
    }
}