var errorNombres;
var errorApellidos;
var errorCi1;
var errorCi2;
var errorContrasena;
var errorUbicacion;
var errorAceptar;

$('#btnRegistrar').click(function (e){
    e.preventDefault();
    if(hayError())
        return;
    insertar();
    window.location.href = "index.html";
});



function hayError(){    
    errorAceptar = validarAceptar();
    errorUbicacion = validarUbicacion();
    errorContrasena = validarContrasena();
    errorCi1 = validarCi();
    errorCi2 = validarCiExistente();
    errorApellidos = validarApellidos();
    errorNombres = validarNombres();
    if(errorNombres || errorApellidos || errorCi1 || errorCi2 ||errorContrasena || errorAceptar)
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
    let latitud = $('#ejeX').val();
    if(latitud != ""){
        $('#alertaUbicacion').removeClass("alert alert-danger");
        $('#alertaUbicacionMensaje1').fadeOut();
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

function validarAceptar(){
    if( $('#aceptar').prop('checked') ) {
        $('#alertaAceptar').removeClass("alert alert-danger");
        $('#alertaAceptarMensaje').fadeOut();
        return false;
    }
    else{
        $('#alertaAceptar').addClass("alert alert-danger");
        $('#alertaAceptarMensaje').fadeIn();
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
    let usuario = getUsuario(ci,contrasena);
    sessionStorage.usuario = JSON.stringify(usuario);
}

function getUsuario(ci,contrasena){
    let usuario;
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
        success : result => {
            usuario = result.trim();
        }
    });
    return usuario;
}

$('#btnUbicacion').click(function(){
    initMap();
});